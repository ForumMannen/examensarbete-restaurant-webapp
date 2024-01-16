import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IRecipesData } from '../../hooks/fetchDashboardData';

interface CategoryTableProps {
    recipes: IRecipesData[];
}

const convertData = (recipes: IRecipesData[]): IRecipesData[] => {
    return recipes.map((recipe) => ({
      ...recipe,
      key: recipe._id,
    }));
  };


const CategoryTable: React.FC<CategoryTableProps> = ({ recipes }) => {
    const [data, setData] = useState<IRecipesData[]>(recipes);

    const handleDelete = async (record: IRecipesData) => {
      try {
        const response = await fetch(`/api/dashboard/recipe/${record._id}`, {
          method: 'DELETE',
        });
        if(response.ok){
          setData((prevData) => {
            console.log('Previous data:', prevData);
            const newData = prevData.filter((item) => item._id !== record._id);
            console.log('New data:', newData);
            return newData;
          });
          console.log(data);
        } else {
          console.log("Wasn't able to delete!");
          
        }

      } catch (error) {
        console.error("Couldn't delete recipe");
      }
    }

    const columns: ColumnsType<IRecipesData> = [
        {
          title: 'Namn',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Ingredienser',
          dataIndex: 'modifiers',
          key: 'modifiers',
          render: (_, { modifiers }) => (
            <>
              {modifiers.map((modifier, index) => (
                <Tag color="blue" key={index}>
                  {modifier.name}
                </Tag>
              ))}
            </>
          )
        },
        {
          title: 'Tillbehör',
          key: 'toppings',
          dataIndex: 'toppings',
          render: (_, { toppings }) => (
            <>
              {toppings.map((topping, index) => (
                <Tag color="green" key={index}>
                  {topping.name}
                </Tag>
              ))}
            </>
          ),
        },
        {
          title: 'Pris',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Uppdatera / Radera recept',
          key: 'action',
          render: (_, record) => (
            <Space size="small">
              <a><EditOutlined /></a>
              <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
            </Space>
          ),
        },
      ];

      return <Table key={data.length} columns={columns} dataSource={convertData(data)}/>;
}

export default CategoryTable;
