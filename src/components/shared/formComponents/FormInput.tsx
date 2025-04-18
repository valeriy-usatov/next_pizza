import React from 'react';
import RequiredSymbol from './RequiredSymbol';

import ErrorText from './ErrorText';
import { Input } from '@/components/ui';
import ClearButton from './ClearButton';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}
const FormInput = ({ name, label, required, className, ...props }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear =()=>{
    setValue(name, '',{shouldValidate: true});
  }    

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} name={name} />
        {value && <ClearButton onClick={onClickClear}/>}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};

export default FormInput;
