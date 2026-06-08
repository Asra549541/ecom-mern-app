import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/register', form)
      login(data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div style={{ maxWidth:'400px', margin:'60px auto', padding:'24px',
      border:'1px solid #ddd', borderRadius:'8px' }}>
      <h2>Register</h2>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name"
          value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          required style={{ display:'block', width:'100%', marginBottom:'12px', padding:'10px', boxSizing:'border-box' }} />
        <input type="email" placeholder="Email"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          required style={{ display:'block', width:'100%', marginBottom:'12px', padding:'10px', boxSizing:'border-box' }} />
        <input type="password" placeholder="Password"
          value={form.password} onChange={e => setForm({...form, password: e.target.value})}
          required style={{ display:'block', width:'100%', marginBottom:'16px', padding:'10px', boxSizing:'border-box' }} />
        <button type="submit"
          style={{ width:'100%', padding:'10px', background:'#111', color:'#fff',
            border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'15px' }}>
          Create Account
        </button>
      </form>
      <p style={{ marginTop:'12px', textAlign:'center' }}>
        Have account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}