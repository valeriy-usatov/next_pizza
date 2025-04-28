"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="0249c76288f1a0c38539f1f817e40355195f09c0"
      onChange={(data) => onChange?.(data?.value)}
      inputProps={{
        placeholder: "Введите адрес доставки",
        className: "custom-dadata-input",
      }}
    />
  );
};
