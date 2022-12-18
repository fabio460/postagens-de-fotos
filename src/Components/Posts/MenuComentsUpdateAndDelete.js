
import React,{useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import { deleteComents, updateComents } from '../../Api';


export default function MenuComentsUpdateAndDelete({id_Usuarios,id,body,id_Postagems}) {
    const [Body, setBody] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const deleteMessage = ()=>{
    deleteComents(id_Usuarios,id_Postagems,id)
    handleClose()
  }
  useEffect(()=>{
    setBody(body)
  },[])

  const  updateMessage = ()=>{
    updateComents(id,id_Usuarios,id_Postagems,Body)
    handleClose()
  }

  const MessageHandleEnter = (e)=>{
     if (e === 'Enter') {
        updateMessage()
     }
  }
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={deleteMessage}>Deletar</MenuItem>
        {/* <MenuUpdateComent 
          handleCloseMenu={handleClose}
          id={id}
          id_Postagems={id_Postagems}
          id_Usuarios={id_Usuarios}
          body={body}  
        /> */}
        <div>
        <div style={{
            background:'rgb(250, 250, 250)',
            padding:"5px 12px",
            borderRadius:'20px',
            width:'100%',
            display:'flex'
        }}>
            <input 
                style={{outline:'0',border:'none',background:'rgb(250, 250, 250)',width:'100%'}}
                placeholder='Escreva um comentário ...'
                onChange={e=>setBody(e.target.value)}
                value={Body}
              onKeyUp={e=> MessageHandleEnter(e.code,id)}  
              
            />
            <IconButton onClick={()=> updateMessage()}>
                <SendIcon/>
            </IconButton>
        </div>
        </div>
        <MenuItem onClick={handleClose}>Cancelar</MenuItem>
      </Menu>
    </div>
  );
}
