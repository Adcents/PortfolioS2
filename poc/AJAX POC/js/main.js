let pageCounter = 1;
let clickCounter = 1;
let animalContainer = document.getElementById("animal-info");
let btn = document.getElementById("btn");

btn.addEventListener("click", function(){
  let ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', '../ajax poc/jayson' + pageCounter + '.json');
  ourRequest.onload = function() {
    let ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
  pageCounter++;
  if (pageCounter > 2) {
    btn.classList.add("hide-me");
  }
});


function renderHTML(data) {

  let htmlString = "" //lege variabele htmlstring, die ga je vullen hieronder. De data wordt er met een forloopje ingezet.

  for (i = 0; i < data.length; i++) {
    htmlString += "<tr><td>" + data[i].name + "</td><td>" + data[i].geslacht + "</td><td>" + data[i].leeftijd + "</td><td>";

    for (ii = 0; ii < data[i].sport.likes.length; ii++) { //loopt door dit loopje heen totdat hij alle waardes uit sporten gehaald heeft
      if (ii == 0) {
        htmlString += data[i].sport.likes[ii]; //als er maar 1 object in staat schrijft hij hem meteen weg
      }
      else {
        htmlString += " and " + data[i].sport.likes[ii]; //als er meerdere waardes zijn zet hij er and + de data neer.
      }
    }
  }
     htmlString += "</td></tr></table>"


  animalContainer.insertAdjacentHTML('beforeend', htmlString);
}


// NOTES


// var myCat = {
//   "name": "Meowsalot",
//   "species": "cat",
//   "favFood": "tuna"
// }
//
// let myFavColors = ["blue", "green", "purple"];
//
// let thePets = [
//   {
//     "name": "Meowsalot",
//     "species": "cat",
//     "favFood": "tuna"
//   },
//   {
//     "name": "Barky",
//     "species": "dog",
//     "favFood": "carrots"
//   }
// ]
//
// thePets[1].favFood
