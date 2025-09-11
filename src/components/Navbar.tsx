"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const storageKey = `liked:${pathname || "/"}`;
  const showControls = (() => {
    if (!pathname) return false;
    if (pathname === '/community') return false;
    if (pathname === '/community/') return false;
    if (pathname === '/community/create') return true;
    // Match /community/<postId>
    return /^\/community\/[^/]+$/.test(pathname);
  })();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      setLiked(saved === '1');
    } catch {}
  }, [storageKey]);

  const handleToggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      try {
        if (next) localStorage.setItem(storageKey, '1');
        else localStorage.removeItem(storageKey);
      } catch {}
      return next;
    });
  };

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex flex-row items-center justify-between px-4">
      <div className="flex items-center gap-3">
        {showControls && (
          <button
            aria-label="Go back"
            onClick={() => router.back()}
            className="p-2 rounded-md hover:bg-gray-700 active:scale-95 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="logo text-2xl font-bold">Alumni App</div>
      </div>

      <div className="flex items-center gap-2">
        {showControls && (
          <button
            aria-pressed={liked}
            aria-label={liked ? "Unlike this page" : "Like this page"}
            onClick={handleToggleLike}
            className={`p-2 rounded-md transition active:scale-95 ${liked ? 'text-pink-400 hover:bg-gray-700' : 'text-white hover:bg-gray-700'}`}
            title={liked ? 'Unlike' : 'Like'}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-pink-500 text-pink-500' : ''}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
