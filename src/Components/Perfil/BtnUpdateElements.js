import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { getUser, updateUser } from '../../Api';
import { useDispatch, useSelector } from 'react-redux';

export default function BtnUpdateElements() {
  const [open, setOpen] = React.useState(false);
  const [User, setUser] = useState({})
  const [loadding, setLoadding] = useState(true)
  const [Nome, setNome] = useState('')
  const [Email, setEmail] = useState('')
  const [Idade, setIdade] = useState()
  const [Profissao, setProfissao] = useState('')
  const dispech = useDispatch()
  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

async function getUserInformatios() {
  const u = await getUser()
  setNome(u.nome)
  setEmail(u.email)
  setIdade(u.idade)
  setProfissao(u.proficao)
  setUser(u)
  setLoadding(false)
}
useEffect(()=>{
  getUserInformatios()
  
},[])

const update = ()=>{
    if (Nome !== "" && Idade !== "" && Profissao !== "") {
        updateUser(User.id,Nome,Email,Idade,Profissao)
    }
    dispech({
        type:"atualiza",
        payload:{atualiza:!atualiza}
      })
    handleClose()
    window.location.reload()
}
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{width:"100%"}}>
        Editar perfil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Atualize seus dados"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText 
                id="alert-dialog-description" 
                sx={{display:'flex',flexDirection:'column',padding:'10px'}}       
            >
                <TextField onChange={e=>setNome(e.target.value)} defaultValue={User.nome} label="Nome" size='small' sx={{mb:1}}/>
                <TextField onChange={e=>setIdade(e.target.value)} defaultValue={User.idade} label={"Idade"} variant="outlined" size='small' sx={{mb:1}}/>
                <TextField onChange={e=>setProfissao(e.target.value)} defaultValue={User.proficao} label={"Profissão"} size='small' sx={{mb:1}}/>
                <TextField onChange={e=>setEmail(e.target.value)} defaultValue={User.email} label={"Email"} size='small' sx={{mb:1}}/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={update}>atualizar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
