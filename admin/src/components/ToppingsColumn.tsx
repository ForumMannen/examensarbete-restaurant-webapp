import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button } from 'antd';
import type { InputRef } from 'antd';
import { IToppingsData, useDashboardData } from '../hooks/fetchDashboardData';
import { addToppingToDB } from '../hooks/addRecipeToDB';

interface ToppingsColumnProps {
    toppingsIds: string[];
    onToppingsChange: (updatedToppings: string[]) => void;
}

const ToppingsColumn: React.FC<ToppingsColumnProps> = ({
    toppingsIds: selectedToppings,
    onToppingsChange,
}) => {
    const { dashboardData, isLoading } = useDashboardData();
    const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>(selectedToppings);
    const [addedToppings, setAddedToppings] = useState<IToppingsData[]>([]);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    if (isLoading) {
        return "";
    }

    const allToppings = [...dashboardData.toppings, ...addedToppings];

    const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        if (name.trim() !== '') {
            try {
                const { topping } = await addToppingToDB({ name })

                if (!topping) {
                    return console.log("Couldn't add topping");
                }

                setAddedToppings([...addedToppings, topping]);

                setSelectedToppingIds([...selectedToppingIds, topping._id!]);
                setName('');
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleChange = (selectedValues: string[]) => {
        setSelectedToppingIds(selectedValues);
        onToppingsChange(selectedValues);
    };

    const handleDeselect = (value: string) => {
        const updatedItems = selectedToppingIds.filter(item => item !== value);
        setSelectedToppingIds(updatedItems);
        onToppingsChange(updatedItems);
    }

    const selectOptions = allToppings.map(topping => ({ value: topping._id, label: topping.name }))

    return (
        <Select
            style={{ width: 300 }}
            placeholder="Lägg till tillbehör"
            mode='multiple'
            options={selectOptions}
            value={selectedToppingIds}
            onChange={handleChange}
            onDeselect={handleDeselect}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                            placeholder="Nytt tillbehör"
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

export default ToppingsColumn;