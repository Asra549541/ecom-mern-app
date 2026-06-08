import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/products')
      .then(r => setProducts(r.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ padding:'24px' }}>Loading products...</p>

  return (
    <div style={{ padding:'24px' }}>
      <h1>Products</h1>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'20px', marginTop:'20px' }}>
        {products.map(p => (
          <div key={p._id} style={{ border:'1px solid #ddd', borderRadius:'8px', overflow:'hidden' }}>
            <img src={p.image || 'https://via.placeholder.com/220x160'} alt={p.name}
              style={{ width:'100%', height:'160px', objectFit:'cover', cursor:'pointer' }}
              onClick={() => navigate(`/product/${p._id}`)} />
            <div style={{ padding:'12px' }}>
              <h3 style={{ margin:'0 0 4px' }}>{p.name}</h3>
              <p style={{ color:'#666', fontSize:'13px', margin:'0 0 8px' }}>{p.category}</p>
              <p style={{ fontWeight:'bold', margin:'0 0 10px' }}>₹{p.price}</p>
              <button onClick={() => addToCart(p)}
                style={{ width:'100%', padding:'8px', background:'#111', color:'#fff',
                  border:'none', borderRadius:'4px', cursor:'pointer' }}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}