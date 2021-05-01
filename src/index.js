import refs from './js/refs';
import './styles.css';
import './basicLightBox.min.css';
import tmpl from './templates/tmpl.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
// import $ from 'jquery';
import pagination from 'paginationjs';

const requestParams = {
  query: '',
  page: 1,
};

function formSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  const query = e.target.children[0].value.trim();
  requestParams.page = 1;
  requestParams.query = query;
  if (requestParams.query === '') {
    refs.gallery.innerHTML = '';
    error({
      text: 'Enter something',
      delay: 2000,
    });
    return;
  }

  $('#demo').pagination({
    dataSource: function (done) {
      $.ajax({
        type: 'GET',
        url: `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&per_page=100&key=15900106-2c235e732bb321ca7ec900d93`,
        success: function (data) {
          done(data.hits);
        },
      });
    },
    pageSize: 10,
    autoHidePrevious: true,
    autoHideNext: true,
    callback: function (data, pagination) {
      // template method of yourself
      const html = tmpl(data);
      $('#dataContainer').html(html);
    },
  });
  refs.input.value = '';
}

function modal(e) {
  if (e.target.nodeName === 'IMG') {
    const instance = basicLightbox.create(
      `<img src=${e.target.dataset.source} width="800" height="600">`,
    );
    instance.show();
  }
}

refs.form.addEventListener('submit', formSearch);
refs.gallery.addEventListener('click', modal);
