import View from './View';
import icons from 'url:../../img/icons.svg';
//import { RES_PER_PAGE } from './config.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const prevHTML = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    const nextHTML = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    // Page 1, and there are other pages
    // show next page button only
    if (curPage === 1 && numPages > 1) {
      return nextHTML;
    }

    //Last page
    // show previous button only
    if (curPage === numPages && numPages > 1) {
      return prevHTML;
    }
    //Other page
    // show previous and next button
    if (curPage < numPages) {
      return prevHTML + nextHTML;
    }
    return ``;
  }
}

export default new PaginationView();
