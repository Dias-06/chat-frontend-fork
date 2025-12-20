"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { getToken, sendLoginCode } from "@/shared/api/auth/auth.api";
import { tokenStorage } from "@/shared/lib/tokenStorage";

import { Logo } from "@icons/Logo";
import { ChevronLeft } from "./ui/icons/ChevronLeft";
import InformationIcon from "./ui/icons/InformationIcon";
import CorrectIcon from "./ui/icons/CorrectIcon";
import Triangle from "./ui/icons/Triangle";

import OtpInput from "@/shared/ui/OtpInput/OTPInput";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";

/* ================= constants ================= */

const CODE_LENGTH = 5;
const MAX_ATTEMPTS = 5;
const RESEND_TIMEOUT = 60;

/* ================= page ================= */

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phone = searchParams.get("phone");

  if (!phone) {
    router.replace("/signup/phone-input");
    return null;
  }

  const phoneNormalized = `+${phone.replace(/\D/g, "")}`;

  /* ================= state ================= */

  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorText, setErrorText] = useState<string | null>(null);

  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [showSentPopup, setShowSentPopup] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  /* ================= derived ================= */

  const attemptsLeft = MAX_ATTEMPTS - attempts;
  const hasError = Boolean(errorText);

  /* ================= effects ================= */

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ================= handlers ================= */

  const handleResend = async () => {
    try {
      await sendLoginCode({
        phone_number: phoneNormalized,
        code_len: CODE_LENGTH,
      });

      setTimer(RESEND_TIMEOUT);
      setShowSentPopup(true);
      setTimeout(() => setShowSentPopup(false), 2000);
    } catch {
      alert("Не удалось отправить код");
    }
  };

  const handleComplete = async (code: string) => {
    if (isSubmitting || isLocked) return;

    try {
      setIsSubmitting(true);
      setErrorText(null);

      const tokens = await getToken({
        phone_number: phoneNormalized,
        code,
      });

      tokenStorage.setTokens(tokens.access, tokens.refresh);
      router.push("/signup/about-me");
    } catch {
      setAttempts((prev) => {
        const next = prev + 1;

        if (next >= MAX_ATTEMPTS) {
          setIsLocked(true);
          setErrorText("Слишком много неверных попыток.");
          setIsHelpModalOpen(true); // открываем модалку при блокировке
        } else {
          setErrorText(
            `Код введён неверно. Осталось ${MAX_ATTEMPTS - next} попытки.`
          );
        }

        return next;
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= render ================= */

  return (
    <main className="bg-gradient-main h-screen w-full grid relative">
      <section className="m-4 px-4 pt-6 pb-10 bg-white rounded-lg flex flex-col relative overflow-hidden">
        {showSentPopup && (
          <div className="absolute top-0 left-0 w-full h-10 flex items-center gap-1 bg-black/60 text-white text-[14px] px-4 z-20">
            <CorrectIcon />
            Код отправлен
          </div>
        )}

        {/* nav */}
        <nav className="flex items-center">
          <Link href="/signup/phone-input">
            <ChevronLeft />
          </Link>

          <div className="absolute left-1/2 -translate-x-1/2 top-11">
            <Logo width={58} height={53} />
          </div>
        </nav>

        {/* header */}
        <header className="flex flex-col">
          <h1 className="text-[32px] text-center font-semibold mt-12">А-Чат</h1>

          <h2 className="font-medium text-2xl text-center mt-8">
            Подтвердите вход
          </h2>

          <p className="text-[18px] mt-5 text-center">
            Код подтверждения отправлен на номер:
          </p>

          <p className="font-medium text-[18px] mt-2 text-center">{phone}</p>
        </header>

        {/* otp */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center justify-center gap-1 mb-4 relative">
            {showTooltip && (
              <div className="absolute -top-28 max-w-[329px] w-full bg-primary-dark text-white text-[14px] p-4 rounded-2xl z-10">
                Код должен содержать только цифры.
                <br />
                Не более 10 запросов в час.
                <br />
                При превышении — блокировка.
                <div className="absolute right-[83px] -bottom-[18px]">
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

          <OtpInput
            errorText={errorText}
            length={CODE_LENGTH}
            disabled={isSubmitting || isLocked}
            error={hasError}
            onComplete={handleComplete}
          />
        </div>

        {/* resend */}
        <div className="mt-4 text-center">
          {timer === 0 ? (
            <p
              onClick={handleResend}
              className="text-primary text-[18px] font-medium cursor-pointer"
            >
              Отправить новый код
            </p>
          ) : (
            <p className="text-gray text-[18px] font-medium">
              Отправить новый код через 0:{timer < 10 ? `0${timer}` : timer}
            </p>
          )}

          <p
            className="text-lg mt-5 font-medium text-primary cursor-pointer"
            onClick={() => setIsHelpModalOpen(true)}
          >
            Не приходит код?
          </p>
        </div>
      </section>

      {/* help modal */}
      <ConfirmModal
        isOpen={isHelpModalOpen}
        title="Не приходит код?"
        buttonsLayout="column"
        spacing="compact"
        buttons={[
          { label: "Обратиться в поддержку", onClick: () => {} },
          { label: "Назад", onClick: () => setIsHelpModalOpen(false) },
        ]}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </main>
  );
}
