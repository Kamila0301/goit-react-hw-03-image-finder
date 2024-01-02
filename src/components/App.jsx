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
  };

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
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
    const searchQuery = this.state.query;
    const nexPage = this.state.page;

    try {
      this.setState({ loading: true });
      const image = await fetchItems(searchQuery, nexPage);
      if (image.length) {
        this.setState(prevState => ({
          images: nexPage > 1 ? [...prevState.images, ...image] : image,
        }));
        this.setState({ loading: false });
      } else {
        Notiflix.Notify.failure('Вибачте, щось пішло не так, спробуйте ще раз');
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (event.target.elements.query.value.trim() === '') {
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
    const { loading, images } = this.state;
    return (
      <AppStyle>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {images.length > 0 && <ImageGallery imageItems={images} />}
        {images.length > 0 && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
      </AppStyle>
    );
  }
}
