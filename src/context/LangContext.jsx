import { createContext, useEffect, useState } from "react";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "fr");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"));
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};
