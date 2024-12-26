import { 
  Smartphone,
  Camera,
  Cpu,
  Battery,
} from "lucide-react";

interface ProductKeyFeaturesProps {
  screenSize?: string;
  camera?: string;
  processor?: string;
  battery?: string;
}

export function ProductKeyFeatures({ screenSize, camera, processor, battery }: ProductKeyFeaturesProps) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="flex flex-col items-center text-center">
        <Smartphone className="h-8 w-8 mb-2 text-gray-700" />
        <span className="text-sm font-medium">{screenSize || "6.8\""}</span>
        <div className="flex flex-col gap-0.5 mt-2">
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <Camera className="h-8 w-8 mb-2 text-gray-700" />
        <span className="text-sm font-medium">{camera?.split(' ')[0] || "50 MP"}</span>
        <div className="flex flex-col gap-0.5 mt-2">
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <Cpu className="h-8 w-8 mb-2 text-gray-700" />
        <span className="text-sm font-medium">Snapdragon</span>
        <div className="flex flex-col gap-0.5 mt-2">
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <Battery className="h-8 w-8 mb-2 text-gray-700" />
        <span className="text-sm font-medium">{battery?.split(' ')[0] || "5000mAh"}</span>
        <div className="flex flex-col gap-0.5 mt-2">
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
          <span className="text-xs text-gray-500">-</span>
        </div>
      </div>
    </div>
  );
}