import React,{useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import { getUser } from '../Api';
import { getJwt } from '../Uteis';


export default function PrivateRoutes({children}) {
  const [Loading, setLoading] = useState(true) 
  const [Autenticate, setAutenticate] = useState(false) 

  async function Authenticade() {
    const p = await getUser()
    if (p && getJwt()) {
      setLoading(false)
      setAutenticate(true)
    } else {
      setLoading(false)
      setAutenticate(false)
    }
  }
  useEffect(()=>{
    Authenticade()
  },[Loading])
  
  return (
    <div>{
        Loading 
          ?
           <h3 style={{ display: 'flex',justifyContent:'center',alignItems:'center',height:300 }}>carregando...</h3>
          :
          Autenticate
            ?
              children
            :
              <Navigate to={'/login'}/>
    }</div>
  )
}
