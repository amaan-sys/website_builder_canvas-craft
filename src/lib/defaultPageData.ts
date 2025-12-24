import { v4 as uuidv4 } from 'uuid';
import { PageSchema, BuilderSection, NavbarConfig, FooterConfig } from '@/types/builder';

export const createDefaultHeroSection = (): BuilderSection => ({
  id: uuidv4(),
  type: 'hero',
  name: 'Hero Section',
  visible: true,
  locked: false,
  styles: {
    backgroundColor: '#0f172a',
    backgroundGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    padding: '120px 0',
    minHeight: '90vh',
  },
  content: {
    headline: 'Build Beautiful Websites Without Code',
    subheadline: 'Drag, drop, and design your dream website with our intuitive builder. No coding required.',
    ctaText: 'Get Started Free',
    ctaSecondaryText: 'Watch Demo',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  components: [],
});

export const createDefaultFeaturesSection = (): BuilderSection => ({
  id: uuidv4(),
  type: 'features',
  name: 'Features Section',
  visible: true,
  locked: false,
  styles: {
    backgroundColor: '#ffffff',
    padding: '100px 0',
  },
  content: {
    headline: 'Powerful Features',
    subheadline: 'Everything you need to build stunning websites',
    features: [
      {
        id: uuidv4(),
        icon: 'Layers',
        title: 'Drag & Drop Builder',
        description: 'Intuitive drag and drop interface that makes building websites a breeze.',
      },
      {
        id: uuidv4(),
        icon: 'Palette',
        title: 'Beautiful Templates',
        description: 'Start with professionally designed templates and customize them to your needs.',
      },
      {
        id: uuidv4(),
        icon: 'Smartphone',
        title: 'Fully Responsive',
        description: 'Your website looks perfect on any device, from desktop to mobile.',
      },
      {
        id: uuidv4(),
        icon: 'Zap',
        title: 'Lightning Fast',
        description: 'Optimized for speed to ensure your visitors have the best experience.',
      },
      {
        id: uuidv4(),
        icon: 'Shield',
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security to keep your website and data safe.',
      },
      {
        id: uuidv4(),
        icon: 'BarChart',
        title: 'Analytics Built-in',
        description: 'Track your website performance with integrated analytics tools.',
      },
    ],
  },
  components: [],
});

export const createDefaultServicesSection = (): BuilderSection => ({
  id: uuidv4(),
  type: 'services',
  name: 'Services Section',
  visible: true,
  locked: false,
  styles: {
    backgroundColor: '#f8fafc',
    padding: '100px 0',
  },
  content: {
    headline: 'Our Services',
    subheadline: 'Comprehensive solutions for your digital presence',
    services: [
      {
        id: uuidv4(),
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
        title: 'Web Design',
        description: 'Beautiful, custom designs that capture your brand identity and engage your audience.',
        link: '#',
      },
      {
        id: uuidv4(),
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        title: 'Development',
        description: 'Robust, scalable web applications built with modern technologies.',
        link: '#',
      },
      {
        id: uuidv4(),
        imageUrl: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&q=80',
        title: 'SEO Optimization',
        description: 'Improve your search rankings and drive organic traffic to your website.',
        link: '#',
      },
    ],
  },
  components: [],
});

export const createDefaultCTASection = (): BuilderSection => ({
  id: uuidv4(),
  type: 'cta',
  name: 'Call to Action',
  visible: true,
  locked: false,
  styles: {
    backgroundGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    padding: '80px 0',
  },
  content: {
    headline: 'Ready to Get Started?',
    subheadline: 'Join thousands of creators who are already building amazing websites.',
    ctaText: 'Start Building Now',
    ctaSecondaryText: 'Contact Sales',
  },
  components: [],
});

export const createDefaultNavbar = (): NavbarConfig => ({
  id: uuidv4(),
  style: 'minimal',
  logo: {
    text: 'SiteBuilder',
  },
  links: [
    { id: uuidv4(), label: 'Features', href: '#features' },
    { id: uuidv4(), label: 'Services', href: '#services' },
    { id: uuidv4(), label: 'Pricing', href: '#pricing' },
    { id: uuidv4(), label: 'Contact', href: '#contact' },
    { id: uuidv4(), label: 'Get Started', href: '#start', isButton: true },
  ],
  styles: {
    backgroundColor: 'transparent',
    textColor: '#ffffff',
    sticky: true,
  },
});

export const createDefaultFooter = (): FooterConfig => ({
  id: uuidv4(),
  style: 'columns',
  logo: {
    text: 'SiteBuilder',
  },
  columns: [
    {
      id: uuidv4(),
      title: 'Product',
      links: [
        { id: uuidv4(), label: 'Features', href: '#' },
        { id: uuidv4(), label: 'Pricing', href: '#' },
        { id: uuidv4(), label: 'Templates', href: '#' },
      ],
    },
    {
      id: uuidv4(),
      title: 'Company',
      links: [
        { id: uuidv4(), label: 'About', href: '#' },
        { id: uuidv4(), label: 'Blog', href: '#' },
        { id: uuidv4(), label: 'Careers', href: '#' },
      ],
    },
    {
      id: uuidv4(),
      title: 'Support',
      links: [
        { id: uuidv4(), label: 'Help Center', href: '#' },
        { id: uuidv4(), label: 'Contact', href: '#' },
        { id: uuidv4(), label: 'Status', href: '#' },
      ],
    },
  ],
  socialLinks: [
    { id: uuidv4(), platform: 'twitter', href: '#' },
    { id: uuidv4(), platform: 'facebook', href: '#' },
    { id: uuidv4(), platform: 'instagram', href: '#' },
    { id: uuidv4(), platform: 'linkedin', href: '#' },
  ],
  copyright: '© 2024 SiteBuilder. All rights reserved.',
  styles: {
    backgroundColor: '#0f172a',
    textColor: '#94a3b8',
  },
});

export const getDefaultPage = (): PageSchema => ({
  id: uuidv4(),
  name: 'Home',
  slug: '/',
  meta: {
    title: 'My Website - Built with SiteBuilder',
    description: 'A beautiful website created with the no-code website builder.',
  },
  navbar: createDefaultNavbar(),
  sections: [
    createDefaultHeroSection(),
    createDefaultFeaturesSection(),
    createDefaultServicesSection(),
    createDefaultCTASection(),
  ],
  footer: createDefaultFooter(),
  globalStyles: {
    fontFamily: 'Inter, system-ui, sans-serif',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    backgroundColor: '#ffffff',
  },
});
