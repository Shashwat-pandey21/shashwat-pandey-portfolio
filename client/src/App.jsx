import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts & Guards
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Admin CMS Modules
import DashboardOverview from './admin/DashboardOverview';
import ProfileManager from './admin/ProfileManager';
import SkillsManager from './admin/SkillsManager';
import ProjectsManager from './admin/ProjectsManager';
import ExperienceManager from './admin/ExperienceManager';
import EducationManager from './admin/EducationManager';
import MessagesManager from './admin/MessagesManager';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public Pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/404" element={<NotFound />} />
          </Route>

          {/* Protected Admin CMS Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="profile" element={<ProfileManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="education" element={<EducationManager />} />
            <Route path="messages" element={<MessagesManager />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
