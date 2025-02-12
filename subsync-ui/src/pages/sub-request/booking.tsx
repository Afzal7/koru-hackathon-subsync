import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Save,
  Send,
  Notes,
  Print,
  Upload,
  MusicNote,
  ExpandMore,
  AutoAwesome,
  CheckCircle,
  ContentCopy,
  PermMediaRounded,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  Chip,
  Card,
  Alert,
  Button,
  Select,
  Tooltip,
  Divider,
  MenuItem,
  TextField,
  Accordion,
  Typography,
  InputLabel,
  IconButton,
  CardHeader,
  AlertTitle,
  FormControl,
  CardContent,
  OutlinedInput,
  LinearProgress,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import FadeIn from 'src/components/fadeIn';

import { Summary } from './components/summary';
import { NotesModal, NotesPreview } from './components/notes';
import { FilesPreview, FileUploadModal } from './components/upload-docs';
import { VoiceNoteModal, VoiceNotesPreview } from './components/voice-notes';

export default function Page() {
  const [copied, setCopied] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showSummaryText, setShowSummaryText] = useState(false);
  const [formData, setFormData] = useState({
    selectedClasses: [],
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
    otherInfo: {
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

    if (name === 'selectedClasses') {
      setTimeout(() => {
        setShowAlerts(true);
      }, 3000);
    }
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

  const handleCopy = () => {
    navigator.clipboard.writeText('SUB-2X4K9M');
    setCopied(true);
    // setTimeout(() => setCopied(false), 2000);
  };

  const handleShowSummaryText = () => {
    setShowSummary(true);
    setTimeout(() => setShowSummaryText(true), 3000);
  };

  return (
    <FadeIn>
      <Helmet>
        <title> {`Sub Request 01/01/2025 - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h4">Sub Request</Typography>
          {/* <Typography variant="h5" sx={{ ml: 2, color: 'grey.600' }}>
            {formData.startDate ? format(formData.startDate, 'MM/dd/yyyy') : ''}
            {formData.endDate ? ` - ${format(formData.endDate, 'MM/dd/yyyy')}` : ''}
          </Typography> */}
        </Box>

        <Box display="inline-flex" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ display: 'inline' }}>
            Dates to cover:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(newValue: any) => handleDateChange('startDate', newValue)}
              sx={{ mx: 2 }}
              slots={{
                textField: (params) => <TextField variant="outlined" size="small" {...params} />,
              }}
            />
            {!showEndDatePicker && (
              <Button variant="text" onClick={() => setShowEndDatePicker(true)} sx={{ mx: 1 }}>
                Multiple Days
              </Button>
            )}
            {showEndDatePicker && (
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={(newValue: any) => handleDateChange('endDate', newValue)}
                sx={{ mx: 1 }}
                slots={{
                  textField: (params) => <TextField variant="outlined" size="small" {...params} />,
                }}
              />
            )}
          </LocalizationProvider>
        </Box>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h4">1. Select your classes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3} pb={3}>
              <Grid container item sm={4}>
                <FormControl size="medium" fullWidth>
                  <InputLabel id="classes-select-label">Select a Class</InputLabel>
                  <Select
                    labelId="classes-select-label"
                    id="classes-select"
                    multiple
                    value={formData.selectedClasses || []}
                    onChange={handleChange}
                    input={<OutlinedInput name="selectedClasses" label="Select Classes" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            variant="outlined"
                            color="primary"
                            key={value}
                            label={value}
                            sx={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              height: '36px',
                              padding: '4px',
                              borderRadius: '20px',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="Class 1">Class 1</MenuItem>
                    <MenuItem value="Class 2">Class 2</MenuItem>
                    <MenuItem value="Class 3">Class 3</MenuItem>
                    <MenuItem value="Class 4">Class 4</MenuItem>
                    <MenuItem value="Class 5">Class 5</MenuItem>
                    <MenuItem value="Class 6">Class 6</MenuItem>
                    <MenuItem value="Class 7">Class 7</MenuItem>
                  </Select>
                </FormControl>

                {formData.selectedClasses.length > 0 && !showAlerts && (
                  <Box mt={2} width="100%">
                    <Typography variant="h6" color="textSecondary">
                      Fetching Existing Documents
                    </Typography>
                    <LinearProgress />
                  </Box>
                )}

                {formData.selectedClasses.length > 0 && showAlerts && (
                  <Box mt={2} width="100%">
                    <FadeIn>
                      <Alert sx={{ mb: 2 }} severity="success">
                        <AlertTitle>Student information</AlertTitle>4 Documents Found.
                      </Alert>
                      <Alert sx={{ mb: 2 }} severity="success">
                        <AlertTitle>School information</AlertTitle>2 Documents Found.
                      </Alert>
                      <Alert sx={{ mb: 0 }} severity="success">
                        <AlertTitle>Lesson Plans</AlertTitle>3 Documents Found.
                      </Alert>
                    </FadeIn>
                  </Box>
                )}
              </Grid>
              <Grid item sm={1} />

              <Grid container item sm={5}>
                <Card sx={{ width: '100%', border: '1px solid #eee', boxShadow: 'none' }}>
                  <CardHeader title="Sync or upload a new class." />
                  <CardContent>
                    <Tooltip title="Sync with Google Classroom">
                      <IconButton sx={{ mr: 2 }}>
                        <img
                          src="/assets/icons/google-classroom.png"
                          alt="google classroom"
                          width="52px"
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Sync with Clever">
                      <IconButton sx={{ mr: 2 }}>
                        <img src="/assets/icons/clever.png" alt="google classroom" width="45px" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Sync with Brightwheel">
                      <IconButton sx={{ mr: 3 }}>
                        <img src="/assets/icons/brightwheel.png" alt="bright wheel" width="45px" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Upload files">
                      <Button startIcon={<Upload />} variant="outlined" size="large" sx={{ mr: 2 }}>
                        Upload
                      </Button>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h4">2. Upload Materials</Typography>
            <Typography variant="body1">
              Prepare your sub with the materials needed to conduct your classes. Include any
              additional information on your students that may not be covered in your class list
              such as personal needs, allergies, a seating chart, etc..
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ py: 4 }}>
            <Grid container spacing={3} pb={3}>
              <Grid item sm={12}>
                <AddData
                  handleFileChange={(file) => handleNestedFieldChange('otherInfo', 'docs', file)}
                  handleAudioRecordingComplete={(file) =>
                    handleNestedFieldChange('otherInfo', 'voiceNotes', file)
                  }
                  handleNotesChange={(notes) =>
                    handleNestedFieldChange('otherInfo', 'notes', notes)
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <PreviewData
                  voiceNotes={formData.otherInfo.voiceNotes}
                  uploadedFiles={formData.otherInfo.docs}
                  notes={formData.otherInfo.notes}
                />
                <Divider sx={{ my: 2 }} />
              </Grid>
              {/* <Grid container item xs={12}>
                <Grid item sm={6}>
                  <Typography variant="h6">
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

              <Grid container item xs={12}>
                <Grid item sm={6}>
                  <Typography variant="h6">Other</Typography>
                  <Typography variant="body2">
                    Personal needs, allergies, behavioral notes, seating chart
                  </Typography>
                </Grid>
                <Grid item sm={6} pt={2}>
                  <AddData
                    handleFileChange={(file) => handleNestedFieldChange('otherInfo', 'docs', file)}
                    handleAudioRecordingComplete={(file) =>
                      handleNestedFieldChange('otherInfo', 'voiceNotes', file)
                    }
                    handleNotesChange={(notes) =>
                      handleNestedFieldChange('otherInfo', 'notes', notes)
                    }
                  />
                </Grid>
                <Grid item sm={12}>
                  <PreviewData
                    voiceNotes={formData.otherInfo.voiceNotes}
                    uploadedFiles={formData.otherInfo.docs}
                    notes={formData.otherInfo.notes}
                  />
                </Grid>
              </Grid> */}
            </Grid>

            <Button
              size="large"
              type="submit"
              variant="outlined"
              color="primary"
              startIcon={<AutoAwesome />}
              onClick={() => {
                handleShowSummaryText();
              }}
            >
              Preview Summary
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={showSummary}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h4">3. Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Summary showSummaryText={showSummaryText} />

            {/* {!showSummaryText && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1, mb: 2 }} />
                  <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1, mb: 2 }} />
                  <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={40}
                      sx={{ borderRadius: 1 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={40}
                      sx={{ borderRadius: 1 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            {showSummaryText && (
              <TypeAnimation
                splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
                sequence={[
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                ]}
                speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                // omitDeletionAnimation
                style={{ fontSize: '1em', display: 'block', minHeight: '200px' }}
                // repeat={Infinity}
              />
            )} */}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h4">4. Share</Typography>
            <Typography variant="body1">
              Select additional recipients of this ticket. It will automatically be send to these
              users.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Add Recipients"
                  placeholder="Enter email addresses"
                  multiline
                  rows={4}
                  helperText="Enter multiple email addresses separated by commas or new lines"
                  sx={{ mb: 2 }}
                />
                <Button
                  size="large"
                  type="submit"
                  variant="outlined"
                  color="primary"
                  startIcon={<Print />}
                  sx={{ mr: 2 }}
                >
                  Print
                </Button>
                <Button
                  size="large"
                  type="submit"
                  variant="outlined"
                  color="primary"
                  startIcon={<Save />}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                >
                  Submit
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Share Code
                    </Typography>
                    <Typography variant="h4" color="primary" sx={{ letterSpacing: 2 }}>
                      SUB-2X4K9M
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SUB-2X4K9M"
                      alt="QR Code"
                      sx={{
                        width: 150,
                        height: 150,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                      }}
                    />
                  </Box>

                  <Button
                    fullWidth
                    color={copied ? 'success' : 'primary'}
                    variant="outlined"
                    onClick={handleCopy}
                    startIcon={copied ? <CheckCircle /> : <ContentCopy />}
                  >
                    {copied ? 'Copied!' : 'Copy Code'}
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </DashboardContent>
    </FadeIn>
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
        size="large"
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
        size="large"
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
        size="large"
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
      {voiceNotes.length === 0 && uploadedFiles.length === 0 && notes.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          No Additional Material added yet.
        </Typography>
      )}
      <VoiceNotesPreview voiceNotes={voiceNotes} onDeleteVoiceNote={onDeleteVoiceNote} />
      <FilesPreview uploadedFiles={uploadedFiles} onDeleteFile={onDeleteFile} />
      <NotesPreview notes={notes} />
    </Box>
  );
};
