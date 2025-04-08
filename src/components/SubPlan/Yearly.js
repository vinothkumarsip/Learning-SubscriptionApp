import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Yearly() {
  const [months, setMonths] = useState(12);
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const navigate = useNavigate();

  const handleMealChange = (e) => {
    setMeals({ ...meals, [e.target.name]: e.target.checked });
  };

  const handleMonthsChange = (e) => {
    const value = Math.max(12, parseInt(e.target.value) || 0);
    setMonths(value);
  };

  const handleSubmit = () => {
    console.log("Yearly Plan → Months:", months, "Meals:", meals);
    navigate(""); 
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Title className="text-center mb-4">Yearly Plan Subscription</Card.Title>
        <Card.Text>
          Get the best value for long-term subscriptions. Minimum subscription period is 12 months.
        </Card.Text>

        <Form.Group className="mb-3" controlId="monthsInput">
          <Form.Label><strong>How many months are you subscribing for?</strong></Form.Label>
          <Form.Control
            type="number"
            min={12}
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
            onClick={handleSubmit}
            disabled={!meals.breakfast && !meals.lunch && !meals.dinner}
          >
            Order Now
          </Button>
        </div>
      </Card>
    </Container>
  );
}
