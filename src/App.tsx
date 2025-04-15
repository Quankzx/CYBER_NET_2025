import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import MessengerPopup from './components/MessengerPopup';
import AdminLayout from './layouts/AdminLayout';

// Main Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forum from './pages/Forum';
import TopicDetail from './pages/TopicDetail';
import CreateChatBox from './pages/CreateChatBox';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ProjectManagement from './pages/admin/ProjectManagement';
import ContentModeration from './pages/admin/ContentModeration';
import SystemSettings from './pages/admin/SystemSettings';
import CourseManagement from './pages/admin/CourseManagement';
import MessagingManagement from './pages/admin/MessagingManagement';
import RoleManagement from './pages/admin/RoleManagement';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
            <Route path="/admin/projects" element={<AdminLayout><ProjectManagement /></AdminLayout>} />
            <Route path="/admin/posts" element={<AdminLayout><ContentModeration /></AdminLayout>} />
            <Route path="/admin/courses" element={<AdminLayout><CourseManagement /></AdminLayout>} />
            <Route path="/admin/messages" element={<AdminLayout><MessagingManagement /></AdminLayout>} />
            <Route path="/admin/roles" element={<AdminLayout><RoleManagement /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><SystemSettings /></AdminLayout>} />

            {/* Main Routes */}
            <Route
              path="/*"
              element={
                <div className="flex min-h-screen bg-cyber-black">
                  <Navbar />
                  <main className="flex-1 h-screen overflow-y-auto">
                    <div className="max-w-7xl mx-auto p-4 pb-20 md:pb-4 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_100%)]">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/forum/:id" element={<TopicDetail />} />
                        <Route path="/forum/create" element={<CreateChatBox />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/create" element={<CreateProject />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/resources/:id" element={<ResourceDetail />} />
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                    </div>
                  </main>
                  <MessengerPopup />
                </div>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;