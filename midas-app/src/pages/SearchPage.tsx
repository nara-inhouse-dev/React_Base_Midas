import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const apiEndpoint = 'https://kl96k8ziqe.execute-api.us-east-1.amazonaws.com/Dev/getflexdata';

export default function SearchPage() {
  const [rows, setRows] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(false); // State to show loading indicator
  const [query, setQuery] = useState({ firstName: '', lastName: '', cNumber: '', aNumber: '' });
  const [showGrid, setShowGrid] = useState(false); // State to control grid visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    // Check if at least one search query field is filled
    if (!query.firstName && !query.lastName && !query.cNumber && !query.aNumber) {
      alert('Please enter at least one search query.');
      return;
    }

    setLoading(true);
    setShowGrid(false); // Hide the grid while loading
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      const result = await response.json();

      // Parse and format the API response
      const parsedResponse = JSON.parse(result.body); // Parse the "body" field
      const hits = parsedResponse.hits.hits; // Access the "hits" array

      const formattedRows = hits.map((hit: any, index: number) => {
        const source = hit._source;
        return {
          id: index + 1, // Add an ID for the DataGrid
          firstName: source.FIRST_NAME || 'N/A',
          lastName: source.LAST_NAME || 'N/A',
          cNumber: source.DOC_ID_Flex || 'N/A',
          aNumber: source.A_NUMBER_Flex || 'N/A',
        };
      });

      setRows(formattedRows); // Update rows with the formatted data
      setShowGrid(true); // Show the grid after data is loaded
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
    <Box
      sx={{
        p: 10,
        borderRadius: 2,
        background: 'lightgray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          textDecoration: 'none',
          fontStyle: 'normal',
          fontWeight: 'semi-bold',
          fontFamily: 'Roboto Mono',
          mb: 4,
        }}
      >
        Midas Data Search
      </Typography>

      {/* Search Form */}
      <Box my={10} sx={{ gap: 1, display: 'flex', fontWeight: 'bold' }}>
        <Stack spacing={5} direction="row" flexWrap="wrap" useFlexGap>
          <TextField
            label="First Name"
            name="firstName"
            value={query.firstName}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={query.lastName}
            onChange={handleInputChange}
          />
          <TextField
            label="C Number"
            name="cNumber"
            value={query.cNumber}
            onChange={handleInputChange}
          />
          <TextField
            label="A Number"
            name="aNumber"
            value={query.aNumber}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Stack>
      </Box>

      {/* Conditionally Render Results Grid */}
      {showGrid && rows.length > 0 && (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
}

