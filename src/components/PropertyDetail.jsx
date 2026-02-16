import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Spinner, Button, Alert } from "react-bootstrap";
import API from "../api/first";

export default function PropertyDetail() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH PROPERTY ---------------- */
  useEffect(() => {
    API.get(`properties/${id}/`)
      .then((res) => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Property details could not be loaded.");
        setLoading(false);
      });
  }, [id]);

  /* ---------------- LOADING & ERROR ---------------- */
  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error || "Property not found"}</Alert>
        <Link to="/properties" className="btn btn-dark mt-3">
          Back to Listings
        </Link>
      </Container>
    );
  }

  /* ---------------- IMAGE FIX (IMPORTANT) ---------------- */
  const imageUrl = property.image
    ? property.image.startsWith("http")
      ? property.image
      : `${API.defaults.baseURL.replace("/api/", "")}${property.image}`
    : "https://via.placeholder.com/800x500?text=No+Image";

  /* ---------------- MAP LINK ---------------- */
  const mapUrl =
    property.lat !== 0 && property.lng !== 0
      ? `https://www.google.com/maps?q=${property.lat},${property.lng}`
      : `https://www.google.com/maps?q=${encodeURIComponent(property.location)}`;

  return (
    <div className="bg-light min-vh-100">
      {/* NAVBAR */}
      <nav className="navbar px-4 py-3 bg-white border-bottom mb-4 d-flex justify-content-between">
        <h2 className="m-0 fw-bold">RealEstate</h2>
        <Link to="/properties" className="btn btn-outline-secondary">
          ← Back
        </Link>
      </nav>

      <Container className="py-4">
        <Row className="gx-lg-5">
          {/* IMAGE */}
          <Col lg={7} className="mb-4">
            <div className="bg-white shadow rounded overflow-hidden">
              <img
                src={imageUrl}
                alt={property.title}
                className="img-fluid w-100"
                style={{ height: "500px", objectFit: "cover" }}
              />
            </div>
          </Col>

          {/* DETAILS */}
          <Col lg={5}>
            <div className="bg-white p-4 rounded shadow-sm">
              <Badge bg="dark" className="mb-2">
                {property.type || "Property"}
              </Badge>

              <h2 className="fw-bold">{property.title}</h2>

              <h3 className="text-success fw-bold mb-3">
                ₹{Number(property.price).toLocaleString("en-IN")}
              </h3>

              <p className="text-muted fs-5">📍 {property.location}</p>

              <hr />

              {/* BEDROOMS + AREA */}
              <Row className="text-center mb-4">
                <Col xs={6}>
                  <div className="border rounded p-3 bg-light">
                    <small className="text-muted fw-bold d-block">BEDROOMS</small>
                    <span className="fw-bold fs-5">
                      {property.bedrooms ? `${property.bedrooms} BHK` : "N/A"}
                    </span>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="border rounded p-3 bg-light">
                    <small className="text-muted fw-bold d-block">AREA</small>
                    <span className="fw-bold fs-5">
                      {property.area ? `${property.area} sq.ft` : "N/A"}
                    </span>
                  </div>
                </Col>
              </Row>

              {/* MAP BUTTON */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary w-100 mb-3"
              >
                📍 View on Map
              </a>

              {/* ENQUIRY BUTTON */}
              <Link to={`/enquire/${property.id}`}>
                <Button variant="dark" size="lg" className="w-100">
                  Instant Enquiry
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
