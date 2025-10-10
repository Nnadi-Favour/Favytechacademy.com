import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Default course content
const defaultCourseContent = {
  '1.1': `Nnadi Favour is a software engineer and digital educator passionate about making AI accessible to beginners. She turns complex concepts into fun, hands-on projects that anyone can understand.`,
  '1.2': `This e-book guides you through AI in a practical way. You'll learn:\n\n• The basics of AI\n• Hands-on AI projects without coding\n• Step-by-step instructions for Machine Learning for Kids and Scratch\n• How to share and showcase your AI projects`,
  '2.1': `Artificial Intelligence (AI) is when machines learn, think, and make decisions like humans. AI can solve problems, recognize patterns, and perform tasks automatically.\n\nExamples of AI in daily life:\n• Siri, Google Assistant\n• Netflix or YouTube recommendations\n• Self-driving cars\n• Smart home devices`,
  '2.2': `AI is transforming how we live and work:\n\n• Education: Personalized learning and automated grading\n• Healthcare: Detecting diseases from scans\n• Games & Entertainment: Recommendations and AI-powered games\n• Transportation: Self-driving vehicles and traffic prediction\n• Daily Life: Smart devices and virtual assistants`,
  '2.3': `You can create AI projects without programming using beginner-friendly tools. These tools let you:\n\n• Train AI to recognize text, images, or sounds\n• Connect AI models to Scratch for interactive projects\n• Learn AI concepts through practical experience`,
  '3.1': `Machine Learning for Kids\n\nVisit machinelearningforkids.co.uk\n\n1. Click Sign Up\n2. If you don't have login credentials, reach out to the Help Center to generate a class account\n3. Enter the username and password provided\n4. Choose Text Project or Image Project depending on your AI task`,
  '3.1.1': `Creating Your Account\n\n1. Visit Machine Learning for Kids website\n2. Click Sign Up\n3. Contact Help Center for class account credentials\n4. Enter username and password\n5. Select your project type (Text, Image, or Sound)`,
  '3.1.2': `Navigating the Platform\n\n• Dashboard: View all your projects\n• Projects Tab: Create or manage AI projects\n• Training Examples: Add examples for the AI to learn\n• Labels: Categories the AI will recognize (e.g., Cat, Dog)\n• Train Model: Click to let AI learn\n• Test: Try new examples to check AI predictions\n\nExample:\nProject: Animal Detector\nLabels: Cat, Dog\nAdd 10 examples per label\nClick Train Model\nTest predictions`,
  '3.1.3': `Connecting Machine Learning for Kids with Scratch\n\n1. Click Make in your trained project\n2. Select Scratch 3 integration\n3. Copy the API key or project URL\n4. Open Scratch → Extensions → Machine Learning for Kids → Add Extension\n5. Paste your API key to connect\n\nExample Project: Animal Detector Game\n• User types clues\n• AI predicts animal\n• Display result in Scratch`,
  '3.2.1': `Scratch Basics (Navigation & Setup)\n\n• Workspace: Build your project here\n• Sprites: Characters or objects\n• Code Blocks: Drag-and-drop to program\n• Backdrops: Backgrounds\n• Green Flag: Start project\n\nStart Steps:\n1. Go to scratch.mit.edu → Click Create\n2. Explore categories: Motion, Looks, Sound, Events, Control, Sensing`,
  '3.2.2': `Building Your First AI Project in Scratch\n\nExample: Animal Detector\n\n1. Add sprite (Cat)\n2. Go to Events → when green flag clicked\n3. Add Machine Learning for Kids → classify [user input]\n4. Use Control → if then to display AI result\n5. Test typing clues`,
  '3.2.3': `Exporting Your Project\n\n1. Click File → Save to your computer → .sb3 file\n2. Share online: Share → Copy Link`,
  '4': `Hosting & Sharing Your AI Project\n\n• Host online: GitHub Pages, Scratch Online, or Google Drive\n• Share: Copy the link for friends or teachers\n• Showcase your work in the community`,
  '5': `Wrapping Up\n\n• AI helps machines think like humans\n• Machine Learning for Kids + Scratch make AI beginner-friendly\n• Your first AI project is ready to expand, share, and improve\n• Keep learning and building amazing AI projects!`
};

