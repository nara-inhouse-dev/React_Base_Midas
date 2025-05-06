import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField, Button, Stack, Snackbar } from '@mui/material';
import ResultGridComponent from '../components/ResultGridComponent';
import OpenFolderComponent from '../components/OpenFolderComponent';
import ViewImageComponent from '../components/ViewImageComponent';
import CommentComponent from '../components/CommentComponent';

const apiEndpoint = 'https://kl96k8ziqe.execute-api.us-east-1.amazonaws.com/Dev/getflexdata';

// Define the structure of the search query
interface Query {
  firstName: string;
  lastName: string;
  cNumber: string;
  aNumber: string;
  yob: string;
}

// Define the structure of a single row in the results grid
interface Row {
  id: string;
  source: string;
  cNumber: string;
  aNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  yob: string;
  mob: string;
  dob: string;
  countryOfBirth: string;
  POE: string;
  YOE: string;
  filePath: string;
  imageUrl: string;
  comment: string;
}

// Define the structure of the API response
interface ApiResponse {
  hits: {
    hits: {
      _source: Row;
    }[];
  };
}

const SearchPage: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<Query>({
    firstName: '',
    lastName: '',
    cNumber: '',
    aNumber: '',
    yob: '',
  });
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  // Folder modal state
  const [folderModalOpen, setFolderModalOpen] = useState<boolean>(false);
  const [selectedFolderPath, setSelectedFolderPath] = useState<string | null>(null);

  // Image modal state
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // Comment modal state
  const [commentModalOpen, setCommentModalOpen] = useState<boolean>(false);
  const [selectedDocumentID, setSelectedDocumentID] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [existingComment, setExistingComment] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (): Promise<void> => {
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
      const parsedResponse: ApiResponse = JSON.parse(result.body);
      const hits = parsedResponse.hits.hits;

      const formattedRows: Row[] = hits.map((hit) => {
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
          imageUrl:
            source.IMAGE_URL ||
            'https://catalog.archives.gov/iiif/3/lz%2Fpresidential-libraries%2Fobama%2Fbho-ero%2F217847615%2FTwitter_Gabi-Chojkier_2015-04-16_02_01.jpg/0,0,1024,1024/512,512/0/default.jpg',
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

  const handleToggleAccess = (docId: string): void => {
    setSnackbarOpen(true);
  };

  const handleOpenFolderModal = (folderPath: string): void => {
    setSelectedFolderPath(folderPath);
    setFolderModalOpen(true);
  };

  const handleCloseFolderModal = (): void => {
    setFolderModalOpen(false);
    setSelectedFolderPath(null);
  };

  const handleOpenImageModal = (imageUrl: string): void => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = (): void => {
    setImageModalOpen(false);
    setSelectedImageUrl(null);
  };

  const handleComment = (row: Row): void => {
    setSelectedDocumentID(row.id);
    setSelectedSource(row.source);
    setExistingComment(row.comment || '');
    setCommentModalOpen(true);
  };

  const handleSaveComment = (documentID: string, source: string, comment: string): void => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === documentID && row.source === source ? { ...row, comment } : row
      )
    );
    setCommentModalOpen(false);
  };

  const handleDeleteComment = (documentID: string, source: string): void => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === documentID && row.source === source ? { ...row, comment: '' } : row
      )
    );
    setCommentModalOpen(false);
  };

  const handleCloseCommentModal = (): void => {
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
};

export default SearchPage;

