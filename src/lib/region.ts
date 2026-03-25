export type Region = 'au' | 'nl';

export function detectRegion(): Region {
  if (typeof window === 'undefined') return 'au';
  const hostname = window.location.hostname;
  if (hostname.endsWith('.nl')) return 'nl';
  const stored = localStorage.getItem('stromy-region');
  if (stored === 'au' || stored === 'nl') return stored;
  return 'au';
}

export function setRegion(region: Region): void {
  localStorage.setItem('stromy-region', region);
  window.dispatchEvent(new CustomEvent('region-change', { detail: region }));
}

export const regionConfig = {
  au: {
    label: 'Australia',
    flag: '\u{1F1E6}\u{1F1FA}',
    domain: 'stromy.com.au',
    address: 'Melbourne, Australia',
    email: 'hello@stromy.com.au',
  },
  nl: {
    label: 'Netherlands',
    flag: '\u{1F1F3}\u{1F1F1}',
    domain: 'stromy.nl',
    address: 'Amsterdam, Netherlands',
    email: 'hello@stromy.nl',
  },
} as const;
