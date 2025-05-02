import { Container, Card, Button, Row, Col, Form, Accordion, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOrderPage } from "../../services/Order/useOrderPage";
import { confirmOrder } from "../../services/Order/OrderService";
import { saveCart } from "../../services/Order/CartService";

export default function OrderPage() {
  const {
    cart,
    handleCheckboxChange,
    getSelectedFood,
    tempFilters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    filteredFood,
    selectedPlan,
    showModal,
    setShowModal,
    paymentType,
    setPaymentType,
    deliveryType,
    setDeliveryType,
  } = useOrderPage();

  const navigate = useNavigate();

  const startDate = sessionStorage.getItem("subscriptionStartDate");
  const endDate = sessionStorage.getItem("subscriptionEndDate");

  const handleSaveCart = async () => {
   
    const email = sessionStorage.getItem("userEmail");
    const selectedFoodIds = getSelectedFood().map((food) => food.id);
    const selectedMeals = JSON.parse(sessionStorage.getItem("selectedMeals")) || {
      breakfast: false,
      lunch: false,
      dinner: false,
    };
  
    const result = await saveCart({
      email,
      selectedPlan,
      selectedMeals,
      selectedFoodIds,
      paymentType,
      deliveryType,
    });
  
    alert(result.message);
    if (result.success) {
      setShowModal(true);
    }
  };  

  const handleConfirmOrder = async () => {
    const startDate = sessionStorage.getItem("subscriptionStartDate");
    const endDate = sessionStorage.getItem("subscriptionEndDate");
  
    if (!startDate || !endDate) {
      alert("Please select valid subscription start and end dates.");
      return;
    }
  
    const email = sessionStorage.getItem("userEmail");
    const selectedFoodIds = getSelectedFood().map((food) => food.id);
    const selectedMeals = JSON.parse(sessionStorage.getItem("selectedMeals")) || {
      breakfast: false,
      lunch: false,
      dinner: false,
    };
  
    const result = await confirmOrder({
      email,
      selectedPlan,
      selectedMeals,
      selectedFoodIds,
      paymentType,
      deliveryType,
    });
  
    alert(result.message);
    if (result.success) {
      setShowModal(false);
      
      sessionStorage.removeItem("selectedMeals");
      sessionStorage.removeItem("subscriptionStartDate");
      sessionStorage.removeItem("subscriptionEndDate");
  
      navigate("/myaccount/mysubscription", { replace: true });
    }
  };  

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Choose Your Food</h2>

      <Row className="mb-4 gx-4">
        <Col md={4}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter</Accordion.Header>
              <Accordion.Body>
                <Form.Label className="fw-bold small">Sugar Free</Form.Label>
                {["All", "Yes", "No"].map((option) => (
                  <Form.Check
                    type="radio"
                    name="sugarFree"
                    value={option}
                    label={option}
                    key={option}
                    checked={tempFilters.sugarFree === option}
                    onChange={(e) => handleFilterChange("sugarFree", e.target.value)}
                    className="small mb-1"
                  />
                ))}
                <hr />
                <Form.Label className="fw-bold small">Type</Form.Label>
                {["All", "veg", "nonveg"].map((option) => (
                  <Form.Check
                    type="radio"
                    name="type"
                    value={option}
                    label={option.charAt(0).toUpperCase() + option.slice(1)}
                    key={option}
                    checked={tempFilters.type === option}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    className="small mb-1"
                  />
                ))}

                <div className="mt-3 d-flex gap-2">
                  <Button size="sm" variant="primary" onClick={applyFilters}>
                    Apply
                  </Button>
                  <Button size="sm" variant="outline-secondary" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={4}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Payment Method</Accordion.Header>
              <Accordion.Body>
                <Form.Check
                  type="radio"
                  name="paymentType"
                  value="cod"
                  label="Cash on Delivery"
                  checked={paymentType === "cod"}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="small mb-2"
                />
                <Form.Check
                  type="radio"
                  name="paymentType"
                  value="online"
                  label="Online Payment"
                  checked={paymentType === "online"}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="small"
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={4}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Delivery</Accordion.Header>
              <Accordion.Body>
                <Form.Check
                  type="radio"
                  name="deliveryType"
                  value="home"
                  label="Home Delivery"
                  checked={deliveryType === "home"}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="small mb-2"
                />
                <Form.Check
                  type="radio"
                  name="deliveryType"
                  value="pickup"
                  label="Pickup from Store"
                  checked={deliveryType === "pickup"}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="small"
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row xs={1} sm={1} md={2} lg={2} className="g-4">
        {filteredFood.map((food) => (
          <Col key={food.id} className="d-flex align-items-stretch">
            <Card className="shadow-sm p-3 h-100 d-flex flex-column">
              <Card.Header className="text-center">
                <Card.Title className="mb-0">{food.dish_name}</Card.Title>
              </Card.Header>

              <Card.Body className="d-flex flex-column justify-content-between">
                <Row className="h-100">
                  <Col xs={12} md={7} className="d-flex flex-column justify-content-center">
                    <Card.Text><strong>Ingredients:</strong> {food.ingredients}</Card.Text>
                    <Card.Text><strong>Type:</strong> {food.veg_nonveg}</Card.Text>
                    <Card.Text><strong>Sugar Free:</strong> {food.sugar_free}</Card.Text>
                    <Card.Text><strong>Price:</strong> {food.price}</Card.Text>
                  </Col>

                  <Col
                    xs={12}
                    md={5}
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "140px" }}
                  >
                    <img
                      src={food.image}
                      alt={food.dish_name}
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

              <Card.Footer className="text-center">
                <div className="d-flex align-items-center justify-content-center gap-1">
                  <Form.Check
                    type="checkbox"
                    id={`checkbox-${food.id}`}
                    onChange={() => handleCheckboxChange(food)}
                    checked={cart.includes(food)}
                  />
                  <label htmlFor={`checkbox-${food.id}`} className="mb-0">
                    Add to Cart
                  </label>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {cart.length > 0 && (
        <div className="text-center mt-4">
          <Button variant="success" onClick={handleSaveCart}>
            Proceed to Checkout ({cart.length} items) —{" "}
            {paymentType === "cod" ? "COD" : "Online"}
          </Button>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Selected Food Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Subscription Duration:</strong> {startDate} to {endDate}</p>
          <p><strong>Selected Items:</strong></p>
          <ul>
            {cart.map((food, index) => (
              <li key={index}>
                <strong>{food.dish_name}</strong> - {food.price}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}