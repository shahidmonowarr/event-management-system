"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Create Event", href: "/create-event" },
    { label: "My Events", href: "/my-events" },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md mb-5">
      <div className="container mx-auto py-3 max-w-5xl">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Event Manager</h1>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-blue-700 font-medium"
                      : "hover:bg-blue-500"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
