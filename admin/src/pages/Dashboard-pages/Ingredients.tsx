import { IModifiersData, IToppingsData } from '../../hooks/fetchDashboardData'
import IngredientsTable from '../Dashboard-tables/IngredientsTables'
import { useState } from "react";

const Ingredients: React.FC<{ modifiers: IModifiersData[], toppings: IToppingsData[] }> = ({
  modifiers,
  toppings,
}) => {

  const [modifiersData, setModifiersData] = useState<IModifiersData[]>(modifiers);
  const [toppingsData, setToppingsData] = useState<IToppingsData[]>(toppings);
  const [inputValue, setInputValue] = useState<string>('');

  const handleUpdateValue = (value: string) => {
    setInputValue(value);
  }


  const handleDeleteModifier = async (record: IModifiersData) => {
    try {
      const response = await fetch(`/api/dashboard/modifiers/${record.name}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log("Modifier successfully deleted!");
        setModifiersData((prevModifiers) =>
          prevModifiers.filter((modifier) => modifier.name !== record.name));
      } else {
        console.log("Couldn't delete modifier");
      }
    } catch (error) {
      console.error("Couldn't delete ingredient", error);
    }
  }

  const handleUpdateModifier = async (record: IModifiersData) => {
    try {
      const updatedName = inputValue;

      record.name = updatedName;

      const response = await fetch(`/api/dashboard/modifiers/${record._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });

      if (response.ok) {
        const updatedModifier = await response.json();
        setModifiersData(prevModifiers =>
          prevModifiers.map(modifier =>
            modifier._id === updatedModifier._id ? updatedModifier : modifier
          )
        );
        // console.log("Modifier successfully updated!");
        // setModifiersData((prevModifiers) =>
        //   prevModifiers.filter((modifier) => modifier.name !== record.name));
      } else {
        console.log("Couldn't update modifier");
      }
    } catch (error) {
      console.error("Couldn't update modifier", error);
    }
  }

  const handleDeleteTopping = async (record: IToppingsData) => {
    try {
      const response = await fetch(`/api/dashboard/toppings/${record.name}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log("Topping successfully deleted!")
        setToppingsData((prevModifiers) =>
          prevModifiers.filter((topping) => topping.name !== record.name));
      } else {
        console.log("Couldn't delete topping");

      }
    } catch (error) {
      console.error("Couldn't delete ingredient", error);
    }
  }

  const handleUpdateTopping = async (record: IToppingsData) => {
    try {
      const updatedName = inputValue;

      record.name = updatedName;

      const response = await fetch(`/api/dashboard/toppings/${record._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });

      if (response.ok) {
        console.log("Topping successfully updated!");
        const updatedTopping = await response.json();
        setToppingsData(prevToppings =>
          prevToppings.map(topping =>
            topping._id === updatedTopping._id ? updatedTopping : topping
          )
        );
        // setModifiersData((prevModifiers) =>
        //   prevModifiers.filter((modifier) => modifier.name !== record.name));
      } else {
        console.log("Couldn't update topping");
      }
    } catch (error) {
      console.error("Couldn't update topping", error);
    }
  }

  return (
    <>
      <div>
        <h2>Ingredienser</h2>
        <IngredientsTable data={modifiersData} onDelete={handleDeleteModifier} onUpdate={handleUpdateModifier} onUpdateValue={handleUpdateValue} />
      </div>
      <div>
        <h2>Tillbehör</h2>
        <IngredientsTable data={toppingsData} onDelete={handleDeleteTopping} onUpdate={handleUpdateTopping} onUpdateValue={handleUpdateValue} />
      </div>
    </>
  )
}

export default Ingredients