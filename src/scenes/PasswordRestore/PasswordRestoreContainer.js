import { compose, withStateHandlers, withProps } from 'recompose';
import PasswordRestore from './PasswordRestoreView';

const enhancer = compose(
  withStateHandlers(
    { text: '', isModalOpen: false },
    {
      handleChange: () => (event) => ({
        text: event.target.value,
      }),
      passRecover: ({ isModalOpen }) => () => ({
        isModalOpen: !isModalOpen,
      }),
    },
  ),
  withProps(({ text }) => ({
    disabled: text.trim().length === 0,
  })),
);

export default enhancer(PasswordRestore);