// Initialize default credentials on first startup
async function initializeCredentials() {
  try {
    // Initialize admin credentials
    const existing = await kv.get('fta_admin_credentials');
    if (!existing) {
      console.log('Initializing default credentials...');
      await kv.set('fta_admin_credentials', {
        id: 'ADMIN001',
        password: 'admin123',
        firstLogin: true,
        createdAt: new Date().toISOString(),
      });
      console.log('Default admin credentials initialized');
    }

    // Initialize default students
    const students = await kv.get('fta_students');
    if (!students) {
      console.log('Initializing default students...');
      await kv.set('fta_students', [
        { id: 'STU001', name: 'John Doe', email: 'john@example.com', password: 'student123', dateRegistered: '2025-01-15', progress: 45 },
        { id: 'STU002', name: 'Jane Smith', email: 'jane@example.com', password: 'student123', dateRegistered: '2025-01-20', progress: 78 },
      ]);
      console.log('Default students initialized');
    }

    // Initialize default course
    const courses = await kv.get('fta_courses');
    if (!courses) {
      console.log('Initializing default course...');
      await kv.set('fta_courses', [
        {
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
        }
      ]);
      console.log('Default course initialized');
    }

    // Initialize empty exams array
    const exams = await kv.get('fta_exams');
    if (!exams) {
      await kv.set('fta_exams', []);
      console.log('Exams initialized');
    }
  } catch (error) {
    console.error('Error initializing credentials:', error);
  }
}

// Initialize on startup
initializeCredentials();

// Health check endpoint
app.get("/make-server-1377402c/health", (c) => {
  return c.json({ status: "ok" });
});

// Get admin credentials
app.get("/make-server-1377402c/auth/admin", async (c) => {
  try {
    const credentials = await kv.get('fta_admin_credentials');
    if (!credentials) {
      return c.json({ error: 'Credentials not found' }, 404);
    }
    // Return only non-sensitive info for verification
    return c.json({
      id: credentials.id,
      firstLogin: credentials.firstLogin,
    });
  } catch (error) {
    console.error('Error fetching admin credentials:', error);
    return c.json({ error: 'Failed to fetch credentials' }, 500);
  }
});

