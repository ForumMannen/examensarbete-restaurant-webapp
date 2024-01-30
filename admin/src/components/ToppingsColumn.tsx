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
    const { dashboardData } = useDashboardData();
    const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>(selectedToppings);
    const [addedToppings, setAddedToppings] = useState<IToppingsData[]>([]);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    if (!dashboardData?.toppings) {
        return <div>Loading...</div>
    }

    const allToppings = [...dashboardData.toppings, ...addedToppings];

    const availableToppings = allToppings.filter(topping => !selectedToppingIds.find(id => id === topping._id));

    const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        if (name.trim() !== '') {
            try {
                const addedTopping = await addToppingToDB({ name })

                if (!addedTopping) {
                    return console.log("Couldn't add topping");
                }

                setAddedToppings(prevItems => [...prevItems, addedTopping]);

                setSelectedToppingIds(prevItems => [...prevItems, addedTopping._id!]);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleChange = (selectedValues: string[]) => {
        console.log("Handle Change: ", selectedValues);
        const selectedItems = availableToppings.filter(topping => {
            return selectedValues.some(selected => selected === topping._id)
        });

        const selectedIds = selectedItems.map(item => item._id!);
        setSelectedToppingIds(prevItems => {
            return [...prevItems, ...selectedIds];
        });
        onToppingsChange(selectedIds);
    };

    const handleDeselect = (value: string) => {
        console.log(value);
        const updatedItems = selectedToppingIds.filter(item => item !== value);
        setSelectedToppingIds(updatedItems);
        onToppingsChange(updatedItems);
    }

    const getToppingName = (id: string) => {
        const topping = dashboardData.toppings.find(t => t._id === id);
        return topping?.name || "Unknown";
    }

    return (
        <Select
            style={{ width: 300 }}
            placeholder="custom dropdown render"
            mode='multiple'
            value={selectedToppingIds.map(id => getToppingName(id))}
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
            {availableToppings.map(topping => (
                <Select.Option key={topping._id} value={topping.name}>
                    {topping.name}
                </Select.Option>
            ))}
        </Select>
    );
};

export default ToppingsColumn;