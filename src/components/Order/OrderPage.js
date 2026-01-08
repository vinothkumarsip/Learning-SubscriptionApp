import { Container, Card, Button, Row, Col, Form, Accordion, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOrderPage } from "../../services/Order/useOrderPage";
import { confirmOrder } from "../../services/Order/OrderService";
import { saveCart } from "../../services/Order/CartService";
import { ORDER_PAGE_LABELS } from "../../constants/orderPageLabels";

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
              <Accordion.Header>{ORDER_PAGE_LABELS.FILTER}</Accordion.Header>
              <Accordion.Body>
                <Form.Label className="fw-bold small">{ORDER_PAGE_LABELS.SUGAR_FREE}</Form.Label>
                {[ORDER_PAGE_LABELS.ALL, ORDER_PAGE_LABELS.YES, ORDER_PAGE_LABELS.NO].map((option) => (
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
                <Form.Label className="fw-bold small">{ORDER_PAGE_LABELS.TYPE}</Form.Label>
                {[ORDER_PAGE_LABELS.ALL, ORDER_PAGE_LABELS.VEG, ORDER_PAGE_LABELS.NONVEG].map((option) => (
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
                    {ORDER_PAGE_LABELS.APPLY}
                  </Button>
                  <Button size="sm" variant="outline-secondary" onClick={clearFilters}>
                    {ORDER_PAGE_LABELS.CLEAR}
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={4}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{ORDER_PAGE_LABELS.PAYMENT_METHOD}</Accordion.Header>
              <Accordion.Body> 
              {(() => {
                const isCOD = paymentType === "cod";
                const isOnline = paymentType === "online";
                return (
                  <>
                    <Form.Check
                      type="radio"
                      name="paymentType"
                      value="cod"
                      label={ORDER_PAGE_LABELS.CASH_ON_DELIVERY}
                      checked={isCOD}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="small mb-2"
                    />
                    <Form.Check
                      type="radio"
                      name="paymentType"
                      value="online"
                      label={ORDER_PAGE_LABELS.ONLINE_PAYMENT}
                      checked={isOnline}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="small"
                    />
                  </>
                );
              })()}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={4}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{ORDER_PAGE_LABELS.DELIVERY}</Accordion.Header>
              <Accordion.Body>
                {(() => {
                  const isHome = deliveryType === "home";
                  const isPickup = deliveryType === "pickup";
                  return (
                    <>
                      <Form.Check
                        type="radio"
                        name="deliveryType"
                        value="home"
                        label={ORDER_PAGE_LABELS.HOME_DELIVERY}
                        checked={isHome}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="small mb-2"
                      />
                      <Form.Check
                        type="radio"
                        name="deliveryType"
                        value="pickup"
                        label={ORDER_PAGE_LABELS.PICKUP_FROM_STORE}
                        checked={isPickup}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="small"
                      />
                    </>
                  );
                })()}
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
                    <Card.Text><strong>{ ORDER_PAGE_LABELS.INGREDIENTS }:</strong> {food.ingredients}</Card.Text>
                    <Card.Text><strong>{ ORDER_PAGE_LABELS.FOOD_TYPE }:</strong> {food.veg_nonveg}</Card.Text>
                    <Card.Text><strong>{ ORDER_PAGE_LABELS.SUGAR_FREE_LABEL }:</strong> {food.sugar_free}</Card.Text>
                    <Card.Text><strong>{ ORDER_PAGE_LABELS.PRICE }:</strong> {food.price}</Card.Text>
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
                    {ORDER_PAGE_LABELS.ADD_TO_CART}
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
            {ORDER_PAGE_LABELS.PROCEED_TO_CHECKOUT} ({cart.length} items) —{" "}
            {paymentType === "cod" ? "COD" : "Online"}
          </Button>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{ORDER_PAGE_LABELS.SELECTED_FOOD_ITEMS}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{ORDER_PAGE_LABELS.SUBSCRIPTION_DURATION}:</strong> {startDate} to {endDate}</p>
          <p><strong>{ORDER_PAGE_LABELS.SELECTED_ITEMS}:</strong></p>
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
            {ORDER_PAGE_LABELS.CLOSE}
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            {ORDER_PAGE_LABELS.CONFIRM_ORDER}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}