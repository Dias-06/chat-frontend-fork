"use client";

import { Logo } from "@/shared/assets/icons/Logo";
import { PhoneInput } from "@/entities/user/ui/PhoneInput";
import { Button } from "@/shared/ui/Button";

import { FormEvent, useRef, useState } from "react";

export default function PhonePage() {
  const [formData, setFormData] = useState({ phone_number: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [submittedNumber, setSubmittedNumber] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedNumber(formData.phone_number);
    setShowPopup(true);
  };

  const confirmNumber = () => {
    setShowPopup(false);
    console.log("Номер подтверждён:", submittedNumber);
  };

  const editNumber = () => {
    setShowPopup(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleOverlayClick = () => setShowPopup(false);

  return (
    <main className="relative bg-gradient-main h-screen w-full grid">
      <section className="m-4 px-4 pt-11 pb-10 bg-white rounded-lg flex flex-col gap-5">
        <header className="flex flex-col items-center">
          <Logo width={58} height={53} />
          <h1 className="font-semibold mt-2 text-[32px] leading-none text-center">
            А-Чат
          </h1>
          <p className="font-medium mt-[34px] text-2xl text-center">
            Вход/регистрация
          </p>
        </header>

        <form onSubmit={submit} className="flex flex-col h-full gap-5">
          <div className="flex flex-col">
            <PhoneInput
              id="phone_number"
              name="phone_number"
              label="Введите номер"
              value={formData.phone_number}
              inputRef={inputRef}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }))
              }
              required
            />
          </div>

          <Button
            variant={!formData.phone_number ? "disabled" : "primary"}
            full
            type="submit"
            size="lg"
          >
            Далее
          </Button>
        </form>
      </section>

      {showPopup && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-overlay px-6"
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-xl w-full max-w-sm py-6 min-w-[329px] px-5 shadow-lg flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-lg font-medium leading-tight">
              {submittedNumber}
            </p>

            <p className="text-center text-gray-600 text-sm">
              Номер телефона указан верно?
            </p>

            <div className="flex gap-4 mt-3">
              <div className="w-full" onClick={editNumber}>
                <Button variant="secondary" full size="lg" type="button">
                  Изменить
                </Button>
              </div>

              <div className="w-full" onClick={confirmNumber}>
                <Button variant="primary" full size="lg" type="button">
                  Верно
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
