import  React,{useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgress, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { removeImage } from './RemoveImage';
export default function BtnUpdateDelete({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Loadding, setLoadding] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const atualiza = useSelector(state=>state.AtualizarTela.atualiza)
  const dispech = useDispatch()

  const deletar =async ()=>{
    setLoadding(true)
    removeImage(id)
    setTimeout(() => {
      dispech({
        type:"atualiza",
        payload:{atualiza:!atualiza}
      })
      setLoadding(false)
      handleClose()
    }, 1500);

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
        <MoreVertIcon/>
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
        <MenuItem onClick={deletar}>{
          Loadding?
          <CircularProgress size={'small'} sx={{width:'20px',height:'20px',color:'blue',margin:"auto"}} />:
          <div>Deletar</div>
        }</MenuItem>
        <MenuItem onClick={handleClose}>Atualizar</MenuItem>
        <MenuItem onClick={handleClose}>Cancelar</MenuItem>
      </Menu>
    </div>
  );
}
