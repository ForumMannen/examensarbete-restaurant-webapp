import React, { useEffect } from 'react';
import { IRecipesData } from '../../hooks/fetchDashboardData';
import CategoryTable from '../Dashboard-tables/CategoryTable';
import AddRecipe from '../../components/AddRecipe';
// import { useDashboardData } from '../../hooks/fetchDashboardData';

interface RecipesPageProps {
  recipes: IRecipesData[];
}

// const convertData = (recipes: IRecipesData[]): IRecipesData[] => {
//   return recipes.map((recipe) => ({
//     ...recipe,
//     key: recipe._id,
//   }));
// };

// const RecipesPage: React.FC = () => {
//   const { dashboardData } = useDashboardData();
//   const { recipes } = dashboardData;

//   useEffect(() => {
//   }, [recipes])
  
//   const categories = Array.from(new Set(recipes.map((recipe) => recipe.category)));

//   return (
//     <>
//       <AddRecipe />
//       {recipes.length > 0 ? (
//         categories.map((category) => (
//         <div key={category}>
//           <h2>{category}</h2>
//           <CategoryTable recipes={recipes.filter((recipe) => recipe.category === category)} />
//         </div>
//       ))
//     ) : (
//       <p>Loading...</p>
//     )}
//     </>
//   )
// }
const RecipesPage: React.FC<RecipesPageProps> = ({ recipes }) => {
  useEffect(() => {
  }, [recipes])
  
  const categories = Array.from(new Set(recipes.map((recipe) => recipe.category)));

  return (
    <>
      <AddRecipe categories={categories} />
      {recipes.length > 0 ? (
        categories.map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <CategoryTable />
        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
    </>
  )
}
export default RecipesPage