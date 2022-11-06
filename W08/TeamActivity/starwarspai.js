const url = 'https://swapi.dev/api/people';
const peopleList = document.getElementById('people');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');

async function apiFetch(url) {
   const response = await fetch(url);
   const data = await response.json();
   return data;
 }

 function createList (data) {
   peopleList.innerHTML = '';
   data.results.forEach(person => {
      const peopleLi = document.createElement('li');
      peopleLi.setAttribute("id", `${person.name}`);
      peopleLi.innerHTML = `${person.name}`;
      peopleList.append(peopleLi);
   });
 }



 function renderPrevious(data) {
   return () => {
      if(data.previous === null) {
      return;
   }
   apiFetch(data.previous).then((data) => {renderList(data)});
}; 
}

function renderNext(data) {
   return () => {
   if(data.next === null) {
      return;
   }
   apiFetch(data.next).then((data) => {renderList(data)});
}
}

function renderList(data) {
   previousButton.removeEventListener('click', renderPrevious(data));
   nextButton.removeEventListener('click', renderNext(data));
   console.log(data);
   createList(data);
   previousButton.addEventListener('click', renderPrevious(data));
   nextButton.addEventListener('click', renderNext(data));
}


apiFetch(url).then(renderList);

 


