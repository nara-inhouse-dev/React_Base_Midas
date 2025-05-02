import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridInitialStateCommunity } from '@mui/x-data-grid';
import { Stack, Button, Tooltip } from '@mui/material';
import { FolderOpen, Preview, Comment as CommentIcon, Lock, LockOpen } from '@mui/icons-material';

interface ResultGridComponentProps {
  rows: any[]; // Data rows for the grid
  loading: boolean; // Loading state for the grid
  onToggleAccess: (docId: string) => void; // Callback for toggling access
  onOpenFolder: (folderPath: string) => void; // Callback for opening folder
  onViewImage: (imageUrl: string) => void; // Callback for viewing image
  onComment: (row: any) => void; // Callback for adding/editing comments
}

const ResultGridComponent: React.FC<ResultGridComponentProps> = ({
  rows,
  loading,
  onToggleAccess,
  onOpenFolder,
  onViewImage,
  onComment,
}) => {
  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 3,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Toggle Access">
            <Button
              variant="outlined"
              size="small"
              onClick={() => onToggleAccess(params.row.docId)}
              startIcon={params.row.access ? <Lock /> : <LockOpen />}
            />
          </Tooltip>
          <Tooltip title="Open Folder">
            <Button
              variant="outlined"
              size="small"
              onClick={() => onOpenFolder(params.row.filePath)}
              startIcon={<FolderOpen />}
            />
          </Tooltip>
          <Tooltip title="View Image">
            <Button
              variant="outlined"
              size="small"
              onClick={() => onViewImage(params.row.imageUrl)}
              startIcon={<Preview />}
            />
          </Tooltip>
          <Tooltip title="Save/Delete Comment">
            <Button
              variant="text"
              size="small"
              onClick={() => onComment(params.row)}
              startIcon={<CommentIcon />}
            />
          </Tooltip>
        </Stack>
      ),
    },
    { field: 'docId', headerName: 'Doc ID', flex: 1 },
    { field: 'source', headerName: 'Source', flex: 1 },
    { field: 'aNumber', headerName: 'A Number', flex: 1 },
    { field: 'cNumber', headerName: 'C Number', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'yob', headerName: 'Year of Birth', flex: 1 },
    { field: 'mob', headerName: 'Month of Birth', flex: 1 },
    { field: 'dob', headerName: 'Day of Birth', flex: 1 },
    { field: 'countryOfBirth', headerName: 'Country of Birth', flex: 1 },
    { field: 'POE', headerName: 'Port of Entry', flex: 1 },
    { field: 'YOE', headerName: 'Year of Entry', flex: 1 },
,
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
        disableSelectionOnClick
        initialState={{
          columns: {
            columnVisibilityModel: {
              middleName: false, // Hide the "Middle Name" column
              POE: false, // Hide the "Port of Entry" column
              YOE: false, // Hide the "Year of Entry" column
              countryOfBirth: false, // Hide the "Country of Birth" column
              dob: false, // Hide the "Day of Birth" column
              mob: false, // Hide the "Month of Birth" column
              yob: false, // Hide the "Year of Birth" column
            },
          },
        }}
      />
    </Box>
  );
};

export default ResultGridComponent;