import { cn } from '@/lib/utils';
import React from 'react'

interface Props {
    text: string;
    className?: string;
  }
const ErrorText = ({ text, className }:Props) => {
  return (
    <p className={cn('text-red-500 text-sm', className)}>{text}</p>
  )
}

export default ErrorText