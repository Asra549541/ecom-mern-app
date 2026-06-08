import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/cart"       element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/orders"     element={<Orders />} />
        <Route path="/admin"      element={<AdminDashboard />} />
      </Routes>
    </>
  )
}