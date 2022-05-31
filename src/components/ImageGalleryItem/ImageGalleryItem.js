import PropTypes from 'prop-types';

export default function ImageGalleryItem({ hits, onClickImg }) {
  return hits.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <li key={id} className="gallery__item">
        {
          <img
            onClick={() => onClickImg(largeImageURL, tags)}
            className="gallery__item-image"
            src={webformatURL}
            alt={tags}
          />
        }
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  hits: PropTypes.array.isRequired,
  onClickImg: PropTypes.func.isRequired,
};
