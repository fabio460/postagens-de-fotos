import { getJwt } from "./Uteis"

const apiBase = 'https://api-postagens-de-fotos.vercel.app/'
export const listPostsApi = ()=>{
   return fetch(apiBase+'listPost')
   .then(res=>res.json())
} 

export const loginApi = (email,senha)=>{
  
  return fetch(apiBase+'login',{
       method:'post',
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify({
         email,senha
       })
    })
    .then(res=>res.json())
    .then(res=>{
      localStorage.setItem('jwt',JSON.stringify(res))
      return res
    })
    .catch(res=>console.log(res))
 } 

 export const getUser = ()=>{
   return fetch(apiBase+'getUser',{
      method:'post',
      headers:{
         "Content-Type":"application/json",
         "x-access-token":getJwt()?.JWT
       },
      body:JSON.stringify({
         id:getJwt()?.user
      })
    })
    .then(res=>res.json())
    .then(res=>{
      return res
    })
    .catch(res=>{
      return res
    })
 }

 export const getUserById = (Id)=>{
  return fetch(apiBase+'getUser',{
     method:'post',
     headers:{
        "Content-Type":"application/json",
        "x-access-token":getJwt()?.JWT
      },
     body:JSON.stringify({
        id:Id
     })
   })
   .then(res=>res.json())
   .then(res=>{
     return res
   })
   .catch(res=>{
     return res
   })
}

 export const updateUser = (id,nome,email,idade,proficao)=>{
  return fetch(apiBase+'updateUser',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({
      id,
      nome,
      email,
      idade,
      proficao
    })
  })
  .then(res=>res.json())
} 

 export const setPost = (imagem,titulo,descricao,id_Usuarios)=>{
  return fetch(apiBase+'createPostagem',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({
      imagem,titulo,descricao,id_Usuarios
    })
  })
  .then(res=>res.json())
} 

export const deletePost = (id)=>{
  return fetch(apiBase+'deletePost',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"DELETE",
    body:JSON.stringify({
      id
    })
  })
  .then(res=>res.json())
} 


export const getPotById = (id)=>{
  return fetch(apiBase+'getPostById',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({
      id
    })
  })
  .then(res=>res.json())
} 

export const register = (nome,email,senha)=>{
  return fetch(apiBase+'createUser',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({
      nome,email,senha
    })
  })
  .then(res=>res.json())
} 


export const updatePhotoPerfil = (fotoDePerfil,id)=>{
  return fetch(apiBase+'updateImagePerfil',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({
      id,
      fotoDePerfil,
    })
  })
  .then(res=>res.json())
  .catch(res=>console.log(res))
} 

export const setLike = (id_Usuarios, id_Postagems )=>{
  return fetch(apiBase+'setLikes',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({
      id_Usuarios, id_Postagems 
    })
  })
  .then(res=>res.json())
} 

export const setComents = (id_Usuarios, id_Postagems, body )=>{
  return fetch(apiBase+'setComentarios',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({
      id_Usuarios, id_Postagems , body
    })
  })
  .then(res=>res.json())
} 

export const updateComents = (id,id_Usuarios, id_Postagems, body )=>{
  return fetch(apiBase+'updateComentarios',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"put",
    body:JSON.stringify({
      id,
      id_Usuarios,
      id_Postagems,
      body
    })
  })
  .then(res=>res.json())
} 

export const deleteComents = (id_Usuarios, id_Postagems, id )=>{
  return fetch(apiBase+'deleteComentarios',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"delete",
    body:JSON.stringify({
      id,
      id_Usuarios,
      id_Postagems,
    })
  })
  .then(res=>res.json())
} 

export const getSeguidores = (id_Usuarios, id_Seguidor )=>{
  return fetch(apiBase+'getSeguidore',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({
      id_Usuarios, id_Seguidor
    })
  })
  .then(res=>res.json())
} 

export const Seguir = (id_Usuarios, id_Seguidor )=>{
  return fetch(apiBase+'seguir',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify({
      id_Usuarios, id_Seguidor
    })
  })
  .then(res=>res.json())
} 