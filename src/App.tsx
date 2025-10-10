import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FTALayout } from './components/FTALayout';
import { Home } from './components/fta-pages/Home';
import { Login } from './components/fta-pages/Login';
import { About } from './components/fta-pages/About';
import { Team } from './components/fta-pages/Team';
import { FAQ } from './components/fta-pages/FAQ';
import { Contact } from './components/fta-pages/Contact';
import { StudentDashboard } from './components/fta-pages/StudentDashboard';
import { AdminDashboard } from './components/fta-pages/AdminDashboard';
import { EBook } from './components/fta-pages/EBook';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <FTALayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/ebook" element={<EBook />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FTALayout>
        <Toaster position="top-right" richColors />
      </Router>
    </AuthProvider>
  );
}
