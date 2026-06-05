import { useEffect } from 'react';

export default function ArtworkDetail({ artwork, onClose, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const {
    title,
    primaryImage,
    primaryImageSmall,
    additionalImages,
    artistDisplayName,
    artistDisplayBio,
    objectDate,
    medium,
    dimensions,
    department,
    culture,
    period,
    creditLine,
    tags,
    objectURL,
    classification,
    objectName,
    isPublicDomain,
    isHighlight,
    GalleryNumber,
  } = artwork;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="modal-inner">
          {/* Image section */}
          <div className="modal-image-section">
            {(primaryImage || primaryImageSmall) ? (
              <img
                src={primaryImage || primaryImageSmall}
                alt={title || 'Sans titre'}
                className="modal-image"
              />
            ) : (
              <div className="modal-image-placeholder">
                <span>🖼️</span>
                <span>Pas d&apos;image disponible</span>
              </div>
            )}

            {additionalImages?.length > 0 && (
              <div className="modal-additional-images">
                {additionalImages.slice(0, 5).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${title || ''} — vue ${i + 2}`}
                    className="modal-thumb"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="modal-info">
            <div className="modal-header">
              <h2 className="modal-title">{title || 'Sans titre'}</h2>
              <button
                className={`fav-btn-large${isFavorite ? ' favorited' : ''}`}
                onClick={onToggleFavorite}
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                {isFavorite ? '♥ Favori' : '♡ Ajouter'}
              </button>
            </div>

            <div className="modal-badges">
              {isHighlight && <span className="badge badge-highlight">★ Œuvre phare</span>}
              {isPublicDomain && <span className="badge badge-public">Domaine public</span>}
            </div>

            <dl className="detail-list">
              {artistDisplayName && (
                <>
                  <dt>Artiste</dt>
                  <dd>
                    {artistDisplayName}
                    {artistDisplayBio && <em> — {artistDisplayBio}</em>}
                  </dd>
                </>
              )}
              {objectDate      && <><dt>Date</dt><dd>{objectDate}</dd></>}
              {medium          && <><dt>Médium</dt><dd>{medium}</dd></>}
              {dimensions      && <><dt>Dimensions</dt><dd>{dimensions}</dd></>}
              {department      && <><dt>Département</dt><dd>{department}</dd></>}
              {objectName      && <><dt>Type</dt><dd>{objectName}</dd></>}
              {classification  && <><dt>Classification</dt><dd>{classification}</dd></>}
              {culture         && <><dt>Culture</dt><dd>{culture}</dd></>}
              {period          && <><dt>Période</dt><dd>{period}</dd></>}
              {GalleryNumber   && <><dt>Galerie</dt><dd>{GalleryNumber}</dd></>}
              {creditLine      && <><dt>Acquisition</dt><dd>{creditLine}</dd></>}
            </dl>

            {tags?.length > 0 && (
              <div className="modal-tags">
                {tags.map(tag => (
                  <span key={tag.term} className="tag">{tag.term}</span>
                ))}
              </div>
            )}

            {objectURL && (
              <a
                className="met-link"
                href={objectURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur metmuseum.org ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
