import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./AboutUs.css"; 

export default function AboutUs() {
  return (
    <Container className="about-page my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/74/99/1f.jpg"
            alt="About Us"
            fluid
            className="about-image"
          />
        </Col>

        <Col md={6}>
          <h2>About FOODIE</h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio diam, gravida sit amet tellus sit amet, sodales blandit purus. Aliquam iaculis lorem ut tempor faucibus. Sed finibus semper faucibus. Cras nec orci vel nibh tempor tempor. In mollis facilisis vulputate. Phasellus aliquet iaculis ante, quis cursus ipsum. Etiam a urna sit amet nisl facilisis rhoncus vitae eu ante. Nam velit purus, ullamcorper eleifend dui vel, rhoncus gravida eros. Vestibulum non lacinia nunc.
          </p>
          <p>
          Maecenas dapibus libero purus, ut tincidunt massa aliquam ut. Mauris et justo non libero mattis scelerisque a at mi. Cras pharetra urna eu felis fringilla, at varius nunc sagittis. Pellentesque sit amet ex porta ex aliquet varius eget sit amet tellus. Fusce posuere lorem sit amet velit molestie interdum. Nullam imperdiet mauris in magna posuere, id tempus purus aliquet. Ut et interdum erat, pretium pretium orci. Vestibulum accumsan tortor a sollicitudin tempor. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
