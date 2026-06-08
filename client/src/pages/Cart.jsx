import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (!user) return navigate('/login')
    try {
      await api.post('/orders', {
        items: cartItems.map(i => ({
          product: i._id, name: i.name, qty: i.qty, price: i.price
        })),
        totalPrice
      })
      clearCart()
      alert('Order placed successfully!')
      navigate('/orders')
    } catch (err) {
      alert('Checkout failed: ' + err.response?.data?.error)
    }
  }

  if (cartItems.length === 0)
    return <p style={{ padding:'24px' }}>Your cart is empty. <a href="/">Shop now</a></p>

  return (
    <div style={{ padding:'24px', maxWidth:'700px' }}>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item._id} style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', borderBottom:'1px solid #eee', padding:'12px 0' }}>
          <div>
            <p style={{ margin:0, fontWeight:'bold' }}>{item.name}</p>
            <p style={{ margin:0, color:'#666' }}>Qty: {item.qty} × ₹{item.price}</p>
          </div>
          <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
            <span style={{ fontWeight:'bold' }}>₹{item.price * item.qty}</span>
            <button onClick={() => removeFromCart(item._id)}
              style={{ background:'#e00', color:'#fff', border:'none',
                padding:'4px 10px', borderRadius:'4px', cursor:'pointer' }}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div style={{ marginTop:'20px', textAlign:'right' }}>
        <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
        <button onClick={handleCheckout}
          style={{ padding:'12px 28px', background:'#111', color:'#fff',
            border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'15px' }}>
          Place Order
        </button>
      </div>
    </div>
  )
}