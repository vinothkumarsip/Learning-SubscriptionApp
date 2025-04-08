import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Monthly() {
  const [days, setDays] = useState(15);
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const navigate = useNavigate();

  const handleMealChange = (e) => {
    setMeals({ ...meals, [e.target.name]: e.target.checked });
  };

  const handleDaysChange = (e) => {
    const value = Math.max(15, parseInt(e.target.value) || 0);
    setDays(value);
  };

  const handleSubmit = () => {
    console.log("Monthly Plan → Days:", days, "Meals:", meals);
    navigate(""); 
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Title className="text-center mb-4">Monthly Plan Subscription</Card.Title>
        <Card.Text>
          This plan is ideal for long-term meal bookings. A minimum of 15 days is required.
        </Card.Text>

        <Form.Group className="mb-3" controlId="daysInput">
          <Form.Label><strong>How many days are you subscribing for?</strong></Form.Label>
          <Form.Control
            type="number"
            min={15}
            value={days}
            onChange={handleDaysChange}
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
