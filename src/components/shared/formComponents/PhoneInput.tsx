// components/shared/formComponents/PhoneInput.tsx
import React from 'react';
import InputMask from 'react-input-mask';
import { useFormContext } from 'react-hook-form';
import ErrorText from './ErrorText';
import RequiredSymbol from './RequiredSymbol';
import ClearButton from './ClearButton';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const PhoneInput = ({ name, label, required, className, placeholder }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <InputMask
          mask="+7 (999) 999-99-99"
          value={value}
          onChange={(e) => setValue(name, e.target.value, { shouldValidate: true })}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              placeholder={placeholder} // <--- вот это добавляем!
              className="h-12 w-full px-4 text-md rounded border"
            />
          )}
        </InputMask>
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

export default PhoneInput;
