import { IModifiersData, IToppingsData } from '../../hooks/fetchDashboardData'
import IngredientsTable from '../Dashboard-tables/IngredientsTables'
import { useState } from "react";

const Ingredients: React.FC<{ modifiers: IModifiersData[], toppings: IToppingsData[] }> = ({ 
  modifiers,
  toppings,
}) => {

const [modifiersData, setModifiersData] = useState<IModifiersData[]>(modifiers);
const [toppingsData, setToppingsData] = useState<IToppingsData[]>(toppings);

  const handleDeleteModifier = async (record: IModifiersData) => {
    try {
      const response = await fetch(`/api/dashboard/modifiers/${record._id}`, {
        method: 'DELETE'
      });

      if(response.ok){
        console.log("Modifier successfully deleted!");
        setModifiersData((prevModifiers) => 
        prevModifiers.filter((modifier) => modifier._id !== record._id));
      } else {
        console.log("Couldn't delete modifier");
      }
    } catch (error) {
      console.error("Couldn't delete ingredient", error);
    }
  }

  const handleDeleteTopping = async (record: IToppingsData) => {
    try {
      const response = await fetch(`/api/dashboard/toppings/${record._id}`, {
        method: 'DELETE'
      });

      if(response.ok){
        console.log("Topping successfully deleted!")
        setToppingsData((prevModifiers) => 
        prevModifiers.filter((topping) => topping._id !== record._id));
      } else {
        console.log("Couldn't delete topping");
        
      }
    } catch (error) {
      console.error("Couldn't delete ingredient", error);
    }
  }

  return (
    <>
      <div>
        <h2>Ingredienser</h2>
        <IngredientsTable data={modifiersData} onDelete={handleDeleteModifier}/>
      </div>
      <div>
        <h2>Tillbehör</h2>
        <IngredientsTable data={toppingsData} onDelete={handleDeleteTopping}/>
      </div>
    </>
  )
}

export default Ingredients