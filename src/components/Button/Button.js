import PropTypes from 'prop-types';

export default function Button({ onLoadMore }) {
  return (
    <button onClick={onLoadMore} className="load-more-btn btn">
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
