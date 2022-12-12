import { Avatar, Divider, IconButton, ListItemButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUser, listPostsApi } from '../../Api'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './Posts.css'
import {nameInitiais} from '../../Uteis'
import ModalPost from './ModalPost';
export default function Posts() {
  const [Posts, setPosts] = useState([])
  const [UserLogged, setUserLogged] = useState({})
  const [loadding, setLoadding] = useState(true)
  async function getListingPosts() {
    const p = await listPostsApi()
    const u = await getUser()
    setUserLogged(u)
    setPosts(p)
    setLoadding(false)
  }
  useEffect(()=>{
    getListingPosts()
  },[])
  return (
    <div className='Post'>
      {
        loadding?
          <div>carregando ...</div>:
          <div className='PostContainer'>
            <div className='cards'>
              meus seguidores
            </div>
            <div>
              <h1>Atividades</h1>
              <div className='cards'>
                
                <div style={{width:"100%"}}>
                  <ModalPost UserLogged={UserLogged} />
                </div>
                
                <Divider/>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
              </div>            
              <div className=''>
                {Posts.map(elem=>{
                  return <div className='cards'>
                    <div>
                      <Avatar>{nameInitiais(elem.Usuario.nome)}</Avatar>
                      <span>{elem.Usuario.nome}</span>
                      <div>{elem.descricao}</div>
                    </div>
                  </div> 
                })}
                {/* {JSON.stringify(Posts)} */}
              </div>
            </div>
            <div className='cards'>Perfil completado</div>
          </div>
      }
    </div>
  )
}
