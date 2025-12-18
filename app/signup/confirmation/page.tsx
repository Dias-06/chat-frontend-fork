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
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "+7 962 888 54 36";

  const MAX_ATTEMPTS = 5;

  const LOCK_TIME = 10 * 60;

  const [isLocked, setIsLocked] = useState(false);
  const [lockSecondsLeft, setLockSecondsLeft] = useState(LOCK_TIME);

  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [isLimitPopupOpen, setIsLimitPopupOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

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
    if (!showSentPopup) return;
    const t = setTimeout(() => setShowSentPopup(false), 2000);
    return () => clearTimeout(t);
  }, [showSentPopup]);

  useEffect(() => {
    if (!isLocked) return;

    const interval = setInterval(() => {
      setLockSecondsLeft((s) => {
        if (s <= 1) {
          setIsLocked(false);
          setAttemptsLeft(MAX_ATTEMPTS);
          setTimer(0);
          return LOCK_TIME;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked]);

  const handleOtpError = () => {
    setAttemptsLeft((prev) => {
      const next = prev - 1;

      if (next <= 0) {
        setIsLocked(true);
        setIsLimitPopupOpen(true);
        setLockSecondsLeft(LOCK_TIME);
      }

      return next;
    });
  };

  const renderResendBlock = () => {
    if (isLocked) {
      if (lockSecondsLeft > 0) {
        return (
          <p className="text-gray text-[18px] font-medium text-center">
            Повторить попытку через{" "}
            {String(Math.floor(lockSecondsLeft / 60)).padStart(2, "0")}:
            {String(lockSecondsLeft % 60).padStart(2, "0")}
          </p>
        );
      }

      return (
        <p
          onClick={handleResend}
          className="text-primary text-[18px] font-medium text-center cursor-pointer"
        >
          Отправить новый код
        </p>
      );
    }

    if (timer === 0) {
      return (
        <p
          onClick={handleResend}
          className="text-primary text-[18px] font-medium text-center cursor-pointer"
        >
          Отправить новый код
        </p>
      );
    }

    return (
      <p className="text-gray text-[18px] font-medium text-center">
        Отправить новый код через 0:{timer < 10 ? `0${timer}` : timer}
      </p>
    );
  };

  return (
    <main className="bg-gradient-main h-screen w-full grid relative">
      <section className="m-4 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col relative overflow-hidden">
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

          <h2 className="font-medium text-2xl text-center mt-8">
            Подтвердите вход
          </h2>

          <p className="text-[18px] mt-5 text-center">
            Код подтверждения отправлен на следующий номер:
          </p>

          <p className="font-medium text-[18px] mt-2 text-center">{phone}</p>
        </header>

        <div className="flex flex-col relative mt-2">
          <div className="flex items-center justify-center gap-1 mb-4">
            {showTooltip && (
              <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-full max-w-[329px] bg-primary-dark text-white text-[14px] p-4 rounded-2xl z-10">
                Код должен содержать только цифры.
                <br />
                Не более 10 запросов в час.
                <br />
                При превышении — блокировка на 60 минут.
                <div className="absolute right-[57px] -bottom-[18px]">
                  <Triangle />
                </div>
              </div>
            )}

            <p className="text-[18px] font-medium">Введите код</p>

            <span
              className="cursor-pointer"
              onClick={() => setShowTooltip((v) => !v)}
            >
              <InformationIcon />
            </span>
          </div>

          <OtpInput id="otp" correctCode="12345" onError={handleOtpError} />
        </div>

        <div className="mt-3.5 flex flex-col text-center">
          {renderResendBlock()}
          <p
            className="leading-[120%] text-lg mt-5 font-medium text-primary"
            onClick={() => setIsHelpModalOpen(true)}
          >
            Не приходит код?
          </p>
        </div>
      </section>

      <ConfirmModal
        isOpen={isLimitPopupOpen}
        title="Лимит исчерпан"
        description="Попробуйте позднее"
        buttonsLayout="column"
        spacing="default"
        buttons={[
          {
            label: "Обратиться в поддержку",
            onClick: () => {},
          },
          {
            label: "Назад",
            onClick: () => setIsLimitPopupOpen(false),
          },
        ]}
        onClose={() => setIsLimitPopupOpen(false)}
      />
      <ConfirmModal
        isOpen={isHelpModalOpen}
        title="Не приходит код?"
        buttonsLayout="column"
        spacing="compact"
        buttons={[
          {
            label: "Обратиться в поддержку",
            onClick: () => {
              setIsHelpModalOpen(false);
            },
          },
          {
            label: "Назад",
            onClick: () => setIsHelpModalOpen(false),
          },
        ]}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </main>
  );
}
