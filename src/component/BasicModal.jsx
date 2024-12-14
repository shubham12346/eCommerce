
import Dialog from '@mui/material/Dialog';
  
export default function BasicModal({children,open,handleClose}) {
 

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {children}
      </Dialog>
  );
}
