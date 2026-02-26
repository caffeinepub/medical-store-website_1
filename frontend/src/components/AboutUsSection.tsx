import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import type { StoreInfo } from '../backend';

interface AboutUsSectionProps {
  storeInfo?: StoreInfo;
}

export default function AboutUsSection({ storeInfo }: AboutUsSectionProps) {
  const info = storeInfo ?? {
    name: 'Sameer Medical',
    address: 'Shahabad, Karnataka, India',
    phone: '0000999988',
    hours: 'Mon-Sun: 10:00 AM – 3:00 PM & 6:00 PM – 10:00 PM',
  };

  const details = [
    {
      icon: MapPin,
      label: 'Our Location',
      value: info.address,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: info.phone,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      icon: Clock,
      label: 'Operating Hours',
      value: info.hours,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-accent-foreground rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Heart size={14} className="text-primary" />
              About Us
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
              Your Health Is Our{' '}
              <span className="text-primary">Top Priority</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              At {info.name}, we've been serving our community with dedication and care. Our team of licensed pharmacists and healthcare professionals are committed to providing you with the highest quality medicines and health products.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              We stock a comprehensive range of prescription medicines, over-the-counter drugs, vitamins, supplements, personal care products, and medical devices — all under one roof.
            </p>
          </div>

          {/* Right: Info Cards */}
          <div className="grid grid-cols-1 gap-4">
            {details.map(({ icon: Icon, label, value, color, bg }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-card border border-border"
              >
                <div className={`${bg} p-3 rounded-xl flex-shrink-0`}>
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="text-foreground font-medium text-sm leading-relaxed">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
