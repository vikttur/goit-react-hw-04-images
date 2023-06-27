import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { ReactComponent as MagnificationGlass } from '../../images/magnificationGlass.svg';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSearchChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') return;
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <Button type="submit" className={css.button}>
            <MagnificationGlass />
          </Button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
