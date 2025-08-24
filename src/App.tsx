import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveIndiaMap from './components/InteractiveIndiaMap';
import ArtOfTheWeekFeatured from './components/ArtOfTheWeekFeatured';
import './components/IndiaMap.css';
import './styles/indian-theme.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ArtOfTheWeekFeatured />
      <Hero />
      <InteractiveIndiaMap />
      <Footer />
    </div>
  );
}

export default App;