export default function Input({ className, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div className="relative">
      <input
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="absolute text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
