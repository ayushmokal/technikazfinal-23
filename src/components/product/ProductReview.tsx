interface ProductReviewProps {
  productName: string;
}

export function ProductReview({ productName }: ProductReviewProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h4 className="font-semibold text-green-600 mb-4">PROS</h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-green-600">+</span>
            <span>AI & productivity features</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">+</span>
            <span>Strong performance & battery life</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">+</span>
            <span>Good display & cameras</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">+</span>
            <span>Useful Pen</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-red-600 mb-4">CONS</h4>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-red-600">-</span>
            <span>AI & productivity features</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-600">-</span>
            <span>Strong performance & battery life</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-600">-</span>
            <span>Good display & cameras</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-600">-</span>
            <span>Useful Pen</span>
          </li>
        </ul>
      </div>
    </div>
  );
}