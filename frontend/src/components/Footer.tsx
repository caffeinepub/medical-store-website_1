import { Link } from '@tanstack/react-router';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import type { StoreInfo } from '../backend';

interface FooterProps {
  storeInfo?: StoreInfo;
}

export default function Footer({ storeInfo }: FooterProps) {
  const info = storeInfo ?? {
    name: 'Sameer Medical',
    address: 'Shahabad, Karnataka, India',
    phone: '0000999988',
    hours: 'Mon-Sun: 10:00 AM – 3:00 PM & 6:00 PM – 10:00 PM',
  };

  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'medical-store');

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <img
                  src="/assets/generated/store-logo.dim_256x256.png"
                  alt="Logo"
                  className="w-9 h-9 rounded-xl object-cover"
                />
              </div>
              <div>
                <p className="font-display font-bold text-base text-background">{info.name}</p>
                <p className="text-xs text-background/60">Your Health Partner</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Committed to your health and wellness with quality products and expert care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-background text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About Us', to: '/#about' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-background/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-background text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">{info.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">{info.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">{info.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-background/50 text-xs">
            © {year} {info.name}. All rights reserved.
          </p>
          <p className="text-background/50 text-xs flex items-center gap-1">
            Built with{' '}
            <Heart size={11} className="text-primary fill-primary" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
