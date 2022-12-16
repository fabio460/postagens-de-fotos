import { Avatar, Badge, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUser } from '../../Api'
import './Perfil.css'
import { styled } from '@mui/material/styles';
import {nameInitiais} from '../../Uteis'
import BtnUpdatePhoto from './BtnUpdatePhoto';
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


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
 
  border: `2px solid ${theme.palette.background.paper}`,
}));
  return (
    <div>
      {
        loadding?
          <div>carregando ...</div>:
          <div>
            <div className='imageBack'>
              <div className='PerfilNome'>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right',background:'white' }}
                  badgeContent={
                    <BtnUpdatePhoto User={User}/>
                  }
                >
                  <Avatar sx={{height:'170px',width:'170px'}} src={User?.fotoPerfil}>
                   <div style={{fontSize:"45px"}}> {nameInitiais(User?.nome)}</div>
                  </Avatar>
                </Badge>
                <div >{User.nome}</div>         
              </div>
            </div>
        
          </div>
      }
    </div>
  )
}
