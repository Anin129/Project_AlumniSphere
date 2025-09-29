
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";


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
        <Link href="/" className="logo text-2xl font-bold">
          Alumni App
        </Link>
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


// import * as React from "react"
// import Link from "next/link"
// import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ]

// export default function Navbar() { 
//   return (
//     <NavigationMenu viewport={false} className=" bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white flex justify-center justify-self-center items-center mt-3 px-6 py-1 rounded-md shadow-md z-50">
//       <NavigationMenuList className=" mx-auto flex flex-row w-full justify-around">
//         <NavigationMenuItem>
//           <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 rounded-md px-3 py-2">Home</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
//                     href="/"
//                   >
//                     <div className="mt-4 mb-2 text-lg font-medium">
//                       shadcn/ui
//                     </div>
//                     <p className="text-muted-foreground text-sm leading-tight">
//                       Beautifully designed components built with Tailwind CSS.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 rounded-md px-3 py-2">Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//               {components.map((component) => (
//                 <ListItem
//                   key={component.title}
//                   title={component.title}
//                   href={component.href}
//                 >
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//          <NavigationMenuItem className="bg-transparent text-white hover:bg-white/10 rounded-md px-3 py-2">
//           <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 rounded-md px-3 py-2`}>
//             <Link href="/docs">Docs</Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 rounded-md px-3 py-2">Simple</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[200px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">Components</Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">Documentation</Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#">Blocks</Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   )
// }



