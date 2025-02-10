import { format } from 'date-fns';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Card, Grid, Button, Divider, TextField, Typography } from '@mui/material';
import { Send, Save, Notes, Print, MusicNote, PermMediaRounded } from '@mui/icons-material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { NotesModal, NotesPreview } from './components/notes';
import { FilesPreview, FileUploadModal } from './components/upload-docs';
import { VoiceNoteModal, VoiceNotesPreview } from './components/voice-notes';

export default function Page() {
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    studentInfo: {
      docs: [],
      voiceNotes: [],
      notes: [],
    },
    lessonPlans: {
      docs: [],
      voiceNotes: [],
      notes: [],
    },
    schoolInfo: {
      docs: [],
      voiceNotes: [],
      notes: [],
    },
    startDate: null, // Add startDate
    endDate: null, // Add endDate
    subEmail: '',
  });

  const handleNestedFieldChange = (key: string, subKey: string, value: any) => {
    setFormData({
      ...formData,
      [key]: {
        // @ts-ignore
        ...formData[key],
        // @ts-ignore
        [subKey]: [...formData[key][subKey], ...(Array.isArray(value) ? value : [value])],
      },
    });
  };
  console.log({ formData });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name: string, value: any) => {
    console.log({ name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <Helmet>
        <title> {`Sub Request 01/01/2025 - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Typography variant="h4">Sub Request</Typography>
          <Typography variant="h5" sx={{ ml: 2, color: 'grey.600' }}>
            {formData.startDate ? format(formData.startDate, 'MM/dd/yyyy') : ''}
            {formData.endDate ? ` - ${format(formData.endDate, 'MM/dd/yyyy')}` : ''}
          </Typography>
        </Box>

        <Card sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Grid container spacing={3} pb={5}>
              <Grid item xs={12}>
                <Box display="inline-flex" alignItems="center" mb={2}>
                  <Typography variant="h6" sx={{ display: 'inline', mr: 2 }}>
                    Dates to cover:
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(newValue: any) => handleDateChange('startDate', newValue)}
                      sx={{ mx: 2 }}
                      slots={{
                        textField: (params) => (
                          <TextField variant="outlined" size="small" {...params} />
                        ),
                      }}
                    />
                    {!showEndDatePicker && (
                      <Button
                        variant="text"
                        onClick={() => setShowEndDatePicker(true)}
                        sx={{ mx: 2 }}
                      >
                        Multiple Days
                      </Button>
                    )}
                    {showEndDatePicker && (
                      <DatePicker
                        label="End Date"
                        value={formData.endDate}
                        onChange={(newValue: any) => handleDateChange('endDate', newValue)}
                        sx={{ mx: 2 }}
                        slots={{
                          textField: (params) => (
                            <TextField variant="outlined" size="small" {...params} />
                          ),
                        }}
                      />
                    )}
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item xs={12} mb={2}>
                <Typography variant="h5">Upload Materials</Typography>
                <Typography variant="body1">
                  Upload materials you would like to share with your sub. All categories are
                  optional.
                </Typography>
              </Grid>

              <Grid container item xs={12}>
                <Grid item sm={6}>
                  <Typography variant="h6">
                    {/* <School sx={{ mr: 1 }} /> */}
                    Student information
                  </Typography>
                  <Typography variant="body2">
                    Personal needs, allergies, behavioral notes, seating chart
                  </Typography>
                </Grid>
                <Grid item sm={6} pt={2}>
                  <AddData
                    handleFileChange={(file) =>
                      handleNestedFieldChange('studentInfo', 'docs', file)
                    }
                    handleAudioRecordingComplete={(file) =>
                      handleNestedFieldChange('studentInfo', 'voiceNotes', file)
                    }
                    handleNotesChange={(notes) =>
                      handleNestedFieldChange('studentInfo', 'notes', notes)
                    }
                  />
                </Grid>
                <Grid item sm={12}>
                  <PreviewData
                    voiceNotes={formData.studentInfo.voiceNotes}
                    uploadedFiles={formData.studentInfo.docs}
                    notes={formData.studentInfo.notes}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item sm={6}>
                  <Typography variant="h6">Lesson Plans</Typography>
                  <Typography variant="body2">
                    Worksheets, presentations, textbook work, activities
                  </Typography>

                  <PreviewData
                    voiceNotes={formData.lessonPlans.voiceNotes}
                    uploadedFiles={formData.lessonPlans.docs}
                    notes={formData.lessonPlans.notes}
                  />
                </Grid>
                <Grid item sm={6} pt={2}>
                  <AddData
                    handleFileChange={(file) =>
                      handleNestedFieldChange('lessonPlans', 'docs', file)
                    }
                    handleAudioRecordingComplete={(file) =>
                      handleNestedFieldChange('lessonPlans', 'voiceNotes', file)
                    }
                    handleNotesChange={(notes) =>
                      handleNestedFieldChange('lessonPlans', 'notes', notes)
                    }
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item sm={6}>
                  <Typography variant="h6">School Information</Typography>
                  <Typography variant="body2">Bathroom policy, map, room number.</Typography>

                  <PreviewData
                    voiceNotes={formData.schoolInfo.voiceNotes}
                    uploadedFiles={formData.schoolInfo.docs}
                    notes={formData.schoolInfo.notes}
                  />
                </Grid>
                <Grid item sm={6} pt={2}>
                  <AddData
                    handleFileChange={(file) => handleNestedFieldChange('schoolInfo', 'docs', file)}
                    handleAudioRecordingComplete={(file) =>
                      handleNestedFieldChange('schoolInfo', 'voiceNotes', file)
                    }
                    handleNotesChange={(notes) =>
                      handleNestedFieldChange('schoolInfo', 'notes', notes)
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Button type="submit" variant="outlined" color="primary" startIcon={<Save />}>
              Save
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} startIcon={<Print />}>
              Print
            </Button>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2} pb={5}>
              <Grid container item xs={12}>
                <Grid item sm={6}>
                  <Typography variant="h5">Who is Your Sub?</Typography>
                  <Typography variant="body1">
                    Enter your sub’s email. This can be also be submitted later.
                  </Typography>

                  <TextField
                    type="email"
                    label="Sub Email"
                    name="subEmail"
                    value={formData.subEmail}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ my: 2 }}
                    size="small"
                  />

                  <Button type="submit" variant="contained" color="success" startIcon={<Send />}>
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </DashboardContent>
    </>
  );
}

interface AddDataProps {
  handleFileChange: (files: File[]) => void;
  handleAudioRecordingComplete: (blob: Blob) => void;
  handleNotesChange: (notes: string) => void;
}

const AddData: React.FC<AddDataProps> = ({
  handleFileChange,
  handleAudioRecordingComplete,
  handleNotesChange,
}) => {
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  return (
    <>
      <Button
        color="info"
        variant="outlined"
        onClick={() => setFileModalOpen(true)}
        startIcon={<PermMediaRounded />}
      >
        Upload Files
      </Button>
      <FileUploadModal
        open={fileModalOpen}
        handleClose={() => setFileModalOpen(false)}
        onFileChange={handleFileChange}
      />
      <Button
        color="error"
        variant="outlined"
        onClick={() => setVoiceModalOpen(true)}
        sx={{ ml: 2 }}
        startIcon={<MusicNote />}
      >
        Add Voice Notes
      </Button>
      <VoiceNoteModal
        open={voiceModalOpen}
        handleClose={() => setVoiceModalOpen(false)}
        onRecordingComplete={handleAudioRecordingComplete}
      />
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setNotesModalOpen(true)}
        sx={{ ml: 2 }}
        startIcon={<Notes />}
      >
        Add Notes
      </Button>
      <NotesModal
        open={notesModalOpen}
        handleClose={() => setNotesModalOpen(false)}
        onNotesChange={handleNotesChange}
      />
    </>
  );
};

interface PreviewDataProps {
  voiceNotes: Blob[];
  uploadedFiles: File[];
  notes: string[];
  onDeleteVoiceNote?: (index: number) => void;
  onDeleteFile?: (file: File) => void;
}

const PreviewData: React.FC<PreviewDataProps> = ({
  voiceNotes,
  uploadedFiles,
  notes,
  onDeleteVoiceNote,
  onDeleteFile,
}) => {
  console.log('voiceNotes:', voiceNotes);
  return (
    <Box display="inline-flex">
      <VoiceNotesPreview voiceNotes={voiceNotes} onDeleteVoiceNote={onDeleteVoiceNote} />
      <FilesPreview uploadedFiles={uploadedFiles} onDeleteFile={onDeleteFile} />
      <NotesPreview notes={notes} />
    </Box>
  );
};
