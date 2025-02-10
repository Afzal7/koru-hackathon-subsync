import { useState } from 'react';

import { Save, Notes as NotesIcon } from '@mui/icons-material';
import {
  Box,
  Chip,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface NotesModalProps {
  open: boolean;
  handleClose: () => void;
  onNotesChange: (note: string) => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({ open, handleClose, onNotesChange }) => {
  const [note, setNote] = useState('');

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSave = () => {
    if (note.trim()) {
      onNotesChange(note);
      setNote('');
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h4">Add Notes</Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={10}
          value={note}
          onChange={handleNoteChange}
          placeholder="Enter your notes here..."
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleClose} color="error">
          Close
        </Button>
        <Button variant="contained" color="success" onClick={handleSave} startIcon={<Save />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface NotesPreviewProps {
  notes: string[];
  onDeleteNote?: (index: number) => void;
}

export const NotesPreview: React.FC<NotesPreviewProps> = ({ notes, onDeleteNote }) => (
  <>
    {notes.length > 0 && (
      <Box mt={2}>
        {notes.map((note, index) => (
          <Chip
            icon={<NotesIcon color="primary" />}
            key={index}
            label={`Note ${index + 1}: ${note.slice(0, 15)}${note.length > 15 ? '...' : ''}`}
            sx={{
              ml: 1,
              mb: 1,
              '&:hover': { backgroundColor: '#D0ECFE !important' },
              height: '36px',
              padding: '4px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
            onDelete={onDeleteNote ? () => onDeleteNote(index) : undefined}
            size="medium"
          />
        ))}
      </Box>
    )}
  </>
);
