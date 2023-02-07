import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Box, Button, Paper, Typography, Avatar, Collapse, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StoryCard from '../StoryCard/StoryCard'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modal from '@mui/material/Modal';

import EditContactModal from '../EditContactModal/EditContactModal'

export default function ContactListItem({ contact }) {
  const history = useHistory()
  const dispatch = useDispatch();

  const [detailsOpen, setDetailsOpen] = useState(false);

  // delete 
  const [openDelete, setDeleteOpen] = React.useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const openDeleteDialog = () => {
    handleDeleteOpen();
  }

  const deleteContact = (id) => {
    console.log('delete contact id:',id);
    dispatch({type: "DELETE_CONTACT", payload: id})
    handleDeleteClose();
  }

  // edit
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 900,
      height: 700,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      padding: 2,
  };

  const [openEdit, setEditOpen] = React.useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  }

  const handleEditClose = () => {
    setEditOpen(false);
  }

  const openEditModal = () => {
    handleEditOpen()
  }

  const editContact = (contact) => {
    console.log('edit contact:', contact.id);
    // dispatch({type: "", payload: contact});
    //handleEditClose();
  }

  return (
    <Paper sx={{ paddingX: 1, marginY: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            onClick={() => setDetailsOpen(!detailsOpen)}>
            {detailsOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography sx={{ marginRight: 1 }}>{contact.name}</Typography>
          <Typography>{contact.pronouns}</Typography>
        </Box>
        <Typography>{contact.mailing_address}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginRight: 1 }}>{contact.roles[0]?.name}</Typography>
          {contact.roles[1] && <Typography>• {contact.roles[1].name}</Typography>}
        </Box>
      </Box>
      <Collapse
        in={detailsOpen}
      >
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <Box sx={{ display: 'flex' }}>
            <Avatar src={contact.photo} />
            <Typography variant='body2'>{contact.bio}</Typography>
            <Box>
              <Typography variant='body2'>most recent contribution:</Typography>
              <StoryCard story={contact.stories[0]} />
            </Box>
          </Box>




          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EditContactModal contact={contact} />









            <IconButton size='small' onClick={() => openDeleteDialog(contact.id)}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={openDelete}
              onClose={handleDeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete contact of "+ contact.name}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Delete this contact will permanently remove this contact from the database.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button onClick={() => deleteContact(contact.id)} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              onClick={() => history.push(`/ContactDetails/${contact.id}`)}
              size='small'
              color='inherit'
              endIcon={<ArrowForwardIcon />}>
              to contact page
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}
