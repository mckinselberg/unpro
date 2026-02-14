import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/animate.css';
import { AlbumsPage, BiographyPage, ContactPage } from './components/LegacyPages';
import RandomAnimations from './components/RandomAnimations';

function NotFoundPage() {
  return (
    <div className="experience white" style={{ paddingTop: '4rem' }}>
      <h1>Page not found</h1>
      <p>
        <Link className="link" to="/">
          Back to home
        </Link>
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RandomAnimations />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/biography" element={<BiographyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/albums/index.html" element={<Navigate to="/albums" replace />} />
        <Route path="/albums/biography.html" element={<Navigate to="/biography" replace />} />
        <Route path="/albums/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
