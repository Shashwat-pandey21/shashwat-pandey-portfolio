import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="space-y-2">
        <span className="text-7xl font-extrabold text-indigo-500 font-mono tracking-widest">
          404
        </span>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
          The route you are attempting to visit does not exist or has been relocated in the portfolio architecture.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
