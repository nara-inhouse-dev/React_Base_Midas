
import { Box, Typography } from '@mui/material'


export default function Preview() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box
                component='img'
                sx={{
                    height: 60,
                    width: { sm: 150, md: 180 },

                    display: { xs: 'none', md: 'flex' },
                }}
                alt="National Archives Logo"
                src="archie-ai-bluec.png"
            />
            <Typography variant='h4' sx={{ textAlign: 'center', marginTop: '20px' }}>
                Please check back later.
            </Typography>
        </Box >
    )

}