import React, { useState, useEffect } from 'react';
import Popup from './Popup';

const Card = ({ recipe }) => {
  const [recipeing, setRecipeing] = useState([]);
  const [PopupOpen, setPopupOpen] = useState(false);
  const [selectedInstructions, setSelectedInstructions] = useState("");
  const [ytvideo,setytvideo] = useState("");
  

  useEffect(() => {
    async function api() {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe.name}`);
        const data = await response.json();

        if (data.meals) {
          const mealsArray = data.meals.map((meal, index) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            instructions: meal.strInstructions,
            youtube: meal.strYoutube,
            img: meal.strMealThumb
          }));

          setRecipeing(mealsArray);
        } else {
            const response_name = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe.strMeal}`);
            const data_name = await response_name.json();
            const mealsArray = data_name.meals.map((meal) => ({
                id: meal.idMeal,
                name: meal.strMeal,
                instructions: meal.strInstructions,
                youtube: meal.strYoutube,
                img: meal.strMealThumb
            }));
            setRecipeing(mealsArray);
        }
      } catch (err) {
        console.error("API fetch error:", err);
      }
    }

    api();
  }, [recipe.name]);

  const handleShowMore = (instructions,video) => {
    setSelectedInstructions(instructions);
    setytvideo(video)
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedInstructions("");
  };


  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {recipeing.map((rec) => (
        <div key={rec.id} className="bg-white p-4 rounded-lg shadow-lg w-80 flex flex-col">
          <img 
            src={rec.img } 
            alt={rec.name} 
            className="w-full h-48 object-cover rounded-t-lg mb-4" 
          />
          <div className="flex flex-col flex-grow p-2">
            <h4 className="text-xl font-semibold mb-2 truncate">{rec.name}</h4>
            <p className="text-gray-600 text-sm mb-4 truncate">{rec.instructions}</p>
            <div className="flex-grow">
              <button
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
                onClick={() => {handleShowMore(rec.instructions,rec.youtube)} } 
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      ))}
      <Popup 
        isOpen={PopupOpen} 
        onClose={handleClosePopup} 
        instructions={selectedInstructions} 
        youtube={ytvideo}
      />
    </div>
  );
};

export default Card;
