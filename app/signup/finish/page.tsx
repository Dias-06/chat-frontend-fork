"use client";

import Link from "next/link";
import { Success } from "./ui/icons/Success";

export default function FinishPage() {
  return (
    <main className="bg-gradient-main h-screen w-full grid">
      <section className="m-8 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col gap-8">
        <header className="mt-[100px] flex flex-col gap-3">
          <Success className="self-center" />
          <h1 className="font-medium text-2xl leading-[1.2] text-center align-middle text-black">
            Поздравляем!
          </h1>
          <p className="font-normal text-[18px] leading-[1.2] text-center text-black">
            Регистрация прошла успешно
          </p>
        </header>

        <Link
          href="/"
          className="block text-center w-full border-0 rounded-lg bg-primary text-white cursor-pointer font-medium text-[18px] py-4 px-[24px] leading-[1.2]"
        >
          Далее
        </Link>
      </section>
    </main>
  );
}
