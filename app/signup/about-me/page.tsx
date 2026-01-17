"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Props } from "./page.types";
import { ChevronLeft } from "./ui/icons/ChevronLeft";

import { Button } from "@/shared/ui/Button";
import { Logo } from "@icons/Logo";
import { TextInput } from "@/entities/user/ui/TextInput";
import {
  updateMessengerProfile,
  checkNicknameUnique,
} from "@/shared/api/messenger";

export default function AboutMePage() {
  const [formData, setFormData] = useState<Props>({
    name: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);
  const [nicknameError, setNicknameError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNicknameError("");

    try {
      await checkNicknameUnique(formData.username);
      await updateMessengerProfile(formData);

      alert("Профиль успешно сохранён");
    } catch (err: any) {
      if (err?.message?.includes("уже занят")) {
        setNicknameError(err.message);
      } else if (
        err?.message?.toLowerCase().includes("unauthorized") ||
        err?.message === "Не авторизован"
      ) {
        alert("Сессия истекла, войдите снова");
        // можно редиректить на login
      } else {
        alert(err?.message || "Ошибка при отправке формы");
      }
    }
  };

  return (
    <main className="bg-gradient-main h-screen w-full grid">
      <section className="m-4 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col gap-5">
        <nav className="flex items-center justify-between">
          <Link href="/signup/confirmation">
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
              validationVariant="nickname"
              label="Придумайте никнейм"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              required
              error={nicknameError}
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
            variant="primary"
            disabled={!formData.name || !formData.username || loading}
            full={true}
            type="submit"
            children={loading ? "Сохраняем..." : "Зарегистрироваться"}
            size="lg"
          />
        </form>
      </section>
    </main>
  );
}
