import React, { useEffect, useState } from 'react';
import { IRecipesData } from '../../hooks/fetchDashboardData';
import CategoryTable from '../Dashboard-tables/CategoryTable';
import AddRecipe from '../../components/AddRecipe';

interface RecipesPageProps {
  recipes: IRecipesData[];
}

const RecipesPage: React.FC<RecipesPageProps> = ({ recipes }) => {
  const [categories, setCategories] = useState<string[]>([]);

  // const categories = Array.from(new Set(recipes.map((recipe) => recipe.category)));

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(recipes.map((recipe) => recipe.category)));
    setCategories(uniqueCategories);
  }, [recipes]);

  const getRecipesByCategory = (category: string) => {
    return recipes.filter((recipe) => recipe.category === category);
  };

  return (
    <>
      <AddRecipe categories={categories} />
      {recipes.length > 0 ? (
        categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <CategoryTable recipes={getRecipesByCategory(category)} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
export default RecipesPage