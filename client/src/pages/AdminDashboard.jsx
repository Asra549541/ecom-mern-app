import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [orders,   setOrders]   = useState([])
  const [form, setForm] = useState({ name:'', price:'', category:'', stock:'', image:'' })
  const [tab, setTab]   = useState('products')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== 'admin') return navigate('/')
    api.get('/products').then(r => setProducts(r.data))
    api.get('/orders').then(r => setOrders(r.data))
  }, [])

  const addProduct = async () => {
    const { data } = await api.post('/products', { ...form, price: Number(form.price), stock: Number(form.stock) })
    setProducts(prev => [...prev, data])
    setForm({ name:'', price:'', category:'', stock:'', image:'' })
  }

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`)
    setProducts(prev => prev.filter(p => p._id !== id))
  }

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status })
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o))
  }

  const btnStyle = (active) => ({
    padding:'8px 20px', background: active ? '#111' : '#fff',
    color: active ? '#fff' : '#111', border:'1px solid #111',
    cursor:'pointer', borderRadius:'4px'
  })

  return (
    <div style={{ padding:'24px', maxWidth:'900px' }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display:'flex', gap:'10px', marginBottom:'20px' }}>
        <button style={btnStyle(tab==='products')} onClick={() => setTab('products')}>Products</button>
        <button style={btnStyle(tab==='orders')}   onClick={() => setTab('orders')}>Orders</button>
      </div>

      {tab === 'products' && (
        <>
          <h3>Add Product</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginBottom:'16px' }}>
            {['name','price','category','stock','image'].map(field => (
              <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})}
                style={{ padding:'8px', border:'1px solid #ddd', borderRadius:'4px' }} />
            ))}
            <button onClick={addProduct}
              style={{ padding:'8px', background:'#111', color:'#fff', border:'none',
                borderRadius:'4px', cursor:'pointer' }}>
              + Add Product
            </button>
          </div>
          <h3>All Products ({products.length})</h3>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#f5f5f5' }}>
                {['Name','Category','Price','Stock','Action'].map(h => (
                  <th key={h} style={{ padding:'10px', textAlign:'left', borderBottom:'1px solid #ddd' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td style={{ padding:'10px', borderBottom:'1px solid #eee' }}>{p.name}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #eee' }}>{p.category}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #eee' }}>₹{p.price}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #eee' }}>{p.stock}</td>
                  <td style={{ padding:'10px', borderBottom:'1px solid #eee' }}>
                    <button onClick={() => deleteProduct(p._id)}
                      style={{ background:'#e00', color:'#fff', border:'none',
                        padding:'4px 10px', borderRadius:'4px', cursor:'pointer' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {tab === 'orders' && (
        <>
          <h3>All Orders ({orders.length})</h3>
          {orders.map(order => (
            <div key={order._id} style={{ border:'1px solid #ddd', borderRadius:'8px',
              padding:'14px', marginBottom:'12px' }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span><strong>{order.user?.name}</strong> — {order.user?.email}</span>
                <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}
                  style={{ padding:'4px 8px', border:'1px solid #ddd', borderRadius:'4px' }}>
                  <option value="pending">pending</option>
                  <option value="delivered">delivered</option>
                </select>
              </div>
              <p style={{ margin:'6px 0 0', color:'#555' }}>Total: ₹{order.totalPrice}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}