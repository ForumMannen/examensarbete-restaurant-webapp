import React, { useState, useRef } from 'react';
import { Select, Tag, Input, Button, Divider, Space } from 'antd';
import { useDashboardData } from '../hooks/fetchDashboardData';
import type { IModifiersData } from '../hooks/fetchDashboardData';
import type { SelectProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addModifierToDB } from '../hooks/addRecipeToDB';
import type { InputRef } from 'antd';

interface ModifiersColumnProps {
  modifiers: IModifiersData[];
  onModifiersChange: (value: string[]) => void;
}

type TagRender = SelectProps['tagRender'];

const ModifiersColumn: React.FC<ModifiersColumnProps> = ({
  modifiers: selectedModifiers,
  onModifiersChange,
}) => {
  const { dashboardData } = useDashboardData();
  const { modifiers: availableModifiers } = dashboardData;
  // const [name, setName] = useState<string>('');
  const inputRef = useRef<InputRef>(null);
  //const [items, setItems] = useState([]);
  // const allModifiers = [...selectedModifiers, ...availableModifiers];
  // const selectedValues = selectedModifiers.map((modifier) => modifier.name);

  // const uniqueModifiers = Array.from(new Set(allModifiers.map((modifier) => modifier._id)))
  // .map((id) => allModifiers.find((modifier) => modifier._id === id));

  const unselectedModifiers = availableModifiers.filter((modifier) => !selectedModifiers.some((selected) => selected._id === modifier._id));

  const [newItemName, setNewItemName] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  }

  // const handleAddItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   try {
  //     const addedModifier = await addModifierToDB(newItemName);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setNewItemName([...items, name || `New item ${index++}`]);
  //   setNewItemName('');
  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // }

  const handleAddItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if(newItemName.trim() !== ''){
      try {
        const addedModifier = await addModifierToDB({ name: newItemName });
        const updatedSelectedModifiers = [...selectedModifiers, addedModifier];
        
        
        onModifiersChange(updatedSelectedModifiers.map((modifier) => modifier!.name));
        setNewItemName('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const tagRender: TagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
  
    return (
      <Tag
        color="green"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

    return (
      <Select
        mode="multiple" 
        tagRender={tagRender}
        style={{ width: '300' }}
        placeholder="Ingredienser"
        onChange={(value) => onModifiersChange(value)}
        value={selectedModifiers.map((modifier) => modifier.name)}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0'}}/>
            <Space style={{ padding: '0 8px 4px' }}>
              <Input 
                ref={inputRef} 
                value={newItemName} 
                onChange={handleInputChange} 
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type='text' onClick={handleAddItem} icon={<PlusOutlined />}>
                Lägg till
              </Button>
            </Space>
          </>
        )}
      >
        {unselectedModifiers.map(modifier => (
          <Select.Option key={modifier._id} value={modifier.name} label={modifier.name}>
            {modifier.name}
          </Select.Option>
        ))}
      </Select>
    );
};

export default ModifiersColumn;
