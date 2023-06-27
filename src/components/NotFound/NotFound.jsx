import PropTypes from 'prop-types';
import notFound from '../../images/notFound.jpg';
import css from './NotFound.module.css';

export default function NotFound({ searchText }) {
  return (
    <div className={css.card}>
      <h2 className={css.text}>{searchText}</h2>
      <h3 className={css.text}>Nothing was found for this query</h3>
      <img src={notFound} alt="not found" />
    </div>
  );
}

NotFound.propTypes = {
  searchText: PropTypes.string.isRequired,
};
