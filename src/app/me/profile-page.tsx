"use client";
import { useAppContext } from "@/app/AppProvider";
import envConfig from "@/config";
import { cookies } from "next/headers";
import React, { useContext, useEffect } from "react";

export default function PageProfile() {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
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
      console.log(result);
    };
    fetchRequest();
  }, [sessionToken]);
  return <div></div>;
}
