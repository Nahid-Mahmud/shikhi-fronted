import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c.828 0 1.5.672 1.5 1.5V15a1.5 1.5 0 01-3 0v-2.5C10.5 11.672 11.172 11 12 11z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 11V9a5 5 0 10-10 0v2" />
        </svg>

        <h1 className="mt-4 text-2xl font-semibold">Unauthorized</h1>
        <p className="mt-2 text-gray-600">You don't have permission to view this page.</p>

        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/auth/signin" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Sign in
          </Link>
          <Link href="/" className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
