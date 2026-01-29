import { useMemo, useState, useEffect } from "react";
import { Select } from "@ui/Select";
import { BirthDate } from "@shared-types/birthDate";

interface BirthDateSelectProps {
  value?: BirthDate;
  onChange: (value: BirthDate) => void;
}

const MONTHS = [
  { value: 1, label: "Январь" },
  { value: 2, label: "Февраль" },
  { value: 3, label: "Март" },
  { value: 4, label: "Апрель" },
  { value: 5, label: "Май" },
  { value: 6, label: "Июнь" },
  { value: 7, label: "Июль" },
  { value: 8, label: "Август" },
  { value: 9, label: "Сентябрь" },
  { value: 10, label: "Октябрь" },
  { value: 11, label: "Ноябрь" },
  { value: 12, label: "Декабрь" },
];

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

export const BirthDateSelect = ({ value, onChange }: BirthDateSelectProps) => {
  const currentYear = new Date().getFullYear();

  const [day, setDay] = useState<number | "">(value?.day ?? "");
  const [month, setMonth] = useState<number | "">(value?.month ?? "");
  const [year, setYear] = useState<number | "">(value?.year ?? "");

  const years = useMemo(
    () => Array.from({ length: 151 }, (_, i) => currentYear - i),
    [currentYear],
  );

  const days = useMemo(() => {
    if (!month || !year) return [];
    const count = getDaysInMonth(month, year);
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [month, year]);

  useEffect(() => {
    if (day && days.length && day > days.length) {
      setDay("");
    }
  }, [day, days]);

  useEffect(() => {
    onChange({ day, month, year });
  }, [day, month, year, onChange]);

  const monthLabel = month
    ? (MONTHS.find((m) => m.value === month)?.label ?? "")
    : "";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray">Введите вашу дату рождения</label>

      <div className="flex gap-1">
        <Select
          options={days}
          value={day}
          onChange={setDay}
          placeholder="День"
          width={80}
        />

        <Select
          options={MONTHS.map((m) => m.label)}
          value={monthLabel}
          onChange={(label) => {
            const found = MONTHS.find((m) => m.label === label);
            setMonth(found ? found.value : "");
          }}
          placeholder="Месяц"
        />

        <Select
          options={years}
          value={year}
          onChange={setYear}
          placeholder="Год"
          width={110}
        />
      </div>
    </div>
  );
};
