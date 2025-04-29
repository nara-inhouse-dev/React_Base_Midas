//import './App.css'

import Box from '@mui/material/Box';
import ResponsiveAppBar from './ResponsiveAppBar'
import { Outlet } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';


export default function MainLayout() {
  

    return (
        <Box >

        <ResponsiveAppBar />
  
  
        <Box sx={{ display: 'flex',  height: '100vh', minHeight: '-webkit-fill-available' }} >
  
          <Box id='main-section'
            sx={{
              display: 'flex', overflowY: 'auto',overflowX:'inherit',
              backgroundColor: '#f5f5f0',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
  
  
  
  
            <Outlet />
  
  
            <Box sx={{
              bgcolor: '#525472', color: 'white', paddingY: 2, justifyContent: 'flex-start',
              alignItems: 'center', flexDirection: 'column', display: 'flex',
            }}>
  
              <Box sx={{
                display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap',
                fontSize: '14px', alignItems: 'center', textTransform: 'none'
              }}>
  
                {/* Links for Contact Us, Accessibility, Privacy Policy, and Terms of Use */}
                <Button sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
                  target='_blank' rel='noreferrer'
                  href="https://www.archives.gov/contact" color="inherit">
                  Contact Us
                </Button>
                <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />
  
                <Button sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
                  target='_blank' rel='noreferrer'
                  href="https://www.archives.gov/global-pages/accessibility.html" color="inherit">Accessibility</Button>
                <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />
  
                <Button sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
                  target='_blank' rel='noreferrer'
                  href="https://www.archives.gov/global-pages/privacy.html" color="inherit">Privacy Policy</Button>
                <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />
  
                <Button sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
                  target='_blank' rel='noreferrer'
                  href="https://www.archives.gov/foia" color="inherit">Freedom Of Information Act</Button>
                <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />
  
                <Button sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
                  target='_blank' rel='noreferrer'
                  href="https://www.archives.gov/eeo/policy/complaint-activity.html" color="inherit">No FEAR Act</Button>
                <CircleIcon sx={{ color: 'white', fontSize: '5px' }} />
  
                <Button sx={{ paddingY: 0, fontSize: 'inherit', textTransform: 'inherit' }}
                  target='_blank' rel='noreferrer'
                  href="https://www.usa.gov" color="inherit">USA.gov</Button>
  
              </Box>
              <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>
                The U.S. National Archives and Records Administration</Typography>
              <Typography sx={{ fontSize: '14px', textAlign: 'center' }}>1-86-NARA-NARA or 1-866-272-6272</Typography>
  
  
            </Box>
          </Box>
  
        </Box >
  
      </Box >
    )
  }
        