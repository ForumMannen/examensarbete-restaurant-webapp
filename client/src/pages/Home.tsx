import { useMenuData } from "../hooks/fetchMenuList";
import './Home.css';

const Home: React.FC = () => {
  const { menuData } = useMenuData();
  const { recipes } = menuData;
  console.log(recipes);
  
  
  return (
    <>
      <div className="table">
        {recipes.map((recipe) => (
          <article className="product-card" key={recipe._id}>
            <div className="product-info">
              <p className="product-title">{recipe.name}</p>
              <p className="product-ingredients">{recipe.category}</p>
              <p className="product-price">{recipe.price} kr</p>
              <button className="add-to-cart">Lägg i varukorg</button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default Home