export default function ArtworkCard({ artwork, onSelect, isFavorite, onToggleFavorite }) {
  // Extraction des infos essentielles.
  // L'utilisation de primaryImageSmall améliore considérablement les performances de la grille.
  const { title, primaryImageSmall, artistDisplayName, objectDate, department } = artwork;

  return (
    <article className="artwork-card" onClick={onSelect} title="Voir la fiche détaillée">
      <div className="card-image-wrap">
        {primaryImageSmall ? (
          <img
            src={primaryImageSmall}
            alt={`Œuvre : ${title || 'Sans titre'}`}
            className="card-image"
            loading="lazy"
          />
        ) : (
          // Un placeholder plus élégant inspiré d'une cimaise vide
          <div className="card-image-placeholder">
            <span className="placeholder-icon">✧</span>
            <span>Non numérisée</span>
          </div>
        )}
      </div>

      <div className="card-body">
        {/* Le titre utilise la police serif pour rappeler les cartels d'exposition */}
        <h3 className="card-title">{title || 'Œuvre sans titre'}</h3>
        
        {artistDisplayName ? (
          <p className="card-artist">{artistDisplayName}</p>
        ) : (
          <p className="card-artist unknown">Artiste inconnu</p>
        )}
        
        <div className="card-meta">
          {objectDate && <span className="meta-badge">{objectDate}</span>}
          {department && <span className="meta-badge">{department}</span>}
        </div>
      </div>

      <button
        // Le bouton de favoris est conçu pour avoir une animation douce au survol
        className={`fav-btn${isFavorite ? ' favorited' : ''}`}
        onClick={e => { 
          // Arrête la propagation pour éviter d'ouvrir la modale lors de l'ajout aux favoris
          e.stopPropagation(); 
          onToggleFavorite(); 
        }}
        aria-label={isFavorite ? 'Retirer de ma galerie' : 'Ajouter à ma galerie'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </article>
  );
}
