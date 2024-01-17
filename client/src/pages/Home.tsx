import { useMenuData } from "../hooks/fetchMenuList";
import './Home.css';
import { IRecipesData } from "../hooks/fetchMenuList";

const Home: React.FC = () => {
  const { menuData } = useMenuData();
  const { recipes } = menuData;
  console.log(recipes);

  const sortRecipesByCategory: Record<string, IRecipesData[]> = {};

  recipes.forEach(recipe => {
    if (!sortRecipesByCategory[recipe.category]) {
      sortRecipesByCategory[recipe.category] = [];
    }
    sortRecipesByCategory[recipe.category].push(recipe);
  });
  
  // Iterate through categories and create tables
  const categoryTables = Object.keys(sortRecipesByCategory).map((category: string) => (
    <div key={category}>
      <h2>{category}</h2>
      <div className="table">
        {sortRecipesByCategory[category].map((recipe, index) => (
          <article className="product-card" key={index}>
            <a href="/product-page" className="product-info">
              <p className="product-title">{recipe.name}</p>
              <div className="product-modifiers">
                {recipe.modifiers.map((modifier, modifierIndex) => (
                  <p key={modifierIndex}>{modifier.name}</p>
                ))}
              </div>
              <p className="product-price">{recipe.price} kr</p>
            </a>
          </article>
        ))}
      </div>
    </div>
  ));

  return <>{categoryTables}</>;
}

export default Home