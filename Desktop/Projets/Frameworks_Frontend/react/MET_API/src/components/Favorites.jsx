import ArtworkCard from './ArtworkCard';

export default function Favorites({ favorites, onSelectArtwork, isFavorite, onToggleFavorite, onClearAll }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <span className="favorites-empty-icon">✧</span>
        <h2 className="serif-font">Votre galerie est vide</h2>
        <p>Promenez-vous dans le musée et ajoutez vos coups de cœur pour les retrouver ici.</p>
      </div>
    );
  }

  return (
    <section className="favorites-section">
      <div className="favorites-header">
        <h2 className="section-title serif-font">Ma galerie ({favorites.length})</h2>
        <button className="clear-btn" onClick={onClearAll}>
          Vider la galerie
        </button>
      </div>

      <div className="artwork-grid">
        {favorites.map(artwork => (
          <ArtworkCard
            key={artwork.objectID}
            artwork={artwork}
            onSelect={() => onSelectArtwork(artwork)}
            isFavorite={isFavorite(artwork.objectID)}
            onToggleFavorite={() => onToggleFavorite(artwork)}
          />
        ))}
      </div>
    </section>
  );
}
