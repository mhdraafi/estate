import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import API from "../api/first";

export default function Enquiry() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("enquiries/", {
        ...formData,
        property: id
      });

      setSuccess("Your enquiry has been sent. Our agent will contact you shortly.");
      setFormData({ name: "", phone: "", message: "" });
    } catch (err) {
      setError("Unable to send enquiry. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        className="shadow border-0"
        style={{
          maxWidth: "560px",
          width: "100%",
          borderRadius: "14px"
        }}
      >
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: "#1f3d2b" }}>
              Property Enquiry
            </h2>
            <p className="text-muted mb-0">
              Fill in your details and our team will get back to you
            </p>
          </div>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="I am interested in this property. Please share more details."
              />
            </Form.Group>

            <div className="d-grid gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                style={{
                  backgroundColor: "#1f3d2b",
                  borderColor: "#1f3d2b"
                }}
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </Button>

              <Link
                to="/properties"
                className="btn btn-outline-secondary"
              >
                Back to Properties
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
