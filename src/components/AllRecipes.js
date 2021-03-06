import React from "react";

import { db } from "../firebase.config";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import Recipecard from "./RecipeCard";

const AllRecipes = () => {
  const recipesFetchRef = collection(db, "recipes");
  const [recipes, setRecipes] = useState([]);
  const [searchBox, setSearchBox] = useState("");

  useEffect(() => {
    onSnapshot(recipesFetchRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
            //title: doc.data().title.toUpperCase()
          };
        })
      );
      //setRecipes(recipes);
      console.log(snapshot);
    });
  }, []);

  const search = (e) => {
    setSearchBox(e.target.value);
  };

  return (
    <div>
      <h4>Search for recipe</h4>

      <form className="container-search">
        <input
          type="text"
          name="search"
          placeholder="Search.."
          className="search"
          onChange={search}
        />
      </form>
      <div className="cardGrid">
        {recipes &&
          recipes
            .filter((recipe) => {
              if (
                recipe.name
                  .toLowerCase()
                  .includes(searchBox.toLowerCase().trim()) ||
                recipe.author
                  .toLowerCase()
                  .includes(searchBox.toLowerCase().trim())
              ) {
                return recipe;
              }
            })
            .map((recipe) => {
              return <Recipecard key={recipe.id} recipe={recipe} />;
            })}
      </div>
    </div>
  );
};

export default AllRecipes;
