"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ChevronLeft } from "../about-me/ui/icons/ChevronLeft";
import { Logo } from "@icons/Logo";

import { Button } from "@/shared/ui/Button";

import { SendSupport } from "@/shared/api/support/support";
import { EmailInput } from "@/entities/user/ui/EmailInput";
import { Textarea } from "@/shared/ui/Textarea";

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    return router.push("./request-sent");
  };

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await SendSupport({ email: email, text: text });
      alert("Success!");
      setEmail("");
      setText("");
      handleSuccess();
    } catch (error: any) {
      const err = error?.message || "Ошибка при отправке";
      alert(`Fail ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-main h-screen w-full grid">
      <section className="m-4 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col">
        <nav className="flex items-center justify-between pl-2">
          <Link href="/signup/confirmation">
            <ChevronLeft />
          </Link>
          <Logo width={56} height={50} />
        </nav>

        <header className="flex flex-col gap-3 pt-5">
          <h1 className="font-medium text-2xl leading-[1.2] text-center align-middle text-black">
            Служба поддержки
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col h-full pt-4">
          <div className="flex flex-col gap-3">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              label="Опишите Вашу проблему"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <p className="font-medium text-sm leading-[1.2] text-gray mb-4 mt-auto pt-2">
            Ознакомьтесь со 
            <Link href="/" className="text-primary">
              списком известных проблем и их решениями.
            </Link>
            .
          </p>

          <Button
            variant="primary"
            disabled={!email || !text || loading}
            full={true}
            type="submit"
            children="Отправить"
            size="lg"
            onClick={handleSubmit}
          />
        </form>
      </section>
    </main>
  );
}
