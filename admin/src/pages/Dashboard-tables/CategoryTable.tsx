import { useState } from 'react';
import { Space, Table, Tag, Input, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IRecipesData, useDashboardData } from '../../hooks/fetchDashboardData';
import ToppingsColumn from '../../components/ToppingsColumn';
import ModifiersColumn from '../../components/ModifiersColumn';

interface CategoryTableProps {
  recipes: IRecipesData[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ recipes: categoryRecipes }) => {
  const { dashboardData, refetch, isLoading } = useDashboardData();
  const [editedRecipe, setEditedRecipe] = useState<IRecipesData | null>(null);

  if (isLoading) {
    return <div>Loading...</div>
  }

  const { modifiers, toppings } = dashboardData;

  const handleDelete = async (record: IRecipesData) => {
    try {
      const response = await fetch(`/api/dashboard/recipe/${record._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await refetch();
      } else {
        console.log("Couldn't delete!");
      }
    } catch (error) {
      console.error("Couldn't delete recipe");
    }
  }

  const handleUpdate = async (record: IRecipesData) => {
    try {
      const response = await fetch(`/api/dashboard/recipe/${record._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });
      if (response.ok) {
        setEditedRecipe(null);
        await refetch();
      } else {
        console.log("Couldn't update!");
      }
    } catch (error) {
      console.error("Couldn't update recipe");
    }
  }

  const handleModifiersChange = (_record: IRecipesData, updatedModifiers: string[]) => {
    if (!editedRecipe) {
      return
    }

    setEditedRecipe({ ...editedRecipe, modifiers: updatedModifiers });
  }

  const handleToppingsChange = (_record: IRecipesData, updatedToppings: string[]) => {
    if (!editedRecipe) {
      return
    }

    setEditedRecipe({ ...editedRecipe, toppings: updatedToppings });
  }

  const getModifierName = (id: string) => {
    const modifier = modifiers.find(m => m._id === id);
    return modifier?.name || "Unknown";
  }

  const getToppingName = (id: string) => {
    const topping = toppings.find(t => t._id === id);
    return topping?.name || "Unknown";
  }

  const columns: ColumnsType<IRecipesData> = [
    {
      title: 'Namn',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        editedRecipe?._id === record._id ? (
          <Input value={text} onChange={(e) => handleInputChange(e, record, 'name')} />
        ) : (
          <span>{text}</span>
        )
      ),
    },
    {
      title: 'Ingredienser',
      dataIndex: 'modifiers',
      key: 'modifiers',
      render: (_, record) => (
        editedRecipe?._id === record._id ? (
          <ModifiersColumn
            modifierIds={record.modifiers}
            onModifiersChange={updatedModifiers => handleModifiersChange(record, updatedModifiers)}
          />
        ) : (
          <>
            {record.modifiers.map((modifier, index) => {
              return (
                <Tag color="blue" key={index}>
                  {getModifierName(modifier)}
                </Tag>
              )
            })}
          </>
        )
      )
    },
    {
      title: 'Tillbehör',
      key: 'toppings',
      dataIndex: 'toppings',
      render: (_, record) => (
        editedRecipe?._id === record._id ? (
          <ToppingsColumn
            toppingsIds={record.toppings}
            onToppingsChange={updatedToppings => handleToppingsChange(record, updatedToppings)}
          />
        ) : (
          <>
            {record.toppings.map((topping, index) => (
              <Tag color="green" key={index}>
                {getToppingName(topping)}
              </Tag>
            ))}
          </>
        )
      ),
    },
    {
      title: 'Pris',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <>
          {editedRecipe?._id === record._id ? (
            <Input value={text.toString()} onChange={(e) => handleInputChange(e, record, 'price')} />
          ) : (
            <span>{text}</span>
          )}
        </>
      )
    },
    {
      title: 'Uppdatera / Radera recept',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editedRecipe?._id === record._id ? (
            <>
              <Button onClick={() => handleUpdate(editedRecipe)}>Spara</Button>
              <Button onClick={() => setEditedRecipe(null)}>Stäng</Button>
            </>
          ) : (
            <a onClick={() => setEditedRecipe(record)}><EditOutlined /></a>
          )}
          <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, record: IRecipesData, field: string) => {
    if (!editedRecipe) {
      return
    }
    setEditedRecipe({
      ...editedRecipe,
      [field as keyof IRecipesData]: e.target.value !== undefined ? e.target.value.toString() : ''
    });
  }

  return <Table columns={columns} dataSource={categoryRecipes} rowKey="_id" />;
}

export default CategoryTable;
