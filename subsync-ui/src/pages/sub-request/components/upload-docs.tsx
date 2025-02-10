import { useState } from 'react';
import { DropzoneArea } from 'mui-file-dropzone';

import { Save, PermMediaRounded } from '@mui/icons-material';
import {
  Box,
  Chip,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  LinearProgress,
} from '@mui/material';

interface FileUploadModalProps {
  open: boolean;
  handleClose: () => void;
  onFileChange: (files: File[]) => void; // Added prop for file change
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  open,
  handleClose,
  onFileChange,
}) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (files: File[]) => {
    onFileChange(files); // Call the passed function to update uploaded files
    if (files.length > 0) {
      setUploading(true);
      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev === 100) {
            clearInterval(uploadInterval);
            setUploading(false);
            return 100;
          }
          return prev + 10; // Simulate progress
        });
      }, 100); // Simulate upload time
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant="h4">Upload File</Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 4 }}>
        <DropzoneArea
          onChange={handleFileChange}
          acceptedFiles={['image/*', 'application/pdf']}
          dropzoneText="Drag and drop a file here or click"
          showFileNames
          showPreviews
          showPreviewsInDropzone={false}
          useChipsForPreview
          previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
          // previewChipProps={{classes: { root: classes.previewChip } }}
          previewText="Selected files"
          fileObjects={[]}
        />
        {uploading && (
          <>
            <LinearProgress variant="determinate" value={progress} />
            <Typography variant="body2" color="text.secondary">
              Uploading... {progress}%
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 4 }}>
        <Button variant="text" color="error" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            handleClose();
          }}
          startIcon={<Save />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface FilesPreviewProps {
  uploadedFiles: File[];
  onDeleteFile?: (file: File) => void;
}

export const FilesPreview: React.FC<FilesPreviewProps> = ({ uploadedFiles, onDeleteFile }) => (
  <>
    {uploadedFiles.length > 0 && (
      <Box mt={2}>
        {uploadedFiles.map((file) => (
          <Chip
            icon={<PermMediaRounded sx={{ color: '#32b1ca !important' }} />}
            key={file.name}
            label={file.name}
            sx={{
              ml: 1,
              mb: 1,
              '&:hover': { backgroundColor: '#32b1ca61 !important' },
              height: '36px',
              padding: '4px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
            onDelete={onDeleteFile ? () => onDeleteFile(file) : undefined}
          />
        ))}
      </Box>
    )}
  </>
);
