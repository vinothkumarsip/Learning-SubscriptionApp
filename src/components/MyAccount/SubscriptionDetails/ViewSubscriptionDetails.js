import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


function SubscriptionDetails() {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [foodMap, setFoodMap] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [customerRes, foodRes] = await Promise.all([
          axios.get("http://localhost:5001/customers"),
          axios.get("http://localhost:5001/food_options"),
        ]);

        const map = {};
        foodRes.data.forEach(food => {
          map[food.id] = food.dish_name;
        });
        setFoodMap(map);

        for (const customer of customerRes.data) {
          const match = customer.subscription?.find(sub => sub.id === id);
          if (match) {
            setSubscription(match);
            break;
          }
        }
      } catch (error) {
        console.error("Error loading subscription details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!subscription) {
    return <Container className="mt-4">Subscription not found.</Container>;
  }

  return (
    <Container className="mt-5">
      <h4>Subscription Details</h4>
      <p><strong>Type:</strong> {subscription.type.toUpperCase()}</p>
      <p><strong>Start:</strong> {subscription.start_date}</p>
      <p><strong>End:</strong> {subscription.end_date}</p>
      <p><strong>Payment:</strong> {subscription.payment_type}</p>
      <p><strong>Delivery:</strong> {subscription.delivery_type}</p>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>DATE</th>
            {subscription.meal_type.map(meal => (
              <th key={meal}>{meal.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subscription.daily_meal_plan.map((day, idx) => (
            <tr key={idx}>
              <td>{day.day}</td>
              {subscription.meal_type.map(meal => (
                <td key={meal}>
                  {foodMap[day[meal]] || day[meal]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="danger"
        className="mt-3"
        onClick={async () => {
          const confirmed = window.confirm("Are you sure you want to cancel this subscription?");
          if (!confirmed) return;

          try {
            const res = await axios.get("http://localhost:5001/customers");
            const customers = res.data;

            for (const customer of customers) {
              const subIndex = customer.subscription?.findIndex(sub => sub.id === id);
              if (subIndex !== -1) {
                const updatedSubs = [...customer.subscription];
                updatedSubs.splice(subIndex, 1); 

                await axios.patch(`http://localhost:5001/customers/${customer.id}`, {
                  subscription: updatedSubs
                });

                alert("Subscription cancelled.");
                navigate("/myaccount/mysubscription");
                return;
              }
            }

            alert("Subscription not found.");
          } catch (err) {
            console.error("Error cancelling subscription:", err);
            alert("An error occurred while cancelling the subscription.");
          }
        }}
        >
        Cancel Subscription
      </Button>
    </Container>
  );
}

export default SubscriptionDetails;