import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';

export default function PropertyDetail({ properties }) {
  const { id } = useParams();
  const item = properties.find(p => p.id.toString() === id);

  if (!item) return <Container className="py-5"><h2>Property Not Found</h2></Container>;

  return (
    <>
      <nav className="navbar bg-white shadow-sm px-4 py-3 mb-5">
        <div className="nav-logo"><h2>RealEstate</h2></div>
        <ul className="nav-links d-flex gap-4 list-unstyled mb-0">
          <li><Link to="/" className="text-decoration-none text-dark">Home</Link></li>
          <li><Link to="/properties" className="text-decoration-none text-dark">Properties</Link></li>
        </ul>
      </nav>

      <Container>
        <Row className="gy-4">
          <Col md={6}>
            <img src={item.img} alt={item.title} className="img-fluid rounded-4 shadow-lg" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </Col>
          <Col md={6} className="ps-md-5">
            <Badge bg="primary" className="mb-3">{item.type}</Badge>
            <h1 className="display-4 fw-bold">{item.title}</h1>
            <h2 className="text-success mb-4">{item.price}</h2>
            <div className="p-4 bg-light rounded-3 mb-4">
              <p><strong>Location:</strong> {item.loc}</p>
              <p><strong>Rooms:</strong> {item.beds} BHK</p>
            </div>
            <div className="d-grid gap-3">
              <Button size="lg" variant="dark">Inquire Now</Button>
              <Link to="/Properties" className="btn btn-outline-secondary">Back to Listings</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}