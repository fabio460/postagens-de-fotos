import { Avatar, Divider, IconButton, ListItemButton, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { getUser, listPostsApi, setComents, setLike } from '../../Api'
import RecommendIcon from '@mui/icons-material/Recommend';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import './Posts.css'
import {nameInitiais} from '../../Uteis'

import Modal from './Modal';
import BtnUpdateDelete from './btnUpdateDelete';
import { useDispatch, useSelector } from 'react-redux';
export default function Posts() {
  const [Posts, setPosts] = useState([])
  const [UserLogged, setUserLogged] = useState({})
  const [loadding, setLoadding] = useState(true)
  const [updatePost, setupdatePost] = useState(false)
  const [ComentOpen, setComentOpen] = useState({
    id:-1,
    condition:false
  })
  const [Message, setMessage] = useState('')
  const [Id_Post, setId_Post] = useState(-1)
  async function getListingPosts() {
    const p = await listPostsApi()
    const u = await getUser()
    setUserLogged(u)
    setPosts(p)
    setLoadding(false)

  }
  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  const like = (id)=>{
    setLike(UserLogged.id,id)
  }
  const coments = (id)=>{
    setComentOpen({
      id,
      condition:!ComentOpen.condition
    })
   
  }
  
  const MessageHandle = (id)=>{
    setComents(UserLogged.id,id,Message)
    setMessage("")
  }
  function MessageHandleEnter(e,id) {
    if(e === "Enter"){
      MessageHandle(id)
    }
  }
  useEffect(()=>{
    getListingPosts()
    
  },[atualiza,like,MessageHandle])
  
  

  return (
    <div className='Post'>
      <div>
        <img />
      </div>
  
      {
        loadding?
          <div>carregando ...</div>:
          <div className='PostContainer'>
            <div className='cards PostSeguidores'>
              meus seguidores
            </div>
            <div>
              <h1>Atividades</h1>
              <div className='cards'>
                <div style={{width:"100%",margin:"10px 0px 0px 0px"}}>
                  <Modal UserLogged={UserLogged} setupdatePost={setupdatePost} updatePost={updatePost}/>
                </div>
              </div>            
              <div className=''>
               
                {Posts.map(elem=>{
                  return <div className='cards'>
                    <div >
                      <div style={{display:'flex',justifyContent:"space-between"}}>
                        <div style={{display:'flex',alignItems:"center"}}>
                          <Avatar src={elem.Usuario?.fotoDePerfil} sx={{marginRight:"8px"}}>{nameInitiais(elem.Usuario?.nome)}</Avatar>
                          <span>{elem.Usuario?.nome}</span>
                          
                        </div>
                        <div>
                          {
                            elem.Usuario?.id === UserLogged?.id &&
                            <BtnUpdateDelete id={elem.id}/>
                          }
                        </div>
                      </div>
                      <div>{elem.descricao}</div>
                      <div><img src={elem.titulo} style={{display:elem.imagem = '' && 'none',width:"100%",maxHeight:"80%",marginTop:"30px"}}/></div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:"center"}}>
                        {
                          elem.Likes.length !== 0 && 
                          <Typography style={{padding:"10px 0px",display:'flex',alignItems:"center"}}>
                            <Tooltip title={
                              elem.Likes.map(e=>{
                                return <div>{e.Usuario.nome}</div>
                              })
                            }>
                               <RecommendIcon color='primary' sx={{marginRight:"3px"}}/>
                            </Tooltip>
                            {elem.Likes.length}
                          </Typography>
                          
                        }
                        <div>
                          {
                            elem.Comentarios.length === 0 ? 
                            <Typography>
                               <span></span>
                            </Typography>:
                            elem.Comentarios.length === 1 ?   
                            <Typography>
                              <span>{elem.Comentarios.length }</span> Comentario
                            </Typography>:
                            <Typography>
                              <span>{elem.Comentarios.length }</span> Comentarios
                            </Typography>
                          }
                          
                        </div>
                      </div>
                      <Divider sx={{marginBottom:"20px"}}/>
                      <div style={{display:'flex'}}>
                        <ListItemButton sx={{textAlign:"center",width:50}} onClick={()=>like(elem.id)}>
                          <ThumbUpOffAltIcon sx={{marginRight:"10px"}}/>
                          Curtir
                        </ListItemButton>
                        <ListItemButton sx={{textAlign:"center",width:50}}onClick={()=>coments(elem.id)}>
                          <ChatBubbleOutlineIcon sx={{marginRight:"10px"}} />
                          Comentar
                        </ListItemButton>
                      </div>
                      {
                        (ComentOpen.id === elem.id) &&
                        <div>
                            <div style={{display:'flex',alignItems:'center',margin:"16px"}}>
                              <Avatar src={UserLogged.fotoDePerfil} sx={{width:'30px',height:'30px',marginRight:'10px'}}></Avatar>
                              <div style={{
                                  background:'rgb(250, 250, 250)',
                                  padding:"5px 12px",
                                  borderRadius:'20px',
                                  width:'100%',
                                  display:'flex'
                                }}>
                                <input 
                                  style={{outline:'0',border:'none',background:'rgb(250, 250, 250)',width:'100%'}}
                                  placeholder='Escreva um comentário ...'
                                  onChange={e=>setMessage(e.target.value)}
                                  onKeyUp={e=> MessageHandleEnter(e.code,elem.id)}  
                                  value={Message}
                                />
                                <IconButton onClick={()=> MessageHandle(elem.id)}>
                                  <SendIcon/>
                                </IconButton>
                              </div>
                            </div>
                            <div>
                              {
                                elem.Comentarios.map(c=>{
                                  return (
                                    <div style={{display:'flex',alignItems:'center',margin:"16px"}}>
                                    <Avatar src={c.Usuario.fotoDePerfil} sx={{width:'30px',height:'30px',marginRight:'10px'}}></Avatar>
                                    <div style={{background:'rgb(250, 250, 250)',padding:"5px 12px",borderRadius:'20px',width:''}}>
                                      <div style={{outline:'0',border:'none',background:'rgb(250, 250, 250)',width:''}}>
                                        <div>{c.Usuario.nome}</div>
                                        <div>{c.body}</div>
                                      </div>
                                    </div>
                                  </div>
                                  ) 
                                })
                              }
                          </div>
                        </div>
                      }
                    </div>
                  </div> 
                })}
              </div>
            </div>
            <div className='cards PostPerfilCompleto'>Perfil completado</div>
          </div>
      }
    </div>
  )
}
