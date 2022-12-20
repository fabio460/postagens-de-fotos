import { Avatar, Badge, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUser, getUserById, updateUser } from '../../Api'

import { styled } from '@mui/material/styles';
import {nameInitiais} from '../../Uteis'
import BtnUpdatePhoto from '../Perfil/BtnUpdatePhoto';
import { useSelector } from 'react-redux';
import AvatarGroup from '@mui/material/AvatarGroup';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PostsBody from '../Perfil/PostsBody';
import BtnUpdateElements from '../Perfil/BtnUpdateElements';
import PhotoList from '../Perfil/PhotoList';
import { useNavigate } from 'react-router-dom';

export default function PerfilUsers() {
const [User, setUser] = useState({})
const [idUserLogged, setIdUserLogged] = useState()
const [loadding, setLoadding] = useState(true)
const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
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
useEffect(()=>{
  getUserInformatios()
},[atualiza])


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
 
  border: `2px solid ${theme.palette.background.paper}`,
}));
  return (
    <div className='Perfl'>
      {
        loadding?
          <div>carregando ...</div>:
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
                    <div className='PerfilDadosItems'>seguidores</div>   
                    <div className='PerfilDadosItems'>amigos</div> 
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
                      <Avatar sx={{width:30,height:30}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      <Avatar sx={{width:30,height:30}} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <Avatar sx={{width:30,height:30}} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                      <Avatar sx={{width:30,height:30}} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                      <Avatar sx={{width:30,height:30}} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>  
                  </div>   
                  <div className='PerfilDadosItems'>amigos</div>  
                </div>    
                <div className='PerfilButtonsEditPerfil'>
                
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
                {User.Postagems.length > 0 && <div className='PerfilCards'>
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
