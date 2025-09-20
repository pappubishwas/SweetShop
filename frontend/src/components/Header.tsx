import React from "react";
import { Link } from "react-router-dom";

export default function Header({
  token,
  user,
  onLogout,
}: {
  token: string | null;
  user: any;
  onLogout: () => void;
}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          SweetShop
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {/* Check Token avilable */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-sm px-3 py-1 rounded bg-pink-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-3 py-1 rounded bg-yellow-100"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Check user admin or not */}
              {user?.isAdmin ? (
                <Link
                  to="/admin"
                  className="text-sm px-3 py-1 rounded bg-indigo-100"
                >
                  Admin
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {user?.name || user?.email}
                </span>
              )}
              <button
                onClick={onLogout}
                className="text-sm px-3 py-1 rounded bg-red-100"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
