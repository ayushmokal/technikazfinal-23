import { 
  Camera,
  Smartphone,
  Battery,
  Cpu,
} from "lucide-react";

interface ProductKeyFeaturesProps {
  screenSize?: string;
  camera?: string;
  processor?: string;
  battery?: string;
}

export function ProductKeyFeatures({ screenSize, camera, processor, battery }: ProductKeyFeaturesProps) {
  return (
    <div className="grid grid-cols-4 gap-4 py-6">
      <div className="flex flex-col items-center text-center">
        <Smartphone className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{screenSize || "Display"}</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Camera className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{camera || "Camera"}</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Cpu className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{processor || "Processor"}</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Battery className="h-8 w-8 mb-2 text-primary" />
        <span className="text-sm">{battery || "Battery"}</span>
      </div>
    </div>
  );
}