import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EmergencyHistory from './pages/emergency-history';
import SafetyIntelligence from './pages/safety-intelligence';
import PhoneAuthentication from './pages/phone-authentication';
import EmergencyDashboard from './pages/emergency-dashboard';
import SafetyTimer from './pages/safety-timer';
import TrustedContacts from './pages/trusted-contacts';
import CyberHarassmentGuide from './pages/cyber-harassment-guide';
import FeedbackAndRatingSystem from './pages/feedback-and-rating-system';
import ProfilePage from "./pages/profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<PhoneAuthentication />} />
        <Route path="/emergency-history" element={<EmergencyHistory />} />
        <Route path="/safety-intelligence" element={<SafetyIntelligence />} />
        <Route path="/phone-authentication" element={<PhoneAuthentication />} />
        <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
        <Route path="/safety-timer" element={<SafetyTimer />} />
        <Route path="/trusted-contacts" element={<TrustedContacts />} />
        <Route path="/cyber-harassment-guide" element={<CyberHarassmentGuide />} />
        <Route path="/feedback-and-rating-system" element={<FeedbackAndRatingSystem />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
