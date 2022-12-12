import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUser } from '../../Api'
import './Perfil.css'
export default function Perfil() {
const [User, setUser] = useState({})
const [loadding, setLoadding] = useState(true)
async function getUserInformatios() {
  const u = await getUser()
  setUser(u)
  setLoadding(false)
}
useEffect(()=>{
  getUserInformatios()
},[])
  return (
    <div>
      {
        loadding?
          <div>carregando ...</div>:
          <div>
            <div className='imageBack'>
              <div className='PerfilNome'>
                <Avatar sx={{height:'200px',width:'200px'}}></Avatar>
                <div >{User.nome}</div>         
              </div>
            </div>
        
          </div>
      }
    </div>
  )
}
