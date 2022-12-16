import  React,{useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, CircularProgress, Divider, IconButton, ListItemButton, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { nameInitiais } from '../../Uteis';
import { UploadImage } from './UploadImage';
import { useDispatch, useSelector } from 'react-redux';

export default function Modal({UserLogged,setupdatePost,updatePost}) {
  const [open, setOpen] = React.useState(false)
  const [descricao, setDescricao] = useState('')
  const [Url, setUrl] = useState()
  const [Image, setImage] = useState()
  const [Loadding, setLoadding] = useState(false)
  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  const dispech = useDispatch()
  const createPost = async()=>{  
    if (descricao !== '' || Url) {
      setLoadding(true)
      UploadImage(Url,descricao,UserLogged.id,setupdatePost,updatePost,handleClose)
      setTimeout(() => {
        dispech({
          type:"atualiza",
          payload:{atualiza:!atualiza}
        })
      }, 1500);   
    }
 }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if (Url) {
      setImage(URL.createObjectURL(Url))
    }
  },[Url,updatePost])
  return (
    <div>
      <ListItemButton onClick={handleClickOpen} sx={{display:'flex',flexDirection:"column",alignItems:"flex-start"}}>
      <div className='Post_setPost' >
          <Avatar src={UserLogged.fotoDePerfil} sx={{mr:1}}>{nameInitiais(UserLogged.nome)}</Avatar>
          <div className='PostTittle'>{UserLogged.nome}</div>
      </div>
      <div className='Post_setPost' onClick={handleClickOpen}>
        <Divider sx={{mb:4}}/>
        <Typography>Escreva o que esta pensando ...</Typography>
      </div>
      </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Faça sua postagem "}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <TextField
                className='textarea'
                id="outlined-multiline-static"
                aria-expanded
                multiline
                rows={4}
                defaultValue={descricao}
                onChange={e=>setDescricao(e.target.value)}
                placeholder='Faça sua postagem'
                sx={{width:"100%"}}
            />
            <img src={Image} alt='sem imagem' style={{display:!Image && 'none',width:"100%",marginTop:"30px"}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden type={'file'} onChange={e=>setUrl(e.target.files[0])}/>
            <PhotoCamera />
            </IconButton>
            <button 
                className="btn btn-primary" 
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                onClick={createPost}
                disabled={Loadding?
                  true:
                  false
                }
            >
                {
                  Loadding?
                  <CircularProgress size={'small'} sx={{width:'20px',height:'20px',color:'white',margin:"0px 12px -5px 12px"}} />:
                  <div>Postar</div>
                }
                
            </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
