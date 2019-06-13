import React from 'react';
import T from 'prop-types';
import cn from 'classnames';
import s from './Button.module.scss';

function Button({ children, onClick, primaryClass, disabled, ...attrs }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(s.btn, s[primaryClass])}
      {...attrs}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: T.oneOfType([T.node, T.array]),
  onClick: T.func,
  primaryClass: T.string,
  disabled: T.bool,
};

Button.defaultProps = {
  children: 'Button',
  onClick: () => {},
  primaryClass: '',
  disabled: false,
};

export default Button;
