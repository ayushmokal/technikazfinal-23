import { cn } from "@/lib/utils";

interface ProductSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ProductSidebar({ activeSection, onSectionChange }: ProductSidebarProps) {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'expert-review', label: 'Expert Review' },
    { id: 'compare', label: 'Compare Products' },
    { id: 'comments', label: 'User Comments' },
  ];

  const scrollToSection = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-48 space-y-2 sticky top-24">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
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