import { Avatar, Divider, IconButton, ListItemButton, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUser, listPostsApi } from '../../Api'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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
  async function getListingPosts() {
    const p = await listPostsApi()
    const u = await getUser()
    setUserLogged(u)
    setPosts(p)
    setLoadding(false)
  }
  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  useEffect(()=>{
    getListingPosts()

  },[atualiza])
 
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
              teste {process.env.REACT_APP_TESTE}
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
                          <BtnUpdateDelete id={elem.id}/>
                        </div>
                      </div>
                      <div>{elem.descricao}</div>
                      <div><img src={elem.titulo} style={{display:elem.imagem = '' && 'none',width:"100%",maxHeight:"80%",marginTop:"30px"}}/></div>
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
