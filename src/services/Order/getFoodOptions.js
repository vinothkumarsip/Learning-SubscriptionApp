import { useState, useEffect } from 'react';

export const getFoodOptions = async () => {
  try {
    const response = await fetch('http://localhost:5001/food_options');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch food options');
  }
};

export const useFoodOptionsService = () => {
  const [foodOptions, setFoodOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodOptions = async () => {
      try {
        const data = await getFoodOptions();
        setFoodOptions(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching food options:", error);
      }
    };
    fetchFoodOptions();
  }, []);

  return { foodOptions, error };
};