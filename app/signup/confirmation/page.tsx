"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ChevronLeft } from "./ui/icons/ChevronLeft";
import { Logo } from "@icons/Logo";
import InformationIcon from "./ui/icons/InformationIcon";
import CorrectIcon from "./ui/icons/CorrectIcon";
import Triangle from "./ui/icons/Triangle";
import OtpInput from "@/shared/ui/OtpInput/OTPInput";
import { Button } from "@/shared/ui/Button";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  const phone = searchParams.get("phone") || "+7 962 888 54 36";

  const [showTooltip, setShowTooltip] = useState(false);

  const [showSentPopup, setShowSentPopup] = useState(false);

  const [timer, setTimer] = useState(60);

  const showCodeSentPopup = () => {
    setShowSentPopup(true);
    setTimeout(() => setShowSentPopup(false), 2000);
  };

  const handleResend = () => {
    setTimer(60);
    showCodeSentPopup();
  };

  useEffect(() => {
    if (timer === 0) return;
    const int = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(int);
  }, [timer]);

  return (
    <main className="bg-gradient-main h-screen w-full grid relative">
      <section className="m-4 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col relative">
        {showSentPopup && (
          <div className="absolute flex items-center gap-1 top-0 left-0 w-full h-10 bg-black/60 text-white text-[14px] px-4 py-2 rounded-lg z-20">
            <CorrectIcon />
            Код отправлен
          </div>
        )}

        <nav className="flex items-center">
          <Link href="/signup/phone-input" className="z-10">
            <ChevronLeft />
          </Link>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-11">
            <Logo width={58} height={53} />
          </div>
        </nav>

        <header className="flex flex-col">
          <h1 className="text-[32px] leading-tight text-center font-semibold mt-12">
            А-Чат
          </h1>
          <h2 className="font-medium text-2xl leading-[1.2] text-center mt-8 text-black">
            Подтвердите вход
          </h2>

          <p className="font-normal text-[18px] leading-[1.3] mt-5 text-center text-black">
            Код подтверждения отправлен на следующий номер:
          </p>

          <p className="font-medium text-[18px] leading-[1.2] text-black mt-2 text-center">
            {phone}
          </p>
        </header>

        <div className="flex flex-col relative mt-2">
          <div className="flex items-center justify-center gap-1 mb-4">
            {showTooltip && (
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-[329px] bg-primary-dark text-white text-[14px] p-4 rounded-2xl z-10">
                Код должен содержать только цифры. <br /> Не более 10 запросов в
                час. При превышении — блокировка на 60 минут.
                <div className="absolute right-[57px] -bottom-[18px] -translate-x-1/2">
                  <Triangle />
                </div>
              </div>
            )}
            <p className="text-[18px] text-black leading-[1.2] font-medium">
              Введите код
            </p>

            <span
              className="cursor-pointer text-[18px]"
              onClick={() => setShowTooltip((v) => !v)}
            >
              <InformationIcon />
            </span>
          </div>

          <OtpInput id="otp" correctCode="12345" />
        </div>

        <div className="mt-3.5 flex flex-col text-center">
          {timer === 0 ? (
            <button
              onClick={handleResend}
              className="text-primary text-[18px] leading-[1.2] font-medium"
            >
              Отправить новый код
            </button>
          ) : (
            <p className="text-gray text-[18px] leading-[1.2] font-medium">
              Отправить новый код через 0:{timer < 10 ? `0${timer}` : timer}
            </p>
          )}

          <Button type="button" size="lg" full variant="transparent">
            Не приходит код?
          </Button>
        </div>
      </section>
    </main>
  );
}
