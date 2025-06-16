export default function LoadingProfile() {
  return (
    <div className="animate-pulse">
      {/* Banner Loading */}
      <div className="h-48 bg-gray-200 rounded-t-lg" />

      {/* Profile Section Loading */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20">
          {/* Profile Picture Loading */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 border-4 border-white" />

          {/* User Info Loading */}
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded mt-2" />
            <div className="h-4 w-64 bg-gray-200 rounded mt-2" />
          </div>
        </div>
      </div>

      {/* Stats Loading */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="h-4 w-20 bg-gray-200 rounded mx-auto" />
              <div className="h-8 w-12 bg-gray-200 rounded mx-auto mt-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Loading */}
      <div className="px-6 py-4">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-10 w-24 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
