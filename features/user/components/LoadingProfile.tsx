export default function LoadingProfile() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto" />
      <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
      <div className="h-32 bg-gray-200 rounded" />
    </div>
  );
}
