import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpcomingMeals() {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [foodMap, setFoodMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editDay, setEditDay] = useState('');
  const [editMeals, setEditMeals] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, foodRes] = await Promise.all([
          axios.get('http://localhost:5001/customers'),
          axios.get('http://localhost:5001/food_options'),
        ]);

        const map = {};
        if (Array.isArray(foodRes.data)) {
          foodRes.data.forEach(food => {
            if (food.id && food.dish_name) {
              map[food.id] = food.dish_name;
            }
          });
        }
        setFoodMap(map);

        for (const customer of customerRes.data) {
          const sub = customer.subscription?.find(s => s.id === id);
          if (sub) {
            setSubscription(sub);
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const today = new Date().toISOString().split('T')[0]; 
  const next3Days = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const upcomingMeals = subscription?.daily_meal_plan?.filter(plan =>
    next3Days.includes(plan.day)
  ) || [];

  const handleEdit = (day, currentMeals) => {
    setEditDay(day);
    setEditMeals(currentMeals);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.get("http://localhost:5001/customers");
      const customer = res.data.find(customer =>
      customer.subscription?.some(subscription => subscription.id === id)
    );

      if (!customer) return;

      const updatedSubscriptions = customer.subscription.map(sub => {
        if (sub.id === id) {
          const updatedPlan = sub.daily_meal_plan.map(dayMeal =>
            dayMeal.day === editDay ? { ...dayMeal, ...editMeals } : dayMeal
          );
          return { ...sub, daily_meal_plan: updatedPlan };
        }
        return sub;
      });

      await axios.put(`http://localhost:5001/customers/${customer.id}`, {
        ...customer,
        subscription: updatedSubscriptions,
      });

      setSubscription(prev => ({
        ...prev,
        daily_meal_plan: prev.daily_meal_plan.map(dayMeal =>
          dayMeal.day === editDay ? { ...dayMeal, ...editMeals } : dayMeal
        ),
      }));

      setShowModal(false);
    } catch (err) {
      console.error("Error saving edits:", err);
    }
  };

  const handleCancelDay = async (day) => {
    if (!window.confirm(`Are you sure you want to cancel meals for ${day}?`)) return;

    try {
      const res = await axios.get("http://localhost:5001/customers");
      const customer = res.data.find(customer =>
      customer.subscription?.some(subscription => subscription.id === id)
    );

      if (!customer) return;

      const updatedSubscriptions = customer.subscription.map(sub => {
        if (sub.id === id) {
          const updatedPlan = sub.daily_meal_plan.filter(dayMeal => dayMeal.day !== day);
          return { ...sub, daily_meal_plan: updatedPlan };
        }
        return sub;
      });

      await axios.put(`http://localhost:5001/customers/${customer.id}`, {
        ...customer,
        subscription: updatedSubscriptions,
      });

      setSubscription(prev => ({
        ...prev,
        daily_meal_plan: prev.daily_meal_plan.filter(dayMeal => dayMeal.day !== day),
      }));
    } catch (err) {
      console.error("Error cancelling day:", err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!subscription) {
    return (
      <Container className="mt-5 text-center">
        <p>Subscription not found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Upcoming Meals</h2>
      <p><strong>Type:</strong> {subscription.type?.toUpperCase()}</p>
      <p><strong>Start Date:</strong> {subscription.start_date}</p>
      <p><strong>End Date:</strong> {subscription.end_date}</p>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            {subscription.meal_type?.map(meal => (
              <th key={meal}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {upcomingMeals.map(meal => (
            <tr key={meal.day}>
              <td>{meal.day}</td>
              {subscription.meal_type?.map(type => (
                <td key={type}>
                  {foodMap[meal[type]] || meal[type]}
                </td>
              ))}
              <td>
                {meal.day !== today && ( 
                  <>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(meal.day, meal)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancelDay(meal.day)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meals for {editDay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subscription.meal_type?.map(type => (
            <Form.Group className="mb-3" key={type}>
              <Form.Label>{type.charAt(0).toUpperCase() + type.slice(1)}</Form.Label>
              <Form.Select
                value={editMeals[type] || ''}
                onChange={e => setEditMeals(prev => ({ ...prev, [type]: e.target.value }))}
              >
                <option value="">-- Select --</option>
                {(subscription.selected_food_ids?.length > 0
                  ? subscription.selected_food_ids
                  : Object.keys(foodMap)
                ).map(id => (
                  <option key={id} value={id}>
                    {foodMap[id]}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UpcomingMeals;