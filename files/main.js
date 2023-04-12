 //my cods  

 const btn = document.querySelector('.search'),
     input = document.querySelector('.input'),
     movieList = document.querySelector('.box');
 const section = document.querySelector('.container');
 const loader = document.createElement('div');


 const imagesUrl = 'https://image.tmdb.org/t/p/w500';
 let url = 'https://api.themoviedb.org/3/movie/550?api_key=23adc2ee67096b17043b119fd5813b57';
 const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e5d48ddea98c83cfcc9a7df314611468&query=';

 //  async function datafatch() {

 //      try {
 //          const response = await fetch(url);
 //          const data = await response.json();
 //          console.log(data);

 //      } catch (error) {
 //          console.log(error);
 //      }
 //  }
 //  datafatch();

 let pageNAtionWrapper = document.querySelector('.pagenation');
 const fragment = document.createDocumentFragment();

 let curientpage = 15;

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
         console.log(data.results);
         let totalpages = data.total_pages > 19 ? 25 : data.total_pages;


         movieList.innerHTML = '';



         if (data.results.length == 0) {


             let notfound = document.createElement('div');
             notfound.textContent = '404 Hech qanday malumot yoq';
             notfound.classList.add('title')

             pageNAtionWrapper.appendChild(notfound);

             input.classList.add('active')

         } else {
             input.classList.remove('active')
             console.log(data);
             //.slice(0, 8)
             let dataslice = data.results;
             dataslice.map((movie) => {
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

             if (totalpages > 20) {

                 for (let i = 15; i < totalpages; i++) {

                     let button = document.createElement('button');

                     button.innerText = i;
                     pageNAtionWrapper.appendChild(button)
                     if (curientpage === i) {
                         button.classList.add('activebtn')
                     } else {
                         button.addEventListener('click', () => {
                             curientpage = i;
                             featchDat();

                         })
                     }
                 }

             }

         }

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