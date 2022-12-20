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

export default function Perfil() {
const [User, setUser] = useState({})
const [loadding, setLoadding] = useState(true)
const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
async function getUserInformatios() {
  const u = await getUser()
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
                <div className='PerfilCards'>fotos</div>
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
