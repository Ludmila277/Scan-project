import React, { useState, useEffect } from "react";
import "./DateInput.css";

interface DateInputProps {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [error, setError] = useState<string>("");
  const [inputTypeStart, setInputTypeStart] = useState<"text" | "date">("text");
  const [inputTypeEnd, setInputTypeEnd] = useState<"text" | "date">("text");

  useEffect(() => {
    validateDateRange();
  }, [startDate, endDate]);

  const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
      setError("Обязательное поле");
    } else if (new Date(startDate) > new Date(endDate)) {
      setError("Введите корректные данные");
    } else if (
      new Date(startDate) > currentDate ||
      new Date(endDate) > currentDate
    ) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError("");
    }
  };

  return (
    <div className="form-field">
      <label htmlFor="startDate">
        Диапазон поиска
        <span
          className={error ? "required-asterisk error" : "required-asterisk"}
        >
          *
        </span>
      </label>
      <div className="form-field-date-inputs">
        <div className="date-input-container">
          <input
            type={inputTypeStart}
            onFocus={() => setInputTypeStart("date")}
            onBlur={() => {
              validateDateRange();
              if (!startDate) setInputTypeStart("text");
            }}
            id="startDate"
            name="startDate"
            placeholder="Дата начала"
            value={startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartDate(e.target.value)
            }
            className={error ? "error" : ""}
          />
          <input
            type={inputTypeEnd}
            onFocus={() => setInputTypeEnd("date")}
            onBlur={() => {
              validateDateRange();
              if (!endDate) setInputTypeEnd("text");
            }}
            id="endDate"
            name="endDate"
            placeholder="Дата конца"
            value={endDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndDate(e.target.value)
            }
            className={error ? "error" : ""}
          />
        </div>
        {error && <div className="date-error-message error">{error}</div>}
      </div>
    </div>
  );
};

export default DateInput;
