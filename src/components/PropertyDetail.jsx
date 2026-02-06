import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Spinner, Button, Alert } from "react-bootstrap";
import API from "../api/first";

const BASE_URL = "http://127.0.0.1:8000";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`properties/${id}/`)
      .then((res) => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Property details could not be loaded.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center p-5"><Spinner animation="border" variant="primary" /></div>;
  if (error || !property) return (
    <Container className="py-5 text-center">
      <Alert variant="danger">{error || "Property not found"}</Alert>
      <Link to="/properties" className="btn btn-dark">Back to Listings</Link>
    </Container>
  );

  const imageUrl = property.image
    ? property.image.startsWith("http") ? property.image : `${BASE_URL}${property.image}`
    : "https://via.placeholder.com/800x500";

  const mapUrl = property.lat && property.lng
      ? `https://www.google.com/maps?q=${property.lat},${property.lng}`
      : `https://www.google.com/maps?q=${encodeURIComponent(property.location)}`;

  return (
    <div className="detail-page-wrapper bg-light min-vh-100">
      <nav className="navbar px-4 py-3 bg-white border-bottom mb-4 d-flex justify-content-between">
        <h2 className="m-0 fw-bold text-navy">RealEstate</h2>
        <Link to="/properties" className="btn btn-outline-secondary rounded-pill">← Back to Gallery</Link>
      </nav>

      <Container className="py-4">
        <Row className="gx-lg-5">
          {/* Left: Image */}
          <Col lg={7} className="mb-4">
            <div className="shadow-lg rounded-4 overflow-hidden bg-white">
              <img src={imageUrl} className="img-fluid w-100" alt={property.title} style={{ height: "500px", objectFit: "cover" }} />
            </div>
          </Col>

          {/* Right: Info Box */}
          <Col lg={5}>
            <div className="p-4 bg-white border-0 rounded-4 shadow-sm">
              <Badge bg="dark" className="mb-2 px-3 py-2 text-uppercase letter-spacing-1">
                {property.type || "Premium Property"}
              </Badge>
              <h1 className="fw-bold mb-1 text-navy">{property.title}</h1>
              <h2 className="text-success fw-bold mb-3">₹{Number(property.price).toLocaleString("en-IN")}</h2>
              <p className="fs-5 text-muted mb-4">📍 {property.location}</p>

              <div className="pt-4 border-top">
                <Row className="text-center g-2 mb-4">
                  <Col xs={6}>
                    <div className="p-3 border rounded-3 bg-light">
                      <small className="text-muted d-block text-uppercase small fw-bold">Bedrooms</small>
                      <span className="fs-5 fw-bold">{property.bedrooms ? `${property.bedrooms} BHK` : "N/A"}</span>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="p-3 border rounded-3 bg-light">
                      <small className="text-muted d-block text-uppercase small fw-bold">Total Area</small>
                      <span className="fs-5 fw-bold">{property.area ? `${property.area} sq.ft` : "Contact Us"}</span>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4">
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary w-100 py-2 rounded-pill fw-bold">
                    📍 View Neighborhood Map
                  </a>
                </div>

                <div className="d-grid gap-2">
                  <Link to={`/enquire/${property.id}`} className="text-decoration-none">
                    <Button variant="dark" size="lg" className="py-3 w-100 rounded-pill shadow">
                      Instant Enquiry
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}