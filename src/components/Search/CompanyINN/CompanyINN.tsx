import React, { useState, useEffect } from "react";
import "./CompanyINN.css";

interface CompanyINNProps {
  companyINN: string;
  setCompanyINN: (value: string) => void;
}

interface ErrorObj {
  code: number;
  message: string;
}

const CompanyINN: React.FC<CompanyINNProps> = ({
  companyINN,
  setCompanyINN,
}) => {
  const [error, setError] = useState<string>("");

  const validateInn = (inn: string): boolean => {
    const errorObj: ErrorObj = { code: 0, message: "" };
    let result = false;

  
    inn = String(inn);

    if (!inn.length) {
      errorObj.code = 1;
      errorObj.message = "Обязательное поле";
    } else if (!/^\d+$/.test(inn)) {
      errorObj.code = 2;
      errorObj.message = "Введите корректные данные";
    } else if ([10, 12].indexOf(inn.length) === -1) {
      errorObj.code = 3;
      errorObj.message = "Введите корректные данные";
    } else {
      const checkDigit = (inn: string, coefficients: number[]): number => {
        let n = 0;
        for (let i = 0; i < coefficients.length; i++) {
          const digit = parseInt(inn[i], 10);
          if (!isNaN(digit)) {
            n += coefficients[i] * digit;
          }
        }
        return (n % 11) % 10;
      };

      switch (inn.length) {
        case 10:
          {
            const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
            const lastDigit = parseInt(inn[9], 10);
            if (!isNaN(lastDigit) && n10 === lastDigit) {
              result = true;
            }
            break;
          }
        case 12:
          {
            const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
            const lastDigit1 = parseInt(inn[10], 10);
            const lastDigit2 = parseInt(inn[11], 10);
            if (
              !isNaN(lastDigit1) &&
              !isNaN(lastDigit2) &&
              n11 === lastDigit1 &&
              n12 === lastDigit2
            ) {
              result = true;
            }
            break;
          }
      }
      if (!result) {
        errorObj.code = 4;
        errorObj.message = "Введите корректные данные";
      }
    }

    setError(errorObj.message);
    return result;
  };

  useEffect(() => {
    validateInn(companyINN);
  }, [companyINN]);


  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="companyINN">
        ИНН компании
        <span
          className={error ? "required-asterisk error" : "required-asterisk"}
        >
          *
        </span>
      </label>
      <input
        type="text"
        id="companyINN"
        name="companyINN"
        className={error ? "input-error" : ""}
        value={companyINN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCompanyINN(e.target.value)
        }
        onBlur={() => validateInn(companyINN)}
        placeholder="10 или 12 цифр"
      />
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default CompanyINN;

