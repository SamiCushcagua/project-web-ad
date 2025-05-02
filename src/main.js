import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'



const versiculoDivX = document.getElementById('versiculoX');
const versiculoDivY = document.getElementById('versiculoY');



async function probando_Api() {

try{
const response1 = await fetch('https://bible-api.com/john+3');
const data1 = await response1.json();

const response2 = await fetch('https://bible-api.com/john+4');
const data2 = await response2.json();

let versiculoX = `

<h2>${data1.reference}</h2>
<table>
  <thead>
    <tr>
     
      <th>Libro</th>
      <th>Capitulo</th>
      <th>Versiculo</th>
      <th>Texto</th>



      
    </tr>
  </thead>
  <tbody>
  `;

  data1.verses.forEach(versiculo => {
    versiculoX += `
    <tr>
      <td>${versiculo.book_name}</td>
      <td>${versiculo.chapter}</td>
      <td>${versiculo.verse}</td>
      <td>${versiculo.text}</td>
     
    </tr>
    `;
  });

  versiculoX += `
  </tbody>
</table>
`;


versiculoX += `
    </tbody>
  </table>
`;


let versiculoY =`


<h2>${data2.reference}</h2>
<table>
  <thead>
    <tr>
     
     <th>Libro</th>
      <th>Capitulo</th>
      <th>Versiculo</th>
      <th>Texto</th>


      
    </tr>
  </thead>
  <tbody>
  `;


data2.verses.forEach(verse => {
  versiculoY += `
   <tr>
     
     <td>${verse.book_name}</td>
     <td>${verse.chapter}</td>
     <td>${verse.verse}</td>
     <td>${verse.text}</td>
  
   </tr>
 `;
});





versiculoDivX.innerHTML = versiculoX;
versiculoDivY.innerHTML = versiculoY;



}catch(error){
  console.log("error", error);
}


}

probando_Api();



setupCounter(document.querySelector('#counter'))
