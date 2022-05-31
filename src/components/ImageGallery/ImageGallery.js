import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';

import GalleryApiService from '../../services/galleryApi';

import { toast } from 'react-toastify';

import Button from '../Button';

import Loader from '../Loader';

import Modal from '../Modal';

const api = new GalleryApiService();

export default function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [totalPage, setTotalPage] = useState('');
  const [spiner, setSpiner] = useState(false);
  const [page, setPage] = useState(1);
  const [prevName, setPrevName] = useState('');

  useEffect(() => {
    if (imageName === '') return;
    const fetchApiServise = async () => {
      try {
        if (imageName !== prevName) {
          api.resetPage();
          api.query = imageName;
          setSpiner(true);
          const fetcApi = await api.fetchGallery();
          const { hits, totalHits } = fetcApi;
          setImages([...hits]);
          setTotalPage(totalHits);
          setSpiner(false);
          setPrevName(imageName);
        }

        if (page !== 1) {
          setSpiner(true);
          const loadMore = await api.fetchGallery();
          const { hits } = loadMore;
          setImages(prevState => [...prevState, ...hits]);
          setSpiner(false);
        }
      } catch (error) {
        setSpiner(false);
        toast.warning(`Couldnt find pictures with this name ${imageName}`, {
          theme: 'colored',
        });
      }
    };
    fetchApiServise();
  }, [imageName, page, prevName]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
    if (api.page === Math.floor(totalPage / api.per_page)) {
      toast.info(`No more pictures for your request 😢`, {
        theme: 'colored',
      });
    }
  };

  const quantityCheck = () => {
    return api.page !== Math.ceil(totalPage / api.per_page);
  };

  const openModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onClickImg = (bigImg, tags) => {
    setLargeImage(bigImg);
    setTags(tags);
    openModal();
  };

  return (
    <>
      <ul className="gallery">
        {images.length > 0 && (
          <ImageGalleryItem hits={images} onClickImg={onClickImg} />
        )}
      </ul>
      {spiner && <Loader />}
      {images.length !== 0 && quantityCheck() && !spiner && (
        <Button onLoadMore={onLoadMore} />
      )}
      {showModal && (
        <Modal tags={tags} bigImage={largeImg} onClose={openModal} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
