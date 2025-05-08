import React from 'react';
import Box from '@mui/material/Box';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Outlet } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* App Bar */}
      <ResponsiveAppBar />

      {/* Main Content Section */}
      <Box
        sx={{
          flex: 1, // Ensures the content section takes up available space
          //overflowY: 'auto', // Enables vertical scrolling
         // overflowX: 'hidden', // Prevents horizontal scrolling
          backgroundColor: '#f5f5f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Outlet for Nested Routes */}
        <Outlet />

        {/* Footer Section */}
        <Box
          sx={{
            bgcolor: '#525472',
            color: 'white',
            paddingY: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
            display: 'flex',
            gap: 2, // Add spacing between items
            textAlign: { xs: 'center', sm: 'left' ,md: 'none'}, // Center text on small screens
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 0,
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: '14px',
              alignItems: 'center',
              textTransform: 'none',
            }}
          >
            <Button
              sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
              target="_blank"
              rel="noreferrer"
              href="https://www.archives.gov/contact"
              color="inherit"
            >
              Contact Us
            </Button>
            <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />
            <Button
              sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
              target="_blank"
              rel="noreferrer"
              href="https://www.archives.gov/global-pages/accessibility.html"
              color="inherit"
            >
              Accessibility
            </Button>
            <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />
            <Button
              sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
              target="_blank"
              rel="noreferrer"
              href="https://www.archives.gov/global-pages/privacy.html"
              color="inherit"
            >
              Privacy Policy
            </Button>
            <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />


<Button
  sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
  target="_blank"
  rel="noreferrer"
  href="https://www.archives.gov/foia"
  color="inherit"
>
  Freedom Of Information Act
</Button>
<CircleIcon sx={{ color: 'white', fontSize: '5px' }} />

<Button
  sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
  target="_blank"
  rel="noreferrer"
  href="https://www.archives.gov/eeo/policy/complaint-activity.html"
  color="inherit"
>
  No FEAR Act
</Button>
<CircleIcon sx={{ color: 'white', fontSize: '5px' }} />

<Button
  sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
  target="_blank"
  rel="noreferrer"
  href="https://www.usa.gov"
  color="inherit"
>
  USA.gov
</Button>
</Box>

{/* Footer Text */}
          <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>
            The U.S. National Archives and Records Administration
          </Typography>
          <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>
            1-86-NARA-NARA or 1-866-272-6272
          </Typography>
        </Box>
        
      </Box>
    </Box>
  );
};

export default MainLayout;
