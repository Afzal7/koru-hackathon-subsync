import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

import { Save, MusicNote } from '@mui/icons-material';
import {
  Box,
  Chip,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface VoiceNoteModalProps {
  open: boolean;
  handleClose: () => void;
  onRecordingComplete: (blob: Blob) => void; // Added prop for recording completion
}

export const VoiceNoteModal: React.FC<VoiceNoteModalProps> = ({
  open,
  handleClose,
  onRecordingComplete,
}) => {
  const [audioNotes, setAudioNotes] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [intervalVar, setIntervalVar] = useState<NodeJS.Timeout | undefined>();

  const onComplete = (blob: Blob) => {
    setAudioNotes([...audioNotes, blob]);
    onRecordingComplete(blob);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setWaveformData([]);
      // Start generating waveform
      setIntervalVar(
        setInterval(() => {
          const newBarHeight = Math.random() * 100;
          setWaveformData((prev) => [...prev, newBarHeight]);
        }, 100)
      );
    } else {
      console.log('Stopping recording', intervalVar);
      clearInterval(intervalVar);
      setIsRecording(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ p: 3 }}>
        <Typography variant="h4">Voice Notes</Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <Box display="flex" justifyContent="center" sx={{ scale: 1.5, my: 2 }}>
          <AudioRecorder
            onRecordingComplete={onComplete}
            onNotAllowedOrFound={(err) => console.table(err)}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadFileExtension="webm"
            mediaRecorderOptions={{
              audioBitsPerSecond: 128000,
            }}
            showVisualizer
          />
        </Box>

        {/* <Button variant="contained" color="primary" onClick={toggleRecording}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button> */}

        <Box py={2}>
          {/* <Box display="flex" justifyContent="flex-start" alignItems="flex-end" height="100px">
            {waveformData.map((height, index) => (
              <Box
                key={index}
                sx={{
                  width: '5px',
                  height: `${height}px`,
                  backgroundColor: 'primary.main',
                  margin: '0 1px',
                  alignSelf: 'flex-end', // Align bars at the bottom
                }}
              />
            ))}
          </Box> */}
          <VoiceNotesPreview voiceNotes={audioNotes} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleClose} color="error">
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

interface VoiceNotesPreviewProps {
  voiceNotes: Blob[];
  onDeleteVoiceNote?: (index: number) => void;
}

export const VoiceNotesPreview: React.FC<VoiceNotesPreviewProps> = ({
  voiceNotes,
  onDeleteVoiceNote,
}) => (
  <>
    {voiceNotes.length > 0 && (
      <Box mt={2}>
        {voiceNotes.map((note, index) => (
          <Chip
            icon={<MusicNote sx={{ color: '#d74fab !important' }} />}
            key={index}
            label={`Voice Note ${index + 1}`}
            sx={{
              ml: 1,
              mb: 1,
              '&:hover': { backgroundColor: '#d74fac61 !important' },
              height: '36px',
              padding: '4px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
            onDelete={onDeleteVoiceNote ? () => onDeleteVoiceNote(index) : undefined}
            size="medium"
          />
        ))}
      </Box>
    )}
  </>
);
