import { TextField } from '@mui/material'
import React, { useState } from 'react'
import './Register.css'
import { inputValid } from '../../Uteis'
import { register } from '../../Api'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  
  const [Nome, setNome] = useState('')
  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')  
  const [NameInvalid, setNameInvalid] = useState(false)
  const [EmailInvalid, setEmailInvalid] = useState(false)
  const [PassWodInvalid, setPassWodInvalid] = useState(false)
  const navigate = useNavigate()
    const RegisterUser = async()=>{
     if (!inputValid.nameValid(Nome)) {
      setNameInvalid(true)
     }else{
      setNameInvalid(false)
      if (!inputValid.emailValid(Email)) {
        setEmailInvalid(true)
      } else {
        setEmailInvalid(false)
        if (!inputValid.passWordValid(Senha)) {
          setPassWodInvalid(true)
        } else {
          setPassWodInvalid(false)
          const r = await register(Nome,Email,Senha)
          if (r) {
            alert('cadastrado com sucesso')
            navigate('/login')
          } else {
            alert('falha ao cadastrar')
          }
      
        }
      } 
     } 
    
  }
  return (
    <div>
        <div className='Register'>
          <div className='RegisterLeft'></div>
          <div className='RegisterRight'>
            <h1>Cadastre-se</h1>
            <TextField 
                id="input-with-sx" 
                label="Nome" 
                variant="standard" 
                onChange={e=>setNome(e.target.value)}
                placeholder='No mínimo 3 caracteres'
            />
            {NameInvalid &&
              <div style={{color:'red'}}>Pelo menos 3 caracteres</div>
            }   
            <TextField 
                id="input-with-sx" 
                label="Email" 
                variant="standard" 
                sx={{margin:"15px 0px"}}
                onChange={e=>setEmail(e.target.value)}
                placeholder='exemplo fulano@gmail.com'
            />  
            {EmailInvalid &&
              <div style={{color:'red'}}>Email inválido, ex: fulano@gmail.com</div>
            }  
            <TextField 
                id="input-with-sx" 
                label="Senha" 
                variant="standard" 
                onChange={e=>setSenha(e.target.value)}
                placeholder='No mínimo 5 caracteres, 1 numero e 1 maiúsculo'
            />  
           {PassWodInvalid &&
              <div style={{color:'red'}}>Mínimo 5 caracter, 1 numero e 1 maiúsculo</div>
            }  
            <button className='btn btn-primary mt-4' onClick={RegisterUser}>Cadastrar</button>
          </div>
        </div>
    </div>
  )
}

