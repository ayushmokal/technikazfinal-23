interface ProductReviewProps {
  productName: string;
}

export function ProductReview({ productName }: ProductReviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{productName} REVIEW</h3>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-green-600 mb-2">PROS</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Premium build quality</li>
            <li>Excellent performance</li>
            <li>Great camera system</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-600 mb-2">CONS</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Premium pricing</li>
            <li>No charger in box</li>
            <li>Average battery life</li>
          </ul>
        </div>
      </div>
    </div>
  );
}