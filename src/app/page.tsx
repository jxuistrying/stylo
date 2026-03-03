import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 text-center bg-gradient-to-b from-white to-gray-50">

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
        Turn Inspiration into <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
          Your Reality.
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl font-medium">
        Stylo uses AI to break down your favorite outfits from Pinterest and Instagram,
        suggesting similar, purchasable items tailored for you.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/login"
          className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Curating Space
        </Link>
        <Link
          href="/dashboard"
          className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  )
}
