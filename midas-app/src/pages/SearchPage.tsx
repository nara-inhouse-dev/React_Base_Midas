import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const apiEndpoint = 'https://kl96k8ziqe.execute-api.us-east-1.amazonaws.com/Dev/getflexdata';

export default function SearchPage() {
  const [rows, setRows] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(false); // State to show loading indicator

  const handleSearch = async () => {
    setLoading(true);
    try {
      const person = {
        firstName: "John",
        lastName: "Doe",
      };

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });

      const result = await response.json();
      console.log(result);

      // Assuming the API returns an array of objects
      setRows(result.data || []); // Update rows with the API response
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'cNumber', headerName: 'C Number', width: 150 },
    { field: 'aNumber', headerName: 'A Number', width: 150 },
  ];

  return (
    <Box sx={{ p:10, borderRadius: 4, display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="h4"
        sx={{
          pl: 3,
          textDecoration: 'none',
          fontStyle: 'normal',
          fontWeight: 'semi-bold',
          fontFamily: 'Roboto Mono',
          textAlign: 'center',
        }}
      >
        Midas Data Search
      </Typography>

      {/* Search Form */}
      <Box my={5} sx={{ gap: 1, display: 'flex', fontWeight: 'bold' }}>
        <Stack spacing={11} direction="row" flexWrap="wrap" useFlexGap>
          <TextField label="First Name" name="firstName" />
          <TextField label="Last Name" name="lastName" />
          <TextField label="C Number" name="cnumber" />
          <TextField label="A Number" name="number" />
          <Button variant="contained" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Stack>
      </Box>

      {/* Results Grid */}
      <Box sx={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}

