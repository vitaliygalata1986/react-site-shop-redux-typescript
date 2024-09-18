import { InputHTMLAttributes } from 'react';
// InputHTMLAttributes - берем из реакт
// HTMLInputElement - стандартный интерфейс, который есть в рамках браузера
export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean; // опциональный, применяем ?
}
