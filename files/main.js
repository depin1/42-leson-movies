 //my cods  

 const btn = document.querySelector('.search'),
     input = document.querySelector('.input'),
     movieList = document.querySelector('.box');
 const section = document.querySelector('.container');
 const loader = document.createElement('div');

 //  loader.classList.add('loading')


 const imagesUrl = 'https://image.tmdb.org/t/p/w500';
 let url = 'https://api.themoviedb.org/3/movie/550?api_key=23adc2ee67096b17043b119fd5813b57';
 const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e5d48ddea98c83cfcc9a7df314611468&query=';



 //  let row = document.querySelector('.row');
 let pageNAtionWrapper = document.querySelector('.pagenation');
 const fragment = document.createDocumentFragment();

 let curientpage = 1;

 async function featchDat() {
     const inputCondition = input.value;
     if (inputCondition) {
         url = `${searchUrl}${inputCondition}`
     } else {
         url = `https://api.themoviedb.org/3/discover/movie?api_key=c1ba5d7054ad4225561ffacb783be3c6&page=${curientpage}`
     }
     try {

         let response = await fetch(url);
         let data = await response.json();

         let totalpages = data.total_pages > 5 ? 5 : data.total_pages


         movieList.innerHTML = '';

         //  let datares = data.results;



         if (data.results.length == 0) {
             input.classList.add('active')

             let notfound = document.createElement('div');
             notfound.textContent = '404 Hech qanday malumot yoq';
             notfound.classList.add('title')


             input.value = '';
             pageNAtionWrapper.appendChild(notfound);

         } else {
             //  let dataslice = data.results.slice(0, 5)
             data.results.map((movie) => {
                 const image = document.createElement('img');
                 image.src = ` ${imagesUrl}${movie.backdrop_path}`;
                 image.alt = movie.title;;
                 image.classList.add('image')
                 const title = document.createElement('h2');
                 title.classList.add('titlemov')
                 title.textContent = movie.title;

                 let minbox = document.createElement('div');
                 minbox.classList.add('minbox')

                 fragment.appendChild(image);
                 fragment.appendChild(title);
                 minbox.appendChild(fragment);
                 movieList.appendChild(minbox)
                 section.appendChild(movieList);

             })

             pageNAtionWrapper.innerHTML = '';

         }
         input.value = '';
     } catch (error) {
         console.log(error);
     }
 }
 featchDat();


 input.addEventListener('keypress', function(e) {
     if (e.key === 'Enter') {
         featchDat();
     }
 });

 btn.addEventListener('click', () => {
     featchDat();
 })

 //Teacher cods



 //  const apiKey = 'c1ba5d7054ad4225561ffacb783be3c6';
 //  const baseUrl = 'https://api.themoviedb.org/3/';

 //  const imagesUrl = 'https://image.tmdb.org/t/p/w500';


 //  const fragment = document.createDocumentFragment();


 //  const loader_container = document.querySelector('.loader-container');
 //  const loader = document.createElement('div');
 //  loader.classList.add('loader');

 //  loader_container.appendChild(loader);

 //  let currentPage = 1;

 //  async function getMovies() {
 //      const searchTerm = document.querySelector('#search').value;

 //      let url;

 //      if (searchTerm) {
 //          url = `${baseUrl}search/movie?api_key=${apiKey}&query=${searchTerm}`;
 //      } else {
 //          url = `${baseUrl}discover/movie?api_key=${apiKey}&page=${currentPage}`;
 //      }

 //      try {
 //          const response = await fetch(url);
 //          const data = await response.json();

 //          let totalPages = data.total_pages > 5 ? 5 : data.total_pages;

 //          const movie_container = document.querySelector('.movie-container');
 //          movie_container.innerHTML = '';
 //          if (data.results.length === 0) {
 //              const message = document.querySelector('.not-found');
 //              message.textContent = 'Siz izlagan kino topilmadi'
 //          } else {
 //              data.results.map((movie) => {
 //                  const movieCard = document.createElement('div');
 //                  movieCard.classList.add('movie-card');

 //                  const movieImage = document.createElement('img');
 //                  movieImage.src = `${imagesUrl}${movie.backdrop_path}`;
 //                  movieImage.alt = movie.title;

 //                  const movieTitle = document.createElement('h3');
 //                  movieTitle.textContent = movie.title;

 //                  const movieRelease = document.createElement('span');
 //                  movieRelease.textContent = `Released: ${movie.release_date}`;


 //                  fragment.appendChild(movieImage);
 //                  fragment.appendChild(movieTitle);
 //                  fragment.appendChild(movieRelease);
 //                  movieCard.appendChild(fragment);
 //                  movie_container.appendChild(movieCard);
 //              })

 //              const paginationWrapper = document.querySelector('.pagination-wrapper');
 //              paginationWrapper.innerHTML = '';

 //              if (totalPages > 1) {

 //                  for (let i = 1; i <= totalPages; i++) {
 //                      const button = document.createElement('button');
 //                      button.innerText = i;
 //                      if (currentPage === i) {
 //                          button.classList.add('active');
 //                      }
 //                      button.addEventListener('click', () => {
 //                          currentPage = i;
 //                          getMovies();
 //                      })

 //                      paginationWrapper.appendChild(button);
 //                  }
 //              }
 //          }

 //      } catch (error) {
 //          console.error(error.message);
 //      } finally {
 //          const loader = document.querySelector('.loader');
 //          if (loader) {
 //              loader_container.remove();
 //          }
 //      }
 //  }

 //  const searchInput = document.querySelector('#search');
 //  const btn = document.querySelector('#searchBtn');

 //  searchInput.addEventListener('keypress', (e) => {
 //      if (e.key === 'Enter') {
 //          getMovies();
 //      }
 //  });
 //  btn.addEventListener('click', () => {

 //      currentPage = 1;
 //      getMovies();
 //  });

 //  getMovies();