import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

function generateShuffledMealPlan(foodIds, mealTypes, startDate, numberOfDays) {
  const shuffled = [...foodIds];
  const dailyMealPlan = [];

  const start = new Date(startDate);

  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + i);
    const formattedDate = currentDate.toISOString().split("T")[0];

    const dayPlan = {};
    mealTypes.forEach((mealType) => {
      if (shuffled.length === 0) {
        shuffled.push(...foodIds);
      }

      const randomIndex = Math.floor(Math.random() * shuffled.length);
      dayPlan[mealType] = shuffled[randomIndex];
      shuffled.splice(randomIndex, 1);
    });

    dailyMealPlan.push({
      day: formattedDate,
      ...dayPlan,
    });
  }

  return dailyMealPlan;
}

function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export async function confirmOrder({
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

  const dailyMealPlan = generateShuffledMealPlan(selectedFoodIds, mealTypes, startDate, subscriptionDays);

  const subscriptionData = {
    id: uuidv4(),
    type: selectedPlan,
    start_date: startDate,
    end_date: endDate,
    subscription_days: subscriptionDays,
    meal_type: mealTypes,
    food_options_id: selectedFoodIds,
    payment_type: paymentType.toUpperCase(),
    delivery_type: deliveryType.toUpperCase(),
    daily_meal_plan: dailyMealPlan,
  };

  try {
    const res = await axios.get("http://localhost:5001/customers");
    const customers = res.data;
    const customer = customers.find((cust) => cust.email === email);

    if (customer) {
      const updatedCustomer = { ...customer };

      if (!updatedCustomer.subscription) {
        updatedCustomer.subscription = [];
      }

      updatedCustomer.subscription.push(subscriptionData);

      await axios.patch(`http://localhost:5001/customers/${updatedCustomer.id}`, {
        subscription: updatedCustomer.subscription,
        cart: null, 
      });

      return { success: true, message: "Order confirmed and subscription saved!" };
    } else {
      return { success: false, message: "Customer not found!" };
    }
  } catch (err) {
    console.error("Error confirming order:", err);
    return { success: false, message: "An error occurred while confirming order." };
  }
}