// Verify login credentials
app.post("/make-server-1377402c/auth/login", async (c) => {
  try {
    const { id, password, role } = await c.req.json();
    
    if (role === 'admin') {
      const adminCreds = await kv.get('fta_admin_credentials');
      if (!adminCreds) {
        return c.json({ success: false, message: 'This login is no longer valid. Please contact your administrator.' });
      }
      
      if (adminCreds.id !== id || adminCreds.password !== password) {
        return c.json({ success: false, message: 'This login is no longer valid. Please contact your administrator.' });
      }
      
      // Create session with 30-minute expiry
      const sessionId = crypto.randomUUID();
      const sessionExpiry = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes
      
      await kv.set(`fta_session_${sessionId}`, {
        userId: id,
        role: 'admin',
        createdAt: new Date().toISOString(),
        expiresAt: sessionExpiry,
      });
      
      return c.json({
        success: true,
        requirePasswordChange: adminCreds.firstLogin,
        sessionId,
        expiresAt: sessionExpiry,
      });
    } else {
      // Handle student login
      const students = await kv.get('fta_students') || [];
      const student = students.find((s: any) => s.id === id);
      
      if (!student || student.password !== password) {
        return c.json({ success: false, message: 'This login is no longer valid. Please contact your administrator.' });
      }
      
      // Create session with 30-minute expiry
      const sessionId = crypto.randomUUID();
      const sessionExpiry = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      
      await kv.set(`fta_session_${sessionId}`, {
        userId: id,
        role: 'student',
        createdAt: new Date().toISOString(),
        expiresAt: sessionExpiry,
      });
      
      return c.json({
        success: true,
        student,
        sessionId,
        expiresAt: sessionExpiry,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed', details: error.message }, 500);
  }
});

// Verify session validity
app.post("/make-server-1377402c/auth/verify-session", async (c) => {
  try {
    const { sessionId } = await c.req.json();
    
    if (!sessionId) {
      return c.json({ valid: false, message: 'No session ID provided' });
    }
    
    const session = await kv.get(`fta_session_${sessionId}`);
    
    if (!session) {
      return c.json({ valid: false, message: 'Session not found' });
    }
    
    // Check if session has expired
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    
    if (now > expiresAt) {
      // Clean up expired session
      await kv.del(`fta_session_${sessionId}`);
      return c.json({ valid: false, message: 'Session expired' });
    }
    
    return c.json({ valid: true, session });
  } catch (error) {
    console.error('Session verification error:', error);
    return c.json({ error: 'Session verification failed' }, 500);
  }
});

// Update session activity (extend expiry on activity)
app.post("/make-server-1377402c/auth/refresh-session", async (c) => {
  try {
    const { sessionId } = await c.req.json();
    
    const session = await kv.get(`fta_session_${sessionId}`);
    
    if (!session) {
      return c.json({ success: false, message: 'Session not found' });
    }
    
    // Extend expiry by 30 minutes
    const newExpiry = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    
    await kv.set(`fta_session_${sessionId}`, {
      ...session,
      expiresAt: newExpiry,
    });
    
    return c.json({ success: true, expiresAt: newExpiry });
  } catch (error) {
    console.error('Session refresh error:', error);
    return c.json({ error: 'Session refresh failed' }, 500);
  }
});

// Change admin password
app.post("/make-server-1377402c/auth/change-admin-password", async (c) => {
  try {
    const { oldPassword, newPassword } = await c.req.json();
    
    const adminCreds = await kv.get('fta_admin_credentials');
    
    if (!adminCreds) {
      return c.json({ success: false, message: 'Admin credentials not found' });
    }
    
    if (adminCreds.password !== oldPassword) {
      return c.json({ success: false, message: 'Current password is incorrect' });
    }
    
    // Update password and mark as no longer first login
    await kv.set('fta_admin_credentials', {
      id: adminCreds.id,
      password: newPassword,
      firstLogin: false,
      updatedAt: new Date().toISOString(),
    });
    
    // Invalidate all existing admin sessions
    const allKeys = await kv.getByPrefix('fta_session_');
    for (const key of allKeys) {
      if (key.value?.role === 'admin') {
        await kv.del(key.key);
      }
    }
    
    return c.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    return c.json({ error: 'Password change failed', details: error.message }, 500);
  }
});

// Logout (invalidate session)
app.post("/make-server-1377402c/auth/logout", async (c) => {
  try {
    const { sessionId } = await c.req.json();
    
    if (sessionId) {
      await kv.del(`fta_session_${sessionId}`);
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return c.json({ error: 'Logout failed' }, 500);
  }
});

// Get all students
app.get("/make-server-1377402c/students", async (c) => {
  try {
    const students = await kv.get('fta_students') || [];
    return c.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    return c.json({ error: 'Failed to fetch students' }, 500);
  }
});

// Add student
app.post("/make-server-1377402c/students", async (c) => {
  try {
    const { name, email, password } = await c.req.json();
    
    const students = await kv.get('fta_students') || [];
    const newId = `STU${String(students.length + 1).padStart(3, '0')}`;
    
    const newStudent = {
      id: newId,
      name,
      email,
      password,
      dateRegistered: new Date().toISOString().split('T')[0],
      progress: 0,
    };
    
    students.push(newStudent);
    await kv.set('fta_students', students);
    
    return c.json({ success: true, student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    return c.json({ error: 'Failed to add student' }, 500);
  }
});

// Delete student
app.delete("/make-server-1377402c/students/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const students = await kv.get('fta_students') || [];
    const filtered = students.filter((s: any) => s.id !== id);
    
    await kv.set('fta_students', filtered);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting student:', error);
    return c.json({ error: 'Failed to delete student' }, 500);
  }
});

// Reset student password
app.post("/make-server-1377402c/students/:id/reset-password", async (c) => {
  try {
    const id = c.req.param('id');
    const { newPassword } = await c.req.json();
    
    const students = await kv.get('fta_students') || [];
    const updated = students.map((s: any) => 
      s.id === id ? { ...s, password: newPassword } : s
    );
    
    await kv.set('fta_students', updated);
    
    // Invalidate student sessions
    const allKeys = await kv.getByPrefix('fta_session_');
    for (const key of allKeys) {
      if (key.value?.userId === id) {
        await kv.del(key.key);
      }
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error resetting password:', error);
    return c.json({ error: 'Failed to reset password' }, 500);
  }
});

// Update student profile
app.put("/make-server-1377402c/students/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { name, email } = await c.req.json();
    
    const students = await kv.get('fta_students') || [];
    const updated = students.map((s: any) => 
      s.id === id ? { ...s, name, email } : s
    );
    
    await kv.set('fta_students', updated);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating student:', error);
    return c.json({ error: 'Failed to update student' }, 500);
  }
});

// Get exams
app.get("/make-server-1377402c/exams", async (c) => {
  try {
    const exams = await kv.get('fta_exams') || [];
    return c.json({ exams });
  } catch (error) {
    console.error('Error fetching exams:', error);
    return c.json({ error: 'Failed to fetch exams' }, 500);
  }
});

// Add exam
app.post("/make-server-1377402c/exams", async (c) => {
  try {
    const { title, date, time, formLink } = await c.req.json();
    
    const exams = await kv.get('fta_exams') || [];
    
    const newExam = {
      id: `EXAM${String(exams.length + 1).padStart(3, '0')}`,
      title,
      date,
      time,
      formLink,
      createdAt: new Date().toISOString(),
    };
    
    exams.push(newExam);
    await kv.set('fta_exams', exams);
    
    return c.json({ success: true, exam: newExam });
  } catch (error) {
    console.error('Error adding exam:', error);
    return c.json({ error: 'Failed to add exam' }, 500);
  }
});

// Delete exam
app.delete("/make-server-1377402c/exams/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const exams = await kv.get('fta_exams') || [];
    const filtered = exams.filter((e: any) => e.id !== id);
    
    await kv.set('fta_exams', filtered);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting exam:', error);
    return c.json({ error: 'Failed to delete exam' }, 500);
  }
});

// Get courses
app.get("/make-server-1377402c/courses", async (c) => {
  try {
    const courses = await kv.get('fta_courses') || [];
    return c.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return c.json({ error: 'Failed to fetch courses' }, 500);
  }
});

// Add course
app.post("/make-server-1377402c/courses", async (c) => {
  try {
    const { title, description, coverImage } = await c.req.json();
    
    const courses = await kv.get('fta_courses') || [];
    
    const newCourse = {
      id: `COURSE${String(courses.length + 1).padStart(3, '0')}`,
      title,
      description,
      coverImage: coverImage || 'figma:asset/061fc66c8b031ea958c6277a8505b0147cdd824e.png',
      chapters: [],
      createdAt: new Date().toISOString(),
    };
    
    courses.push(newCourse);
    await kv.set('fta_courses', courses);
    
    return c.json({ success: true, course: newCourse });
  } catch (error) {
    console.error('Error adding course:', error);
    return c.json({ error: 'Failed to add course' }, 500);
  }
});

// Update course PDF
app.put("/make-server-1377402c/courses/:id/pdf", async (c) => {
  try {
    const id = c.req.param('id');
    const { pdfLink } = await c.req.json();
    
    const courses = await kv.get('fta_courses') || [];
    const updated = courses.map((course: any) => 
      course.id === id ? { ...course, pdfDownloadLink: pdfLink } : course
    );
    
    await kv.set('fta_courses', updated);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating PDF:', error);
    return c.json({ error: 'Failed to update PDF' }, 500);
  }
});

// Add chapter to course
app.post("/make-server-1377402c/courses/:id/chapters", async (c) => {
  try {
    const courseId = c.req.param('id');
    const { number, title, content } = await c.req.json();
    
    const courses = await kv.get('fta_courses') || [];
    
    const newChapter = {
      id: `CH${number}`,
      number,
      title,
      content,
    };
    
    const updated = courses.map((course: any) => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: [...course.chapters, newChapter],
        };
      }
      return course;
    });
    
    await kv.set('fta_courses', updated);
    
    return c.json({ success: true, chapter: newChapter });
  } catch (error) {
    console.error('Error adding chapter:', error);
    return c.json({ error: 'Failed to add chapter' }, 500);
  }
});

// Update chapter video
app.put("/make-server-1377402c/courses/:courseId/chapters/:chapterId/video", async (c) => {
  try {
    const courseId = c.req.param('courseId');
    const chapterId = c.req.param('chapterId');
    const { videoUrl } = await c.req.json();
    
    const courses = await kv.get('fta_courses') || [];
    
    const updated = courses.map((course: any) => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.map((ch: any) =>
            ch.id === chapterId ? { ...ch, videoUrl } : ch
          ),
        };
      }
      return course;
    });
    
    await kv.set('fta_courses', updated);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating video:', error);
    return c.json({ error: 'Failed to update video' }, 500);
  }
});

// Delete course
app.delete("/make-server-1377402c/courses/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const courses = await kv.get('fta_courses') || [];
    const filtered = courses.filter((c: any) => c.id !== id);
    
    await kv.set('fta_courses', filtered);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return c.json({ error: 'Failed to delete course' }, 500);
  }
});

Deno.serve(app.fetch);