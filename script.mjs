var searchInput = document.querySelector("#searchinput");
var searchBar = document.querySelector('#searchbar');
//New Releases
var newReleases = document.querySelector('#release');
//Appearance
var appear1 = document.querySelector('#appearance1')
var appear2 = document.querySelector('#appearance2')
var appear3 = document.querySelector('#appearance3')
var appear4 = document.querySelector('#appearance4')
var appear5 = document.querySelector('#appearance5')
var appear6 = document.querySelector('#appearance6')
//Powerstats
var power1 = document.querySelector('#power1')
var power2 = document.querySelector('#power2')
var power3 = document.querySelector('#power3')
var power4 = document.querySelector('#power4')
var power5 = document.querySelector('#power5')
var power6 = document.querySelector('#power6')
//Work
var workInput = document.querySelector('#workinput');
var workInput2 = document.querySelector('#workinput2');
//Biography
var biographyInput1 = document.querySelector('#biographyinput1');
var biographyInput2 = document.querySelector('#biographyinput2');
var biographyInput3 = document.querySelector('#biographyinput3');
var biographyInput4 = document.querySelector('#biographyinput4');
var biographyInput5 = document.querySelector('#biographyinput5');
var biographyInput6 = document.querySelector('#biographyinput6');
var biographyInput7 = document.querySelector('#biographyinput7');
//Connections
var connectionsInput1 = document.querySelector('#connectionsinput1');
var connectionsInput2 = document.querySelector('#connectionsinput2'); 

import { availableTags } from "./longstring.mjs";
var favBtn = document.querySelector('#favbutton');
var favArray;

//api urls and keys
var shortBoxedUrl = "api.shortboxed.com"
var key1 = "3299094467007947"
var superUrl = "https://superheroapi.com/api/" + key1

//generic pull for shortboxed api, use REQUESTED ELEMENT as paramater to specify which element within the shortboxed api to pull
var getShortBoxedApi = function() {

    var requestUrl2 = shortBoxedUrl + "/comics/v1/new";
    
    fetch('https://cors-anywhere-jung.herokuapp.com/'+requestUrl2, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow'
    })
    .then(function (response) {
      
      return response.json();
    })
    .then(function (data) {
      while (newReleases.childNodes.length > 2) {
        newReleases.removeChild(newReleases.lastChild);
      }
      for (var i = 0; i<3; i++) {
      
      var newToRead = document.createElement('p');
      newToRead.textContent = "Title: " + data.comics[Math.floor(Math.random()*184)].title;
      newReleases.appendChild(newToRead);
      }
    
      })
};

var getSuperheroApi = function(requestedElement) {
  var requestUrl = superUrl + requestedElement;
  fetch('https://cors-anywhere-jung.herokuapp.com/'+requestUrl, {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow'
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
    console.log(data.results[0]);
    
//Appearance and Powerstats
    appear1.textContent = "Eye Color: " + data.results[0].appearance['eye-color'] 
    appear2.textContent = "Gender: " + data.results[0].appearance['gender'] 
    appear3.textContent = "Hair Color: " + data.results[0].appearance['hair-color'] 
    appear4.textContent = "Height: " + data.results[0].appearance['height']
    appear5.textContent = "Race: " + data.results[0].appearance['race'] 
    appear6.textContent = "Weight: " + data.results[0].appearance['weight'] 
    
    power1.textContent = "Strength: " + data.results[0].powerstats['strength']
    power2.textContent = "Durability: " + data.results[0].powerstats['durability']
    power3.textContent = "Intelligence: " + data.results[0].powerstats['intelligence']
    power4.textContent = "Power: " + data.results[0].powerstats['power']
    power5.textContent = "Combat: " + data.results[0].powerstats['combat']
    power6.textContent = "Speed: " + data.results[0].powerstats['speed']

//Bio,Occupation,Work Paragraphs
biographyInput1.textContent = "Aliases: " +data.results[0].biography['aliases'] 
biographyInput2.textContent = "Alignment: " +data.results[0].biography['alignment']
biographyInput3.textContent = "Alter Egos: " +data.results[0].biography['alter-egos']
biographyInput4.textContent = "First Appearance: " +data.results[0].biography['first-appearance']
biographyInput5.textContent = "Full Name: " +data.results[0].biography['full-name']
biographyInput6.textContent = "Place of Birth: " +data.results[0].biography['place-of-birth']
biographyInput7.textContent = "Publisher: " +data.results[0].biography['publisher']

connectionsInput1.textContent = "Groups and Affiliations: " +data.results[0].connections['group-affiliation']
connectionsInput2.textContent = "Relatives: " +data.results[0].connections['relatives']

workInput.textContent = "Occupation: " +data.results[0].work['occupation']
workInput2.textContent = "Base: " +data.results[0].work['base']  
  

    }) 
};



// document.ready to place functions we don't want to use until the page has loaded, commented out for now
$(document).ready(function() {
  
});

//creating function to store data from the event listener.
// var inputToSearch = function (event) {
//     //preventing the page from clearing form data
//     event.preventDefault();
//     //creating the variable to use from the search input
//     var userInput = searchInput.value.trim();
//     //if statement to create array to set the local storage...need to create the array if storage is empty
//     if (JSON.parse(localStorage.getItem("superhero"))===null) {
//         localStorageArray=[]; 
//     } else {
//         localStorageArray=JSON.parse(localStorage.getItem("superhero"));   
//     };
//     //pushing new elements to local storage array to then be set in local
//     localStorageArray.push(userInput);
//     //setting the localArray to storage
//     localStorage.setItem("superhero", JSON.stringify(localStorageArray));

// };

//autocomplete from superheros list
$(function() {    
    $( "#searchinput" ).autocomplete({
      source: availableTags
    });
  } );


//function to check for dups in an array
function checkDups(array) {
    return array.filter((item,
        index) => array.indexOf(item) === index);
}

getSuperheroApi('/search/ironman/');


//event listener for the super search bar
searchBar.addEventListener('submit', function(event){
  event.preventDefault();
  
  // userInput = searchInput.value.trim();
  getShortBoxedApi();

  var event = $(this).children('#searchinput').val()
  
  var requestUrl = superUrl;
  fetch('https://cors-anywhere-jung.herokuapp.com/'+requestUrl, {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow'
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //Not targetting array for searched superhero. Shows everything not as Object or Array(x)
  getSuperheroApi('/search/' + event)
})
});

function openDropdown() {
  document.getElementById("dropdownMenuButton").classList.toggle("show");
}

favBtn.addEventListener('click', function(){
  var userInput = searchInput.value.trim();
  console.log(userInput);
  if (JSON.parse(localStorage.getItem("favorite"))===null) {
    favArray=[];
  } else {
    favArray = JSON.parse(localStorage.getItem("favorite"));
  } if(userInput!="") {
    favArray.push(userInput);
  } 
  var filteredFavArray = checkDups(favArray);

  localStorage.setItem("favorite", JSON.stringify(filteredFavArray));

dropDownButton.addEventListener('click', openDropdown())
});






// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  
  if (!event.target.matches('#dropdownMenuButton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}