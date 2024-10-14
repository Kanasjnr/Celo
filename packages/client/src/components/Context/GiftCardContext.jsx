import React, { createContext, useContext, useState } from 'react';

const GiftCardContext = createContext();

export const useGiftCard = () => useContext(GiftCardContext);

export const GiftCardProvider = ({ children }) => {
  const [giftCards, setGiftCards] = useState([]);

  const addGiftCard = (giftCard) => {
    setGiftCards((prevCards) => [...prevCards, giftCard]);
  };

  return (
    <GiftCardContext.Provider value={{ giftCards, addGiftCard }}>
      {children}
    </GiftCardContext.Provider>
  );
};
