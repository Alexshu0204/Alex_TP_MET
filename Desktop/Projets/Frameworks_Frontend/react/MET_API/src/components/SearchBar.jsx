import { useState, useEffect } from 'react';
import { getDepartments } from '../services/metApi';

const initialForm = {
  q: '',
  isHighlight: false,
  title: false,
  tags: false,
  hasImages: false,
  isOnView: false,
  artistOrCulture: false,
  departmentId: '',
  medium: '',
  geoLocation: '',
  dateBegin: '',
  dateEnd: '',
};

export default function SearchBar({ onSearch, isLoading }) {
  const [form, setForm] = useState(initialForm);
  const [showFilters, setShowFilters] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [deptError, setDeptError] = useState(false);

  useEffect(() => {
    getDepartments()
      .then(data => setDepartments(data.departments))
      .catch(() => setDeptError(true));
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.q.trim()) return;
    onSearch(form);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-main">
        <input
          className="search-input"
          type="text"
          name="q"
          value={form.q}
          onChange={handleChange}
          placeholder="Cherchez un artiste, une émotion, une époque…"
          autoComplete="off"
          required
        />
        <button className="search-btn" type="submit" disabled={isLoading || !form.q.trim()}>
          {isLoading ? 'Recherche…' : 'Rechercher'}
        </button>
      </div>

      <button
        type="button"
        className="toggle-filters-btn"
        onClick={() => setShowFilters(v => !v)}
      >
        {showFilters ? '▲ Masquer les filtres' : '▼ Filtres avancés'}
      </button>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Département</label>
              <select
                name="departmentId"
                value={form.departmentId}
                onChange={handleChange}
                className="filter-select"
              >
                <option value="">Tous les départements</option>
                {departments.map(d => (
                  <option key={d.departmentId} value={d.departmentId}>
                    {d.displayName}
                  </option>
                ))}
                {deptError && <option disabled>Erreur de chargement</option>}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Médium / Type</label>
              <input
                className="filter-input"
                type="text"
                name="medium"
                value={form.medium}
                onChange={handleChange}
                placeholder="ex : Paintings, Ceramics…"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Géolocalisation</label>
              <input
                className="filter-input"
                type="text"
                name="geoLocation"
                value={form.geoLocation}
                onChange={handleChange}
                placeholder="ex : France, Japan, Egypt…"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Période (années)</label>
              <div className="date-inputs">
                <input
                  className="filter-input"
                  type="number"
                  name="dateBegin"
                  value={form.dateBegin}
                  onChange={handleChange}
                  placeholder="De"
                />
                <input
                  className="filter-input"
                  type="number"
                  name="dateEnd"
                  value={form.dateEnd}
                  onChange={handleChange}
                  placeholder="À"
                />
              </div>
            </div>
          </div>

          <div className="checkboxes-group">
            {[
              { name: 'hasImages',      label: 'Avec images' },
              { name: 'isHighlight',    label: 'Œuvres phares' },
              { name: 'isOnView',       label: 'Exposé actuellement' },
              { name: 'artistOrCulture', label: 'Artiste / Culture' },
              { name: 'title',          label: 'Dans le titre' },
              { name: 'tags',           label: 'Dans les tags' },
            ].map(({ name, label }) => (
              <label key={name} className="checkbox-label">
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name]}
                  onChange={handleChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
