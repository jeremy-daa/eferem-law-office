"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import staff from "../../../data/staff";

export default function Lawyer() {
  const { id } = useParams();
  const router = useRouter();
  const [lawyer, setLawyer] = useState<any>(null);

  useEffect(() => {
    if (id && staff) {
      const lawyer = staff.find((l: any) => l.id === id);
      setLawyer(lawyer);
    }
  }, [id]);
  return (
    lawyer && (
      <div className="relative flex flex-col md:flex-row gap-10 px-5 md:px-[50px] lg:px-[100px] pt-[200px] pb-[100px]">
        <div className="w-full md:max-w-[50%] flex flex-col items-center text-center">
          <Image
            className="rounded-full w-[350px] h-[350px] object-cover mb-10"
            src={lawyer.image_cropped ? lawyer.image_cropped : lawyer.image}
            width={500}
            height={500}
            alt={lawyer?.name}
            quality={100}
          />
          <h1 className="text-white text-4xl font-bold mb-5">{lawyer.name}</h1>
          <h3 className="text-white text-3xl mb-5">{lawyer.title}</h3>
          <div className="flex items-center gap-5">
            {lawyer.socials.map((social: any) => (
              <Link
                key={social.id}
                href={social.link}
                target="_blank"
                className="text-white text-2xl"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full md:max-w-[50%] flex flex-col">
          {lawyer?.bio.split("\n").map((paragraph: string, index: number) => (
            <p key={index} className="text-white text-lg mb-5">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    )
  );
}
