import { Avatar, Divider, IconButton, ListItemButton, Tooltip, Typography } from '@mui/material'
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
import { useSelector } from 'react-redux';
import ModalOpenPhoto from './ModalOpenPhoto';
import MenuComentsUpdateAndDelete from './MenuComentsUpdateAndDelete';
import { useNavigate } from 'react-router-dom';
import { GrafPerfilCompleted } from './GrafPerfilCompleted';
import Loadding from '../Loadding';


export default function Posts() {
  const [Posts, setPosts] = useState([])
  const [UserLogged, setUserLogged] = useState({})
  const [loadding, setLoadding] = useState(true)
  const [updatePost, setupdatePost] = useState(false)
  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  const [ComentOpen, setComentOpen] = useState({id:-1,condition:false})
  const [Message, setMessage] = useState('')
  const navigate = useNavigate()


  async function getListingPosts() {
    const p = await listPostsApi()
    const u = await getUser()
    setUserLogged(u)
    setPosts(p)
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
    //console.log(UserLogged)
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
        return <div >{e}</div>
      })}
    </div>
  }
  const getIdUserSelected = (id_selected)=>{
    localStorage.setItem('idUserSelected',id_selected)
    navigate('/perfilUsers')
  }
  return (
    <div className='Post'>
      {
        loadding?
          <Loadding/>:
          <div className='PostContainer'>
            <div className='cards PostSeguidores '>
            <h5 style={{marginBottom:'25px'}}>Seguidores</h5>
              {
                UserLogged.seguidores.map(e=>{
                  return <div 
                       style={{display:'flex',alignItems:'center',height:'50px',cursor:'pointer'}}
                       onClick={()=> getIdUserSelected(e.Usuario.id)}
                    >
                    <Avatar src={e.Usuario.fotoDePerfil} sx={{marginRight:'5px'}}>{nameInitiais(e.Usuario.nome)}</Avatar>
                    <h5>{e.Usuario.nome}</h5>
                  </div>
                })
              }
            </div>
            <div>
              <h1 style={{marginTop:'15px'}}>Atividades</h1>
              <div className='PostBody'>
              <div className='cards'>
                <div style={{width:"100%",margin:"10px 0px 0px 0px"}}>
                  <Modal UserLogged={UserLogged} setupdatePost={setupdatePost} updatePost={updatePost}/>
                </div>
              </div>                
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
                }):<div style={{textAlign:'center'}}>Atualize a tela ou aguarde o banco de dados retornar</div>
              }
              </div>
            </div>
            <div className='cards PostPerfilCompleto'>
              <GrafPerfilCompleted UserLogged={UserLogged}/>
            </div>
          </div>
      }
    </div>
  )
}
