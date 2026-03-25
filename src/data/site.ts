export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'Stromy',
  tagline: 'Intelligence, Orchestrated.',
  description: 'Stromy orchestrates AI-powered intelligence for government relations, crisis management, and strategic communications.',
  url: 'https://stromy.com.au',
  email: 'hello@stromy.com.au',
  nav: [
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Technology', href: '/technology' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Insights', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

export const mainNav: NavItem[] = [...site.nav];

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
  ],
  services: [
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Insights', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;
