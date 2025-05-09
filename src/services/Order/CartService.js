import axios from 'axios';
import { useState } from 'react';

export const updateCart = (cart, dish) => {
  return cart.includes(dish)
    ? cart.filter(item => item !== dish)
    : [...cart, dish];
};

export const useCartService = () => {
  const [cart, setCart] = useState([]);

  const handleCheckboxChange = (dish) => {
    setCart(prev => updateCart(prev, dish));
  };

  const getSelectedFood = () => cart;

  return { cart, handleCheckboxChange, getSelectedFood };
};

function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export async function saveCart({
  email,
  selectedPlan,
  selectedMeals,
  selectedFoodIds,
  paymentType,
  deliveryType,
}) {
  const mealTypes = Object.entries(selectedMeals)
    .filter(([_, selected]) => selected)
    .map(([mealType]) => mealType);

  const startDate = sessionStorage.getItem("subscriptionStartDate");
  const endDate = sessionStorage.getItem("subscriptionEndDate");
  const subscriptionDays = calculateDays(startDate, endDate);

  const cartData = {
    type: selectedPlan,
    start_date: startDate,
    end_date: endDate,
    subscription_days: subscriptionDays,
    meal_type: mealTypes,
    food_options_id: selectedFoodIds,
    payment_type: paymentType.toUpperCase(),
    delivery_type: deliveryType.toUpperCase(),
  };

  try {
    const res = await axios.get("http://localhost:5001/customers");
    const customers = res.data;
    const customer = customers.find((cust) => cust.email === email);

    if (customer) {
      await axios.patch(`http://localhost:5001/customers/${customer.id}`, {
        cart: cartData,
      });

      return { success: true, message: "Cart saved successfully!" };
    } else {
      return { success: false, message: "Customer not found!" };
    }
  } catch (err) {
    console.error("Error saving cart:", err);
    return { success: false, message: "An error occurred while saving cart." };
  }
}