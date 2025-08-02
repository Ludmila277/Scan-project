import React from "react";
import "./Tonality.css";

interface TonalityProps {
  tonality: string;
  setTonality: (value: string) => void;
}

const Tonality: React.FC<TonalityProps> = ({ tonality, setTonality }) => {
  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="tonality">Тональность</label>
      <div className="select-wrapper">
        <select
          id="tonality"
          name="tonality"
          value={tonality}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setTonality(e.target.value)
          }
        >
          <option value="Любая">Любая</option>
          <option value="Позитивная">Позитивная</option>
          <option value="Негативная">Негативная</option>
        </select>
      </div>
    </div>
  );
};

export default Tonality;
