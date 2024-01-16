import React from 'react';
import { Space, Table, Tag } from 'antd';
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
          render: () => (
            <Space size="middle">
              <a>Redigera</a>
              <a>Radera</a>
            </Space>
          ),
        },
      ];

      return <Table columns={columns} dataSource={convertData(recipes)}/>;
}

export default CategoryTable;