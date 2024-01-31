import type { ReactNode } from 'react';
import { useState } from 'react';
import { Space, Table, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { IModifiersData, IToppingsData, useDashboardData } from '../../hooks/fetchDashboardData';
import { ColumnsType } from 'antd/es/table';

interface IngredientsTableProps {
    data: IModifiersData[] | IToppingsData[];
    onDelete: (record: IModifiersData | IToppingsData) => void;
    onUpdate: (record: IModifiersData | IToppingsData) => void;
    onUpdateValue: (value: string) => void;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ data, onDelete, onUpdate, onUpdateValue }) => {
    const { isLoading } = useDashboardData();
    const [editedItem, setEditedItem] = useState<IModifiersData | IToppingsData | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onUpdateValue(value);
    }

    const handleEdit = (record: IModifiersData | IToppingsData) => {
        setEditedItem(record);
        setInputValue(record.name);
    }

    const handleSave = () => {
        if (!editedItem) {
            return
        }
        onUpdate(editedItem);
        setEditedItem(null);
    }

    const handleClose = () => {
        setEditedItem(null);
    }

    const columns: ColumnsType<IModifiersData | IToppingsData> = [
        {
            title: 'Namn',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                editedItem?._id === record._id ? (
                    <Input value={inputValue} onChange={handleInputChange} />
                ) : (
                    <span>{text}</span>
                )
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_: ReactNode, record: IModifiersData | IToppingsData) => (
                editedItem?._id === record._id ? (
                    <Space size="small">
                        <a onClick={handleSave}><SaveOutlined /></a>
                        <a onClick={handleClose}><CloseOutlined /></a>
                    </Space>
                ) : (
                    <Space size="small">
                        <a onClick={() => handleEdit(record)}><EditOutlined /></a>
                        <a onClick={() => onDelete(record)}><DeleteOutlined /></a>
                    </Space>
                )
            ),
        },
    ];

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, record: IModifiersData | IToppingsData, field: string) => {
    //     if (!editedItem) {
    //         return
    //     }

    //     setEditedItem({
    //         ...editedItem,
    //         [field as keyof typeof editedItem]: e.target.value !== undefined ? e.target.value.toString() : ''
    //     });
    // }

    return <Table columns={columns} dataSource={data} rowKey="_id" />
}

export default IngredientsTable;