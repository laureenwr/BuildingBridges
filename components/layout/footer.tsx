import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'Vision', href: '/vision' },
      { label: 'Team', href: '/team' },
      { label: 'Partner', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/tos' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Imprint', href: '/imprint' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Workshops', href: '/workshops' },
      { label: 'Activities', href: '/activities' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
];

const socialLinks = [
  { Icon: Instagram, href: 'https://www.instagram.com/building_bridges_team/' },
];

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Building Bridges Logo"
                width={40}
                height={40}
                className="w-auto h-8"
              />
              <span className="text-xl font-bold">Building Bridges</span>
            </Link>
            <p className="text-gray-500 text-sm">
              Empowering FLINTA individuals and girls of color to achieve their full potential
              in psychosocial and educational fields.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-gray-900 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Building Bridges. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 