import { Component } from 'react';
import Modal from 'react-modal';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 24px)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};

Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };

  openModal = () => this.setState({ isOpenModal: true });
  closeModal = () => this.setState({ isOpenModal: false });

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;
    return (
      <div>
        <ImageGalleryItemImage
          src={webformatURL}
          onClick={this.openModal}
          alt={tags}
          load="lazy"
        />
        <Modal
          isOpen={this.state.isOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </div>
    );
  }
}
