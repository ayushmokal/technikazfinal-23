import { ThumbsUp, ThumbsDown } from "lucide-react";

interface ProductReviewSectionProps {
  productName: string;
}

export function ProductReviewSection({ productName }: ProductReviewSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{productName} REVIEW</h3>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="text-green-600 h-5 w-5" />
            <h4 className="font-semibold text-green-600">PROS</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-baseline gap-2">
              <span className="text-green-600">•</span>
              <span>AI & productivity features</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-green-600">•</span>
              <span>Strong performance & battery life</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-green-600">•</span>
              <span>Good display & cameras</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-green-600">•</span>
              <span>Useful Pen</span>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ThumbsDown className="text-red-600 h-5 w-5" />
            <h4 className="font-semibold text-red-600">CONS</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-baseline gap-2">
              <span className="text-red-600">•</span>
              <span>AI & productivity features</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-red-600">•</span>
              <span>Strong performance & battery life</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-red-600">•</span>
              <span>Good display & cameras</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-red-600">•</span>
              <span>Useful Pen</span>
            </li>
          </ul>
        </div>
      </div>
      <button className="text-blue-600 hover:underline text-sm">
        Read Full Reviews &gt;&gt;
      </button>
    </div>
  );
}