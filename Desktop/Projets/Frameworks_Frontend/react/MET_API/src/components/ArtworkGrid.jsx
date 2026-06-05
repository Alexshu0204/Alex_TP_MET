import { useState, useEffect } from 'react';
import { getObject } from '../services/metApi';
import ArtworkCard from './ArtworkCard';

const ITEMS_PER_PAGE = 20;

export default function ArtworkGrid({ ids, total, onSelectArtwork, isFavorite, onToggleFavorite }) {
  const [artworks, setArtworks] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset and load first page whenever ids change
  useEffect(() => {
    if (!ids || ids.length === 0) {
      setArtworks([]);
      setLoadedCount(0);
      return;
    }

    let cancelled = false;
    setArtworks([]);
    setLoadedCount(0);
    setLoading(true);
    setError(null);

    const pageIds = ids.slice(0, ITEMS_PER_PAGE);

    Promise.all(pageIds.map(id => getObject(id)))
      .then(results => {
        if (!cancelled) {
          setArtworks(results);
          setLoadedCount(pageIds.length);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [ids]);

  function loadMore() {
    if (loading || !ids) return;
    const nextIds = ids.slice(loadedCount, loadedCount + ITEMS_PER_PAGE);
    if (nextIds.length === 0) return;

    setLoading(true);
    Promise.all(nextIds.map(id => getObject(id)))
      .then(results => {
        setArtworks(prev => [...prev, ...results]);
        setLoadedCount(prev => prev + nextIds.length);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }

  if (!ids) return null;

  return (
    <section className="artwork-grid-section">
      <p className="results-count">
        <strong>{total.toLocaleString('fr-FR')}</strong> résultat{total !== 1 ? 's' : ''}
        {artworks.length > 0 && ` — ${artworks.length} affiché${artworks.length !== 1 ? 's' : ''}`}
      </p>

      <div className="artwork-grid">
        {artworks.map(artwork => (
          <ArtworkCard
            key={artwork.objectID}
            artwork={artwork}
            onSelect={() => onSelectArtwork(artwork)}
            isFavorite={isFavorite(artwork.objectID)}
            onToggleFavorite={() => onToggleFavorite(artwork)}
          />
        ))}
      </div>

      {loading && (
        <div className="grid-loading">
          <div className="spinner" />
          Chargement des œuvres…
        </div>
      )}

      {error && <div className="grid-error">⚠️ {error}</div>}

      {!loading && ids.length > loadedCount && (
        <button className="load-more-btn" onClick={loadMore}>
          Charger plus ({(ids.length - loadedCount).toLocaleString('fr-FR')} restant{ids.length - loadedCount !== 1 ? 's' : ''})
        </button>
      )}
    </section>
  );
}
