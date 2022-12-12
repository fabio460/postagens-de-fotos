import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { nameInitiais } from '../../Uteis';
import { Avatar, Divider, IconButton, ListItemButton, TextField } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export default function ModalPost({UserLogged}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <div>
    //     <ListItemButton onClick={handleClickOpen} sx={{width:"100%"}}>
    //         <Avatar sx={{m:1}}>{nameInitiais(UserLogged.nome)}</Avatar>
    //         <div className='PostTittle'>Faça seu postagem!</div>
    //     </ListItemButton>
    //   <Dialog
     
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="alert-dialog-title"
    //     aria-describedby="alert-dialog-description"
        
    //   >
    //     <DialogTitle id="alert-dialog-title">
    //       <div style={{display:'flex',justifyContent:'space-between'}}>
    //         <div>{"Postar comentário"}</div>
    //         <IconButton SX={{width:"60px"}}> x </IconButton>
    //       </div>
    //       <Divider/>
    //     </DialogTitle>
    //     <DialogContent sx={{width:'400px'}}>
    //       <DialogContentText id="alert-dialog-description">
    //         <div className='Post_setPost'>
    //             <Avatar sx={{m:1}}>{nameInitiais(UserLogged.nome)}</Avatar>
    //             <div className='PostTittle'>{UserLogged.nome}</div>
    //         </div>
           
    //         <Divider/>
    //         <TextField
    //             className='textarea'
    //             id="outlined-multiline-static"
    //             aria-expanded
    //             multiline
    //             rows={4}
    //             defaultValue=""
    //             placeholder='Faça sua postagem'
    //             sx={{width:"100%"}}
    //             />
    //          {/* <textarea placeholder='Faça sua postagem' />    */}
    //       </DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
         
    //       <Button onClick={handleClose} autoFocus variant='contained'>
    //         Postar
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </div>


    <div >
       <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">Faça sua postagem</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                <TextField
                    className='textarea'
                    id="outlined-multiline-static"
                    aria-expanded
                    multiline
                    rows={4}
                    defaultValue=""
                    placeholder='Faça sua postagem'
                    sx={{width:"100%"}}
                />
                </div>
                <div class="modal-footer">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                    </IconButton>
                    <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-dismiss="modal">Postar</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
     
        </div>
        <div class="" data-bs-toggle="modal" href="#exampleModalToggle" role="button">
            <ListItemButton className='Post_setPost'>
                 <Avatar sx={{m:1}}>{nameInitiais(UserLogged.nome)}</Avatar>
                 <div className='PostTittle'>{UserLogged.nome}</div>
            </ListItemButton>
        </div>
    </div>
  );
}
