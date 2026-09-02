import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  BR,
  PT,
  US,
  GB,
  ES,
  FR,
  DE,
  IT,
} from "country-flag-icons/react/3x2";

import { SUPPORTED_LANGUAGES } from "../types";

import "./LanguageSelect.css";

interface LanguageSelectProps {
  value: string;
  onChange: (language: string) => void;
}

const FLAGS = {
  BR,
  PT,
  US,
  GB,
  ES,
  FR,
  DE,
  IT,
};

export default function LanguageSelect({
  value,
  onChange,
}: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLanguage = SUPPORTED_LANGUAGES.find(
    (language) => language.code === value
  );

  const SelectedFlag = selectedLanguage
    ? FLAGS[selectedLanguage.countryCode as keyof typeof FLAGS]
    : null;

  function handleSelect(language: string) {
    onChange(language);
    setIsOpen(false);
  }

  return (
    <div className="language-select-wrapper">
      <button
        type="button"
        className="language-select"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {SelectedFlag && <SelectedFlag className="language-flag" />}

        <ChevronDown
          size={16}
          className={isOpen ? "chevron-open" : ""}
        />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {SUPPORTED_LANGUAGES.map((language) => {
            const Flag =
              FLAGS[language.countryCode as keyof typeof FLAGS];

            return (
              <button
                type="button"
                key={language.code}
                className={`language-option ${
                  language.code === value ? "selected" : ""
                }`}
                onClick={() => handleSelect(language.code)}
              >
                {Flag && <Flag className="language-flag" />}

                <span>{language.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}