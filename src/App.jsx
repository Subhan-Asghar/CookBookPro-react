import { useState } from "react";
import Card from "./Card";

function App() {
  const [recipe, setRecipe] = useState("");
  const [recipeing, setRecipeing] = useState([]);

  async function api(recipe) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipe}`);
      const data = await response.json();


      if (data.meals) {
        const mealsArray = data.meals.map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal
        }));
          
        setRecipeing(mealsArray);
      } else {
        try{
        const response_name = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
        const data_name = await response_name.json();
        console.log(data_name)
        if(data_name.meals!=null){
          setRecipeing(data_name.meals)
        }
        else{
          alert("Please provide a valid input :)");

        }
        }
        catch (err) {
          alert("Please provide a valid input :)");
          console.log("API fetch error:", err);
        }
      }
    } catch (err) {
      alert("Please provide a valid input :)");
      console.log("API fetch error:", err);
    }
  }

  return (
    <>
      <div className="flex flex-row justify-center bg-orange-600 p-6 shadow-lg">
        <h3 className="text-4xl text-white font-bold">Recipe App</h3>
      </div>
      <div className="flex flex-row justify-center items-center h-16 bg-orange-500 p-4 shadow-md">
        <input
          className="px-4 h-12 w-80 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          placeholder="Search Recipe"
          onChange={(e) => setRecipe(e.target.value)}
        />
        <button
          className="bg-green-600 text-white rounded-r-lg font-semibold h-12 w-24  hover:bg-green-700 focus:outline-none "
          onClick={() => api(recipe)}
        >
          Search
        </button>
      </div>{recipeing&&(<div className="flex flex-wrap justify-center p-4">
        {recipeing.map((rec) => (
          <div key={rec.id} className="m-4">
            <Card recipe={rec} />
          </div>
        ))}
      </div>)}
      
    </>
  );
}

export default App;
