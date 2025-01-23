import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Website/Home/Home.jsx'
import About from './Website/About/About.jsx'
import Contact from './Website/Contact/Contact.jsx'
import PageNotFound from './PageNotFound/PageNotFound.jsx'
import Login from './Auth/Login.jsx'
import Registration from './Auth/Register.jsx'
import RegistrationNew from './Auth/RegistrationNew.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact-us" element={<Contact />} />
      <Route path='*' element={<PageNotFound />} />
      <Route path='login' element={<Login />} />
      {/* <Route path='register' element={<Registration />} /> */}
      <Route path='register' element={<RegistrationNew />} />
     </Routes>
    </BrowserRouter>
  </StrictMode>,
)
