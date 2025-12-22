import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatBot from '@/components/AIChatBot';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Diseases from './pages/Diseases';
import Boosters from './pages/Boosters';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import SymptomChecker from './pages/SymptomChecker';
import UploadReport from './pages/UploadReport';
import ReportResult from './pages/ReportResult';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/diseases" element={<Diseases />} />
          <Route path="/boosters" element={<Boosters />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/upload-report" element={<UploadReport />} />
          <Route path="/report-result" element={<ReportResult />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <AIChatBot />
    </div>
  );
}

export default App;
