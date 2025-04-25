import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../Order/PlanContext";

export default function Monthly() {
  const [months, setMonths] = useState(1);
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const { setSelectedPlan } = usePlan();
  const navigate = useNavigate();

  const handleMealChange = (e) => {
    setMeals({ ...meals, [e.target.name]: e.target.checked });
  };

  const handleMonthsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 0);
    setMonths(value);
  };

  const handleSelectPlan = () => {
    setSelectedPlan("monthly"); 
    sessionStorage.setItem("selectedMeals", JSON.stringify(meals));
    sessionStorage.setItem("monthlyPlanMonths", months);
    navigate("/order"); 
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Title className="text-center mb-4">Monthly Plan Subscription</Card.Title>
        <Card.Text>
          This plan is ideal for long-term meal bookings. A minimum of 1 month is required.
        </Card.Text>

        <Form.Group className="mb-3" controlId="daysInput">
          <Form.Label><strong>How many months are you subscribing for?</strong></Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={months}
            onChange={handleMonthsChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><strong>Select Meal Frequency:</strong></Form.Label>
          <Form.Check
            type="checkbox"
            label="Breakfast"
            name="breakfast"
            checked={meals.breakfast}
            onChange={handleMealChange}
          />
          <Form.Check
            type="checkbox"
            label="Lunch"
            name="lunch"
            checked={meals.lunch}
            onChange={handleMealChange}
          />
          <Form.Check
            type="checkbox"
            label="Dinner"
            name="dinner"
            checked={meals.dinner}
            onChange={handleMealChange}
          />
        </Form.Group>

        <div className="text-center">
          <Button
            variant="primary"
            onClick={handleSelectPlan}
            disabled={!meals.breakfast && !meals.lunch && !meals.dinner}
          >
            Order Now
          </Button>
        </div>
      </Card>
    </Container>
  );
}
