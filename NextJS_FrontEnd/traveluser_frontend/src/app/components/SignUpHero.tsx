// components/Body.js
import Link from "next/link";

export default function SignUpHero() {
  return (
    <div className="min-h-screen flex bg-[#59C3C3]">
      {/* Left Side - Signup Form */}
      <div className="w-1/2 flex flex-col justify-center p-12">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="w-10 h-10 bg-[#F45B69] rounded-full flex items-center justify-center hover:bg-[#d1445c]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <span className="ml-4 text-white text-lg font-medium">
            Create Account
          </span>
        </div>

        {/* Sign Up Form */}
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Full name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Work email *
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
                placeholder="Enter your work email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Phone number *
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Password *
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Confirm password *
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-white">
                I agree to the{" "}
                <a href="#" className="text-[#F45B69] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#F45B69] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F45B69] text-white py-2 rounded-lg hover:bg-[#d1445c]"
            >
              Create
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-80 h-80 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Demo"
            className="w-40 h-40"
          />
        </div>
      </div>
    </div>
  );
}
