import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField, Button, Stack, Modal, IconButton, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

// Define the props for the CommentComponent
interface CommentComponentProps {
  documentID: string; // The ID of the document
  rowID: string; // The ID of the row
  source: string; // The source of the document
  existingComment?: string; // Optional existing comment
  open: boolean; // Controls whether the modal is open
  onClose: () => void; // Callback to close the modal
  onSave: (documentID: string, rowID:string, source: string, comment: string) => void; // Callback to save the comment
  onDelete: (documentID: string, rowID:string,source: string) => void; // Callback to delete the comment
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  documentID,
  rowID,
  source,
  existingComment = '',
  open,
  onClose,
  onSave,
  onDelete,
}) => {
  const [comment, setComment] = useState<string>(existingComment); // State to hold the comment

  useEffect(() => {
    // Load the existing comment when the modal opens
    if (open) {
      setComment(existingComment);
    }
  }, [open, existingComment]);

  const handleSave = (): void => {
    if (comment.trim() === '') {
      alert('Comment cannot be empty.');
      return;
    }
    onSave(documentID, rowID,source, comment);
    onClose(); // Close the modal after saving
  };

  const handleDelete = (): void => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (confirmDelete) {
      onDelete(documentID, rowID,source);
      setComment(''); // Clear the comment field
      onClose(); // Close the modal after deleting
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          //position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'relative', // To position the close button
        }}
      >
        {/* Close Button in the Top-Right Corner */}
        <Tooltip title="Close">
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <Close />
          </IconButton>
        </Tooltip>

        {/* Modal Content */}
        <Typography variant="h6" component="h2">
          Comment for Document
        </Typography>
        <Typography variant="body2">
          <strong>Document ID:</strong> {documentID}
        </Typography>
        <Typography variant="body2">
          <strong>Row ID:</strong> {rowID}
        </Typography>
        <Typography variant="body2">
          <strong>Source:</strong> {source}
        </Typography>
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment here..."
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CommentComponent;