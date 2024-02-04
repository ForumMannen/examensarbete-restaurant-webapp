import React, { useEffect, useState } from 'react';
import { IRecipesData, useDashboardData } from '../../hooks/fetchDashboardData';
import CategoryTable from '../Dashboard-tables/CategoryTable';
import AddRecipe from '../../components/AddRecipe';

interface RecipesPageProps {
  recipes: IRecipesData[];
}

const RecipesPage: React.FC<RecipesPageProps> = ({ recipes }) => {
  const [sortedCategories, setSortedCategories] = useState<string[]>([]);
  const { dashboardData } = useDashboardData();
  const categories = dashboardData.categories;

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(recipes.map((recipe) => recipe.category)));
    setSortedCategories(uniqueCategories);
  }, [recipes]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId);

    if (!category) {
      console.log("Category not found");
      return 'Unknown Category';
    }
    return category.name;
  }

  const getRecipesByCategory = (categoryId: string) => {
    return recipes.filter((recipe) => recipe.category === categoryId);

  };

  return (
    <>
      <AddRecipe categories={sortedCategories} />
      {recipes.length > 0 ? (
        sortedCategories.map((category) => {
          return (
            <div key={category}>
              <h2>{getCategoryName(category)}</h2>
              <CategoryTable recipes={getRecipesByCategory(category)} />
            </div>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
export default RecipesPage