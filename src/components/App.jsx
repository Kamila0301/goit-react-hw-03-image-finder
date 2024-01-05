import { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchItems } from 'api';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyle } from './App.styled';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    isLoadMore: false,
    error: null,
  };

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
      loading: false,
      isLoadMore: false,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.showResult();
    }
  };

  showResult = async () => {
    const { query, page } = this.state;
    const divided = query.split('/')[1];

    try {
      this.setState({ loading: true });
      const { hits, totalHits } = await fetchItems({
        query: divided,
        page,
      });
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isLoadMore: prevState.images.length + hits.length >= totalHits,
        error: null,
      }));
    } catch (error) {
      Notiflix.Notify.info('Вибачте щось пішло не так, спробуйте ще раз');
      return;
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() !== '') {
      Notiflix.Notify.info('Введіть, будь ласка, пошукове слово');
      return;
    }
    this.changeQuery(event.target.elements.query.value);
    event.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, images, isLoadMore } = this.state;
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleSubmit} />

        {images.length > 0 && <ImageGallery imageItems={images} />}
        {loading && <Loader />}
        {images.length > 0 && !loading && !isLoadMore && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
      </AppStyle>
    );
  }
}
