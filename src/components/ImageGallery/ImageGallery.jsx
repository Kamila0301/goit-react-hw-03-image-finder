import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryDiv, ImageGalleryItemStyled } from './ImageGallery.styled';

export const ImageGallery = ({ imageItems }) => {
  return (
    <div>
      <ImageGalleryDiv>
        {imageItems.map(item => (
          <ImageGalleryItemStyled key={item.id}>
            <ImageGalleryItem unit={item} />
          </ImageGalleryItemStyled>
        ))}
      </ImageGalleryDiv>
    </div>
  );
};
