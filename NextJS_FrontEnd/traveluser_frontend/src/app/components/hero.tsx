export default function Hero() {
  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-x-8 w-full">
        {/* Column 1 */}
        <div className="flex-1 p-4">
          {/* Billboard Large Title */}
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-snug">
              Travel, enjoy <br />
              and live a new <br />
              and full life <br />
              From Bangladesh
              <br />
              <span className="text-red-500">to the World</span>
            </h1>
          </div>
          {/* Row with Images */}
          <div className="flex gap-8 pt-32">
            <img
              src="/landing_1.png"
              alt="Image 1"
              className="w-20 h-24 md:w-24 md:h-32 object-cover"
            />
            <img
              src="/landing_2.png"
              alt="Image 2"
              className="w-20 h-24 md:w-24 md:h-32 object-cover"
            />
            <img
              src="/landing_3.png"
              alt="Image 3"
              className="w-20 h-24 md:w-24 md:h-32 object-cover"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex-1 pt-10">
          {/* Image Section */}
          <div className="grid grid-cols-2 gap-4 ">
            {/* Top Row */}
            <img
              src="/landing_3.png"
              alt="Photo 1"
              className="w-full object-cover"
            />
            <img
              src="/landing_4.png"
              alt="Photo 2"
              className="w-full object-cover relative -top-4"
            />
            {/* Bottom Row */}
            <img
              src="/landing_2.png"
              alt="Photo 3"
              className="w-full object-cover relative "
            />
            <img
              src="/landing_1.png"
              alt="Photo 4"
              className="w-full object-cover relative -top-16 md:-top-28"
            />
          </div>

          {/* Text Content */}
          <div className="text-left">
            <h2 className="text-md md:text-lg font-bold text-red-500 mb-2">
              BEST DESTINATIONS AROUND THE WORLD
            </h2>
            <p className="text-sm md:text-base text-gray-400 mb-4">
              Stay updated with travel tips, <br />
              recommendations, and latest promos.
            </p>
            {/* Play Demo Button */}
            <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600">
              <span>Play Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-4.533-2.672A1 1 0 009 9.392v5.216a1 1 0 001.219.97l4.533-1.614a1 1 0 00.648-.972v-1.672a1 1 0 00-.648-.971z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
