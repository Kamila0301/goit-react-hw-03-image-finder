import { ButtonStyled } from './Button.styled';
export const Button = ({ onClick, children }) => {
  return (
    <div>
      <ButtonStyled onClick={onClick}>{children}</ButtonStyled>
    </div>
  );
};
