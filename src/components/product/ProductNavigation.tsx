import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductNavigationProps {
  productName: string;
  imageUrl: string | null;
  onSectionClick: (sectionId: string) => void;
}

export function ProductNavigation({ productName, imageUrl, onSectionClick }: ProductNavigationProps) {
  return (
    <ScrollArea className="h-[300px] rounded-md border p-4">
      <nav className="space-y-2">
        <button
          onClick={() => onSectionClick('overview')}
          className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-secondary rounded-md transition-colors"
        >
          Overview
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-secondary rounded-md transition-colors">
              Pictures
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={productName}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
        <button
          onClick={() => onSectionClick('specifications')}
          className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-secondary rounded-md transition-colors"
        >
          Full Specification
        </button>
        {['Expert Review', 'Comparison', 'User Comments'].map((item) => (
          <button
            key={item}
            onClick={() => onSectionClick(item.toLowerCase().replace(' ', '-'))}
            className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-secondary rounded-md transition-colors"
          >
            {item}
          </button>
        ))}
      </nav>
    </ScrollArea>
  );
}