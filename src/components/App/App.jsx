import { useState, useEffect } from 'react';
import { apiRequest } from '../../serviceApi/serviceApi';
import Searchbar from '../Searchbar/Searchbar';
import NotFound from '../NotFound/NotFound';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './App.module.css';

const PER_PAGE = 12;

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search === '') return;
    getImage();
  }, [search, page]);

  const getImage = () => {
    setStatus('pending');

    apiRequest(search, page, PER_PAGE)
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(new Error());
      })
      .then(images => {
        const { totalHits, hits } = images;

        setImages(prevState => [...prevState, ...hits]);
        setTotalHits(totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const recordOfSearchText = searchText => {
    setSearch(searchText);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => await incrementPage();

  const incrementPage = () => setPage(prevState => prevState + 1);

  const isNotLastPage = () => {
    return totalHits > page * PER_PAGE;
  };

  if (status === 'rejected') {
    return <div>{error.message}</div>;
  } else {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={recordOfSearchText} />
        {totalHits === 0 && <NotFound searchText={search} />}
        {status === 'idle' && <p>Enter a search query</p>}
        {status === 'pending' && <Loader />}
        <ImageGallery images={images} />
        {status === 'resolved' && isNotLastPage() && (
          <Button onClick={handleLoadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
