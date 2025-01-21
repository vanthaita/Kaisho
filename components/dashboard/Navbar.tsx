import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <button className="p-2 hover:bg-gray-700 rounded hidden">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"></path>
        </svg>
      </button>
      <div className="flex-grow"></div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center">
            <canvas className="identicon" width="36" height="36"></canvas>
          </div>
          {/* <div>
            <h6 className="text-sm font-semibold">0xe9d4...181F</h6>
            <p className="text-xs text-gray-400">Connected</p>
          </div> */}
        </div>
        <button className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          {/* <img src="/icons/network/arbitrum.svg" alt="Arbitrum One" className="w-6 h-6" /> */}
          <span>SUI</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.88 9.29 12 13.17 8.12 9.29a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0"></path>
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-700 rounded relative">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"></path>
          </svg>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">0</span>
        </button>
        <button className="p-2 hover:bg-gray-700 rounded">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 18h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h8c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m17.3 7.88L17.42 12l2.88-2.88c.39-.39.39-1.02 0-1.41a.9959.9959 0 0 0-1.41 0L15.3 11.3c-.39.39-.39 1.02 0 1.41l3.59 3.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;