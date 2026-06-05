import { useState, useEffect } from 'react';

const STORAGE_KEY = 'met_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(artwork) {
    setFavorites(prev =>
      prev.some(f => f.objectID === artwork.objectID) ? prev : [...prev, artwork]
    );
  }

  function removeFavorite(objectID) {
    setFavorites(prev => prev.filter(f => f.objectID !== objectID));
  }

  function isFavorite(objectID) {
    return favorites.some(f => f.objectID === objectID);
  }

  function toggleFavorite(artwork) {
    if (isFavorite(artwork.objectID)) {
      removeFavorite(artwork.objectID);
    } else {
      addFavorite(artwork);
    }
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
