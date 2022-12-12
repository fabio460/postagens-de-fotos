import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../Api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()
  const logar =async ()=>{
    let logged = await loginApi(email,senha)
  
     if (logged.user) {
      navigate('/')
     }
  }
  return (
    <div>
        <input onChange={e=>setEmail(e.target.value)}/>
        <input onChange={e=>setSenha(e.target.value)}/>
        <button onClick={logar}>logar</button>
    </div>
  )
}
