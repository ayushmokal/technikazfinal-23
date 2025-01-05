import { Battery, Camera, Cpu, Monitor } from "lucide-react";

interface ProductKeySpecsProps {
  type?: 'mobile' | 'laptop';
  screenSize?: string;
  camera?: string;
  processor: string;
  battery: string;
  graphics?: string;
}

export function ProductKeySpecs({ 
  type = 'mobile',
  screenSize,
  camera,
  processor,
  battery,
  graphics
}: ProductKeySpecsProps) {
  return (
    <div className="grid grid-cols-4 gap-8 py-6 border-y">
      <div className="flex flex-col items-center text-center">
        <Monitor className="h-8 w-8 mb-2 text-primary stroke-1" />
        <span className="text-sm font-medium">6.73 inches</span>
        <span className="text-xs text-muted-foreground">Mobile Display</span>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <Camera className="h-8 w-8 mb-2 text-primary stroke-1" />
        <span className="text-sm font-medium">50MP + 50MP + 50MP</span>
        <span className="text-xs text-muted-foreground">Camera</span>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <Cpu className="h-8 w-8 mb-2 text-primary stroke-1" />
        <span className="text-sm font-medium">Snapdragon 8 Gen 3</span>
        <span className="text-xs text-muted-foreground">Processor</span>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <Battery className="h-8 w-8 mb-2 text-primary stroke-1" />
        <span className="text-sm font-medium">4880 mAh</span>
        <span className="text-xs text-muted-foreground">Battery</span>
      </div>
    </div>
  );
}