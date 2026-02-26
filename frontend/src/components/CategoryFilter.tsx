import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import type { Category } from '../backend';

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === '' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelect('')}
        className={`rounded-full font-semibold transition-all ${
          selected === ''
            ? 'bg-primary text-primary-foreground shadow-mint'
            : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
        }`}
      >
        <LayoutGrid size={13} className="mr-1.5" />
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.name}
          variant={selected === cat.name ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(cat.name)}
          className={`rounded-full font-semibold transition-all ${
            selected === cat.name
              ? 'bg-primary text-primary-foreground shadow-mint'
              : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
          }`}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
