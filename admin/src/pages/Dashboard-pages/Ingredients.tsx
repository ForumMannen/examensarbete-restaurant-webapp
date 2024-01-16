import { IModifiersData, IToppingsData } from '../../hooks/fetchDashboardData'
import IngredientsTable from '../Dashboard-tables/IngredientsTables'

const Ingredients: React.FC<{ modifiers: IModifiersData[], toppings: IToppingsData[] }> = ({ 
  modifiers,
  toppings,
}) => {

  const handleDeleteModifier = async (record: IModifiersData) => {
    try {
      const response = await fetch(`/api/dashboard/modifiers/${record._id}`, {
        method: 'DELETE'
      });

      if(response.ok){
        console.log("It worked!")
      } else {
        console.log("It didn't work!");
        
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
        console.log("It worked!")
      } else {
        console.log("It didn't work!");
        
      }
    } catch (error) {
      console.error("Couldn't delete ingredient", error);
    }
  }

  return (
    <>
      <div>
        <h2>Ingredienser</h2>
        <IngredientsTable data={modifiers} onDelete={handleDeleteModifier}/>
      </div>
      <div>
        <h2>Tillbehör</h2>
        <IngredientsTable data={toppings} onDelete={handleDeleteTopping}/>
      </div>
    </>
  )
}

export default Ingredients