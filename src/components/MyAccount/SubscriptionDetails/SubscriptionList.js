import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SubscriptionListPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
          alert("No logged-in user found. Please log in.");
          navigate("/login"); 
          return;
        }

        const res = await axios.get("http://localhost:5001/customers");
        const customer = res.data.find((c) => c.id === loggedInUser.id); 

        if (customer && customer.subscription) {
          const userSubscriptions = customer.subscription.map((sub, index) => ({
            id: `${customer.id}-${index + 1}`,
            email: customer.email,
            ...sub,
          }));

          setSubscriptions(userSubscriptions); 
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [navigate]);

  const handleUpcoming = (subscriptionId) => {
    navigate(`/subscription/${subscriptionId}/upcoming`);
  };

  const handleViewFull = (subscriptionId) => {
    navigate(`/subscription/${subscriptionId}/details`);
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">My Subscriptions</h3>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Subscription ID</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Upcoming</th>
              <th>View Full</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td className="text-capitalize">{sub.type}</td>
                <td>{sub.start_date}</td>
                <td>{sub.end_date}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleUpcoming(sub.id)}
                  >
                    View Upcoming
                  </Button>
                </td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewFull(sub.id)}
                  >
                    View Full
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}