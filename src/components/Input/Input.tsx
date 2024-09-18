import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';

// forwardRef должен понимать - на какой элемент он будет применяться, используем дженерик <HTMLInputElement>
// тоесть forwardRef принимает два параметра: тот элемент, на который реферимся, HTMLInputElement, а второй - описание пропсов InputProps
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, isValid = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(styles['input'], className, {
        [styles['invalid']]: isValid,
      })}
      {...props}
    />
  );
});

export default Input;
