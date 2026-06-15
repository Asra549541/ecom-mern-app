import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data))
  }, [id])

  if (!product) return <p style={{ padding: '24px' }}>Loading...</p>

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <img src={product.image || 'https://via.placeholder.com/400x250'}
        alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
      <h2>{product.name}</h2>
      <p style={{ color: '#666' }}>{product.description}</p>
      <p style={{ fontSize: '22px', fontWeight: 'bold' }}>₹{product.price}</p>
      <p>Category: {product.category} | Stock: {product.stock}</p>
      <button onClick={() => addToCart(product)}
        style={{ padding: '10px 24px', background: '#111', color: '#fff',
          border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '15px' }}>
        Add to Cart
      </button>
    </div>
  )
}