import React, { Component } from 'react';
import { apiRequest } from '../../serviceApi/serviceApi';
import Searchbar from '../Searchbar/Searchbar';
import NotFound from '../NotFound/NotFound';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './App.module.css';

const PER_PAGE = 12;

export default class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    status: 'idle',
    totalHits: null,
    error: null,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search === search && prevState.page === page) return;
    await this.getImage();
  }
  getImage = () => {
    const { search, page } = this.state;
    this.setState({ status: 'pending' });

    apiRequest(search, page, PER_PAGE)
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(new Error());
      })
      .then(images => {
        const { totalHits, hits } = images;

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
          totalHits: totalHits,
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  reset = () => {
    this.setState({ page: 1, images: [] });
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleLoadMore = async () => {
    await this.incrementPage();
    // await this.getImage();
  };

  recordOfSearchText = searchText => {
    this.setState({ search: searchText, page: 1, images: [] });
  };

  isLastPage = () => {
    const { totalHits, page } = this.state;
    return totalHits > page * PER_PAGE;
  };

  render() {
    const { status, error, search, images, totalHits, isLoading } = this.state;
    if (status === 'rejected') return <div>{error.message}</div>;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.recordOfSearchText} />
        {totalHits === 0 && <NotFound searchText={search} />}
        {status === 'idle' && <p>Enter a search query</p>}
        {status === 'pending' && <Loader />}
        <ImageGallery images={images} />
        {status === 'resolved' && this.isLastPage() && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
