import { Battery, Camera, Cpu, Laptop, Monitor, Smartphone } from "lucide-react";

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
  if (type === 'laptop') {
    return (
      <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Monitor className="h-8 w-8 mb-2 text-primary" />
          <span className="text-sm font-medium">{screenSize || "N/A"}</span>
          <span className="text-xs text-muted-foreground">Screen</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Laptop className="h-8 w-8 mb-2 text-primary" />
          <span className="text-sm font-medium">{graphics || "N/A"}</span>
          <span className="text-xs text-muted-foreground">Graphics</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Cpu className="h-8 w-8 mb-2 text-primary" />
          <span className="text-sm font-medium">{processor}</span>
          <span className="text-xs text-muted-foreground">Processor</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Battery className="h-8 w-8 mb-2 text-primary" />
          <span className="text-sm font-medium">{battery}</span>
          <span className="text-xs text-muted-foreground">Battery</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center text-center">
        <Smartphone className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm font-medium">{screenSize || "N/A"}</span>
        <span className="text-xs text-muted-foreground">Screen</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Camera className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm font-medium">{camera}</span>
        <span className="text-xs text-muted-foreground">Camera</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Cpu className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm font-medium">{processor}</span>
        <span className="text-xs text-muted-foreground">Processor</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Battery className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm font-medium">{battery}</span>
        <span className="text-xs text-muted-foreground">Battery</span>
      </div>
    </div>
  );
}