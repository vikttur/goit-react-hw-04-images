import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    modalProps: { src: '', alt: '' },
  };

  handleCardClick = ({ largeImageURL: src, tags: alt }) => {
    this.setState({ modalProps: { src, alt } });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { src, alt } = this.state.modalProps;

    return (
      <>
        <ul className={css.gallery}>
          {this.props.images.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={String(id)}
                  src={webformatURL}
                  alt={tags}
                  onClick={() => this.handleCardClick({ largeImageURL, tags })}
                />
              );
            }
          )}
        </ul>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={src} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
