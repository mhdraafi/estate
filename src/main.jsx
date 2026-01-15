import React, { useState, StrictMode } from 'react' // Added StrictMode here
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './components'
import Login from './components/login'
import SignUp from './components/register'
import Properties from './components/properties'
import About from './components/about'
import Contact from './components/contact'
import PropertyDetail from './components/PropertyDetail' 

// Path must be relative to main.jsx
import img1 from "./components/luxvilla.jpg";

const RootApp = () => {
  const [properties, setProperties] = useState([
    { id: 1, title: "Luxury Villa", price: "85L", loc: "Kochi", img: img1, type: "Villa", beds: 4 },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reg' element={<SignUp/>}/>
        <Route path='/Properties' element={<Properties properties={properties} setProperties={setProperties} />}/>
        <Route path='/property/:id' element={<PropertyDetail properties={properties} />}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
)