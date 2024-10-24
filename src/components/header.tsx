"use client";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex justify-end">
        <li>
          <ModeToggle />
        </li>
        {pathname !== "/login" && pathname !== "/register" && (
          <ul className="flex justify-between">
            <li>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
                <Link href={"/login"}>Sign In</Link>
              </button>
            </li>
            <li>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
                <Link href={"/register"}>Sign Up</Link>
              </button>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}
