import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { makeStyles } from '@mui/styles';
import AddPatient from './AddPatient';

const useStyles = makeStyles({
    appointmentModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        boxShadow: '24px',
        padding: '2rem',
        outline: 'none',
        width: '400px'
    },
    '@media screen and (max-width: 600px)': {
        appointmentModal: {
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translate(0, 0)',
            backgroundColor: '#FFF',
            outline: 'none',
            height: '100vh',
            overflow: 'auto',
            width: '100vw'
        }
    }
});

const AddPatientModal = ({ open, handleClose }) => {

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box className={classes.appointmentModal}>
                    <AddPatient handleClose={handleClose} />
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddPatientModal;