import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../Order/PlanContext";

export default function Yearly() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(formatDate(tomorrow));
  const [endDate, setEndDate] = useState("");
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const { setSelectedPlan } = usePlan();
  const navigate = useNavigate();

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 364); 
    setEndDate(formatDate(end));
  }, [startDate]);

  const handleMealChange = (e) => {
    setMeals({ ...meals, [e.target.name]: e.target.checked });
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleSelectPlan = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays < 365) {
      alert("Yearly plan requires at least 1 year (365 days).");
      return;
    }

    setSelectedPlan("yearly");
    sessionStorage.setItem("selectedMeals", JSON.stringify(meals));
    sessionStorage.setItem("subscriptionStartDate", startDate);
    sessionStorage.setItem("subscriptionEndDate", endDate);
    sessionStorage.setItem("subscriptionDays", diffDays);
    navigate("/order");
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Title className="text-center mb-4">Yearly Plan Subscription</Card.Title>
        <Card.Text>
          Get the best value for long-term subscriptions. Minimum subscription period is 12 months / 1 year.
        </Card.Text>

        <Form.Group className="mb-3">
          <Form.Label><strong>Start Date</strong></Form.Label>
          <Form.Control
            type="date"
            min={formatDate(tomorrow)}
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><strong>End Date (auto-calculated)</strong></Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            disabled
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