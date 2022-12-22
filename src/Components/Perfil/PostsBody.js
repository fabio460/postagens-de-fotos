import { Avatar, Divider, IconButton, ListItemButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { getUser, listPostsApi, setComents, setLike } from '../../Api'
import RecommendIcon from '@mui/icons-material/Recommend';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import './Perfil.css'
import {nameInitiais} from '../../Uteis'
import Modal from '../Posts/Modal';
import BtnUpdateDelete from '../Posts/btnUpdateDelete';
import { useDispatch, useSelector } from 'react-redux';
import ModalOpenPhoto from '../Posts/ModalOpenPhoto';
import MenuComentsUpdateAndDelete from '../Posts/MenuComentsUpdateAndDelete';
import { useNavigate } from 'react-router-dom';
export default function PostsBody({id_User}) {
  const [Posts, setPosts] = useState([])
  const [UserLogged, setUserLogged] = useState({})
  const [loadding, setLoadding] = useState(true)
  const [updatePost, setupdatePost] = useState(false)
  const [ComentOpen, setComentOpen] = useState({id:-1,condition:false})
  const [Message, setMessage] = useState('')
  const navigate = useNavigate()
  const dispeth = useDispatch()
  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  async function getListingPosts() {
    const p = await listPostsApi()
    const u = await getUser()
    const f = p?.filter(obj=>{
        if (id_User) {
          if (obj.Usuario.id === id_User) {
            return obj
        }
        } else {
          if (obj.Usuario.id === UserLogged.id) {
            return obj
          }         
        }
 
    })
    setUserLogged(u)
    setPosts(f)
    setLoadding(false)

  }

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
  },[atualiza,Message,like])
  
  function removeDuplicataArray(arr) {
     return [...new Set(arr)]
  }

  function ArrayNoDuplicate({arr}) {
    let aux = arr?.map(e=>{
      return e.Usuario.nome
    })
    const Arr = removeDuplicataArray(aux) 
    return<div>
      {Arr?.map(e=>{
        return <div>{e}</div>
      })}
    </div>
  }
 
  const getIdUserSelected = (id_selected)=>{
    localStorage.setItem('idUserSelected',id_selected)
    navigate('/perfilUsers')
    dispeth({
      type:'atualiza',
      payload:{atualiza:!atualiza}
    })
   
  }
  return (
    <div className=''>  
      {
        loadding?
          <div>carregando ...</div>:
          <div className=''>
            <div>
              <h1 style={{marginTop:'15px'}}>Postagens</h1>
              <div className=''>
              { !id_User &&
                <div className='cards'>
                  <div style={{width:"100%",margin:"10px 0px 0px 0px"}}>
                    <Modal UserLogged={UserLogged} setupdatePost={setupdatePost} updatePost={updatePost}/>
                  </div>
                </div> 
              }               
                {Posts.length ? Posts.map(elem=>{
                  return <div className='cards'>
                    <div >
                      <div style={{display:'flex',justifyContent:"space-between"}}>
                        <div style={{display:'flex',alignItems:"center"}}>
                          <Avatar 
                            src={elem.Usuario?.fotoDePerfil}
                            sx={{marginRight:"8px",cursor:'pointer'}}
                            onClick={()=> getIdUserSelected(elem.Usuario.id)}
                          >
                            {nameInitiais(elem.Usuario?.nome)}
                          </Avatar>                          
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
                      <div>
                        {
                          elem.title !== "" &&
                          <ModalOpenPhoto elem={elem}/>
                        }
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:"center"}}>
                        {
                          elem.Likes.length !== 0 ? 
                          <Typography style={{padding:"10px 0px",display:'flex',alignItems:"center"}}>
                            <Tooltip title={
                              elem.Likes.map(e=>{
                                return <div style={{cursor:'pointer'}} onClick={()=> getIdUserSelected(e.Usuario.id)}>{e.Usuario.nome}</div>
                              })
                            }>
                              <RecommendIcon color='primary' sx={{marginRight:"3px"}}/>
                            </Tooltip>
                            {elem.Likes.length}
                          </Typography>:
                          <Typography style={{padding:"20px 0px",display:'flex',alignItems:"center"}}></Typography>
                        }

                        <div>
                          {
                            elem.Comentarios.length === 0 ? 
                            <Typography>
                               <span></span>
                            </Typography>:
                            elem.Comentarios.length === 1 ?   
                            <Typography sx={{display:'flex'}}>  
                              <span style={{marginRight:'3px'}}>{elem.Comentarios.length }</span> 
                              <span>
                                <Tooltip title={
                                    elem.Comentarios.map(e=>{
                                      return <div>{e.Usuario.nome}</div>
                                    })
                                  }>
                                    <div>comentario</div>
                                  </Tooltip>
                              </span>
                            </Typography>:
                            <Typography sx={{display:'flex'}}>
                              <span style={{marginRight:'3px'}}>{elem.Comentarios.length }</span> 
                              <span>
                                <Tooltip title={
                                    <ArrayNoDuplicate arr = {elem.Comentarios}/>  
                                  }>
                                    <div>comentarios</div>
                                </Tooltip>
                              </span>
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
                              <Avatar src={UserLogged.fotoDePerfil} sx={{width:'30px',height:'30px',marginRight:'10px'}}>
                                {nameInitiais(UserLogged.nome)}
                              </Avatar>
                              
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
                                    <Avatar 
                                      src={c.Usuario.fotoDePerfil} 
                                      sx={{width:'30px',height:'30px',marginRight:'10px'}}
                                      style={{cursor:'pointer'}} onClick={()=> getIdUserSelected(c.Usuario.id)}
                                    >
                                      
                                      {nameInitiais(c.Usuario.nome)}
                                    </Avatar>                                   
                                    <div style={{background:'rgb(250, 250, 250)',padding:"5px 12px",borderRadius:'20px',width:''}}>
                                      <div style={{outline:'0',border:'none',background:'rgb(250, 250, 250)',width:''}}>
                                        <div>{c.Usuario.nome}</div>
                                        <div>{c.body}</div>
                                      </div>
                                    </div>
                                    {
                                      UserLogged.id === c.Usuario.id &&
                                      <div>
                                        <MenuComentsUpdateAndDelete 
                                          id={c.id} 
                                          id_Postagems={c.id_Postagems}
                                          body={c.body}
                                          id_Usuarios={c.id_Usuarios} 
                                        />
                                      </div>
                                    }
                                  </div>
                                  ) 
                                })
                              }
                          </div>
                        </div>
                      }
                    </div>
                  </div> 
                }):<div style={{textAlign:'center'}}>Não ha postagens</div>
              }
              </div>
            </div>
          </div>
      }
    </div>
  )
}
