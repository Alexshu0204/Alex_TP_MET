const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export async function searchObjects(params) {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set('q', params.q || 'art');

  if (params.isHighlight)    url.searchParams.set('isHighlight', 'true');
  if (params.title)         url.searchParams.set('title', 'true');
  if (params.tags)          url.searchParams.set('tags', 'true');
  if (params.hasImages)     url.searchParams.set('hasImages', 'true');
  if (params.isOnView)      url.searchParams.set('isOnView', 'true');
  if (params.artistOrCulture) url.searchParams.set('artistOrCulture', 'true');
  if (params.departmentId)  url.searchParams.set('departmentId', String(params.departmentId));
  if (params.medium)        url.searchParams.set('medium', params.medium);
  if (params.geoLocation)   url.searchParams.set('geoLocation', params.geoLocation);
  if (params.dateBegin && params.dateEnd) {
    url.searchParams.set('dateBegin', String(params.dateBegin));
    url.searchParams.set('dateEnd', String(params.dateEnd));
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Erreur de recherche (${res.status})`);
  return res.json();
}

export async function getObject(objectID) {
  const res = await fetch(`${BASE_URL}/objects/${objectID}`);
  if (!res.ok) throw new Error(`Objet introuvable (${res.status})`);
  return res.json();
}

export async function getDepartments() {
  const res = await fetch(`${BASE_URL}/departments`);
  if (!res.ok) throw new Error('Impossible de charger les départements');
  return res.json();
}
