import React from 'react';
import { Box, Typography, Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Stack } from '@mui/material';

// Define the structure of the API response
interface ApiResponse {
  data: any; // Replace `any` with the actual structure of the API response if known
}

export default function Preview(): JSX.Element {
  const handleSearch = async (): Promise<void> => {
    try {
      const person = {
        firstName: 'John',
        lastName: 'Doe',
      };

      const response = await fetch('https://kl96k8ziqe.execute-api.us-east-1.amazonaws.com/Dev/getflexdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person), // Send the `person` object in the request body
      });

      const result: ApiResponse = await response.json();
      console.log(result);
      // setData(result); // Uncomment and define `setData` if needed
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', placeContent: 'center', flexDirection: 'column' }}>
      {/* Logo */}
      <Box
        component="img"
        sx={{
          height: 60,
          width: { sm: 150, md: 180 },
          display: { xs: 'none', md: 'flex' },
        }}
        alt="National Archives Logo"
        src="512-Nara-logo.png"
      />

   
    </Box>
  );
}