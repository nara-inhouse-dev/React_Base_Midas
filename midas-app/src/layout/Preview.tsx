
import { Box, Typography } from '@mui/material';
import {
    Container,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Stack
  } from '@mui/material';

export default function Preview() {

    const handleSearch = async () => {
        try {

         const person = {
                firstName: "John",
                lastName: "Doe"
              };
              
          //const jsonString = JSON.stringify(person);
          const response = await fetch('https://kl96k8ziqe.execute-api.us-east-1.amazonaws.com/Dev/getflexdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          
          });
          const result = await response.json();
          console.log(result);
          //setData(result);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      };
    
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
            
          
        </Box >
    )

}