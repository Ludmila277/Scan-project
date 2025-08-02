import React, { type FC } from "react";
import "./CheckboxBlock.css";

interface CheckboxStates {
  maxCompleteness: boolean;
  businessMentions: boolean;
  mainRole: boolean;
  riskFactorsOnly: boolean;
  includeMarketNews: boolean;
  includeAnnouncements: boolean;
  includeNewsSummaries: boolean;
}

interface CheckboxBlockProps {
  checkboxStates: CheckboxStates;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxBlock: FC<CheckboxBlockProps> = ({
  checkboxStates,
  handleCheckboxChange,
}) => {
  const labels: Record<keyof CheckboxStates, string> = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  return (
    <div className="right-part-search-checkbox-block">
      {Object.entries(checkboxStates).map(([key, value]) => {
        const checkboxKey = key as keyof CheckboxStates;
        return (
          <div key={key} className="checkbox-container">
            <input
              type="checkbox"
              id={`checkbox-${key}`}
              name={key}
              checked={value}
              onChange={handleCheckboxChange}
              className="hidden-checkbox"
            />
            <label
              htmlFor={`checkbox-${key}`}
              className={value ? "checked-label" : ""}
            >
              <span className="custom-checkbox" />
              <span className="label-text">{labels[checkboxKey]}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxBlock;
