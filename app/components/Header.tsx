"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, StepBack } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        {/* Left Side - Back Arrow & Logo */}
        <div className="flex items-center gap-4">
          {/* StepBack Link */}
          <Link
            href="https://imagin-x-e83g.vercel.app/home"
            className="flex items-center gap-2 text-xl font-bold text-white hover:text-gray-300 transition-colors mr-4"
            prefetch={true}
            onClick={() => showNotification("Returning to Main Page", "info")}
          >
            <StepBack className="w-6 h-6" />
          </Link>

          {/* Reelify Logo */}
          <Link
            href="/"
            className="btn btn-ghost gap-2 text-2xl font-bold text-white hover:text-gray-300 transition-colors"
            prefetch={true}
            onClick={() => showNotification("Returning to Home", "info")}
          >
            <Home className="w-6 h-6 pl-2" />
            <span className="pr-2">Reelify</span>
          </Link>
        </div>


        {/* Right Side - Profile Icon */}
        <div className="flex items-center">
          <div className="dropdown dropdown-end">
          <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle flex items-center justify-center"
            >
              <User className="w-6 h-6" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
            >
              {session ? (
                <>
                  <li className="px-4 py-1">
                    <span className="text-sm opacity-70">
                      {session.user?.email?.split("@")[0]}
                    </span>
                  </li>
                  <div className="divider my-1"></div>

                  <li>
                    <Link
                      href="/upload"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                      onClick={() =>
                        showNotification("Welcome to Reel Dashboard", "info")
                      }
                    >
                      Reel Upload
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="px-4 py-2 hover:bg-base-200 block w-full"
                    onClick={() =>
                      showNotification("Please sign in to continue", "info")
                    }
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
