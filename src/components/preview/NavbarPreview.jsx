import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function NavbarPreview({ config, isEditing, onUpdate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navStyle = {
    backgroundColor:
      config.styles.backgroundColor === 'transparent'
        ? 'rgba(15, 23, 42, 0.8)'
        : config.styles.backgroundColor,
    color: config.styles.textColor,
  };

  return (
    <nav
      className={`${config.styles.sticky ? 'sticky top-0' : 'relative'} z-50 backdrop-blur-md`}
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            {config.logo.imageUrl ? (
              <img src={config.logo.imageUrl} alt="Logo" className="h-9 md:h-10" />
            ) : (
              <span
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                contentEditable={isEditing}
                suppressContentEditableWarning
              >
                {config.logo.text}
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {config.links.map((link) =>
              link.isButton ? (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-glow"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: '#ffffff',
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.id}
                  href={link.href}
                  className="font-medium transition-colors hover:text-primary"
                  style={{ color: config.styles.textColor }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={navStyle}
      >
        <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-4">
          {config.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`font-medium py-3 ${
                link.isButton
                  ? 'rounded-lg text-center'
                  : 'border-b border-white/10'
              }`}
              style={
                link.isButton
                  ? {
                      background:
                        'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      color: '#ffffff',
                    }
                  : { color: config.styles.textColor }
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
