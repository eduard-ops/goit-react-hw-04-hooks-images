import { useEffect } from 'react';

import PropTypes from 'prop-types';

export default function Modal({ onClose, bigImage, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', onCloseEsc);
    return () => {
      window.removeEventListener('keydown', onCloseEsc);
    };
  });

  const onCloseEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="backdrop" onClick={onCloseBackdrop}>
      <div className="modal">
        <img className="modal-img" src={bigImage} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
