import { useEffect, useState } from 'react';
import { Space, Table, Tag, Input, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { IModifiersData, IRecipesData, useDashboardData } from '../../hooks/fetchDashboardData';
import HittePauComponent from '../../components/HittePauComponent';

const CategoryTable = () => {
  const { dashboardData } = useDashboardData();
   const [data, setData] = useState<IRecipesData[]>([]);
   const [editingKey, setEditingKey] = useState<string | number | null>(null);

    useEffect(() => {
      setData(dashboardData.recipes);
    }, [dashboardData]);

    const handleDelete = async (record: IRecipesData) => {
      try {
        const response = await fetch(`/api/dashboard/recipe/${record._id}`, {
          method: 'DELETE',
        });
        if(response.ok){
          setData((prevData) => prevData.filter((item) => item._id !== record._id));
          } else {
            console.log("Couldn't delete!"); 
          }
      } catch (error) {
        console.error("Couldn't delete recipe");
      }
    }

    const handleUpdate = async (record: IRecipesData) => {
      try {
        setEditingKey(null);
        const response = await fetch(`/api/dashboard/recipe/${record._id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(record)
        });
        if(response.ok){
          console.log(response);
          
          setEditingKey(null);
          } else {
            console.log("Couldn't update!"); 
          }
      } catch (error) {
        console.error("Couldn't update recipe");
      }
    }

    // const handleModifiersChange = (record: IRecipesData, updatedModifiers: IModifiersData[]) => {
    //   console.log("New data: ", updatedModifiers);
      
    //   const newData = data.map(recipe => {
    //     if(recipe.name === record.name){
    //       return {
    //         ...recipe,
    //         modifiers: updatedModifiers
    //       };
    //     }
    //     return recipe;
    //   });
    // }

    const handleModifiersChange = (record: IRecipesData, updatedModifiers: IModifiersData[]) => {
      const index = data.findIndex(item => item._id === record._id);
      console.log("Index: ", index);
      

      if(index !== -1){
        const newData = [...data];
        console.log("New data", newData);
        
        // newData[index].modifiers = updatedModifiers.map(modifier => ({ name: modifier}));
        if(newData[index].modifiers){
          newData[index].modifiers.push(...updatedModifiers);
        } else {
          newData[index].modifiers = updatedModifiers;
        }
        setData(newData);
      }
    }

    useEffect(() => {
      console.log("Data State: ", data);
    }, [data]);

    const columns: ColumnsType<IRecipesData> = [
        {
          title: 'Namn',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => (
            editingKey === record._id ? (
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
            editingKey === record._id ? (
            <HittePauComponent 
            modifiers={record.modifiers}
            onModifiersChange={updatedModifiers => handleModifiersChange(record, updatedModifiers)}
            />
            ) : (
              <>
              {record.modifiers.map((modifier, index) => {
                return (
                  <Tag color="blue" key={index}>
                    {modifier.name}
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
          render: (text, record) => (
            <>
            {editingKey === record._id ? (
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
              {editingKey === record._id ? (
                <>
                  <Button onClick={() => handleUpdate(record)}>Save</Button>
                  <Button onClick={() => setEditingKey(null)}>Close</Button>
                </>
              ) : (
                <a onClick={() => setEditingKey(record._id)}><EditOutlined /></a>
              )}
              <a onClick={() => handleDelete(record)}><DeleteOutlined /></a>
            </Space>
          ),
        },
      ];

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, record: IRecipesData, field: string) => {
        const newData = [...data];
        const editingRecordIndex = newData.findIndex((item) => item._id === editingKey);

        if(editingRecordIndex !== -1){
          newData[editingRecordIndex][field as keyof IRecipesData] = e.target.value !== undefined ? e.target.value.toString() : '';
          setData(newData);
        }
      }

      return <Table columns={columns} dataSource={data} rowKey="_id"/>;
}

export default CategoryTable;
