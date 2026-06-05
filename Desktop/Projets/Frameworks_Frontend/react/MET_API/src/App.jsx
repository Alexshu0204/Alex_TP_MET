import { useState } from 'react';
import { searchObjects } from './services/metApi';
import { useFavorites } from './hooks/useFavorites';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ArtworkGrid from './components/ArtworkGrid';
import ArtworkDetail from './components/ArtworkDetail';
import Favorites from './components/Favorites';
import './App.css';

export default function App() {
  const [view, setView] = useState('search');
  const [searchIds, setSearchIds] = useState(null);
  const [searchTotal, setSearchTotal] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const { favorites, isFavorite, toggleFavorite, clearFavorites } = useFavorites();

  async function handleSearch(params) {
    setIsSearching(true);
    setSearchError(null);
    setSearchIds(null);
    try {
      const data = await searchObjects(params);
      setSearchIds(data.objectIDs || []);
      setSearchTotal(data.total || 0);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setIsSearching(false);
    }
  }

  function handleClearFavorites() {
    if (window.confirm('Supprimer tous les favoris ?')) {
      clearFavorites();
    }
  }

  return (
    <div className="app">
      <Navbar view={view} onViewChange={setView} favCount={favorites.length} />

      <main className="main-content">
        {view === 'search' ? (
          <>
            <header className="page-header">
              <h1 className="page-title">Galerie du MET</h1>
              <p className="page-subtitle">Découvrez plus de 470 000 œuvres à travers le temps et l'espace</p>
            </header>

            <SearchBar onSearch={handleSearch} isLoading={isSearching} />

            {searchError && (
              <div className="search-error">⚠️ {searchError}</div>
            )}

            {isSearching && (
              <div className="search-loading">
                <div className="spinner" />
                <p>Recherche en cours…</p>
              </div>
            )}

            {!isSearching && searchIds !== null && searchIds.length === 0 && (
              <p className="no-results">Aucun résultat trouvé. Essayez d&apos;autres termes ou filtres.</p>
            )}

            {searchIds && searchIds.length > 0 && (
              <ArtworkGrid
                ids={searchIds}
                total={searchTotal}
                onSelectArtwork={setSelectedArtwork}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </>
        ) : (
          <Favorites
            favorites={favorites}
            onSelectArtwork={setSelectedArtwork}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onClearAll={handleClearFavorites}
          />
        )}
      </main>

      {selectedArtwork && (
        <ArtworkDetail
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          isFavorite={isFavorite(selectedArtwork.objectID)}
          onToggleFavorite={() => toggleFavorite(selectedArtwork)}
        />
      )}
    </div>
  );
}
