import { FC } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

// типизация функционального компонента - альтернатива нижнего
// во первых - сделаем button функциональным компонентом - добавим FC
// при этом он принимает дженерик, который описывает его свойства

export const ButtonAlternative: FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(styles['button'], styles['accent'], className)}
      {...props}
    >
      {children}
    </button>
  );
};

function Button({
  children,
  className,
  appearence = 'small',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles['button'], styles['accent'], className, {
        [styles['small']]: appearence === 'small',
        [styles['big']]: appearence === 'big',
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
