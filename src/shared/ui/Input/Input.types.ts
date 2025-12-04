
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type BaseInputProps = {
  label?: string;
  error?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isError?: boolean;
};

type StandardInputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement> & {
  as?: 'input';
};

type TextareaInputProps = BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
  as: 'textarea';
};

export type InputProps = StandardInputProps | TextareaInputProps;