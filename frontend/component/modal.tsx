import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// Define props type
interface BasicModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: string; // Optional prop, remove or modify as needed
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, type }: BasicModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <div>
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {type ? `Modal Type: ${type}` : "Text in a modal"}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           
          
            
           {type === "trigger" ? "Trigger Modal" : "Action Modal"}
           
           
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
    </div>
  );
}
