export default function TablesSkeletonLoading({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="animate-pulse space-y-4 w-full rounded-xl bg-surface-200">
      <div className={`bg-gray-100 rounded-lg w-full h-12 ${className}`}></div>
      <div className={`bg-gray-100 rounded-lg w-full h-12 ${className}`}></div>
      <div className={`bg-gray-100 rounded-lg w-full h-12 ${className}`}></div>
      <div className={`bg-gray-100 rounded-lg w-full h-12 ${className}`}></div>
      <div className={`bg-gray-100 rounded-lg w-full h-12 ${className}`}></div>
    </div>
  );
}
