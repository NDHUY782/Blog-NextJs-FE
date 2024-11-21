import envConfig from "@/config";
import React from "react";
import { cookies } from "next/headers";
import PageProfile from "@/app/me/profile-page";

export default async function MyProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      throw data;
    }
    return data;
  });
  return (
    <div>
      <h1 className="text-xl text-center">Profile</h1>
      <div>
        Xin chào {result.payload.first_name + " " + result.payload.last_name}
        <PageProfile />
      </div>
    </div>
  );
}
