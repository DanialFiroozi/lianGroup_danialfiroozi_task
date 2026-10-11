export default function TablesSkeletonLoading({
  className,
}: {
  className?: string;
}) {
  return (
    <div className="animate-pulse space-y-4 w-full rounded-xl">
      <div
        className={`bg-(--bg-table-header) rounded-lg w-full h-12 ${className}`}
      ></div>
      <div
        className={`bg-(--bg-table-header) rounded-lg w-full h-12 ${className}`}
      ></div>
      <div
        className={`bg-(--bg-table-header) rounded-lg w-full h-12 ${className}`}
      ></div>
      <div
        className={`bg-(--bg-table-header) rounded-lg w-full h-12 ${className}`}
      ></div>
      <div
        className={`bg-(--bg-table-header) rounded-lg w-full h-12 ${className}`}
      ></div>
    </div>
  );
}
