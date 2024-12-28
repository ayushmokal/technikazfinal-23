import { cn } from "@/lib/utils";

interface ProductSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ProductSidebar({ activeSection, onSectionChange }: ProductSidebarProps) {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'features', label: 'Features' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'compare', label: 'Compare' },
  ];

  return (
    <div className="w-48 space-y-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "w-full text-left py-2 px-4 hover:text-primary transition-colors",
            activeSection === section.id && "text-primary border-l-2 border-primary bg-primary/5"
          )}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}