import { ButtonStyled } from './Button.styled';
export const Button = ({ onClick }) => {
  return (
    <div>
      <ButtonStyled onClick={onClick}>Load more</ButtonStyled>
    </div>
  );
};
