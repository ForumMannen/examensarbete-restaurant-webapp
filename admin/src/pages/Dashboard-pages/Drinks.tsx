import type { ReactNode } from 'react';
import { IDrinksData, useDashboardData } from '../../hooks/fetchDashboardData'
import { useState } from "react";
import { Space, Table, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

const Drinks: React.FC<{ drinks: IDrinksData[] }> = ({
  drinks
}) => {

  const [drinksData, setDrinksData] = useState<IDrinksData[]>(drinks);
  const { isLoading } = useDashboardData();
  const [editedItem, setEditedItem] = useState<IDrinksData | null>(null);
  // const [inputValue, setInputValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [volumeValue, setVolumeValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [priceValue, setPriceValue] = useState<string>('');

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (field) {
      case 'name':
        setNameValue(value);
        break;
      case 'volume':
        setVolumeValue(value);
        break;
      case 'description':
        setDescriptionValue(value);
        break;
      case 'price':
        setPriceValue(value);
        break;
      default:
        break;
    }
    // setInputValue(value);
  }

  const handleEdit = (record: IDrinksData) => {
    setEditedItem(record);
    setNameValue(record.name);
    setVolumeValue(record.volume.toString());
    setDescriptionValue(record.description);
    setPriceValue(record.price.toString());
    // setInputValue(record.name);
  }

  const handleSave = () => {
    if (!editedItem) {
      return
    }
    handleUpdateDrink(editedItem, nameValue, parseFloat(volumeValue), descriptionValue, parseFloat(priceValue));
    setEditedItem(null);
  }

  const handleClose = () => {
    setEditedItem(null);
  }


  const handleDeleteDrink = async (record: IDrinksData) => {
    try {
      const response = await fetch(`/api/dashboard/drinks/${record.name}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log("Drink successfully deleted!");
        setDrinksData((prevDrinks) =>
          prevDrinks.filter((drink) => drink.name !== record.name));
      } else {
        console.log("Couldn't delete drink");
      }
    } catch (error) {
      console.error("Couldn't delete drink", error);
    }
  }

  const handleUpdateDrink = async (record: IDrinksData, updatedName: string, updatedVolume: number, updatedDescription: string, updatedPrice: number) => {
    try {
      const updatedRecord: IDrinksData = {
        ...record,
        name: updatedName,
        volume: updatedVolume,
        description: updatedDescription,
        price: updatedPrice
      };

      const response = await fetch(`/api/dashboard/drinks/${record._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRecord)
      });

      if (response.ok) {
        const updatedDrink = await response.json();
        setDrinksData(prevDrinks =>
          prevDrinks.map(drink =>
            drink._id === updatedDrink._id ? updatedDrink : drink
          )
        );
        console.log("Drink successfully updated!");
      } else {
        console.log("Couldn't update drink");
      }
    } catch (error) {
      console.error("Couldn't update drink", error);
    }
  }

  const columns: ColumnsType<IDrinksData> = [
    {
      title: 'Namn',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        editedItem?._id === record._id ? (
          <Input value={nameValue} onChange={handleInputChange('name')} />
        ) : (
          <span>{text}</span>
        )
      ),
    },
    {
      title: 'Volym (liter)',
      dataIndex: 'volume',
      key: 'volume',
      render: (text, record) => (
        editedItem?._id === record._id ? (
          <Input value={volumeValue} onChange={handleInputChange('volume')} />
        ) : (
          <span>{text}</span>
        )
      ),
    },
    {
      title: 'Beskrivning',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        editedItem?._id === record._id ? (
          <Input value={descriptionValue} onChange={handleInputChange('description')} />
        ) : (
          <span>{text}</span>
        )
      ),
    },
    {
      title: 'Pris (SEK)',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        editedItem?._id === record._id ? (
          <Input value={priceValue} onChange={handleInputChange('price')} />
        ) : (
          <span>{text}</span>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: ReactNode, record: IDrinksData) => (
        editedItem?._id === record._id ? (
          <Space size="small">
            <a onClick={handleSave}><SaveOutlined /></a>
            <a onClick={handleClose}><CloseOutlined /></a>
          </Space>
        ) : (
          <Space size="small">
            <a onClick={() => handleEdit(record)}><EditOutlined /></a>
            <a onClick={() => handleDeleteDrink(record)}><DeleteOutlined /></a>
          </Space>
        )
      ),
    },
  ];

  return (
    <>
      <div>
        <h2>Drycker</h2>
        <Table columns={columns} dataSource={drinksData} rowKey="_id" />
      </div>
    </>
  )
}

export default Drinks