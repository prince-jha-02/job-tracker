import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/auth.context.jsx'
import ApplicationProvider from './context/Application.context.jsx'
import DashboardProvider from './context/Dashboard.context.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ApplicationProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </ApplicationProvider>
  </AuthProvider>
)
