"use client";
import React, { useState, useCallback } from "react";
import OtpInput from "@/shared/ui/OtpInput/OTPInput";
import PhoneInput from "@/entities/user/ui/PhoneInput/PhoneInput";
import EmailInput from "@/entities/user/ui/EmailInput/EmailInput";
import Textarea from "@/shared/ui/Textarea/Teaxtarea";
import TextInput from "@/entities/user/ui/TextInput/TextInput";

const OtpVerificationForm: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleOtpChange = useCallback(
    (newOtp: string) => {
      setOtp(newOtp);
      // Сбрасываем ошибку при новом вводе
      if (apiError) setApiError("");
    },
    [apiError]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (otp.length !== 5) return; // Проверка длины

      setLoading(true);
      setApiError("");

      try {
        // 1. Отправка полной строки на бэкенд (как обсуждалось)
        const response = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otpCode: otp }), // <-- Полная строка!
        });

        if (!response.ok) {
          // Бэкенд возвращает 400 при неверном коде
          const errorData = await response.json();
          setApiError(errorData.error || "Неизвестная ошибка верификации.");
        } else {
          // Успешная верификация
          console.log("Верификация успешна!");
          // Перенаправление или дальнейшие действия
        }
      } catch (err) {
        setApiError("Ошибка сети. Попробуйте снова.");
      } finally {
        setLoading(false);
      }
    },
    [otp]
  );

  return (
    <div className="max-w-sm p-4 mx-auto">
      <form onSubmit={handleSubmit}>
        <OtpInput
          length={5}
          value={otp}
          onChange={handleOtpChange}
          isError={!!apiError}
          containerClassName="mb-6"
        />

        <button
          type="submit"
          disabled={otp.length !== 5 || loading}
          className={`w-full py-2 rounded-lg text-white font-medium transition duration-150 
            ${
              otp.length === 5 && !loading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          {loading ? "Проверка..." : "Подтвердить"}
        </button>
      </form>

      <PhoneInput label="номер телефона" />

      <TextInput
        variant={"nickname"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
      />

      <EmailInput />

      <Textarea />
    </div>
  );
};

export default OtpVerificationForm;
