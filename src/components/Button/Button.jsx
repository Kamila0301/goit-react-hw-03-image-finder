import { ButtonStyled } from './Button.styled';
export const Button = ({ onClick, children }) => {
  return (
    <>
      <ButtonStyled onClick={onClick}>{children}</ButtonStyled>
    </>
  );
};
