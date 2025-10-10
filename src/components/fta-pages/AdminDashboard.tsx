import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { 
  UserPlus, 
  Users, 
  BookOpen, 
  TrendingUp,
  Trash2,
  AlertCircle,
  CheckCircle,
  Key,
  Lock,
  Calendar,
  Upload,
  FileText,
  ExternalLink,
  Video,
  Plus,
  Download
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminDashboard() {
  const { 
    user, 
    students, 
    exams, 
    courses,
    addStudent, 
    deleteStudent, 
    resetStudentPassword, 
    changeAdminPassword, 
    addExam, 
    deleteExam,
    addCourse,
    updateCoursePDF,
    addChapter,
    updateChapterVideo,
    deleteCourse
  } = useAuth();
  const navigate = useNavigate();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [isChapterDialogOpen, setIsChapterDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isPDFDialogOpen, setIsPDFDialogOpen] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string } | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [examForm, setExamForm] = useState({
    title: '',
    date: '',
    time: '',
    formLink: '',
  });
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    coverImage: '',
  });
  const [chapterForm, setChapterForm] = useState({
    number: '',
    title: '',
    content: '',
  });
  const [videoForm, setVideoForm] = useState({
    videoUrl: '',
  });
  const [pdfForm, setPDFForm] = useState({
    pdfLink: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else if (user.requirePasswordChange) {
      setIsPasswordDialogOpen(true);
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newStudent.name.trim() || !newStudent.email.trim() || !newStudent.password.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      const student = await addStudent(newStudent.name, newStudent.email, newStudent.password);
      
      toast.success('Student added successfully!', {
        description: `Student ID: ${student.id}`,
      });

      setNewStudent({ name: '', email: '', password: '' });
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add student');
    }
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully');
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const success = await changeAdminPassword(passwordForm.oldPassword, passwordForm.newPassword);

      if (success) {
        toast.success('Password changed successfully!', {
          description: 'Your old password is no longer valid on all devices',
        });
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setIsPasswordDialogOpen(false);
      } else {
        toast.error('Old password is incorrect');
      }
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleResetStudentPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) return;

    if (resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (resetPasswordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await resetStudentPassword(selectedStudent.id, resetPasswordForm.newPassword);
      toast.success(`Password reset for ${selectedStudent.name}`, {
        description: 'The old password is no longer valid on all devices',
      });

      setResetPasswordForm({ newPassword: '', confirmPassword: '' });
      setIsResetPasswordDialogOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  const handleAddExam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examForm.title.trim() || !examForm.date || !examForm.time || !examForm.formLink.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      await addExam(examForm.title, examForm.date, examForm.time, examForm.formLink);
      toast.success('Exam scheduled successfully!');
      
      setExamForm({ title: '', date: '', time: '', formLink: '' });
      setIsExamDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add exam');
    }
  };

  const handleDeleteExam = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteExam(id);
        toast.success('Exam deleted successfully');
      } catch (error) {
        toast.error('Failed to delete exam');
      }
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseForm.title.trim() || !courseForm.description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    try {
      const course = await addCourse(courseForm.title, courseForm.description, courseForm.coverImage || 'figma:asset/061fc66c8b031ea958c6277a8505b0147cdd824e.png');
      toast.success('Course created successfully!', {
        description: `Course ID: ${course.id}`,
      });

      setCourseForm({ title: '', description: '', coverImage: '' });
      setIsCourseDialogOpen(false);
    } catch (error) {
      toast.error('Failed to create course');
    }
  };

  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse || !chapterForm.number.trim() || !chapterForm.title.trim() || !chapterForm.content.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      await addChapter(selectedCourse, chapterForm.number, chapterForm.title, chapterForm.content);
      toast.success('Chapter added successfully!');

      setChapterForm({ number: '', title: '', content: '' });
      setIsChapterDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add chapter');
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse || !selectedChapter || !videoForm.videoUrl.trim()) {
      toast.error('Please select a course, chapter, and provide video URL');
      return;
    }

    try {
      await updateChapterVideo(selectedCourse, selectedChapter, videoForm.videoUrl);
      toast.success('Video added to chapter successfully!');

      setVideoForm({ videoUrl: '' });
      setIsVideoDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add video');
    }
  };

  const handleUpdatePDF = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse || !pdfForm.pdfLink.trim()) {
      toast.error('Please select a course and provide PDF link');
      return;
    }

    try {
      await updateCoursePDF(selectedCourse, pdfForm.pdfLink);
      toast.success('Course PDF updated successfully!');

      setPDFForm({ pdfLink: '' });
      setIsPDFDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update PDF');
    }
  };

  const stats = [
    {
      title: 'Total Students',
      value: students.length.toString(),
      icon: Users,
      color: 'bg-blue-600',
      trend: '+12% from last month',
    },
    {
      title: 'Active Courses',
      value: courses.length.toString(),
      icon: BookOpen,
      color: 'bg-purple-600',
      trend: 'All active',
    },
    {
      title: 'Scheduled Exams',
      value: exams.length.toString(),
      icon: FileText,
      color: 'bg-orange-600',
      trend: 'Upcoming',
    },
    {
      title: 'Avg. Progress',
      value: `${Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length) || 0}%`,
      icon: TrendingUp,
      color: 'bg-green-600',
      trend: '+5% this week',
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage students, courses, and platform activity
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsPasswordDialogOpen(true)}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Key className="w-4 h-4 mr-2" aria-hidden="true" />
              Change Password
            </Button>
          </div>
        </div>

        {/* Password Change Dialog */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={(open) => {
          if (!user?.requirePasswordChange) {
            setIsPasswordDialogOpen(open);
          }
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {user?.requirePasswordChange ? 'Change Your Password (Required)' : 'Change Admin Password'}
              </DialogTitle>
              <DialogDescription>
                {user?.requirePasswordChange 
                  ? 'For security, you must change your password before accessing the dashboard.'
                  : 'Update your admin password. Your old password will become invalid immediately.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Current Password *</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password *</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <Lock className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <AlertDescription className="text-sm text-gray-700 dark:text-gray-300">
                  Your old password will immediately become invalid after this change.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                {!user?.requirePasswordChange && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPasswordDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                  Change Password
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Reset Student Password Dialog */}
        <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Password for {selectedStudent?.name}</DialogTitle>
              <DialogDescription>
                Set a new password for this student. Their old password will become invalid immediately.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleResetStudentPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resetNewPassword">New Password *</Label>
                <Input
                  id="resetNewPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={resetPasswordForm.newPassword}
                  onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resetConfirmPassword">Confirm New Password *</Label>
                <Input
                  id="resetConfirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={resetPasswordForm.confirmPassword}
                  onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-600" aria-hidden="true" />
                <AlertDescription className="text-sm text-gray-700 dark:text-gray-300">
                  The student's old password will immediately become invalid.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsResetPasswordDialogOpen(false);
                    setSelectedStudent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                  Reset Password
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Alert for first login */}
        {user?.requirePasswordChange && (
          <Alert className="mb-8 bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-800">
            <Lock className="h-4 w-4 text-blue-600" aria-hidden="true" />
            <AlertDescription className="text-gray-700 dark:text-gray-300">
              <strong>Action Required:</strong> You must change your password before accessing the dashboard. Click "Change Password" above.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-0">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="text-2xl mb-1">{stat.value}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Registered Students</CardTitle>
                    <CardDescription>
                      Manage student accounts and monitor their progress
                    </CardDescription>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0">
                        <UserPlus className="w-4 h-4 mr-2" aria-hidden="true" />
                        Add New Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                          Create a new student account. Login credentials will be generated automatically.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddStudent} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="studentName">Full Name *</Label>
                          <Input
                            id="studentName"
                            placeholder="Enter student name"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="studentEmail">Email Address *</Label>
                          <Input
                            id="studentEmail"
                            type="email"
                            placeholder="student@example.com"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="studentPassword">Password *</Label>
                          <Input
                            id="studentPassword"
                            type="password"
                            placeholder="Create a password"
                            value={newStudent.password}
                            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                            required
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Student will use this password along with their auto-generated ID
                          </p>
                        </div>

                        <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                          <AlertCircle className="h-4 w-4 text-blue-600" aria-hidden="true" />
                          <AlertDescription className="text-sm text-gray-700 dark:text-gray-300">
                            A unique Student ID will be automatically generated upon account creation.
                          </AlertDescription>
                        </Alert>

                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                            Create Student
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No students registered yet. Add your first student!
                          </TableCell>
                        </TableRow>
                      ) : (
                        students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                                {student.id}
                              </code>
                            </TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.dateRegistered}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{student.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedStudent({ id: student.id, name: student.name });
                                    setIsResetPasswordDialogOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                                >
                                  <Key className="w-4 h-4" aria-hidden="true" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteStudent(student.id, student.name)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                >
                                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="space-y-6">
              {/* Course Management Buttons */}
              <div className="flex flex-wrap gap-3">
                <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Course</DialogTitle>
                      <DialogDescription>
                        Create a new course with title and description
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddCourse} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseTitle">Course Title *</Label>
                        <Input
                          id="courseTitle"
                          placeholder="e.g., A Beginner's Guide to AI"
                          value={courseForm.title}
                          onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseDescription">Description *</Label>
                        <Textarea
                          id="courseDescription"
                          placeholder="Describe the course content..."
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                          required
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coverImage">Book Cover Image URL</Label>
                        <Input
                          id="coverImage"
                          type="url"
                          placeholder="https://example.com/cover.jpg or figma:asset/..."
                          value={courseForm.coverImage}
                          onChange={(e) => setCourseForm({ ...courseForm, coverImage: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Optional: Provide a URL for the book cover. If left empty, a default cover will be used.
                        </p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsCourseDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                          Create Course
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isChapterDialogOpen} onOpenChange={setIsChapterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Add Chapter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Chapter to Course</DialogTitle>
                      <DialogDescription>
                        Add content to an existing course
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddChapter} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="chapterCourse">Select Course *</Label>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chapterNumber">Chapter Number *</Label>
                        <Input
                          id="chapterNumber"
                          placeholder="e.g., 1.1 or 3.2.1"
                          value={chapterForm.number}
                          onChange={(e) => setChapterForm({ ...chapterForm, number: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chapterTitle">Chapter Title *</Label>
                        <Input
                          id="chapterTitle"
                          placeholder="e.g., What is AI?"
                          value={chapterForm.title}
                          onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chapterContent">Chapter Content *</Label>
                        <Textarea
                          id="chapterContent"
                          placeholder="Enter the full chapter content..."
                          value={chapterForm.content}
                          onChange={(e) => setChapterForm({ ...chapterForm, content: e.target.value })}
                          required
                          rows={8}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsChapterDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          Add Chapter
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      Upload Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Video to Chapter</DialogTitle>
                      <DialogDescription>
                        Add a video tutorial link to a specific chapter
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddVideo} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="videoCourse">Select Course *</Label>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoChapter">Select Chapter *</Label>
                        <Select value={selectedChapter} onValueChange={setSelectedChapter} disabled={!selectedCourse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a chapter" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.find(c => c.id === selectedCourse)?.chapters.map(chapter => (
                              <SelectItem key={chapter.id} value={chapter.id}>
                                {chapter.number} - {chapter.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoUrl">Video URL *</Label>
                        <Input
                          id="videoUrl"
                          placeholder="https://youtube.com/... or video link"
                          value={videoForm.videoUrl}
                          onChange={(e) => setVideoForm({ videoUrl: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsVideoDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          Add Video
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isPDFDialogOpen} onOpenChange={setIsPDFDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Upload PDF
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Course PDF</DialogTitle>
                      <DialogDescription>
                        Add a Google Docs link for students to download as PDF
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdatePDF} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pdfCourse">Select Course *</Label>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pdfLink">Google Docs/PDF Link *</Label>
                        <Input
                          id="pdfLink"
                          placeholder="https://docs.google.com/..."
                          value={pdfForm.pdfLink}
                          onChange={(e) => setPDFForm({ pdfLink: e.target.value })}
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Students will be able to download this as a PDF
                        </p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsPDFDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          Upload PDF
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Courses List */}
              {courses.map(course => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="secondary">{course.chapters.length} Chapters</Badge>
                          {course.pdfDownloadLink && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Download className="w-3 h-3 mr-1" />
                              PDF Available
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (window.confirm(`Delete course "${course.title}"?`)) {
                            deleteCourse(course.id);
                            toast.success('Course deleted');
                          }
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {course.chapters.map(chapter => (
                        <div key={chapter.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{chapter.number}</Badge>
                            <span className="text-sm">{chapter.title}</span>
                          </div>
                          {chapter.videoUrl && (
                            <Badge variant="secondary">
                              <Video className="w-3 h-3 mr-1" />
                              Video
                            </Badge>
                          )}
                        </div>
                      ))}
                      {course.chapters.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No chapters added yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Scheduled Exams</CardTitle>
                    <CardDescription>
                      Manage exam schedules and Google Form links
                    </CardDescription>
                  </div>
                  <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Exam
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule New Exam</DialogTitle>
                        <DialogDescription>
                          Create an exam with date, time, and Google Form link
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddExam} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="examTitle">Exam Title *</Label>
                          <Input
                            id="examTitle"
                            placeholder="e.g., Chapter 1-3 Quiz"
                            value={examForm.title}
                            onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="examDate">Date *</Label>
                            <Input
                              id="examDate"
                              type="date"
                              value={examForm.date}
                              onChange={(e) => setExamForm({ ...examForm, date: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="examTime">Time *</Label>
                            <Input
                              id="examTime"
                              type="time"
                              value={examForm.time}
                              onChange={(e) => setExamForm({ ...examForm, time: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="examFormLink">Google Form Link *</Label>
                          <Input
                            id="examFormLink"
                            placeholder="https://forms.google.com/..."
                            value={examForm.formLink}
                            onChange={(e) => setExamForm({ ...examForm, formLink: e.target.value })}
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsExamDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                            Schedule Exam
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {exams.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No exams scheduled yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {exams.map(exam => (
                      <Card key={exam.id} className="border-2">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3>{exam.title}</h3>
                              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <span>📅 {new Date(exam.date).toLocaleDateString()}</span>
                                <span>🕐 {exam.time}</span>
                              </div>
                              <a 
                                href={exam.formLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                View Form Link
                              </a>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteExam(exam.id, exam.title)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
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
        </Tabs>
      </div>
    </div>
  );
}
