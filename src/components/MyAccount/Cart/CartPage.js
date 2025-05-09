import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Modal, Spinner, Alert } from "react-bootstrap";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [foodOptions, setFoodOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const customerResponse = await fetch("http://localhost:5001/customers/1");
        if (!customerResponse.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const customerData = await customerResponse.json();

        const foodResponse = await fetch("http://localhost:5001/food_options");
        if (!foodResponse.ok) {
          throw new Error("Failed to fetch food options");
        }
        const foodData = await foodResponse.json();

        setCart(customerData.cart);
        setFoodOptions(foodData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleConfirmOrder = async () => {
    try {
      const customerResponse = await fetch("http://localhost:5001/customers/1");
      const customerData = await customerResponse.json();

      const updatedSubscriptions = [...customerData.subscription, cart];

      await fetch(`http://localhost:5001/customers/1`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription: updatedSubscriptions }),
      });

      alert("Order confirmed and subscription saved!");
      setShowModal(false);
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("Failed to confirm order. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading cart details...</p>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (!cart || cart.food_options_id.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h3>Your cart is empty!</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>

      <Row xs={1} sm={1} md={2} lg={2} className="g-4">
        {cart.food_options_id.map((foodId) => {
          const food = foodOptions.find((item) => item.id === foodId);
          return (
            <Col key={foodId} className="d-flex align-items-stretch">
              <Card className="shadow-sm p-3 h-100 d-flex flex-column">
                <Card.Header className="text-center">
                  <Card.Title className="mb-0">{food?.dish_name || "Unknown Dish"}</Card.Title>
                </Card.Header>

                <Card.Body className="d-flex flex-column justify-content-between">
                  <Row className="h-100">
                    <Col xs={12} md={7} className="d-flex flex-column justify-content-center">
                      <Card.Text>
                        <strong>Ingredients:</strong> {food?.ingredients || "N/A"}
                      </Card.Text>
                      <Card.Text>
                        <strong>Type:</strong> {food?.veg_nonveg || "N/A"}
                      </Card.Text>
                      <Card.Text>
                        <strong>Sugar Free:</strong> {food?.sugar_free || "N/A"}
                      </Card.Text>
                      <Card.Text>
                        <strong>Price:</strong> {food?.price || "N/A"}
                      </Card.Text>
                    </Col>

                    <Col
                      xs={12}
                      md={5}
                      className="d-flex align-items-center justify-content-center"
                      style={{ minHeight: "140px" }}
                    >
                      <img
                        src={food?.image || "https://via.placeholder.com/150"}
                        alt={food?.dish_name || "Unknown Dish"}
                        className="img-fluid"
                        style={{
                          height: "8rem",
                          width: "8rem",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div className="text-center mt-4">
        <Button variant="success" onClick={() => setShowModal(true)}>
          Proceed to Buy
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to confirm this order?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}