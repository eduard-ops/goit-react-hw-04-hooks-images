import { useState } from 'react';

import Container from './Conatainer';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './Searchbar';

import ImageGallery from './ImageGallery';

function App(params) {
  const [imageName, setImageName] = useState('');

  const hundleFormSubmit = imageName => {
    setImageName(imageName);
  };

  return (
    <Container>
      <SearchBar onSubmit={hundleFormSubmit} />
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      <ImageGallery imageName={imageName} />
    </Container>
  );
}

export { App };
