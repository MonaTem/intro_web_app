// jshint esversion:6

// Grabbing birds list div
const birds = document.querySelector('#birds');
// Grabbing the form for creating a bird
const newForm = document.querySelector('#newBirdForm');
// Creating var for URL
/*
  TODO: change to '/birds'
  -- this will break on deployment
*/
const BIRDS_URL = 'http://localhost:8000/birds';

newForm.addEventListener('submit', (e) => {
  e.preventDefault(); // PREVENT DEFAULT ON FORM

  axios.post(BIRDS_URL, {
    title: newForm.querySelector('#title').value,
    description: newForm.querySelector('#description').value
  }).then((response) => {
      const bird = response.data;
      const birdEl = document.createElement('div');

      birdEl.innerHTML = `<div>
       <h2>  ${bird.title} </h2>
        <p>  ${bird.description} </p>
     </div>`;

      birds.append(birdEl);

      newForm.reset();
    });

    // W/out Axios

  // fetch version
  // const data = {
  //     title: newForm.querySelector('#title').value,
  //     description: newForm.querySelector('#description').value
  //   };
  //
  // fetch(BIRDS_URL, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     // 'Content-Type': 'application/json'
  //   }
  // }).then(res => res.json())
  // .then((bird) => {
  //   const birdEl = document.createElement('div');
  //
  //   birdEl.innerHTML = `<div>
  //     <h2>  ${bird.title} </h2>
  //     <p>  ${bird.description} </p>
  //   </div>`;
  //
  //   birds.append(birdEl);
  //
  //   newForm.reset();
  });

/* ES6 Version
const data = entriesToObject(new FormData(newForm).entries());

 fetch(BIRDS_URL, {
   method: 'POST',
   body: JSON.stringify(data)
 }).then(res => res.json)
 .then((bird) => {
   const birdEl = document.createElement('div');

   birdEl.innerHTML = `<div>
     <h2>  ${bird.title} </h2>
     <p>  ${bird.description} </p>
   </div>`;

   birds.append(birdEl);

   newForm.clear();
 })
});

function entriesToObject(entries) {
 return [...entries].reduce((obj, [key, value]) => ({...obj, [key]: value}), {});
}

*/
