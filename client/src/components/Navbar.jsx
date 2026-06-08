import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{ display:'flex', justifyContent:'space-between',
      padding:'12px 24px', background:'#111', color:'#fff' }}>
      <Link to="/" style={{ color:'#fff', fontWeight:'bold', fontSize:'20px' }}>
        🛒 ShopApp
      </Link>
      <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
        <Link to="/" style={{ color:'#fff' }}>Home</Link>
        <Link to="/cart" style={{ color:'#fff' }}>
          Cart ({cartItems.length})
        </Link>
        {user ? (
          <>
            <Link to="/orders" style={{ color:'#fff' }}>My Orders</Link>
            {user.role === 'admin' &&
              <Link to="/admin" style={{ color:'#ffcc00' }}>Admin</Link>}
            <button onClick={handleLogout}
              style={{ background:'transparent', color:'#fff',
                border:'1px solid #fff', padding:'4px 12px', cursor:'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    style={{ color:'#fff' }}>Login</Link>
            <Link to="/register" style={{ color:'#fff' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}