import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

// экспортируем интерфейс, который описывает те props, которые нужно передать в button
// ReactNode - тип (покрывает всю необходимость в children) - это может быть строка, число, react элемент, JSX элемент конструктор, ReactPortal, undefined и т.д.
// обобщенный тип любой node в компоненте

// ButtonHTMLAttributes – интерфейс, который расширяет стандратный button html attribute. И мы должны указать его тип - HTMLBodyElement

/*
export interface ButtonProps extends ButtonHTMLAttributes<HTMLBodyElement> {
  children: ReactNode;
  appearence?: 'big' | 'small'; // union тип - опциональный, применяем ?
}
  */

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearence?: 'small' | 'big'; // union тип - опциональный, применяем ?
  className?: string;
  children: ReactNode;
}
