function FullScreenSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
}

export default FullScreenSpinner;