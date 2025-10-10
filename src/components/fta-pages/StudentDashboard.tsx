import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  BookOpen, 
  Download, 
  Video, 
  Calendar,
  ExternalLink,
  User,
  LogOut,
  FileText,
  Play,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function StudentDashboard() {
  const { user, logout, exams, courses, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [showTOC, setShowTOC] = useState(false);
  const [profileEdit, setProfileEdit] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'student') {
    return null;
  }

  const handleProfileUpdate = async () => {
    if (!profileEdit.name.trim() || !profileEdit.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await updateProfile(profileEdit.name, profileEdit.email);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const handleDownloadPDF = (pdfLink: string, courseTitle: string) => {
    if (!pdfLink) {
      toast.error('PDF not available yet');
      return;
    }
    // Open PDF link in new tab
    window.open(pdfLink, '_blank');
    toast.success(`Downloading ${courseTitle}...`);
  };

  const currentCourse = courses.find(c => c.id === selectedCourse);
  const currentChapter = currentCourse?.chapters.find(ch => ch.id === selectedChapter);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue your AI learning journey
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Exams
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses">
            {!selectedCourse ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card 
                    key={course.id}
                    className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedCourse(course.id);
                      setShowTOC(false);
                    }}
                  >
                    <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {course.chapters.length} Chapters
                        </Badge>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Start Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : !showTOC ? (
              // Course Cover View
              <div className="space-y-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCourse(null)}
                  className="mb-4"
                >
                  ← Back to Courses
                </Button>
                
                <Card className="overflow-hidden">
                  <div 
                    className="aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setShowTOC(true)}
                  >
                    <img
                      src={currentCourse?.coverImage}
                      alt={currentCourse?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <h2>{currentCourse?.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {currentCourse?.description}
                      </p>
                      <Button
                        size="lg"
                        onClick={() => setShowTOC(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Open Table of Contents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : !selectedChapter ? (
              // Table of Contents View
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowTOC(false)}
                  >
                    ← Back to Cover
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCourse(null)}
                  >
                    All Courses
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>📑 Table of Contents</CardTitle>
                    <CardDescription>{currentCourse?.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {currentCourse?.chapters.map((chapter, index) => (
                        <Button
                          key={chapter.id}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-4"
                          onClick={() => setSelectedChapter(chapter.id)}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm">{chapter.number}</span>
                            </div>
                            <div className="flex-1">
                              <div>{chapter.title}</div>
                              {chapter.videoUrl && (
                                <Badge variant="secondary" className="mt-1">
                                  <Video className="w-3 h-3 mr-1" />
                                  Video Available
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Chapter Content View
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedChapter(null)}
                  >
                    ← Back to Table of Contents
                  </Button>
                </div>

                {/* Chapter Content */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white">{currentChapter?.number}</span>
                      </div>
                      <div>
                        <CardTitle>{currentChapter?.title}</CardTitle>
                        <CardDescription>Chapter {currentChapter?.number}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Content Section */}
                    <div>
                      <h3 className="mb-4">📖 Content</h3>
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                          {currentChapter?.content}
                        </div>
                      </div>
                    </div>

                    {/* Video Tutorial Section */}
                    {currentChapter?.videoUrl ? (
                      <div>
                        <h3 className="mb-4">🎥 Video Tutorial</h3>
                        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                          <CardContent className="pt-6">
                            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Button
                                onClick={() => window.open(currentChapter.videoUrl, '_blank')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Play className="w-5 h-5 mr-2" />
                                Watch Video
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Alert>
                        <Video className="h-4 w-4" />
                        <AlertDescription>
                          Video tutorial coming soon for this chapter
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Resources Section */}
                    <div>
                      <h3 className="mb-4">📥 Resources</h3>
                      <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 border-green-200 dark:border-green-800">
                        <CardContent className="pt-6">
                          <Button
                            onClick={() => handleDownloadPDF(currentCourse?.pdfDownloadLink || '', currentCourse?.title || '')}
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={!currentCourse?.pdfDownloadLink}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Full Book as PDF
                          </Button>
                          {!currentCourse?.pdfDownloadLink && (
                            <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
                              PDF will be available soon
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle>📝 Upcoming Exams</CardTitle>
                <CardDescription>
                  Access your scheduled exams and assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {exams.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No exams scheduled yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {exams.map((exam) => (
                      <Card key={exam.id} className="border-2">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3>{exam.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(exam.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {exam.time}
                                </span>
                              </div>
                            </div>
                            <Button
                              onClick={() => window.open(exam.formLink, '_blank')}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Take Exam
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle>👤 Profile Information</CardTitle>
                  <CardDescription>
                    View and update your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Student ID</Label>
                    <Input
                      value={user.id}
                      disabled
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your unique student identifier (cannot be changed)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profileName">Full Name</Label>
                    <Input
                      id="profileName"
                      value={profileEdit.name}
                      onChange={(e) => setProfileEdit({ ...profileEdit, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profileEmail">Email Address</Label>
                    <Input
                      id="profileEmail"
                      type="email"
                      value={profileEdit.email}
                      onChange={(e) => setProfileEdit({ ...profileEdit, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>

                  <Button
                    onClick={handleProfileUpdate}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Password Notice */}
              <Alert>
                <AlertDescription>
                  <strong>Password Management:</strong> For security reasons, password changes can only be done by your administrator. Contact support if you need to reset your password.
                </AlertDescription>
              </Alert>

              {/* Logout */}
              <Card className="border-red-200 dark:border-red-800">
                <CardContent className="pt-6">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
