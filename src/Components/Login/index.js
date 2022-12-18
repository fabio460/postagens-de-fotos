import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Checkbox, CircularProgress, FormControl, FormControlLabel, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../../Api'
import './Login.css'
export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const [Loadding, setLoadding] = useState(false)
  const [Logged, setLogged] = useState(true)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate()
  const logar =async ()=>{
    setLoadding(true)
    let logged = await loginApi(email,senha)
     if (logged) {
      navigate('/')
     }else{
       setLogged(false)
     }
     setLoadding(false)
  }
  return (
    <div className='LoginContainer'>
      <div className='LoginLeft'></div>
      <div className='LoginRight'>
        <h1>Alo!</h1>
        <h1 style={{color:'blue'}}>Seja bem vindo</h1>
        <h1 style={{textAlign:"center",margin:"50px 0px"}}>
          <span style={{color:'blue'}}>Logue </span>
          em sua conta
        </h1>
        <TextField 
          id="input-with-sx" 
          error={!Logged && true}
          label="Usuário" 
          variant="standard" 
          onChange={e=>setEmail(e.target.value)}
        />
        <FormControl sx={{ margin:"15px 0px",width: '100%' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            error={!Logged && true}
            type={showPassword ? 'text' : 'password'}
            onChange={e=>setSenha(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {
          !Logged && <div style={{color:'red'}}>Usuario ou senha inválidos</div>
        }
        <FormControlLabel control={<Checkbox  />} label="Lembrar senha" />
        <button className='btn btn-primary mt-3' onClick={logar}>
          {Loadding?
            <CircularProgress size={'small'} sx={{width:'20px',height:'20px',color:'white',margin:"0px 12px -5px 12px"}} />:
            <div>Logar</div>
          }
        </button>
        <Link to={'/register'} style={{textDecoration:'none',textAlign:'center',marginTop:"10px"}}>Criar conta</Link>
      </div>
    </div>
  )
}
