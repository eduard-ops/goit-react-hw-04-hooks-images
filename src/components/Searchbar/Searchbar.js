import { ReactComponent as IconSearch } from '../../images/icon-search.svg';

import { useState } from 'react';

import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [nameImage, setNameImage] = useState('');

  const handleNameChange = e => {
    setNameImage(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (nameImage.trim() === '') {
      toast.error('введите имя', { theme: 'colored' });
      return;
    }
    onSubmit(nameImage);
    setNameImage('');
  };

  return (
    <header className="header">
      <form onSubmit={handleSubmit} className="header-form">
        <button type="submit" className="header-form__button-search">
          <IconSearch />
        </button>
        <input
          className="header-form__input-search"
          type="text"
          value={nameImage}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
