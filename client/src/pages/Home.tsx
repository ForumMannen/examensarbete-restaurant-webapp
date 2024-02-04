import { useMenuData } from "../hooks/fetchMenuList";
import './Home.css';
import { IRecipesData } from "../hooks/fetchMenuList";
import { useCartContext } from '../context/CartContext';

const Home: React.FC = () => {
  const { menuData } = useMenuData();
  const { recipes } = menuData;

  const { addToCart } = useCartContext();

  const sortRecipesByCategory: Record<string, IRecipesData[]> = {};

  recipes.forEach(recipe => {
    if (!sortRecipesByCategory[recipe.category]) {
      sortRecipesByCategory[recipe.category] = [];
    }
    sortRecipesByCategory[recipe.category].push(recipe);
  });

  const handleAddToCart = (recipe: IRecipesData) => {
    const cartItem = {
      productName: recipe.name,
      quantity: 1,
      price: recipe.price,
      total: 1 * recipe.price,
    }
    addToCart(cartItem);
  }

  const categoryTables = Object.keys(sortRecipesByCategory).map((category: string) => (
    <div className="menus" key={category}>
      <h2>{category}</h2>
      <div className="table">
        {sortRecipesByCategory[category].map((recipe, index) => (
          <article className="product-card" key={index}>
            <div
              className="product-info"
              onClick={() => handleAddToCart(recipe)}>
              <p className="product-title">{recipe.name}</p>
              {/* <div className="product-modifiers">
                {recipe.modifiers.map((modifier, modifierIndex) => (
                  <p key={modifierIndex}>{modifier.name}</p>
                ))}
              </div> */}
              <p className="product-price">{recipe.price} kr</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  ));

  return <>{categoryTables}</>;
}

export default Home