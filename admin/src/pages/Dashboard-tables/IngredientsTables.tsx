import type { ReactNode } from 'react';
import { Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IModifiersData, IToppingsData } from '../../hooks/fetchDashboardData';

interface IngredientsTableProps {
    data: IModifiersData[] | IToppingsData[];
    onDelete: (record: IModifiersData | IToppingsData) => void;
}

const IngredientsTable: React.FC<IngredientsTableProps> = ({ data, onDelete }) => {
    const columns = [
        {
            title: 'Namn',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_: ReactNode, record: IModifiersData | IToppingsData) => (
                <Space size="small">
                    <a><EditOutlined /></a>
                    <a onClick={() => onDelete(record)}><DeleteOutlined /></a>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="_id" />
}

export default IngredientsTable;