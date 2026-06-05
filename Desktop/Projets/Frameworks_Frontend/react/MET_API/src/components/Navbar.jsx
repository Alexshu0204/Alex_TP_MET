export default function Navbar({ view, onViewChange, favCount }) {
  // Composant Navbar : design clair et minimaliste pour ne pas voler la vedette à l'art.
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-title">Le MET</span>
      </div>
      <div className="navbar-links">
        <button
          className={`nav-btn${view === 'search' ? ' active' : ''}`}
          onClick={() => onViewChange('search')}
        >
          Explorer le musée
        </button>
        <button
          className={`nav-btn${view === 'favorites' ? ' active' : ''}`}
          onClick={() => onViewChange('favorites')}
        >
          Ma galerie
          {favCount > 0 && <span className="fav-count">{favCount}</span>}
        </button>
      </div>
    </nav>
  );
}
