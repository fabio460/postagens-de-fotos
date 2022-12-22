import { Avatar, Badge, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUser, updateUser } from '../../Api'
import './Perfil.css'
import { styled } from '@mui/material/styles';
import {nameInitiais} from '../../Uteis'
import BtnUpdatePhoto from './BtnUpdatePhoto';
import { useSelector } from 'react-redux';
import AvatarGroup from '@mui/material/AvatarGroup';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PostsBody from './PostsBody';
import BtnUpdateElements from './BtnUpdateElements';
import PhotoList from './PhotoList';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
const [User, setUser] = useState({})
const [loadding, setLoadding] = useState(true)
const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
const navigate = useNavigate()
async function getUserInformatios() {
  const u = await getUser()
  setUser(u)
  setLoadding(false)
}
useEffect(()=>{
  getUserInformatios()
  //console.log(User)
},[atualiza])


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
 
  border: `2px solid ${theme.palette.background.paper}`,
}));

const getIdUserSelected = (id_selected)=>{
  localStorage.setItem('idUserSelected',id_selected)
  navigate('/perfilUsers')
}
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
                  badgeContent={
                    <BtnUpdatePhoto User={User}/>
                  }
                >
                  <Avatar sx={{height:'170px',width:'170px'}} src={User?.fotoDePerfil} alt='sem imagem'>
                   <div style={{fontSize:"45px"}}> {nameInitiais(User?.nome)}</div>
                  </Avatar>
                </Badge>
                <div className='PerfilDadosMibile'>
                  <div>
                    <h1 className='PerfilDadosItems'>{User.nome}</h1>
                    <div className='PerfilDadosItems'>{User.seguidores.length} seguidor(es)</div>   
                    <div className='PerfilDadosItems'>amigos</div> 
                  </div>
                </div>
              </div>
              <div className='PerfilDados'>
                <div>
                  <h1 className='PerfilDadosItems'>{User.nome}</h1>
                  <div className='PerfilDadosItems'>{User.seguidores.length}  Seguidor(es)</div> 
                  <div className='PerfilDadosItems'>
                    <AvatarGroup max={4}   sx={{display:'flex',justifyContent:'start',
                      '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                    }}>
                      { 
                         User.seguidores.map((s,key)=>{
                          return <Avatar 
                            sx={{width:30,height:30,cursor:'pointer'}} 
                            alt="Remy Sharp" 
                            src={s.Usuario.fotoDePerfil} 
                            onClick={()=>getIdUserSelected(s.Usuario.id)}
                            >{nameInitiais(s.Usuario.nome)}</Avatar>
                         })
                      }
                    </AvatarGroup>  
                  </div>    
                </div>    
                <div className='PerfilButtonsEditPerfil'>
                  <BtnUpdateElements/>
                </div>   
              </div>
            </div>
            <div className='PerfilBody'>
              <div>
                <div className='PerfilCards PerfilCardLft'>
                  <BtnUpdateElements/>
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
                <PostsBody/>
              </div>
            </div>
          </div>
      }
    </div>
  )
}
