"use client";
import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const AdminHero = ({ title }: { title: string }) => {
  const session = useSession();
  const firstName =
    (session.data && session.data.user.name?.split(" ")[0]) || "Admin";
  return (
    <div className="w-full relative">
      <Image
        src="/images/home/hero/justice-2.jpg"
        alt="hero"
        width={1920}
        height={1080}
        quality={100}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      
      <div className="w-full h-full pt-40 pb-32 mb-10 bg-[#085AA3aa] flex flex-col gap-14 items-center">
        <h1 className="text-slate-100 text-5xl font-semibold tracking-wider">
          Welcome Back,{" "}
          <span className="text-[var(--theme-yellow)] italic">{firstName}</span>
        </h1>
        <button className="button cursor-pointer bg-[var(--theme-yellow)] px-10 py-3 text-white text-xl font-bold duration-300 hover:brightness-90" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHero;
