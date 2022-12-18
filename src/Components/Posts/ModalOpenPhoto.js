import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height:"100%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
  overflowY: 'scroll',
  "@media (max-width:500px)":{
    width: "90%",
    height:"90%"
  }
};

export default function ModalOpenPhoto({elem}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
       <img
         onClick={handleOpen} src={elem.titulo} 
         style={{display:elem.imagem = '' && 'none',width:"100%",maxHeight:"80%",marginTop:"30px",cursor:'pointer'}}
        /> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <img 
              onClick={handleClose}
              src={elem.titulo}
              style={{display:elem.imagem = '' && 'none',width:"100%",minHeight:"90%",marginTop:""}}
                
            />

        </Box>
      </Modal>
    </div>
  );
}
