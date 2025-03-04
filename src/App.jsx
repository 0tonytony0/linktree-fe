import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import TellUsAboutYourself from './pages/TellUsAboutYourself';
import CreateAccount from './pages/CreateAccount';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Profile from './components/Profile';
import { ProtectedRoutes } from './routes/protectedRoutes';


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

        {/* Routes with Layout */}
        <Route path="/main" element={<ProtectedRoutes />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
