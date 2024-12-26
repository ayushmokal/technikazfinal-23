import { Battery, Camera, Cpu, Smartphone } from "lucide-react";

interface ProductKeySpecsProps {
  screenSize?: string;
  camera: string;
  processor: string;
  battery: string;
}

export function ProductKeySpecs({ screenSize, camera, processor, battery }: ProductKeySpecsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center text-center">
        <Smartphone className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{screenSize || "N/A"}</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Camera className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{camera}</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Cpu className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{processor}</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Battery className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{battery}</span>
      </div>
    </div>
  );
}