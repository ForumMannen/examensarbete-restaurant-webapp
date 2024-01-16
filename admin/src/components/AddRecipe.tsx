import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import AddDynamicField from './AddDynamicField';
import { addRecipeToDB, Recipe } from '../hooks/addRecipeToDB';

const AddRecipe: React.FC = () => {
    // const [modifiersNames, setModifiersNames] = useState<string[]>(['']);
    // const [toppingNames, setToppingNames] = useState<string[]>(['']);
    const [recipeData, setRecipeData] = useState({
        name: '',
        modifiers: [{ name: '' }],
        toppings: [{ name: '' }],
        category: '',
        price: 0,
      });

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const sampleCategories = ['Demo', 'Category1', 'Category2'];
        setCategories(sampleCategories);
    }, []); 
    
      const handleRemoveModifierField = (name: string) => {
        setRecipeData((prevData) => ({
          ...prevData,
          modifiers: prevData.modifiers.filter((n) => n.name !== name),
        }));
      };
    
      const handleAddModifierField = () => {
        setRecipeData((prevData) => ({
          ...prevData,
          modifiers: [
            ...prevData.modifiers,
            { name: '' },
          ],
        }));
      };
    
      const handleRemoveToppingField = (name: string) => {
        setRecipeData((prevData) => ({
          ...prevData,
          toppings: prevData.toppings.filter((n) => n.name !== name),
        }));
      };
    
      const handleAddToppingField = () => {
        setRecipeData((prevData) => ({
          ...prevData,
          toppings: [
            ...prevData.toppings, 
            { name: ''},
            ],
        }));
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRecipeData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handlePriceChange = (value: number | null) => {
        setRecipeData((prevData) => ({
          ...prevData,
          price: value || 0,
        }));
      };
    
      const handleAddRecipeClick = () => {
        const modifiedData: Recipe = {
            ...recipeData,
            modifiers: recipeData.modifiers.map(modifier => ({ name: modifier.name })),
            toppings: recipeData.toppings.map(topping => ({ name: topping.name}))
        }
        addRecipeToDB(modifiedData);
      };

  return (
    <Form>
      <Form.Item label="Namn">
        <Input name='name' value={recipeData.name} onChange={handleInputChange}/>
      </Form.Item>
      <Form.Item label="Kategori">
        <Select
            showSearch
            value={recipeData.category}
            onChange={(value) => {
                setRecipeData((prevData) => ({
                    ...prevData,
                    category: value,
                }));
            }}
            placeholder="Välj kategori eller lägg till kategori" 
            optionFilterProp="children" 
            filterOption={(input, option) =>
            (option?.value as string).toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {categories}
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
      <AddDynamicField 
        names={recipeData.modifiers.map(modifier => modifier.name)}
        onAddField={(value, index) => {
            const updatedModifiers = [...recipeData.modifiers];
            updatedModifiers[index] = { name: value };
            setRecipeData((prevData) => ({
                ...prevData,
                modifiers: updatedModifiers,
            }));
        }} 
        onRemoveField={handleRemoveModifierField}
        onAddFieldClick={handleAddModifierField}
        label='Ingredienser'
        placeholder='Lägg till 1 ingrediens'
    />
      </Form.Item>
      <Form.Item>
      <AddDynamicField 
        names={recipeData.toppings.map(topping => topping.name)}
        onAddField={(value, index) => {
            const updatedToppings = [...recipeData.toppings];
            updatedToppings[index] = { name: value };
            setRecipeData((prevData) => ({
                ...prevData,
                toppings: updatedToppings,
            }));
        }} 
        onRemoveField={handleRemoveToppingField}
        onAddFieldClick={handleAddToppingField}
        label='Tillbehör'
        placeholder='Lägg till 1 tillbehör'
    />
      </Form.Item>
      <Form.Item label="Pris">
        <InputNumber value={recipeData.price} onChange={handlePriceChange}/>
      </Form.Item>
      <Form.Item>
        <Button
        onClick={handleAddRecipeClick}>Lägg till recept</Button>
      </Form.Item>
    </Form>
  );
};

export default AddRecipe;