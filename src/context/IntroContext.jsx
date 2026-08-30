import React, { createContext, useState } from 'react';

export const IntroContext = createContext();

export function IntroProvider({ children }) {
  const [introCompleted, setIntroCompleted] = useState(false);

  const markIntroCompleted = () => {
    setIntroCompleted(true);
    localStorage.setItem('mellora-intro-shown', 'true');
  };

  return (
    <IntroContext.Provider value={{ introCompleted, markIntroCompleted }}>
      {children}
    </IntroContext.Provider>
  );
}
