import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';
import { fetchDashboardData, useDashboardData } from '../hooks/fetchDashboardData';
import { addModifierToDB } from '../hooks/addRecipeToDB';

interface ModifiersColumnProps {
  modifierIds: string[];
  onModifiersChange: (updatedModifiers: string[]) => void;
}

const HittePauComponent: React.FC<ModifiersColumnProps> = ({
  modifierIds: selectedModifiers,
  onModifiersChange,
}) => {
  const { dashboardData } = useDashboardData();
  //Recipes id's
  const [selectedModifierIds, setSelectedModifierIds] = useState<string[]>(selectedModifiers);
  // const [addedModifiers, setAddedModifiers] = useState<IModifiersData[]>([]);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  // console.log("selected modifiers: ", selectedModifierIds);

  // useEffect(() => {
  //   // console.log("added modifiers: ", addedModifiers);
  // }, [addedModifiers])

  if (!dashboardData?.modifiers) {
    return <div>Loading...</div>
  }

  const allModifiers = dashboardData.modifiers;
  console.log("All modifiers", allModifiers);


  const availableModifiers = allModifiers.filter(modifier => !selectedModifierIds.find(id => id === modifier._id));
  // console.log("Available modifiers", availableModifiers);

  const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    // console.log("This shouldn't show when entering edit mode");

    e.preventDefault();
    if (name.trim() !== '') {
      try {
        const addedModifier = await addModifierToDB({ name })

        if (!addedModifier) {
          return console.log("Couldn't add modifier");
        }

        const updatedDashboardData = await fetchDashboardData();
        console.log(updatedDashboardData);


        // setAddedModifiers(prevItems => [...prevItems, addedModifier]);

        // setSelectedModifierIds(prevItems => [...prevItems, addedModifier._id!]);
        setName('');

      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (selectedValues: string[]) => {
    setSelectedModifierIds(selectedValues);
    onModifiersChange(selectedValues);
  };

  // const handleChange = (selectedValues: string[]) => {
  //   console.log("Handle Change: ", selectedValues);
  //   const selectedItems = availableModifiers.filter(modifier => {
  //     return selectedValues.some(selected => selected === modifier._id)
  //   });

  //   const selectedIds = selectedItems.map(item => item._id!);
  //   setSelectedModifierIds(prevItems => {
  //     return [...prevItems, ...selectedIds];
  //   });
  //   onModifiersChange(selectedIds);
  // };

  const handleDeselect = (value: string) => {
    console.log(value);
    const updatedItems = selectedModifierIds.filter(item => item !== value);
    setSelectedModifierIds(updatedItems);
    onModifiersChange(updatedItems);
  }

  // const getModifierName = (id: string) => {
  //   const modifier = dashboardData.modifiers.find(m => m._id === id);
  //   return modifier?.name || "Unknown";
  // }

  const getModifierName = (id: string) => {
    // console.log("Id in getModifierName", id);

    const modifierInDashboardData = dashboardData.modifiers.find(m => m._id === id);
    // return modifierInDashboardData?.name || "Unknown";
    console.log(modifierInDashboardData);

    if (modifierInDashboardData) {
      console.log("This should stop the function.");

      return modifierInDashboardData.name;
    }
    console.log("And this shouldn't show.");
    return "Unknown";
  };

  return (
    <Select
      style={{ width: 300 }}
      placeholder="custom dropdown render"
      mode='multiple'
      value={selectedModifierIds.map(id => getModifierName(id))}
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