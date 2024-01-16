import { Audio } from 'react-loader-spinner';
import { Load } from './Loader.styled';

export const Loader = () => {
  return (
    <>
      <Load>
        <Audio height="80" width="80" radius="9" color="green" />
      </Load>
    </>
  );
};
