import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField, Button, Stack, Snackbar } from '@mui/material';
import ResultGridComponent from '../components/ResultGridComponent';
import OpenFolderComponent from '../components/OpenFolderComponent';
import ViewImageComponent from '../components/ViewImageComponent';
import CommentComponent from '../components/CommentComponent';
import { green } from '@mui/material/colors';

const apiEndpoint = 'https://kl96k8ziqe.execute-api.us-east-1.amazonaws.com/Dev/getflexdata';

export default function SearchPage() {
  const [rows, setRows] = useState([]); // State to hold search results
  const [loading, setLoading] = useState(false); // State to show loading indicator
  const [query, setQuery] = useState({ firstName: '', lastName: '', cNumber: '', aNumber: '' ,yob:''});
  const [showGrid, setShowGrid] = useState(false); // State to control grid visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // States for OpenFolderComponent
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [selectedFolderPath, setSelectedFolderPath] = useState<string | null>(null);

  // States for ViewImageComponent
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // States for CommentComponent
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedDocumentID, setSelectedDocumentID] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [existingComment, setExistingComment] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (!query.firstName && !query.lastName && !query.cNumber && !query.aNumber) {
      alert('Please enter at least one search query.');
      return;
    }

    setLoading(true);
    setShowGrid(false);
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      const result = await response.json();
      const parsedResponse = JSON.parse(result.body);
      const hits = parsedResponse.hits.hits;

      const formattedRows = hits.map((hit: any, index: number) => {
        const source = hit._source;
        return {
          id: source.DOC_ID_Flex,
          source: 'Flex',
          cNumber: source.DOC_ID_Flex || 'N/A',
          aNumber: source.A_NUMBER_Flex || 'N/A',
          firstName: source.FIRST_NAME || 'N/A',
          lastName: source.LAST_NAME || 'N/A',
          middleName: source.MIDDLE_NAME || 'N/A',
          yob: source.DOB_YEAR || 'N/A',
          mob: source.DOB_MONTH || 'N/A',
          dob: source.DOB_DAY || 'N/A',
          countryOfBirth: source.COB || 'N/A',
          POE: source.POETEXT || 'N/A',
          YOE: source.YOE || 'N/A',
          filePath: source.FILE_PATH || '/path/to/folder',
          imageUrl: source.IMAGE_URL || ' https://catalog.archives.gov/iiif/3/lz%2Fpresidential-libraries%2Fobama%2Fbho-ero%2F217847615%2FTwitter_Gabi-Chojkier_2015-04-16_02_01.jpg/0,0,1024,1024/512,512/0/default.jpg',
          comment: '',
        };
      });

      setRows(formattedRows);
      setShowGrid(true);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAccess = (docId: string) => {
    setSnackbarOpen(true);
  };

  const handleOpenFolderModal = (folderPath: string) => {
    setSelectedFolderPath(folderPath);
    setFolderModalOpen(true);
  };

  const handleCloseFolderModal = () => {
    setFolderModalOpen(false);
    setSelectedFolderPath(null);
  };

  const handleOpenImageModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImageUrl(null);
  };

  const handleComment = (row: any) => {
    setSelectedDocumentID(row.id);
    setSelectedSource(row.source);
    setExistingComment(row.comment || '');
    setCommentModalOpen(true);
  };

  const handleSaveComment = (documentID: string, source: string, comment: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === documentID && row.source === source ? { ...row, comment } : row
      )
    );
    setCommentModalOpen(false);
  };

  const handleDeleteComment = (documentID: string, source: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === documentID && row.source === source ? { ...row, comment: '' } : row
      )
    );
    setCommentModalOpen(false);
  };

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
    setSelectedDocumentID(null);
    setSelectedSource(null);
    setExistingComment('');
  };

  return (
    <Box
      sx={{
        p: 9,
        borderRadius: 2,
        background: 'white',
        display: 'flex',
        flexDirection: 'column',        
        alignItems: 'stretch',
        gap: 5,
        justifyContent: 'flex-start',
        minHeight: '100vh',
        width: '100%',
      }}
    >
       {/* Header */}
       <Typography
      variant="h5"
      sx={{
        
        textDecoration: 'none',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: 'Roboto Mono',
        mb: -11,
      }}
    >
      Search Criteria
    </Typography>
      {/* Search Form */}
      <Box my={10} sx={{ gap: 1, display: 'flex', fontWeight: 'bold',md:1 }}>
        <Stack spacing={4} direction="row" flexWrap="wrap" useFlexGap>
          <TextField label="First Name" name="firstName" value={query.firstName} onChange={handleInputChange} />
          <TextField label="Last Name" name="lastName" value={query.lastName} onChange={handleInputChange} />
          <TextField label="C Number" name="cNumber" value={query.cNumber} onChange={handleInputChange} />
          <TextField label="A Number" name="aNumber" value={query.aNumber} onChange={handleInputChange} />
          <TextField label="YOB" name="yob" value={query.yob} onChange={handleInputChange} />
          <Button variant="contained" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Stack>
      </Box>

      {/* Results Grid */}
      {showGrid && rows.length > 0 && (
        <ResultGridComponent
          rows={rows}
          loading={loading}
          onToggleAccess={handleToggleAccess}
          onOpenFolder={handleOpenFolderModal}
          onViewImage={handleOpenImageModal}
          onComment={handleComment}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Access toggled successfully"
      />

      {/* OpenFolderComponent */}
      <OpenFolderComponent
        open={folderModalOpen}
        folderPath={selectedFolderPath || ''}
        title="Folder Path"
        onClose={handleCloseFolderModal}
      />

      {/* ViewImageComponent */}
      <ViewImageComponent
        open={imageModalOpen}
        imageUrl={selectedImageUrl || ''}
        title="View Image"
        onClose={handleCloseImageModal}
      />

      {/* CommentComponent */}
      <CommentComponent
        documentID={selectedDocumentID || ''}
        source={selectedSource || ''}
        existingComment={existingComment}
        open={commentModalOpen}
        onClose={handleCloseCommentModal}
        onSave={handleSaveComment}
        onDelete={handleDeleteComment}
      />
    </Box>
  );
}

