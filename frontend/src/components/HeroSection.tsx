import { Link } from '@tanstack/react-router';
import { ArrowRight, ShieldCheck, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { StoreInfo } from '../backend';

interface HeroSectionProps {
  storeInfo?: StoreInfo;
}

export default function HeroSection({ storeInfo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner Image */}
      <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] w-full">
        <img
          src="/assets/generated/hero-banner.dim_1440x500.png"
          alt="Sameer Medical"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              <ShieldCheck size={14} />
              <span>Trusted Healthcare Partner</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {storeInfo?.name ?? 'Sameer Medical'}
            </h1>

            <p className="text-white/85 text-lg sm:text-xl mb-8 leading-relaxed">
              Your trusted neighborhood pharmacy — quality medicines, vitamins, and health essentials delivered with care.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/products" search={{ category: undefined }}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-mint font-semibold rounded-xl gap-2"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <a href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold rounded-xl"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-primary-foreground/20">
            <div className="flex items-center gap-3 py-4 px-2">
              <Phone size={18} className="flex-shrink-0 opacity-80" />
              <div>
                <p className="text-xs font-medium opacity-70 uppercase tracking-wider">Call Us</p>
                <p className="font-semibold text-sm">{storeInfo?.phone ?? '0000999988'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-4 px-2 sm:px-6">
              <Clock size={18} className="flex-shrink-0 opacity-80" />
              <div>
                <p className="text-xs font-medium opacity-70 uppercase tracking-wider">Hours</p>
                <p className="font-semibold text-sm">{storeInfo?.hours ?? 'Mon-Sun: 10:00 AM – 3:00 PM & 6:00 PM – 10:00 PM'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-4 px-2 sm:px-6">
              <ShieldCheck size={18} className="flex-shrink-0 opacity-80" />
              <div>
                <p className="text-xs font-medium opacity-70 uppercase tracking-wider">Quality</p>
                <p className="font-semibold text-sm">Certified & Licensed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
