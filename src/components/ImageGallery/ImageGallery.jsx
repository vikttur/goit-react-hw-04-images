import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleCardClick = ({ largeImageURL: src, tags: alt }) => {
    setModalSrc(src);
    setModalAlt(alt);
    toggleModal();
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      <ul className={css.gallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={String(id)}
              src={webformatURL}
              alt={tags}
              onClick={() => handleCardClick({ largeImageURL, tags })}
            />
          );
        })}
      </ul>
      {showModal && (
        <Modal onClose={toggleModal} src={modalSrc} alt={modalAlt} />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
