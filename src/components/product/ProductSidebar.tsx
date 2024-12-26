import { cn } from "@/lib/utils";

interface ProductSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ProductSidebar({ activeSection, onSectionChange }: ProductSidebarProps) {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'prices', label: 'Prices' },
    { id: 'expert-review', label: 'Expert Review' },
    { id: 'full-specification', label: 'Full Specification' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'user-comments', label: 'User Comments' },
    { id: 'pictures', label: 'Pictures' },
  ];

  return (
    <div className="w-48 space-y-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "w-full text-left py-2 px-4 hover:text-primary transition-colors",
            activeSection === section.id && "text-primary border-l-2 border-primary"
          )}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}