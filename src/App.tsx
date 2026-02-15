import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/animate.css';
import { AlbumDetailPage, LegacyAlbumRedirect } from './components/AlbumPages';
import { AlbumsPage, BiographyPage, ContactPage } from './components/LegacyPages';
import HomePage from './components/HomePage';
import PressKitOnePager from './components/PressKitOnePager';
import PressKitPage from './components/PressKitPage';

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
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/biography" element={<BiographyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/presskit" element={<PressKitPage />} />
        <Route path="/presskit/one-pager" element={<PressKitOnePager />} />
        <Route path="/albums/:albumSlug" element={<AlbumDetailPage />} />
        <Route path="/albums/index.html" element={<Navigate to="/albums" replace />} />
        <Route path="/albums/biography.html" element={<Navigate to="/biography" replace />} />
        <Route path="/albums/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="/albums/music/:albumSlug" element={<LegacyAlbumRedirect />} />
        <Route path="/albums/music/:albumSlug/index.html" element={<LegacyAlbumRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
