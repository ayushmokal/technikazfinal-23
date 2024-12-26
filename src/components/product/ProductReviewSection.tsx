interface ProductReviewSectionProps {
  productName: string;
}

export function ProductReviewSection({ productName }: ProductReviewSectionProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">{productName} REVIEW</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-green-600">PROS</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Premium build quality</li>
            <li>Excellent camera system</li>
            <li>Long battery life</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-red-600">CONS</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Premium pricing</li>
            <li>No charger in box</li>
            <li>Limited customization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}