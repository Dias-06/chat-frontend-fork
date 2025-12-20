"use client";
import { sendLoginCode } from "@/shared/api/auth/auth.api";

import { Logo } from "@/shared/assets/icons/Logo";
import { PhoneInput } from "@/entities/user/ui/PhoneInput";
import { Button } from "@/shared/ui/Button";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function PhonePage() {
  const [formData, setFormData] = useState({ phone_number: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedNumber, setSubmittedNumber] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const normalizePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits ? `+${digits}` : "";
  };

  const handleCorrect = async () => {
    try {
      const normalizedPhone = normalizePhone(submittedNumber);

      await sendLoginCode({
        phone_number: normalizedPhone,
        code_len: 5,
      });

      setIsConfirmOpen(false);

      router.push(
        `/signup/confirmation?phone=${encodeURIComponent(submittedNumber)}`
      );
    } catch (error) {
      alert("Не удалось отправить код");
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedNumber(formData.phone_number);
    setIsModalOpen(true);
    setIsConfirmOpen(true);
  };
  const isPhoneValid = formData.phone_number.replace(/\D/g, "").length === 11;

  return (
    <main className="relative bg-gradient-main h-screen w-full grid">
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={submittedNumber}
        description="Номер телефона указан верно?"
        buttons={[
          {
            label: "Изменить",
            onClick: () => {
              setIsConfirmOpen(false);
              inputRef.current?.focus();
            },
          },
          {
            label: "Верно",
            onClick: handleCorrect,
          },
        ]}
        buttonsLayout="row"
        onClose={() => setIsConfirmOpen(false)}
      />

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
            variant="primary"
            disabled={isPhoneValid ? false : true}
            full
            type="submit"
            size="lg"
          >
            Далее
          </Button>
        </form>
      </section>
    </main>
  );
}
