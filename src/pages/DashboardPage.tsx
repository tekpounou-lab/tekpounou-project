// src/pages/DashboardPage.tsx

import { Routes, Route, Navigate } from 'react-router-dom'

// Dashboard pages
import StudentDashboardPage from '@/pages/dashboard/StudentDashboardPage'
import TeacherDashboardPage from './dashboard/TeacherDashboardPage'
import {DashboardSettingsPage} from '@/pages/dashboard/DashboardSettingsPage'
import {NotificationsPage} from '@/pages/dashboard/NotificationsPage'

// Common layout (you can swap this with a Sidebar/Topbar component later)
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 p-6">
        <Routes>
          {/* Default route → Student dashboard */}
          <Route index element={<Navigate to="student" replace />} />

          {/* Student dashboard */}
          <Route path="student" element={<StudentDashboardPage />} />

          {/* Teacher dashboard */}
          <Route path="teacher" element={<TeacherDashboardPage />} />

          {/* Notifications */}
          <Route path="notifications" element={<NotificationsPage />} />

          {/* Settings */}
          <Route path="settings" element={<DashboardSettingsPage />} />

          {/* Catch-all for bad dashboard routes */}
          <Route path="*" element={<div>Dashboard section not found</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default DashboardPage
