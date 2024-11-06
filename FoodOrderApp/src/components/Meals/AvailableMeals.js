import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, SetMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  let MEALS = [];
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const requestData = await fetch(
        "https://react-http-7d4bc-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await requestData.json();
      for (const key in responseData) {
        MEALS.push({
          id: key,
          description: responseData[key].description,
          name: responseData[key].name,
          price: responseData[key].price,
        });
      }
      SetMeals(MEALS);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    setIsLoading(false);
  }, []);

  // const mealsList = DUMMY_MEALS.map((meals) =><li>{meals.name}</li>);
  // console.log(mealsList);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading......</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meals) => (
            <MealItem
              id={meals.id}
              key={meals.id}
              name={meals.name}
              description={meals.description}
              price={meals.price}
            ></MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
