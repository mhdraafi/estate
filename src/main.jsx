import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './components';
import Login from './components/login';
import SignUp from './components/register';
import Properties from './components/properties';

import PropertyDetail from './components/PropertyDetail';
import About from './components/about';
import Contact from './components/contact';
import Enquiry from './components/enqiur';
import Cart from './components/car';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<SignUp />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/enquire/:id" element={<Enquiry/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
