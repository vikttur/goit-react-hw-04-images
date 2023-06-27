import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ children, onClick, ...allyProps }) {
  return (
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      {...allyProps}
    >
      {children}
    </button>
  );
}

Button.defailtProps = {
  onClick: () => null,
  children: null,
};

Button.propTupes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};
