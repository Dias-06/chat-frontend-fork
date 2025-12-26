"use client";
import { BigLogo } from "./ui/icons/BigLogo";
import { Button } from "@/shared/ui/Button";
import React from "react";
import { useRouter } from "next/navigation";

export const Welcome: React.FC = () => {
  const router = useRouter();

  const handleStartNavigation = () => {
    router.push("/signup/phone-input");
  };
  return (
    <main className="bg-gradient-main h-screen w-full grid">
      <div className="m-4 px-4 pt-6 pb-10 border-2 relative overflow-hidden border-white bg-[#E9E7FE] rounded-lg flex flex-col items-center gap-5">
        <div className="absolute w-[184px] h-[214px] -top-5 -left-1 z-0 bg-[#FDFDFD] rounded-full blur-[80px] opacity-70 pointer-events-none" />
        <div className="absolute w-[184px] h-[214px] -bottom-4 -left-1.5 z-0 bg-[#FDFDFD] rounded-full blur-[80px] opacity-70 pointer-events-none" />
        <div className="absolute w-[184px] h-[214px] bottom-[130px] -right-5 z-0 bg-[#FDFDFD] rounded-full blur-[80px] opacity-70 pointer-events-none" />
        <div className="">
          <BigLogo />
        </div>

        <h1 className="text-[34px] z-10 leading-tight bg-gradient-text bg-clip-text text-transparent font-extrabold mt-4">
          А-Чат
        </h1>

        <p className="text-center z-10 text-primary-dark leading-tight text-lg mt-4">
          Привет! <br /> Давай знакомиться
        </p>

        <div className="z-10 w-full">
          <Button
            variant="primary"
            full
            size="lg"
            type="button"
            onClick={handleStartNavigation}
          >
            Начать
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
