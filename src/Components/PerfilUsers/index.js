import { Avatar, Badge, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSeguidores, getUser, getUserById, Seguir, setSeguidores, updateUser } from '../../Api'

import { styled } from '@mui/material/styles';
import {nameInitiais} from '../../Uteis'
import BtnUpdatePhoto from '../Perfil/BtnUpdatePhoto';
import { useDispatch, useSelector } from 'react-redux';
import AvatarGroup from '@mui/material/AvatarGroup';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PostsBody from '../Perfil/PostsBody';
import BtnUpdateElements from '../Perfil/BtnUpdateElements';
import PhotoList from '../Perfil/PhotoList';
import { useNavigate } from 'react-router-dom';
import Loadding from '../Loadding';

export default function PerfilUsers() {
const [User, setUser] = useState({})
const [idUserLogged, setIdUserLogged] = useState()
const [loadding, setLoadding] = useState(true)
const [Follow, setFollow] = useState(false)
const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
const dispeth = useDispatch()
const navigate = useNavigate()
const idUserSelected = parseInt(localStorage.getItem('idUserSelected'))
if (!idUserSelected || idUserSelected === idUserLogged) {
  navigate('/perfil')
}
async function getUserInformatios() {
  const userLogged = await getUser()
  setIdUserLogged(userLogged.id)
  const u = await getUserById(parseInt(idUserSelected)) || await getUser()
  setUser(u)
  setLoadding(false)
} 

function BtnFollow() {
  const f = User.seguidores.filter(e=>{
    if (e.id_Seguidor === idUserLogged && e.id_Usuarios === idUserSelected) {
      return true
    } else {
      return false
    }
  })
  return<div>
    {f.length === 0 ? 
      <Button color='primary' variant='outlined' onClick={SetSeguidores}>seguir</Button>:
      <Button color='primary' variant='outlined' onClick={SetSeguidores}>deixar de seguir</Button>
    }
  </div>
}

useEffect(()=>{
  getUserInformatios()
  
},[atualiza,Follow])


const getIdUserSelected = (id_selected)=>{
  localStorage.setItem('idUserSelected',id_selected)
  navigate('/perfilUsers')
  setFollow(!Follow)
  //window.location.reload()
}

const SetSeguidores = async()=>{
    const s = await Seguir(idUserSelected,idUserLogged)
    dispeth({
      type:'atualiza',
      payload:{atualiza:!atualiza}
    })
}
  return (
    <div className='Perfl'>
      {
        loadding?
        <Loadding/>:
          <div>
            <div className='imageBack'>
              
              <div className='PerfilNome'>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right',background:'white' }}  
                 
                >
                  <Avatar sx={{height:'170px',width:'170px'}} src={User?.fotoDePerfil} alt='sem imagem'>
                   <div style={{fontSize:"45px"}}> {nameInitiais(User?.nome)}</div>
                  </Avatar>
                </Badge>
                <div className='PerfilDadosMibile'>
                  <div>
                    <h1 className='PerfilDadosItems'>{User.nome}</h1>
 
                    <div className='PerfilDadosItems' style={{display:'flex',flexDirection:'column',justifyContent:'space-between',margin:'40px 0px', height:70}}>
                      <AvatarGroup max={4}   sx={{display:'flex',justifyContent:'start',
                        '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                      }}>
                        { 
                          User?.seguidores?.map((s,key)=>{
                            return <Avatar 
                              
                              sx={{width:30,height:30,cursor:'pointer',bgcolor:'green'}} 
                              alt="Remy Sharp" 
                              src={s.Usuario.fotoDePerfil} 
                              onClick={()=>getIdUserSelected(s.Usuario.id)}
                              >{nameInitiais(s.Usuario.nome)}</Avatar>
                          })
                        }
                      </AvatarGroup>
                      <BtnFollow/>      
                    </div> 
                  </div>
                </div>
              </div>
              <div className='PerfilDados'>
                <div>
                  <h1 className='PerfilDadosItems'>{User.nome}</h1>
                  <div className='PerfilDadosItems'>
                    <AvatarGroup max={4}   sx={{display:'flex',justifyContent:'start',
                      '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                    }}>
                      { 
                         User?.seguidores?.map((s,key)=>{
                          return <Avatar 
                            
                            sx={{width:30,height:30,cursor:'pointer',bgcolor:'green'}} 
                            alt="Remy Sharp" 
                            src={s.Usuario.fotoDePerfil} 
                            onClick={()=>getIdUserSelected(s.Usuario.id)}
                            >{nameInitiais(s.Usuario.nome)}</Avatar>
                         })
                      }
                    </AvatarGroup>  
                  </div>   
                  <div className='PerfilDadosItems'>{User?.seguidores.length}  Seguidor(es)</div>  
                </div>    
                <div className='PerfilButtonsEditPerfil'>
                  <BtnFollow/>
                </div>   
              </div>
            </div>
            <div className='PerfilBody'>
              <div>
                <div className='PerfilCards PerfilCardLft'>
                 
                  {User.proficao && 
                  <Typography sx={{mt:2}}> 
                    <WorkIcon/>  {User?.proficao}
                  </Typography>}
                  {User.idade &&
                  <Typography sx={{margin:"10px px"}}>
                    <DonutSmallIcon/> {User?.idade} anos
                  </Typography>}
                  <Typography sx={{margin:"10px px"}}>
                    <AlternateEmailIcon/> {User?.email}
                  </Typography>
                </div>
                {User.Postagems?.length > 0 && <div className='PerfilCards'>
                  <PhotoList User={User}/>
                </div>}
              </div>
              <div className='PerfilCardsContent'>
                  <PostsBody id_User={ idUserSelected}/>   
              </div>
            </div>
          </div>
      }
    </div>
  )
}
