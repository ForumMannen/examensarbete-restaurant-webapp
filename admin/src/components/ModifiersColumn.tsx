import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';
import { IModifiersData, useDashboardData } from '../hooks/fetchDashboardData';
import { addModifierToDB } from '../hooks/addRecipeToDB';

interface ModifiersColumnProps {
  modifierIds: string[];
  onModifiersChange: (updatedModifiers: string[]) => void;
}

const ModifiersColumn: React.FC<ModifiersColumnProps> = ({
  modifierIds: selectedModifiers,
  onModifiersChange,
}) => {
  const { dashboardData, isLoading } = useDashboardData();
  //Recipes id's
  const [selectedModifierIds, setSelectedModifierIds] = useState<string[]>(selectedModifiers);
  const [addedModifiers, setAddedModifiers] = useState<IModifiersData[]>([]);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  if (isLoading) {
    return "";
  }

  const allModifiers = [...dashboardData.modifiers, ...addedModifiers];

  const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (name.trim() !== '') {
      try {
        const { modifier } = await addModifierToDB({ name })

        if (!modifier) {
          return console.log("Couldn't add modifier");
        }

        setAddedModifiers([...addedModifiers, modifier]);

        setSelectedModifierIds([...selectedModifierIds, modifier._id!]);
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

  const handleDeselect = (value: string) => {
    const updatedItems = selectedModifierIds.filter(item => item !== value);
    setSelectedModifierIds(updatedItems);
    onModifiersChange(updatedItems);
  }

  const selectOptions = allModifiers.map(modifier => ({ value: modifier._id, label: modifier.name }))

  return (
    <Select
      style={{ width: 300 }}
      placeholder="Lägg till ingrediens"
      mode='multiple'
      options={selectOptions}
      value={selectedModifierIds}
      onChange={handleChange}
      onDeselect={handleDeselect}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Ny ingrediens"
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Lägg till
            </Button>
          </Space>
        </>
      )}
    />
  );
};

export default ModifiersColumn;