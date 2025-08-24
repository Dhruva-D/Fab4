import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveIndiaMap from './components/InteractiveIndiaMap';
import ArtOfTheWeekFeatured from './components/ArtOfTheWeekFeatured';
import './components/IndiaMap.css';
import Footer from './components/Footer';
import ArtistDashboard from './pages/ArtistDashboard';
import BrandDashboard from './pages/BrandDashboard';
import Marketplace from './pages/Marketplace';
import CheckoutPage from './pages/CheckoutPage';
import StoryPage from './pages/StoryPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ArtOfTheWeekPage from './pages/ArtOfTheWeekPage';

const Home = () => (
  <>
    <ArtOfTheWeekFeatured />
    <Hero />
    <InteractiveIndiaMap />
  </>
);

const AppRouter: React.FC = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Auth routes without navbar/footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Main app routes with navbar/footer */}
        <Route path="/*" element={
          <>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/art-of-the-week" element={<ArtOfTheWeekPage />} />
                <Route path="/artist" element={<ArtistDashboard />} />
                <Route path="/brand" element={<BrandDashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/story/:id" element={<StoryPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;
