import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, onClick }) {
  return (
    <li className={css.galleryItem}>
      <img className={css.galleryImage} src={src} alt={alt} onClick={onClick} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
