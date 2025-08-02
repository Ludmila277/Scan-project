import React, { useState, useEffect } from "react";
import "./DocumentCount.css";

interface DocumentCountProps {
  documentCount: string;
  setDocumentCount: (value: string) => void;
}

const DocumentCount: React.FC<DocumentCountProps> = ({
  documentCount,
  setDocumentCount,
}) => {
  const [error, setError] = useState<string>("");

  const validateDocumentCount = () => {
    const count = parseInt(documentCount, 10);

    if (!documentCount) {
      setError("Обязательное поле");
    } else if (isNaN(count) || count < 1) {
      setError("Введите корректные данные");
    } else if (count > 1000) {
      setError("Введите корректные данные");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    validateDocumentCount();
  }, [documentCount]);

  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="documentCount">
        Количество документов в выдаче
        <span
          className={error ? "required-asterisk error" : "required-asterisk"}
        >
          *
        </span>
      </label>
      <input
        type="number"
        id="documentCount"
        name="documentCount"
        className={error ? "input-error" : ""}
        value={documentCount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          setDocumentCount(newValue);
          validateDocumentCount();
        }}
        onBlur={validateDocumentCount}
        placeholder="от 1 до 1000"
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DocumentCount;
