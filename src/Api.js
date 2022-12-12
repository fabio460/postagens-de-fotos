import { getJwt } from "./Uteis"

const apiBase = 'https://api-postagens-de-fotos.vercel.app/'
export const listPostsApi = ()=>{
   return fetch(apiBase+'listPost',{
    
   })
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
      console.log(res)
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
      console.log(res)
      return res
    })
    .catch(res=>{
      return res
    })
 }