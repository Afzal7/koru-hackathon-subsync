import { Helmet } from 'react-helmet-async';
import { useRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

import { Mic, Home, Task, Settings, ExpandMore, CalendarMonth } from '@mui/icons-material';
import {
  Box,
  Grid,
  Card,
  Paper,
  Table,
  Button,
  Skeleton,
  TableRow,
  Checkbox,
  Accordion,
  TableBody,
  TableHead,
  TableCell,
  TextField,
  Typography,
  IconButton,
  TableContainer,
  AccordionSummary,
  AccordionDetails,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import FadeIn from 'src/components/fadeIn';
import { Scrollbar } from 'src/components/scrollbar';

import { Summary } from './sub-request/components/summary';

// ----------------------------------------------------------------------

export default function SummaryPage() {
  const [value, setValue] = useState(0);
  const [section, setSection] = useState('home');

  const renderPage = () => {
    switch (section) {
      case 'home':
        return <HomeSection setSection={setSection} />;
      case 'summary':
        return <SummarySection />;
      case 'roster':
        return <RosterSection />;
      case 'ask-ai':
        return <AskAISection />;
      default:
        return '';
    }
  };
  return (
    <>
      <Helmet>
        <title> {`Western Central Public School 01/01/2025 - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>{renderPage()}</DashboardContent>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={10}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);

            if (newValue === 0) {
              setSection('home');
            }
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Daily Tasks" icon={<Task />} />
          <BottomNavigationAction label="Calendar" icon={<CalendarMonth />} />
          <BottomNavigationAction label="Settings" icon={<Settings />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

const HomeSection = ({ setSection }: { setSection: (section: string) => void }) => (
  <FadeIn>
    <Box>
      <Box mb={2}>
        <Typography variant="h2">Western Central Public School</Typography>
        <Typography variant="h4" sx={{ color: 'grey.600' }}>
          Feb 13 - Feb 14
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: 'grey.300',
              textAlign: 'center',
              p: 5,
              '&:hover': { backgroundColor: 'grey.400' },
            }}
            onClick={() => setSection('summary')}
          >
            <Typography variant="h4">Summary</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: 'grey.300',
              textAlign: 'center',
              p: 5,
              '&:hover': { backgroundColor: 'grey.400' },
            }}
            onClick={() => setSection('ask-ai')}
          >
            <Typography variant="h4">Ask AI</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: 'grey.300',
              textAlign: 'center',
              p: 5,
              '&:hover': { backgroundColor: 'grey.400' },
            }}
            onClick={() => setSection('roster')}
          >
            <Typography variant="h4">Roster</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: 'grey.300',
              textAlign: 'center',
              p: 5,
              '&:hover': { backgroundColor: 'grey.400' },
            }}
            onClick={() => setSection('map')}
          >
            <Typography variant="h4">Map</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: 'grey.300',
              textAlign: 'center',
              p: 5,
              '&:hover': { backgroundColor: 'grey.400' },
            }}
            onClick={() => setSection('contacts')}
          >
            <Typography variant="h4">Contacts/Quick Call</Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </FadeIn>
);

const SummarySection = () => {
  const [showSummaryText, setShowSummaryText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSummaryText(true), 20);
  }, []);

  return (
    <FadeIn>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h4">Sub Request</Typography>
        <Typography variant="h5" sx={{ ml: 2, color: 'grey.600' }}>
          02/13/2025
        </Typography>
      </Box>

      <Accordion
        defaultExpanded
        sx={{ p: 1, mx: { xs: '-16px !important', sm: '0px !important' } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h4">Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Summary showSummaryText={showSummaryText} />
        </AccordionDetails>
      </Accordion>
    </FadeIn>
  );
};

const AskAISection = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([
    {
      text: "Hi! I'm your AI assistant. I can help answer questions about your class. What would you like to know?",
      sender: 'ai',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = [
    'For students who finished early, advise them to review their current notes, or read ahead on their textbooks from pages 190-197 on the next Chapter: The Solar System.',
    'Mr. Wyze, the custodian, can be reached at extension x292 from the classroom phone',
    'The school nurse can be reached at extension x292 from the classroom phone',
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        text: inputText,
        sender: 'user',
      },
    ]);

    // Send next response in sequence regardless of question
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: aiResponses[responseIndex % aiResponses.length],
          sender: 'ai',
        },
      ]);
      setResponseIndex((prev) => prev + 1);
    }, 2000);

    setInputText('');
  };

  return (
    <FadeIn>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h4">Sub Request</Typography>
        <Typography variant="h5" sx={{ ml: 2, color: 'grey.600' }}>
          02/13/2025
        </Typography>
      </Box>

      <Accordion defaultExpanded sx={{ p: 1 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h4">Ask AI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
              {messages.map((message, index) => (
                <FadeIn key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        backgroundColor: message.sender === 'user' ? 'primary.main' : 'grey.200',
                        color: message.sender === 'user' ? 'white' : 'text.primary',
                      }}
                    >
                      {message.sender === 'ai' && (
                        <TypeAnimation
                          splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
                          sequence={[message.text]}
                          speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
                          style={{
                            whiteSpace: 'pre-line',
                            fontSize: '1em',
                            display: 'block',
                          }}
                        />
                      )}
                      {message.sender === 'user' && <Typography>{message.text}</Typography>}
                    </Paper>
                  </Box>
                </FadeIn>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mx: -1 }}>
              <IconButton
                color="primary"
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    scale: 1.08,
                    transition: 'all 0.3s',
                  },
                }}
              >
                <Mic />
              </IconButton>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="contained" onClick={handleSendMessage} disabled={!inputText.trim()}>
                Send
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </FadeIn>
  );
};

const RosterSection = () => {
  const [showRosterText, setShowRosterText] = useState(false);
  const [rosterData, setRosterData] = useState([
    {
      firstName: 'Adam',
      lastName: 'Adonis',
      attendance: false,
      notes: '',
    },
    {
      firstName: 'Grace',
      lastName: 'Brior',
      attendance: false,
      notes: 'Grace needs transition breaks.',
    },
    {
      firstName: 'Patricia',
      lastName: 'Bruse',
      attendance: false,
      notes: '',
    },
    {
      firstName: 'Sophia',
      lastName: 'Cowley',
      attendance: false,
      notes: 'Sophia struggles with complex directions.',
    },
    {
      firstName: 'Sally',
      lastName: 'Decidue',
      attendance: false,
      notes: '',
    },
    {
      firstName: 'Ava',
      lastName: 'Fellud',
      attendance: false,
      notes: 'Ava is excelling in math and enjoys extra challenges.',
    },
    {
      firstName: 'Jackson',
      lastName: 'Hildegard',
      attendance: false,
      notes: 'Jackson actively participates in science and enjoys hands-on experiments.',
    },
    {
      firstName: 'Isabella',
      lastName: 'Pelegrind',
      attendance: false,
      notes: 'Isabella is lactose intolerant. please check for dairy in shared snacks.',
    },
    {
      firstName: 'Mason',
      lastName: 'Rower',
      attendance: false,
      notes: 'Mason finds writing assignments challenging. Graphic organizers help.',
    },
    {
      firstName: 'Liam',
      lastName: 'Serpen',
      attendance: false,
      notes: 'Liam enjoys interactive learning.',
    },
    {
      firstName: 'Lucas',
      lastName: 'Townsley',
      attendance: false,
      notes: 'Lucas needs material organization support.',
    },
  ]);

  useEffect(() => {
    setTimeout(() => setShowRosterText(true), 2000);
  }, []);

  const handleAttendanceChange = (index: number) => {
    setRosterData((prevData) =>
      prevData.map((item, i) => (i === index ? { ...item, attendance: !item.attendance } : item))
    );
  };

  return (
    <FadeIn>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h4">Sub Request</Typography>
        <Typography variant="h5" sx={{ ml: 2, color: 'grey.600' }}>
          02/13/2025
        </Typography>
      </Box>

      <Accordion defaultExpanded sx={{ p: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h4">Roster</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!showRosterText && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="text" width={50} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={50} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={50} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(3)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Skeleton variant="text" width={70} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={24} height={24} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={100} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {showRosterText && (
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Attendance</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rosterData.map((row, index) => (
                      <TableRow
                        hover
                        tabIndex={-1}
                        role="checkbox"
                        key={index}
                        sx={{ background: index % 2 === 0 ? '#f4f6f8c4' : 'transparent' }}
                      >
                        <TableCell component="th" scope="row">
                          <Box gap={2} display="flex" alignItems="center">
                            {`${row.firstName} ${row.lastName}`}
                          </Box>
                        </TableCell>

                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={row.attendance}
                            onChange={() => handleAttendanceChange(index)}
                          />
                        </TableCell>

                        <TableCell>{row.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          )}
        </AccordionDetails>
      </Accordion>
    </FadeIn>
  );
};
