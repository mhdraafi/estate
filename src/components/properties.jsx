import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../api/first";
import "./properties.css";
import "./navbar.css";

const BASE_URL = "http://127.0.0.1:8000";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("All");
  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [liked, setLiked] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "Villa", // Classification
    bedrooms: "",
    area: "",
    image: null,
  });

  const loadProperties = async () => {
    try {
      const res = await API.get("properties/");
      setProperties(res.data);
    } catch {
      setAlert({ type: "danger", msg: "❌ Failed to load properties" });
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

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

  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      price: p.price,
      location: p.location,
      type: p.type || "Villa",
      bedrooms: p.bedrooms || "",
      area: p.area || "",
      image: null,
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await API.delete(`properties/${id}/`);
        loadProperties();
        setAlert({ type: "success", msg: "Property deleted" });
        setTimeout(() => setAlert({ type: "", msg: "" }), 2000);
      } catch {
        setAlert({ type: "danger", msg: "Delete failed" });
      }
    }
  };

  const handleLike = (id) => {
    setLiked(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };

  const handleAddToCart = (property) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = existingCart.find(item => item.id === property.id);
    if (!exists) {
      existingCart.push(property);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setAlert({ type: "success", msg: "Added to shortlist 🛒" });
      setTimeout(() => setAlert({ type: "", msg: "" }), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") data.append(key, formData[key]);
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
      setAlert({ type: "success", msg: "Saved successfully" });
    } catch {
      setAlert({ type: "danger", msg: "Operation failed" });
    }
  };

  const filteredProperties = filter === "All" ? properties : properties.filter(p => p.type === filter);

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/400x300";
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
  };

  return (
    <div className="properties-page">
      <nav className="navbar px-4">
        <div className="nav-logo"><h2>RealEstate</h2></div>
        {/* Filter Selection */}
        <div className="filter-group d-none d-md-flex">
          {["All", "Villa", "House", "Land", "Apartment"].map(t => (
            <Button key={t} variant={filter === t ? "dark" : "light"} className="mx-1 btn-sm" onClick={() => setFilter(t)}>
              {t}
            </Button>
          ))}
        </div>
        <ul className="nav-links mb-0">
          <Link to="/"><li>Home</li></Link>
          <Link to="/cart"><li>Shortlist 🛒</li></Link>
        </ul>
        <Button className="btn-add-luxe" onClick={() => { resetForm(); setShow(true); }}>
          + Post Property
        </Button>
      </nav>

      <Container>
        {alert.msg && <Alert variant={alert.type} className="mt-3">{alert.msg}</Alert>}

        <Row className="mt-5">
          {filteredProperties.map((p) => (
            <Col lg={4} md={6} key={p.id} className="mb-5">
              <Card className="luxury-card h-100 border-0 shadow-sm" style={{borderRadius: '15px', overflow: 'hidden'}}>
                <div className="card-img-container" style={{position: 'relative', height: '220px'}}>
                  <Badge bg="primary" style={{position: 'absolute', top: '10px', left: '10px', zIndex: '2'}}>{p.type}</Badge>
                  <div className="price-overlay" style={{position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold'}}>
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </div>
                  <img src={getImageUrl(p.image)} alt={p.title} className="w-100 h-100" style={{objectFit: 'cover'}} />
                </div>

                <Card.Body>
                  <h5 className="fw-bold text-navy">{p.title}</h5>
                  <p className="text-muted small">📍 {p.location}</p>
                  <div className="d-flex gap-2 mb-3">
                    {p.bedrooms && <Badge bg="light" text="dark border">🛏️ {p.bedrooms} BHK</Badge>}
                    {p.area && <Badge bg="light" text="dark border">📐 {p.area} sq.ft</Badge>}
                  </div>
                  
                  <hr />

                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/properties/${p.id}`} className="btn btn-sm btn-dark rounded-pill px-3">Details</Link>
                    <div className="d-flex gap-1">
                      <Button variant="light" size="sm" onClick={() => handleLike(p.id)}>{liked.includes(p.id) ? "❤️" : "🤍"}</Button>
                      <Button variant="light" size="sm" onClick={() => handleAddToCart(p)}>🛒</Button>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(p)}>Edit</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* MODAL WITH ADDED FIELDS */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">{editingId ? "Edit" : "Post"} Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Title</Form.Label>
                  <Form.Control placeholder="e.g. Luxury Sky Villa" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Classification</Form.Label>
                  <Form.Select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                    <option value="Villa">Villa</option>
                    <option value="House">House</option>
                    <option value="Land">Land</option>
                    <option value="Apartment">Apartment</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Price (₹)</Form.Label>
                  <Form.Control type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Bedrooms (BHK)</Form.Label>
                  <Form.Control type="number" placeholder="e.g. 3" value={formData.bedrooms} onChange={e => setFormData({ ...formData, bedrooms: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Area (sq.ft)</Form.Label>
                  <Form.Control type="number" placeholder="e.g. 2400" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Location</Form.Label>
                  <Form.Control placeholder="City, Area" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Property Image</Form.Label>
                  <Form.Control type="file" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="w-100 btn-add-luxe py-2">Save Property Details</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}