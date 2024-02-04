import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import AddDynamicField from './AddDynamicField';
import { addRecipeToDB, Recipe } from '../hooks/addRecipeToDB';

interface Modifier {
  name: string;
}

interface Topping {
  name: string;
}

interface AddRecipeProps {
  categories: string[];
}

interface RecipeData {
  name: string;
  modifiers: Modifier[];
  toppings: Topping[];
  category: string;
  categoryInput?: string;
  price: number;
}

const AddRecipe: React.FC<AddRecipeProps> = ({ categories }) => {
  const [recipeData, setRecipeData] = useState<RecipeData>({
    name: '',
    modifiers: [{ name: '' }],
    toppings: [],
    category: '',
    price: 0,
  });

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
        { name: '' },
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

  const handleAddRecipeClick = async () => {
    const { categoryInput, ...restRecipeData } = recipeData;

    const noEmptyModifiers = restRecipeData.modifiers.filter(modifier => modifier.name.trim() !== '');

    const modifiedData: Recipe = {
      ...restRecipeData,
      modifiers: noEmptyModifiers.map(modifier => ({ name: modifier.name })),
      toppings: recipeData.toppings.map(topping => ({ name: topping.name })),
      category: categoryInput?.trim() ? categoryInput : recipeData.category,
    }
    console.log({ modifiedData });

    addRecipeToDB(modifiedData);
  };

  return (
    <Form>
      <Form.Item label="Namn">
        <Input name='name' value={recipeData.name} onChange={handleInputChange} />
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
          placeholder="Välj kategori"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.value as string).toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {categories.map((category) => (
            <Select.Option value={category} key={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Lägg till ny kategori">
        <Input name='categoryInput' value={recipeData.categoryInput} onChange={handleInputChange} />
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
        <InputNumber value={recipeData.price} onChange={handlePriceChange} />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={handleAddRecipeClick}>Lägg till recept</Button>
      </Form.Item>
    </Form>
  );
};

export default AddRecipe;