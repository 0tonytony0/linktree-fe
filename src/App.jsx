import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import Main from './pages/Main';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ProtectedRoutes } from './routes/protectedRoutes';
import Preview from './pages/Preview';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/preview/:profileId" element={<Preview />} />
        {/* Routes with Layout */}
        <Route path="/main" element={<ProtectedRoutes />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
