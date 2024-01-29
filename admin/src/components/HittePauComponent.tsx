import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';
import type { IModifiersData } from '../hooks/fetchDashboardData';
import { useDashboardData } from '../hooks/fetchDashboardData';
import { addModifierToDB } from '../hooks/addRecipeToDB';

interface ModifiersColumnProps {
  modifiers: IModifiersData[];
  onModifiersChange: (updatedModifiers: IModifiersData[]) => void;
}

interface SelectedItem {
  name: string;
}

const HittePauComponent: React.FC<ModifiersColumnProps> = ({
  modifiers: selectedModifiers,
  onModifiersChange,
}) => {
  const { dashboardData } = useDashboardData();
  const { modifiers: allModifiers } = dashboardData;
  const [items, setItems] = useState<IModifiersData[]>(selectedModifiers);
  const [availableModifiers, setAvailableModifiers] = useState<IModifiersData[]>(allModifiers);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if(dashboardData && dashboardData.modifiers){
      setAvailableModifiers(dashboardData.modifiers)
    }
  }, [dashboardData]);

  // useEffect(() => {
  //   const filteredModifiers = availableModifiers.filter(modifier => !items.find(item => item._id === modifier._id));
  //   setAvailableModifiers(filteredModifiers);
  // }, [items]);

  const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if(name.trim() !== ''){
      try {
        const addedModifier = await addModifierToDB({ name })
        
        if(!addedModifier){
          return console.log("Couldn't add modifier");
        }
        
        setItems(prevItems => [...prevItems, addedModifier]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (selectedValues: SelectedItem[]) => {
    console.log("Handle Change: ", selectedValues);
    const selectedItems = availableModifiers.filter(modifier => {
      if(typeof modifier === 'string'){
        return selectedValues.includes(modifier);
      } else {
        return selectedValues.some(selected => selected.name === modifier.name)
      }
    });
    console.log("Selected items: ", selectedItems);
    
    
    // setAvailableModifiers(prevModifiers => {
    //   return prevModifiers.filter(modifier => !selectedValues.includes(modifier.name ?? '')); 
    // });

    // setAvailableModifiers(prevModifiers => prevModifiers.filter(modifier => !selectedValues.includes(modifier.name ?? '')));

    setItems(prevItems => {
      const mergedItems = [...prevItems, ...selectedItems];
      return Array.from(new Set(mergedItems));
    });
    onModifiersChange(selectedItems);
  };

  const handleDeselect = (value: string) => {
    console.log(value);
    
    const deselectItem = items.find(item => item.name === value);

    if(deselectItem){
      const updatedItems = items.filter(item => item.name !== value);
      setItems(updatedItems);

      setAvailableModifiers(prevModifiers => [...prevModifiers, deselectItem]); 
    }
  }

  useEffect(() => {
    console.log("Available modifiers: ", availableModifiers);
    
    console.log("Items State", items);
  }, [items])

  return (
    <Select
      style={{ width: 300 }}
      placeholder="custom dropdown render"
      mode='multiple'
      value={items.map(modifier => modifier.name)}
      onChange={handleChange}
      onDeselect={handleDeselect}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
    >
      {availableModifiers.map(modifier => (
        <Select.Option key={modifier._id} value={modifier.name}>
          {modifier.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default HittePauComponent;