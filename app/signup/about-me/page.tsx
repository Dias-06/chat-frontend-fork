"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Props } from "./page.types";
import { ChevronLeft } from "./ui/icons/ChevronLeft";

import { Button } from "@/shared/ui/Button";
import { Logo } from "@icons/Logo";
import { TextInput } from "@/entities/user/ui/TextInput";

export default function AboutMePage() {
  const [formData, setFormData] = useState<Props>({
    name: "",
    username: "",
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="bg-gradient-main h-screen w-full grid">
      <section className="m-8 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col gap-5">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <ChevronLeft />
          </Link>
          <Logo width={56} height={50} />
        </nav>

        <header className="flex flex-col gap-3">
          <h1 className="font-medium text-2xl leading-[1.2] text-center align-middle text-black">
            Личная информация
          </h1>
          <p className="font-normal text-[18px] leading-[1.2] text-center text-black">
            Пожалуйста, заполните данные
          </p>
        </header>

        <form onSubmit={submit} className="flex flex-col h-full">
          <div className="flex flex-col gap-2">
            <TextInput
              id="name"
              name="name"
              label="Введите имя"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <TextInput
              id="username"
              name="username"
              label="Придумайте никнейм"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              required
            />
          </div>

          <p className="font-medium text-[12px] leading-[1.2] text-gray mb-4 mt-auto">
            Нажимая на «Зарегистрироваться», вы соглашаетесь с 
            <Link href="/" className="text-primary">
              Пользовательским соглашением
            </Link>
            .
          </p>

          <Button
            variant={
              !formData.name || !formData.username ? "disabled" : "primary"
            }
            full={true}
            type="submit"
            children="Зарегистрироваться"
            size="lg"
          ></Button>
        </form>
      </section>
    </main>
  );
}
