import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <img
                src="/assets/generated/store-logo.dim_256x256.png"
                alt="Sameer Medical Logo"
                className="w-10 h-10 rounded-xl object-cover shadow-xs"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">
                Sameer Medical
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide">
                Pharmacy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive('/')
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              search={{ category: undefined }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive('/products')
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Products
            </Link>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/products" search={{ category: undefined }} className="hidden md:block">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-mint font-semibold rounded-xl px-5">
                Browse Products
              </Button>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-3 pb-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive('/')
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Home
              </Link>
              <Link
                to="/products"
                search={{ category: undefined }}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive('/products')
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Products
              </Link>
              <div className="pt-2 px-1">
                <Link
                  to="/products"
                  search={{ category: undefined }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
