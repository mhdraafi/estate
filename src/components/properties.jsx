import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Properties({ properties, setProperties }) {
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '', price: '', loc: '', type: 'Villa', beds: '', img: ''
  });

  const handleClose = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ title: '', price: '', loc: '', type: 'Villa', beds: '', img: '' });
  };

  // --- NEW DELETE FUNCTION ---
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      const updatedList = properties.filter(p => p.id !== id);
      setProperties(updatedList);
      localStorage.setItem('myProperties', JSON.stringify(updatedList));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, img: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedList;
    if (editId) {
      updatedList = properties.map(p => p.id === editId ? { ...formData, id: editId } : p);
    } else {
      updatedList = [{ ...formData, id: Date.now() }, ...properties];
    }
    setProperties(updatedList);
    localStorage.setItem('myProperties', JSON.stringify(updatedList));
    handleClose();
  };

  const filteredProperties = category === 'All' 
    ? properties 
    : properties.filter(item => item.type === category);

  return (
    <div className="properties-page">
      {/* Navbar */}
      <nav className="navbar bg-white shadow-sm px-4 py-3 mb-4">
        <div className="nav-logo"><h2>RealEstate</h2></div>
        <ul className="nav-links d-flex gap-4 list-unstyled mb-0">
          <li><Link to="/" className="text-decoration-none text-dark">Home</Link></li>
          <li><Link to="/properties" className="text-decoration-none text-dark fw-bold">Properties</Link></li>
        </ul>
        <div className="nav-buttons d-flex gap-2">
          <Button onClick={() => setShowModal(true)} style={{ backgroundColor: '#8C55AA', border: 'none' }}>
            + Add Property
          </Button>
        </div>
      </nav>

      {/* Filter Tabs */}
      <Container className="text-center mb-5">
        {['All', 'Villa', 'Apartment', 'House', 'Flat'].map(cat => (
          <Button 
            key={cat} 
            variant={category === cat ? "primary" : "outline-secondary"}
            className="mx-1 rounded-pill px-4"
            onClick={() => setCategory(cat)}
            style={{ backgroundColor: category === cat ? '#8C55AA' : '', borderColor: '#8C55AA' }}
          >
            {cat}
          </Button>
        ))}
      </Container>

      <Container>
        <Row className="g-4">
          <AnimatePresence>
            {filteredProperties.map((item) => (
              <Col key={item.id} lg={4} md={6}>
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Card className="h-100 border-0 shadow-sm overflow-hidden">
                    {/* DELETE BUTTON OVERLAY */}
                    <div style={{ position: 'relative' }}>
                       <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDelete(item.id)}
                        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}
                      >
                        ×
                      </Button>
                      <Card.Img variant="top" src={item.img || 'https://via.placeholder.com/300'} style={{ height: '220px', objectFit: 'cover' }} />
                    </div>

                    <Card.Body>
                      <Badge bg="secondary" className="mb-2">{item.type}</Badge>
                      <Card.Title className="fw-bold">{item.title}</Card.Title>
                      
                      <Card.Text className="text-muted mb-1">
                        <i className="bi bi-geo-alt-fill me-1"></i>{item.loc || "No Location"}
                      </Card.Text>
                      
                      <Card.Text className="text-dark small">{item.beds} BHK Available</Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <h5 className="text-primary fw-bold mb-0">₹{item.price}</h5>
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline-primary" onClick={() => { setEditId(item.id); setFormData(item); setShowModal(true); }}>Edit</Button>
                          <Link to={`/property/${item.id}`} className="btn btn-sm btn-dark">View</Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>
      </Container>

      {/* Modal remains the same */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton><Modal.Title>{editId ? 'Edit' : 'Add'} Property</Modal.Title></Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Property Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                placeholder="e.g. Skyline Apartment" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Category (Type)</Form.Label>
                <Form.Select 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Flat">Flat</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Location</Form.Label>
                <Form.Control 
                  placeholder="City (e.g. Kochi)" 
                  value={formData.loc} 
                  onChange={e => setFormData({...formData, loc: e.target.value})} 
                  required 
                />
              </Col>
            </Row>

            <Row>
              <Col><Form.Label>Price</Form.Label><Form.Control placeholder="e.g. 50L" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></Col>
              <Col><Form.Label>BHK</Form.Label><Form.Control type="number" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} /></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit" style={{ backgroundColor: '#8C55AA', border: 'none' }}>Save Property</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}