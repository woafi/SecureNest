import React from 'react'
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from './components/AppRoutes';
import Layout from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <AppRoutes />
            </Layout>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
