"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";

// const isAuth = false;
export default function Home() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };
  // if (!isAuth) {
  //   redirect("/login");
  // }
  return (
    <div>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}
