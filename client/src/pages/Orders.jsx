import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return navigate('/login')
    api.get('/orders/myorders').then(r => setOrders(r.data))
  }, [])

  return (
    <div style={{ padding:'24px', maxWidth:'700px' }}>
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map(order => (
        <div key={order._id} style={{ border:'1px solid #ddd', borderRadius:'8px',
          padding:'16px', marginBottom:'16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize:'13px', color:'#666' }}>
              Order ID: {order._id.slice(-6).toUpperCase()}
            </span>
            <span style={{ background: order.status === 'delivered' ? '#e1f5ee' : '#faeeda',
              color: order.status === 'delivered' ? '#0f6e56' : '#854f0b',
              padding:'2px 10px', borderRadius:'4px', fontSize:'12px' }}>
              {order.status}
            </span>
          </div>
          <ul style={{ marginTop:'10px', paddingLeft:'16px' }}>
            {order.items.map((item, i) => (
              <li key={i}>{item.name} × {item.qty} — ₹{item.price * item.qty}</li>
            ))}
          </ul>
          <p style={{ textAlign:'right', fontWeight:'bold', marginBottom:0 }}>
            Total: ₹{order.totalPrice}
          </p>
        </div>
      ))}
    </div>
  )
}