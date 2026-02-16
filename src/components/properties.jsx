import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../api/first";
import "./modern.css";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("All");
  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "Villa",
    bedrooms: "",
    area: "",
    image: null,
  });

  /* LOAD DATA */
  const loadProperties = async () => {
    try {
      const res = await API.get("properties/");
      setProperties(res.data);
    } catch (error) {
      console.error("Error loading properties", error);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  /* IMAGE FIX */
  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/400x300";
    if (image.startsWith("http")) return image;
    return `${API.defaults.baseURL.replace("/api/", "")}${image}`;
  };

  /* RESET FORM */
  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      location: "",
      type: "Villa",
      bedrooms: "",
      area: "",
      image: null,
    });
    setEditingId(null);
  };

  /* EDIT */
  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      price: p.price,
      location: p.location,
      type: p.type,
      bedrooms: p.bedrooms || "",
      area: p.area || "",
      image: null,
    });
    setShow(true);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      await API.delete(`properties/${id}/`);
      loadProperties();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (v !== null && v !== "") data.append(k, v);
    });

    try {
      if (editingId) {
        await API.patch(`properties/${editingId}/`, data);
      } else {
        await API.post("properties/", data);
      }

      setShow(false);
      resetForm();
      loadProperties();
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const filtered =
    filter === "All"
      ? properties
      : properties.filter((p) => p.type === filter);

  return (
    <div className="modern-page">
      <Container className="py-5">

        {/* TOP BAR */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Link to="/" className="btn btn-outline-dark me-3">
              ← Back to Home
            </Link>
            <h2 className="fw-bold d-inline">🏡 Property Listings</h2>
          </div>

          <Button
            onClick={() => {
              resetForm();
              setShow(true);
            }}
          >
            + Add Property
          </Button>
        </div>

        {/* FILTER */}
        <div className="mb-4">
          {["All", "Villa", "House", "Apartment", "Land"].map((t) => (
            <Button
              key={t}
              size="sm"
              variant={filter === t ? "dark" : "outline-dark"}
              className="me-2 mb-2 rounded-pill"
              onClick={() => setFilter(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        <Row>
          {filtered.map((p) => (
            <Col lg={4} md={6} key={p.id} className="mb-4">
              <Card className="modern-card">
                <img
                  src={getImageUrl(p.image)}
                  alt={p.title}
                  className="modern-img"
                />
                <Card.Body>
                  <Badge bg="dark" className="mb-2">
                    {p.type}
                  </Badge>

                  <h5 className="fw-bold">{p.title}</h5>
                  <p className="text-muted">📍 {p.location}</p>

                  <h6 className="text-success fw-bold">
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </h6>

                  <div className="d-flex justify-content-between text-muted small mt-2">
                    <span>🛏 {p.bedrooms || "N/A"} BHK</span>
                    <span>📐 {p.area || "N/A"} sq.ft</span>
                  </div>

                  <div className="mt-3 d-flex gap-2">
                    <Link to={`/properties/${p.id}`}>
                      <Button size="sm" variant="outline-dark">
                        View
                      </Button>
                    </Link>

                    <Button size="sm" onClick={() => handleEdit(p)}>
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? "Edit" : "Add"} Property
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Control
              className="mb-2"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <Form.Select
              className="mb-2"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option>Villa</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Land</option>
            </Form.Select>

            <Form.Control
              className="mb-2"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />

            <Form.Control
              className="mb-2"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />

            <Form.Control
              className="mb-2"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={(e) =>
                setFormData({ ...formData, bedrooms: e.target.value })
              }
            />

            <Form.Control
              className="mb-2"
              placeholder="Area (sq.ft)"
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            />

            <Form.Control
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" className="w-100">
              Save Property
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
