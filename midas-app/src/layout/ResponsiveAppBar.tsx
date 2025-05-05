import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';

const pages = ['Home', 'Contact'];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    //<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
    //<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
    return (
        <AppBar sx={{ bgcolor: 'white' }} position='fixed' >
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                        component='img'
                        sx={{
                            pl: 3, py: 1, display: { xs: 'flex', md: 'flex' },
                        }}
                        alt="National Archives Logo"
                        src="https://www.archives.gov/nara-banner/nara-eagle-logo-branding2.svg"
                    />
                     <Box sx={{ color: '#23496d', textDecoration: 'none' }} to="/" component={RouterLink}>
                            <Typography variant='h4'
                                sx={{
                                    pl: 3,
                                    textDecoration: 'none',
                                    fontStyle: 'normal',
                                    fontWeight: 'semi-bold',
                                    fontFamily: 'Roboto Mono',
                                }}
                            >
                                 MiDAS
                            </Typography>

                    </Box>
                   
                       

                    <Box  pl={0} sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            {pages.map((page) => (

                                <Button
                                    component={RouterLink}
                                    to={page.replace(/\s+/g, '-').replace(/\./g, '').toLowerCase()}
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        color: '#565c65',
                                        display: 'block',
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        fontFamily: 'Source Sans Pro',
                                        textAlign: 'center',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            textUnderlineOffset: '7px',
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    <Box sx={{ display: 'flex', flexGrow: 0 }}>

<IconButton
    size="large"
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={handleOpenNavMenu}

    sx={{
        color: '#23496d',
    }}
>
    <MenuIcon />
</IconButton>

<Menu
    id="menu-appbar"
    anchorEl={anchorElNav}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
    }}
    keepMounted
    transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
    }}
    open={Boolean(anchorElNav)}
    onClose={handleCloseNavMenu}
    sx={{
        display: { xs: 'block', md: 'none' },
    }}
>
    {pages.map((page) => (
        <MenuItem key={page}
            onClick={handleCloseNavMenu}
            component={RouterLink}
            to={page.replace(/\s+/g, '-').replace(/\./g, '').toLowerCase()}
        >
            <Typography textAlign="center"
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    '&:hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '7px',
                    },
                }}
            >{page}</Typography>
        </MenuItem>
    ))}
</Menu>
</Box>            

</Box>
               
               
                
            </Box >
        </AppBar >
        
    );
}
export default ResponsiveAppBar;