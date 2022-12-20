import  React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Badge, IconButton } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {  updatePhotoPerfil } from '../../Api';
import { UpdatePerfilFirebase } from './UpdatePerfilFirebase';
import { useDispatch, useSelector } from "react-redux";

export default function BtnUpdatePhoto({User}) {
  const [open, setOpen] = React.useState(false);
  const [Url, setUrl] = useState()
  const [Image, setImage] = useState()
  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  const dispech = useDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if (Url) {
        const i = URL.createObjectURL(Url)
        setImage(i)
    }
  },[Url])

  const imageStyle ={
    minWidth:"550px",
    "@media (max-width:500px)":{
        minWidth:"300px"
    }
  }

  const UpdatePhotoPerfil =async ()=>{
    UpdatePerfilFirebase(User?.id,Url)  
    handleClose()
  }

  return (
    <div>  
      <IconButton onClick={handleClickOpen}>
        <PhotoCameraIcon />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Troque sua foto"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             <img src={Image} alt='' style={imageStyle}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden type={'file'} onChange={e=>setUrl(e.target.files[0])}/>
            <PhotoCamera />
          </IconButton>
          <Button onClick={UpdatePhotoPerfil}>Confirmar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
