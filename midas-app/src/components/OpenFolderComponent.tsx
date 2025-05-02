import React from 'react';
import Box from '@mui/material/Box';
import { Typography, Modal, IconButton, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';

interface OpenFolderComponentProps {
  open: boolean; // Controls whether the modal is open
  folderPath: string; // The folder path to display
  title?: string; // Optional title for the modal
  onClose: () => void; // Callback to close the modal
}

const OpenFolderComponent: React.FC<OpenFolderComponentProps> = ({
  open,
  folderPath,
  title = 'Open Folder',
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          //position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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

        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            wordWrap: 'break-word',
            textAlign: 'center',
            mb: 4,
          }}
        >
          {folderPath}
        </Typography>
      </Box>
    </Modal>
  );
};

export default OpenFolderComponent;