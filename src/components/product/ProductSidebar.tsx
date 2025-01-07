import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductGalleryTabs } from "./ProductGalleryTabs";
import { useState } from "react";

interface ProductSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  mainImage: string | null;
  productName: string;
}

export function ProductSidebar({ activeSection, onSectionChange, mainImage, productName }: ProductSidebarProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'pictures', label: 'Pictures' },
    { id: 'review', label: 'Expert Review' },
    { id: 'user-comments', label: 'User Comments' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'comparison', label: 'Comparison' },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'pictures') {
      setIsGalleryOpen(true);
    } else {
      onSectionChange(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="w-48 space-y-2 sticky top-24">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={cn(
              "w-full text-left py-2 px-4 hover:text-primary transition-colors",
              activeSection === section.id && "text-primary border-l-2 border-primary bg-primary/5"
            )}
          >
            {section.label}
          </button>
        ))}
      </div>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <ProductGalleryTabs mainImage={mainImage} productName={productName} />
        </DialogContent>
      </Dialog>
    </>
  );
}