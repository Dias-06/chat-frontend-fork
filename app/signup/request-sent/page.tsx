"use client";

import Link from "next/link";
import { CheckMark } from "@/shared/assets/icons/CheckMark";

export default function FinishPage() {
  return (
    <main className="bg-gradient-main h-screen w-full grid">
      <section className="m-4 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col">
        <header className="mt-[70px] flex flex-col justify-center items-center">
          <h1 className="font-medium text-2xl leading-[1.2] text-center align-middle text-black mb-[67px]">
            Служба поддержки
          </h1>
          <CheckMark width={66} height={66} />
          <h2 className="text-center font-medium mt-[14px] leading-[1.2] text-2xl mb-7">
            Обращение отправлено!
          </h2>
          <p className="font-normal text-[18px] leading-[1.2] text-center text-black mb-6">
            В ближайшее время вы получите ответ на электронную почту, указанную
            в обращении
          </p>
        </header>

        <Link
          href="/signup/welcome"
          className="block text-center w-full border-0 rounded-lg bg-primary text-white cursor-pointer font-medium text-[18px] py-4 px-[24px] leading-[1.2]"
        >
          На главную
        </Link>
      </section>
    </main>
  );
}
