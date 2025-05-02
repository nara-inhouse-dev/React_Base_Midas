import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Stack, Modal, IconButton, Tooltip } from '@mui/material';
import { ZoomIn, ZoomOut, RotateLeft, Close } from '@mui/icons-material';

interface ViewImageComponentProps {
  open: boolean; // Controls whether the modal is open
  imageUrl: string; // URL of the image to display
  title?: string; // Optional title for the modal
  onClose: () => void; // Callback to close the modal
}

const ViewImageComponent: React.FC<ViewImageComponentProps> = ({
  open,
  imageUrl,
  title = 'View Image',
  onClose,
}) => {
  const [zoom, setZoom] = useState(1); // State for zoom level
  const [rotation, setRotation] = useState(0); // State for rotation angle

  const handleZoomIn = () => setZoom((prev) => prev + 0.1);
  const handleZoomOut = () => setZoom((prev) => Math.max(0.1, prev - 0.1));
  const handleRotate = () => setRotation((prev) => prev + 90);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          //position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
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
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            maxWidth: '100%',
            maxHeight: 400,
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button onClick={handleZoomIn} startIcon={<ZoomIn />}>
            Zoom In
          </Button>
          <Button onClick={handleZoomOut} startIcon={<ZoomOut />}>
            Zoom Out
          </Button>
          <Button onClick={handleRotate} startIcon={<RotateLeft />}>
            Rotate
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ViewImageComponent;