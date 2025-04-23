import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../Order/PlanContext";

export default function Yearly() {
  const [years, setYears] = useState(1);
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

  const handleYearsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 0);
    setYears(value);
  };

  const handleSelectPlan = () => {
    setSelectedPlan("yearly"); 
    sessionStorage.setItem("selectedMeals", JSON.stringify(meals));
    sessionStorage.setItem("yearlyPlanYears", years);
    navigate("/order"); 
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Title className="text-center mb-4">Yearly Plan Subscription</Card.Title>
        <Card.Text>
          Get the best value for long-term subscriptions. Minimum subscription period is 12 months/1 year.
        </Card.Text>

        <Form.Group className="mb-3" controlId="monthsInput">
          <Form.Label><strong>How many years are you subscribing for?</strong></Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={years}
            onChange={handleYearsChange}
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
