import { InputHTMLAttributes } from 'react';
import * as S from './Select.styled';

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = ({ children, ...props }: IProps) => {
  return (
    <S.SelectContainer>
      <S.Select {...props}>{children}</S.Select>
      <S.Arrow />
    </S.SelectContainer>
  );
};

export default Select;
