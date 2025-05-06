import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';

// Define the type for the `pages` array
const pages: string[] = ['Home', 'Contact'];

const ResponsiveAppBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ bgcolor: 'white' }} position="fixed">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Logo */}
          <Box
            component="img"
            sx={{
              pl: 3,
              py: 1,
              display: { xs: 'flex', md: 'flex' },
            }}
            alt="National Archives Logo"
            src="https://www.archives.gov/nara-banner/nara-eagle-logo-branding2.svg"
          />
          {/* Title */}
          <Box sx={{ color: '#23496d', textDecoration: 'none' }} to="/" component={RouterLink}>
            <Typography
              variant="h4"
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

          {/* Navigation Buttons */}
          <Box
            pl={0}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {pages.map((page: string) => (
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

          {/* Mobile Menu */}
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
              {pages.map((page: string) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.replace(/\s+/g, '-').replace(/\./g, '').toLowerCase()}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      '&:hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '7px',
                      },
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default ResponsiveAppBar;