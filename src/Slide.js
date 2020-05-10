import star from './assets/images/star-win.svg';

export default class Slide {
  constructor(url) {
    this.url = url;
  }

  static createSlide(id, title, imageSrc, year, rat) {
    const slideContainer = document.createElement('div');
    const link = document.createElement('a');
    const poster = document.createElement('img');
    const infoWrapper = document.createElement('div');
    const productDate = document.createElement('p');
    const ratingWrapper = document.createElement('div');
    const starImage = document.createElement('img');
    const rating = document.createElement('p');

    slideContainer.classList.add('swiper-slide');
    link.classList.add('movie-link');
    link.target = '_blank';
    link.setAttribute('href', `http://www.imdb.com/title/${id}/`);
    link.innerText = title;

    poster.classList.add('movie-poster');
    poster.setAttribute('src', `${imageSrc}`);

    infoWrapper.classList.add('movie-info');
    productDate.classList.add('product-date');
    productDate.innerText = `${year}`;

    ratingWrapper.classList.add('movie-rating');
    starImage.classList.add('star');
    rating.classList.add('rating');
    rating.innerText = rat || 'N/A';

    starImage.setAttribute('src', star);

    ratingWrapper.append(starImage, rating);
    infoWrapper.append(productDate, ratingWrapper);
    slideContainer.append(link, poster, infoWrapper);

    return slideContainer;
  }
}
