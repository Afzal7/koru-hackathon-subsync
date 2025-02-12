import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import { ExpandMore } from '@mui/icons-material';
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  Skeleton,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Accordion,
  Typography,
  TableContainer,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import FadeIn from 'src/components/fadeIn';
import { Scrollbar } from 'src/components/scrollbar';

interface SummaryProps {
  showSummaryText: boolean;
}

export const Summary: React.FC<SummaryProps> = ({ showSummaryText }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <>
      {!showSummaryText && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
            </Box>
          </Grid>
        </Grid>
      )}

      {showSummaryText && (
        <>
          <TypeAnimation
            splitter={(str) => str.split(/(?= )/)} // 'Lorem ipsum dolor' -> ['Lorem', ' ipsum', ' dolor']
            sequence={[
              'On  Feb 15-Feb 17 you will be substituting for Ms. Smith’s grade 4 class of 10 students at Western Central Public School.\n\nYou will be substituting for 2 classrooms for subjects including English and Math.\n\nOf the 10 of students in this class, 3 number have specific needs including allergies and behavioural. More information can be found throughout pages 3-4.\n\nYour schedule can be found on pages 2-3.\n\nContact information for school staff can be found on pages 4-5.',
              () => setShowContent(true),
            ]}
            speed={{ type: 'keyStrokeDelayInMs', value: 30 }}
            // omitDeletionAnimation
            style={{
              whiteSpace: 'pre-line',
              fontSize: '1em',
              display: 'block',
              minHeight: '200px',
            }}
            // repeat={Infinity}
          />

          {showContent && (
            <>
              <FadeIn>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h4">Schedule</Typography>
                <Scrollbar>
                  <TableContainer sx={{ overflow: 'unset' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ verticalAlign: 'top' }}>
                          <TableCell>Time slot</TableCell>
                          <TableCell>Classroom number</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>Lesson Plan</TableCell>
                          <TableCell sx={{ minWidth: '200px' }}>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell sx={{ whiteSpace: 'nowrap' }}>8:00 AM - 8:15 AM</TableCell>
                          <TableCell>Front Office: 101</TableCell>
                          <TableCell>Check into building</TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                        <TableRow hover>
                          <TableCell>8:20 AM - 9:00 AM</TableCell>
                          <TableCell>Room 102</TableCell>
                          <TableCell>Science</TableCell>
                          <TableCell>
                            Photosynthesis: Have students read textbook pgs. 107-121
                          </TableCell>
                          <TableCell />
                        </TableRow>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>9:05 AM - 10:00 AM</TableCell>
                          <TableCell>Room 102</TableCell>
                          <TableCell>Math</TableCell>
                          <TableCell>Fractions: Have students read textbook pgs. 371-379</TableCell>
                          <TableCell />
                        </TableRow>
                        <TableRow hover>
                          <TableCell>10:00 AM - 10:50 AM</TableCell>
                          <TableCell>Staff room: 116</TableCell>
                          <TableCell>Break</TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>11:00 AM - 12:00 PM</TableCell>
                          <TableCell>Room 103</TableCell>
                          <TableCell>Lunch</TableCell>
                          <TableCell />
                          <TableCell>3 students in class have allergies.</TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell>12:00 PM - 1:00 PM</TableCell>
                          <TableCell>Room 102</TableCell>
                          <TableCell>Social Studies</TableCell>
                          <TableCell>Textbook pgs. 228-240</TableCell>
                          <TableCell />
                        </TableRow>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>1:05 PM - 2:20 PM</TableCell>
                          <TableCell>Room 104</TableCell>
                          <TableCell>English</TableCell>
                          <TableCell>Worksheets #7, 9</TableCell>
                          <TableCell>
                            Students have an ongoing book report to work on after completing
                            worksheets #7 Commas and #9 Periods.
                          </TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell>2:30 PM - 2:50 PM</TableCell>
                          <TableCell>Bus Pickup: In Front of School</TableCell>
                          <TableCell />
                          <TableCell />
                          <TableCell />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </FadeIn>

              <FadeIn delay={2}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Student Notes
                  </Typography>

                  {/* <Scrollbar> */}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ verticalAlign: 'top' }}>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Note Type</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>Adams, Sarah</TableCell>
                          <TableCell>Medical</TableCell>
                          <TableCell>Severe peanut allergy - EpiPen in nurse office</TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell>Brown, Michael</TableCell>
                          <TableCell>IEP</TableCell>
                          <TableCell>Extra time needed for written assignments</TableCell>
                        </TableRow>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>Chen, David</TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                        <TableRow hover>
                          <TableCell>Davis, Emma</TableCell>
                          <TableCell>Behavioral</TableCell>
                          <TableCell>Sits at front of class to minimize distractions</TableCell>
                        </TableRow>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>Garcia, Luis</TableCell>
                          <TableCell>Other</TableCell>
                          <TableCell>Leaves at 1:30 PM for orthodontist appointment</TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell>Johnson, Marcus</TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>Lee, Jennifer</TableCell>
                          <TableCell>Medical</TableCell>
                          <TableCell>Lactose intolerant - No dairy products</TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell>Miller, Ryan</TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                        <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                          <TableCell>Smith, Jessica</TableCell>
                          <TableCell>Other</TableCell>
                          <TableCell>Goes home for lunch with parent permission</TableCell>
                        </TableRow>
                        <TableRow hover>
                          <TableCell>Wilson, Thomas</TableCell>
                          <TableCell />
                          <TableCell />
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* </Scrollbar> */}
                </Box>
              </FadeIn>

              <FadeIn delay={4}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    Administrative Information
                  </Typography>

                  <Accordion sx={{ p: { xs: 0, sm: 1 } }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6">Important Contacts</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Role</TableCell>
                              <TableCell>Location</TableCell>
                              <TableCell>Contact</TableCell>
                              <TableCell>When to Contact</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow hover>
                              <TableCell>Ms. Williams</TableCell>
                              <TableCell>Principal</TableCell>
                              <TableCell>Room 101</TableCell>
                              <TableCell>x201 / jwilliams@school.edu</TableCell>
                              <TableCell>Serious disciplinary issues, emergencies</TableCell>
                            </TableRow>
                            <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                              <TableCell>Mr. Rodriguez</TableCell>
                              <TableCell>Assistant Principal</TableCell>
                              <TableCell>Room 102</TableCell>
                              <TableCell>x202 / rodriguez@school.edu</TableCell>
                              <TableCell>Student behavior, general questions</TableCell>
                            </TableRow>
                            <TableRow hover>
                              <TableCell>Mrs. Chen</TableCell>
                              <TableCell>School Nurse</TableCell>
                              <TableCell>Health Office</TableCell>
                              <TableCell>x301 / nurse@school.edu</TableCell>
                              <TableCell>Medical issues, student illness</TableCell>
                            </TableRow>
                            <TableRow hover sx={{ background: '#f4f6f8c4' }}>
                              <TableCell>Mr. Kumar</TableCell>
                              <TableCell>IT Support</TableCell>
                              <TableCell>Room 150</TableCell>
                              <TableCell>x401 / tech@school.edu</TableCell>
                              <TableCell>Computer/projector issues, login help</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion sx={{ p: { xs: 0, sm: 1 } }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6">Emergency Procedures</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Card sx={{ p: 2, height: '100%' }}>
                            <Typography variant="h6" color="primary" gutterBottom>
                              Fire Drill
                            </Typography>
                            <Typography variant="body2" paragraph>
                              1. Exit through the west door
                              <br />
                              2. Turn right in the hallway
                              <br />
                              3. Proceed to the back field
                              <br />
                              4. Gather at designated spot #12
                              <br />
                              5. Take attendance using emergency roster
                            </Typography>
                          </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Card sx={{ p: 2, height: '100%' }}>
                            <Typography variant="h6" color="error" gutterBottom>
                              Lockdown
                            </Typography>
                            <Typography variant="body2" paragraph>
                              1. Lock classroom door
                              <br />
                              2. Cover door window
                              <br />
                              3. Turn off lights
                              <br />
                              4. Move students away from windows
                              <br />
                              5. Maintain silence
                              <br />
                              6. Wait for all-clear announcement
                            </Typography>
                          </Card>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion sx={{ p: { xs: 0, sm: 1 } }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6">School Map & Facilities</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          <Box
                            component="img"
                            src="/assets/images/school-map.jpg"
                            alt="School map"
                            sx={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle1" gutterBottom>
                            Key Locations:
                          </Typography>
                          <Typography variant="body2" component="div">
                            • Nearest Staff Bathroom: Room 204 (2nd floor)
                            <br />
                            • Teacher Lounge: Room 210
                            <br />
                            • Copy Room: Room 105
                            <br />
                            • Nurse Office: Room 120
                            <br />
                            • Main Office: Room 100
                            <br />• Cafeteria: First Floor, East Wing
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Card sx={{ p: 3, display: 'inline-block' }}>
                      <Typography variant="h6" gutterBottom>
                        Quick Access Code
                      </Typography>
                      <Typography variant="h4" color="primary" sx={{ letterSpacing: 2, mb: 2 }}>
                        SUB-2X4K9M
                      </Typography>
                      <Box
                        component="img"
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SUB-2X4K9M"
                        alt="QR Code"
                        sx={{ width: 150, height: 150 }}
                      />
                    </Card>
                  </Box>
                </Box>
              </FadeIn>
            </>
          )}
        </>
      )}
    </>
  );
};
