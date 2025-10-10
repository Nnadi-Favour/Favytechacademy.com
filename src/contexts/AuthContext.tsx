import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  name: string;
  role: 'student' | 'admin';
  email?: string;
  progress?: number;
  requirePasswordChange?: boolean;
}

interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  dateRegistered: string;
  progress: number;
}

interface Exam {
  id: string;
  title: string;
  date: string;
  time: string;
  formLink: string;
  createdAt: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  content: string;
  videoUrl?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfDownloadLink?: string;
  chapters: Chapter[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  students: Student[];
  exams: Exam[];
  courses: Course[];
  login: (id: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (name: string, email: string) => Promise<void>;
  addStudent: (name: string, email: string, password: string) => Promise<Student>;
  deleteStudent: (id: string) => Promise<void>;
  resetStudentPassword: (id: string, newPassword: string) => Promise<void>;
  changeAdminPassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  addExam: (title: string, date: string, time: string, formLink: string) => Promise<Exam>;
  deleteExam: (id: string) => Promise<void>;
  addCourse: (title: string, description: string, coverImage: string) => Promise<Course>;
  updateCoursePDF: (courseId: string, pdfLink: string) => Promise<void>;
  addChapter: (courseId: string, number: string, title: string, content: string) => Promise<void>;
  updateChapterVideo: (courseId: string, chapterId: string, videoUrl: string) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-1377402c`;

// Default course content
const defaultCourseContent = {
  '1.1': `Nnadi Favour is a software engineer and digital educator passionate about making AI accessible to beginners. She turns complex concepts into fun, hands-on projects that anyone can understand.`,
  '1.2': `This e-book guides you through AI in a practical way. You'll learn:

• The basics of AI
• Hands-on AI projects without coding
• Step-by-step instructions for Machine Learning for Kids and Scratch
• How to share and showcase your AI projects`,
  '2.1': `Artificial Intelligence (AI) is when machines learn, think, and make decisions like humans. AI can solve problems, recognize patterns, and perform tasks automatically.

Examples of AI in daily life:
• Siri, Google Assistant
• Netflix or YouTube recommendations
• Self-driving cars
• Smart home devices`,
  '2.2': `AI is transforming how we live and work:

• Education: Personalized learning and automated grading
• Healthcare: Detecting diseases from scans
• Games & Entertainment: Recommendations and AI-powered games
• Transportation: Self-driving vehicles and traffic prediction
• Daily Life: Smart devices and virtual assistants`,
  '2.3': `You can create AI projects without programming using beginner-friendly tools. These tools let you:

• Train AI to recognize text, images, or sounds
• Connect AI models to Scratch for interactive projects
• Learn AI concepts through practical experience`,
  '3.1': `Machine Learning for Kids

Visit machinelearningforkids.co.uk

1. Click Sign Up
2. If you don't have login credentials, reach out to the Help Center to generate a class account
3. Enter the username and password provided
4. Choose Text Project or Image Project depending on your AI task`,
  '3.1.1': `Creating Your Account

1. Visit Machine Learning for Kids website
2. Click Sign Up
3. Contact Help Center for class account credentials
4. Enter username and password
5. Select your project type (Text, Image, or Sound)`,
  '3.1.2': `Navigating the Platform

• Dashboard: View all your projects
• Projects Tab: Create or manage AI projects
• Training Examples: Add examples for the AI to learn
• Labels: Categories the AI will recognize (e.g., Cat, Dog)
• Train Model: Click to let AI learn
• Test: Try new examples to check AI predictions

Example:
Project: Animal Detector
Labels: Cat, Dog
Add 10 examples per label
Click Train Model
Test predictions`,
  '3.1.3': `Connecting Machine Learning for Kids with Scratch

1. Click Make in your trained project
2. Select Scratch 3 integration
3. Copy the API key or project URL
4. Open Scratch → Extensions → Machine Learning for Kids → Add Extension
5. Paste your API key to connect

Example Project: Animal Detector Game
• User types clues
• AI predicts animal
• Display result in Scratch`,
  '3.2.1': `Scratch Basics (Navigation & Setup)

• Workspace: Build your project here
• Sprites: Characters or objects
• Code Blocks: Drag-and-drop to program
• Backdrops: Backgrounds
• Green Flag: Start project

Start Steps:
1. Go to scratch.mit.edu → Click Create
2. Explore categories: Motion, Looks, Sound, Events, Control, Sensing`,
  '3.2.2': `Building Your First AI Project in Scratch

Example: Animal Detector

1. Add sprite (Cat)
2. Go to Events → when green flag clicked
3. Add Machine Learning for Kids → classify [user input]
4. Use Control → if then to display AI result
5. Test typing clues`,
  '3.2.3': `Exporting Your Project

1. Click File → Save to your computer → .sb3 file
2. Share online: Share → Copy Link`,
  '4': `Hosting & Sharing Your AI Project

• Host online: GitHub Pages, Scratch Online, or Google Drive
• Share: Copy the link for friends or teachers
• Showcase your work in the community`,
  '5': `Wrapping Up

• AI helps machines think like humans
• Machine Learning for Kids + Scratch make AI beginner-friendly
• Your first AI project is ready to expand, share, and improve
• Keep learning and building amazing AI projects!`
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionExpiry, setSessionExpiry] = useState<string | null>(null);
  const sessionCheckInterval = useRef<number | null>(null);
  const activityRefreshInterval = useRef<number | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('fta_session_id');
    const storedExpiry = localStorage.getItem('fta_session_expiry');
    const storedUser = localStorage.getItem('fta_user');
    
    if (storedSessionId && storedExpiry && storedUser) {
      setSessionId(storedSessionId);
      setSessionExpiry(storedExpiry);
      setUser(JSON.parse(storedUser));
      verifySession(storedSessionId);
    }
  }, []);

  // Load data from server
  useEffect(() => {
    if (user) {
      loadStudents();
      loadExams();
      loadCourses();
    }
  }, [user]);

  // Session timeout checker (check every minute)
  useEffect(() => {
    if (sessionId && sessionExpiry) {
      // Check session validity every minute
      sessionCheckInterval.current = window.setInterval(() => {
        checkSessionValidity();
      }, 60000); // Check every 60 seconds

      // Refresh session on activity every 5 minutes
      activityRefreshInterval.current = window.setInterval(() => {
        refreshSession();
      }, 5 * 60000); // Refresh every 5 minutes

      return () => {
        if (sessionCheckInterval.current) {
          clearInterval(sessionCheckInterval.current);
        }
        if (activityRefreshInterval.current) {
          clearInterval(activityRefreshInterval.current);
        }
      };
    }
  }, [sessionId, sessionExpiry]);

  const verifySession = async (sid: string) => {
    try {
      const response = await fetch(`${API_BASE}/auth/verify-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ sessionId: sid }),
      });

      const data = await response.json();

      if (!data.valid) {
        // Session is invalid, log out
        await logout();
      }
    } catch (error) {
      console.error('Session verification error:', error);
      await logout();
    }
  };

  const checkSessionValidity = async () => {
    if (!sessionExpiry) return;

    const now = new Date();
    const expiry = new Date(sessionExpiry);

    if (now > expiry) {
      // Session has expired
      console.log('Session expired, logging out...');
      await logout();
    }
  };

  const refreshSession = async () => {
    if (!sessionId) return;

    try {
      const response = await fetch(`${API_BASE}/auth/refresh-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.success) {
        setSessionExpiry(data.expiresAt);
        localStorage.setItem('fta_session_expiry', data.expiresAt);
      }
    } catch (error) {
      console.error('Session refresh error:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch(`${API_BASE}/students`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setStudents(data.students || []);
    } catch (error) {
      console.error('Failed to load students:', error);
    }
  };

  const loadExams = async () => {
    try {
      const response = await fetch(`${API_BASE}/exams`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      setExams(data.exams || []);
    } catch (error) {
      console.error('Failed to load exams:', error);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await fetch(`${API_BASE}/courses`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      
      // If no courses exist, initialize with default course
      if (!data.courses || data.courses.length === 0) {
        await initializeDefaultCourse();
      } else {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const initializeDefaultCourse = async () => {
    try {
      const defaultCourse = {
        id: 'COURSE001',
        title: "A Beginner's Guide to Artificial Intelligence",
        description: "Learn AI fundamentals through hands-on projects with Machine Learning for Kids and Scratch",
        coverImage: 'figma:asset/061fc66c8b031ea958c6277a8505b0147cdd824e.png',
        pdfDownloadLink: '',
        chapters: [
          { id: 'CH1.1', number: '1.1', title: 'About the Author', content: defaultCourseContent['1.1'] },
          { id: 'CH1.2', number: '1.2', title: 'About This E-Book', content: defaultCourseContent['1.2'] },
          { id: 'CH2.1', number: '2.1', title: 'What is Artificial Intelligence?', content: defaultCourseContent['2.1'] },
          { id: 'CH2.2', number: '2.2', title: 'Importance of AI Today', content: defaultCourseContent['2.2'] },
          { id: 'CH2.3', number: '2.3', title: 'AI Without Coding – An Overview', content: defaultCourseContent['2.3'] },
          { id: 'CH3.1', number: '3.1', title: 'Machine Learning for Kids', content: defaultCourseContent['3.1'] },
          { id: 'CH3.1.1', number: '3.1.1', title: 'Creating Your Account', content: defaultCourseContent['3.1.1'] },
          { id: 'CH3.1.2', number: '3.1.2', title: 'Navigating the Platform', content: defaultCourseContent['3.1.2'] },
          { id: 'CH3.1.3', number: '3.1.3', title: 'Connecting ML for Kids with Scratch', content: defaultCourseContent['3.1.3'] },
          { id: 'CH3.2.1', number: '3.2.1', title: 'Scratch Basics (Navigation & Setup)', content: defaultCourseContent['3.2.1'] },
          { id: 'CH3.2.2', number: '3.2.2', title: 'Building Your First AI Project in Scratch', content: defaultCourseContent['3.2.2'] },
          { id: 'CH3.2.3', number: '3.2.3', title: 'Exporting Your Project', content: defaultCourseContent['3.2.3'] },
          { id: 'CH4', number: '4', title: 'Hosting & Sharing Your AI Project', content: defaultCourseContent['4'] },
          { id: 'CH5', number: '5', title: 'Wrapping Up', content: defaultCourseContent['5'] },
        ],
        createdAt: '2025-01-01',
      };

      // Store to server
      const response = await fetch(`${API_BASE}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(defaultCourse),
      });

      await loadCourses();
    } catch (error) {
      console.error('Failed to initialize default course:', error);
    }
  };

  const login = async (id: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const role = id.startsWith('ADMIN') ? 'admin' : 'student';
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ id, password, role }),
      });

      const data = await response.json();

      if (data.success) {
        setSessionId(data.sessionId);
        setSessionExpiry(data.expiresAt);
        
        localStorage.setItem('fta_session_id', data.sessionId);
        localStorage.setItem('fta_session_expiry', data.expiresAt);

        if (role === 'admin') {
          const adminUser = {
            id,
            name: 'Admin',
            role: 'admin' as const,
            requirePasswordChange: data.requirePasswordChange,
          };
          setUser(adminUser);
          localStorage.setItem('fta_user', JSON.stringify(adminUser));
        } else {
          const studentUser = {
            id: data.student.id,
            name: data.student.name,
            role: 'student' as const,
            email: data.student.email,
            progress: data.student.progress,
          };
          setUser(studentUser);
          localStorage.setItem('fta_user', JSON.stringify(studentUser));
        }

        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      if (sessionId) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ sessionId }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setSessionId(null);
      setSessionExpiry(null);
      localStorage.removeItem('fta_session_id');
      localStorage.removeItem('fta_session_expiry');
      localStorage.removeItem('fta_user');
      
      if (sessionCheckInterval.current) {
        clearInterval(sessionCheckInterval.current);
      }
      if (activityRefreshInterval.current) {
        clearInterval(activityRefreshInterval.current);
      }
    }
  };

  const updateProfile = async (name: string, email: string) => {
    if (!user || user.role !== 'student') return;

    try {
      const response = await fetch(`${API_BASE}/students/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setUser({ ...user, name, email });
        await loadStudents();
      }
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  const changeAdminPassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/auth/change-admin-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        // Update current user state to remove password change requirement
        if (user && user.id === 'ADMIN001') {
          const updatedUser = { ...user, requirePasswordChange: false };
          setUser(updatedUser);
          localStorage.setItem('fta_user', JSON.stringify(updatedUser));
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  };

  const addStudent = async (name: string, email: string, password: string): Promise<Student> => {
    try {
      const response = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      await loadStudents();
      return data.student;
    } catch (error) {
      console.error('Add student error:', error);
      throw error;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await fetch(`${API_BASE}/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      await loadStudents();
    } catch (error) {
      console.error('Delete student error:', error);
    }
  };

  const resetStudentPassword = async (id: string, newPassword: string) => {
    try {
      await fetch(`${API_BASE}/students/${id}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      await loadStudents();
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  const addExam = async (title: string, date: string, time: string, formLink: string): Promise<Exam> => {
    try {
      const response = await fetch(`${API_BASE}/exams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ title, date, time, formLink }),
      });

      const data = await response.json();
      await loadExams();
      return data.exam;
    } catch (error) {
      console.error('Add exam error:', error);
      throw error;
    }
  };

  const deleteExam = async (id: string) => {
    try {
      await fetch(`${API_BASE}/exams/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      await loadExams();
    } catch (error) {
      console.error('Delete exam error:', error);
    }
  };

  const addCourse = async (title: string, description: string, coverImage: string): Promise<Course> => {
    try {
      const response = await fetch(`${API_BASE}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ title, description, coverImage }),
      });

      const data = await response.json();
      await loadCourses();
      return data.course;
    } catch (error) {
      console.error('Add course error:', error);
      throw error;
    }
  };

  const updateCoursePDF = async (courseId: string, pdfLink: string) => {
    try {
      await fetch(`${API_BASE}/courses/${courseId}/pdf`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ pdfLink }),
      });
      await loadCourses();
    } catch (error) {
      console.error('Update PDF error:', error);
    }
  };

  const addChapter = async (courseId: string, number: string, title: string, content: string) => {
    try {
      await fetch(`${API_BASE}/courses/${courseId}/chapters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ number, title, content }),
      });
      await loadCourses();
    } catch (error) {
      console.error('Add chapter error:', error);
    }
  };

  const updateChapterVideo = async (courseId: string, chapterId: string, videoUrl: string) => {
    try {
      await fetch(`${API_BASE}/courses/${courseId}/chapters/${chapterId}/video`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ videoUrl }),
      });
      await loadCourses();
    } catch (error) {
      console.error('Update video error:', error);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await fetch(`${API_BASE}/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      await loadCourses();
    } catch (error) {
      console.error('Delete course error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      students,
      exams,
      courses,
      login, 
      logout,
      updateProfile,
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
      deleteCourse,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
