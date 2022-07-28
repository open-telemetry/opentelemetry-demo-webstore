import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import * as S from './Input.styled';

interface IProps extends InputHTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  type: HTMLInputTypeAttribute | 'select';
  children?: React.ReactNode;
  label: string;
}

const Input = ({ type, id = '', children, label, ...props }: IProps) => {
  return (
    <S.InputRow>
      <S.InputLabel>{label}</S.InputLabel>
      {type === 'select' ? (
        <>
          <S.Select id={id} {...props}>
            {children}
          </S.Select>
          <S.Arrow />
        </>
      ) : (
        <S.Input id={id} {...props} type={type} />
      )}
    </S.InputRow>
  );
};

export default Input;
