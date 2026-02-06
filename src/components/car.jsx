import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAlert("Property removed from shortlist.");
    setTimeout(() => setAlert(""), 2500);
  };

  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200";
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
  };

  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <>
      <style>{`
        .estate-bg { background-color: #f8fafb; min-height: 100vh; font-family: 'Poppins', sans-serif; }
        .property-card { 
            border: 1px solid #eee; 
            border-radius: 20px; 
            overflow: hidden; 
            background: #ffffff;
            transition: all 0.4s ease;
        }
        .property-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.05); }
        
        .img-wrapper { position: relative; overflow: hidden; background: #e0e0e0; height: 100%; min-height: 220px; }
        .img-wrapper img { transition: transform 0.6s ease; object-fit: cover; }
        .property-card:hover img { transform: scale(1.05); }

        .price-tag {
            background: #1a2a6c;
            color: white;
            padding: 4px 12px;
            border-radius: 8px;
            font-weight: 600;
            display: inline-block;
        }

        /* Re-themed Sidebar: Professional Real Estate Style */
        .summary-box {
            background: #ffffff;
            color: #1a2a6c;
            border-radius: 24px;
            border: 1px solid #e0e6ed;
            padding: 30px;
            position: sticky;
            top: 40px;
            box-shadow: 0 10px 25px rgba(26, 42, 108, 0.05);
        }

        .summary-header {
            border-bottom: 2px solid #f0f3f7;
            margin-bottom: 20px;
            padding-bottom: 15px;
        }

        .btn-visit {
            background: #1a2a6c;
            border: none;
            color: white;
            font-weight: 600;
            padding: 14px;
            border-radius: 12px;
            transition: 0.3s;
        }
        .btn-visit:hover { background: #253b91; transform: translateY(-2px); color: white; }

        .text-navy { color: #1a2a6c; }
      `}</style>

      <div className="estate-bg">
        <Container className="py-5">
          <header className="mb-5">
            <h1 className="fw-bold text-navy">Shortlisted Estates</h1>
            <p className="text-muted">Manage your saved luxury listings and schedule tours.</p>
          </header>

          {alert && <Alert variant="primary" className="border-0 shadow-sm mb-4 rounded-4">{alert}</Alert>}

          {cart.length === 0 ? (
            <div className="text-center py-5">
              <h3 className="text-muted">Your shortlist is empty.</h3>
              <Link to="/properties" className="btn btn-navy mt-3">Browse Properties</Link>
            </div>
          ) : (
            <Row className="g-4">
              <Col lg={8}>
                {cart.map((p) => (
                  <Card key={p.id} className="property-card mb-4">
                    <Row className="g-0">
                      <Col md={4}>
                        <div className="img-wrapper">
                          <Image src={getImageUrl(p.image)} className="w-100 h-100" alt={p.title} />
                        </div>
                      </Col>
                      <Col md={8}>
                        <Card.Body className="p-4 d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h4 className="fw-bold text-navy mb-1">{p.title}</h4>
                                <p className="text-muted small">📍 Premium Estate Location</p>
                            </div>
                            <div className="price-tag">₹{Number(p.price).toLocaleString("en-IN")}</div>
                          </div>
                          
                          <div className="mt-auto d-flex justify-content-between align-items-center">
                            <Button variant="link" className="text-muted small text-decoration-none p-0" onClick={() => removeFromCart(p.id)}>
                              Remove from list
                            </Button>
                            <Link to={`/properties/${p.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                              View details
                            </Link>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Col>

              {/* RE-THEMED SIDEBAR */}
              <Col lg={4}>
                <Card className="summary-box">
                  <div className="summary-header">
                    <h5 className="fw-bold m-0">Portfolio Summary</h5>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Selected Units</span>
                      <span className="fw-bold">{cart.length}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Total Portfolio Value</span>
                      <span className="fw-bold text-navy">₹{totalPrice.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-3 mb-4" style={{background: '#f8fafb', borderLeft: '4px solid #1a2a6c'}}>
                    <p className="small m-0 text-muted">
                      Ready to see these in person? Click below to schedule a private viewing with our estate consultants.
                    </p>
                  </div>

                  <Button className="btn-visit w-100 mb-3">
                    Schedule Private Tour
                  </Button>
                  
                  <div className="text-center">
                    <Link to="/properties" className="text-navy small fw-bold text-decoration-none">
                      ← Continue Exploring
                    </Link>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}