import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div>
      <ul className=" flex justify-between">
        <li>
          <ModeToggle />
        </li>
        <ul className=" flex justify-between">
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
      </ul>
    </div>
  );
}
