import { BigLogo } from "./ui/icons/BigLogo";
import { Button } from "@/shared/ui/Button";
import React from "react";

export const Welcome: React.FC = () => {
  return (
    <main className="bg-gradient-main h-screen w-full grid">
      <div className="m-8 px-4 pt-6 pb-10 border-2 border-white bg-[#E9E7FE] rounded-lg flex flex-col items-center gap-5">
        <div className="">
          <BigLogo />
        </div>

        <h1 className="text-[34px] leading-tight bg-gradient-text bg-clip-text text-transparent font-extrabold mt-4">
          А-Чат
        </h1>

        <p className="text-center text-primary-dark leading-tight text-lg mt-4">
          Привет! <br /> Давай знакомиться
        </p>

        <Button variant="primary" full size="lg" type="button">
          Начать
        </Button>
      </div>
    </main>
  );
};

export default Welcome;
