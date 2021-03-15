/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kittenName = form.kittenName.value
  let newKitten = {
    id: generateId(),
    name: kittenName,
    picture: `https://robohash.org/${kittenName}?set=set4`,
    affection: 10,
  };
  setKittenMood(newKitten)
  kittens.push(newKitten);
  saveKittens()
  getStarted()
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  let kittenString = JSON.stringify(kittens);
  localStorage.setItem("kittens", kittenString);
  drawKittens();
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenString = localStorage.getItem("kittens");
  if (kittenString !== null) {
    kittens = JSON.parse(kittenString);
  }
  if (kittens.length !== 0) {
    getStarted()
  };

  drawKittens();

}



function drawKittens() {
  let kittenElement = document.getElementById("kittens");
  kittenElement.innerHTML = '';
  for (var i = 0; i < kittens.length; i++) {
    let singleKitten = kittens[i];

    let newDiv = document.createElement('div');
    kittenElement.append(newDiv);
    let info = document.createElement('p');
    info.append('Name:' + singleKitten.name + ' - Mood:' + singleKitten.mood);
    newDiv.classList.add("kitten");
    newDiv.classList.add(singleKitten.mood.toLowerCase())



    let picture = new Image(175, 175);
    picture.src = singleKitten.picture;
    newDiv.append(info, picture);


    let petButton = document.createElement('button');
    newDiv.append(petButton);
    petButton.onclick = () => pet(singleKitten.id);
    petButton.append('PET');

    let catnipButton = document.createElement('button');
    newDiv.append(catnipButton);
    catnipButton.onclick = () => {
      return catnip(singleKitten.id);
    };
    catnipButton.append('CATNIP');
    
    // sorry, i know this button is in unaesthetically pleasing position
    let removeButton = document.createElement('button');
    kittenElement.append(removeButton);
    removeButton.onclick = () => removeKitten(singleKitten);
    removeButton.append('Good Bye');
  }
}

/**
 * 
 * @param {Kitten} oneKitten 
 */
function removeKitten(oneKitten) {
  let kittenIndex = kittens.indexOf(oneKitten)
  kittens.splice(kittenIndex, 1)

  saveKittens();
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let foundKitten = findKittenById(id);
  let shouldIncreaseAffection = Math.floor(Math.random() * 10) >= 7;
  if (shouldIncreaseAffection) {
    foundKitten.affection++;
  } else {
    foundKitten.affection--;
  }
  setKittenMood(foundKitten);
  saveKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let foundKitten = findKittenById(id);
  foundKitten.affection = 5;
  setKittenMood(foundKitten);
  saveKittens();
}



/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let kittenAffection = kitten.affection;
  if (kittenAffection <= 0) {
    kitten.mood = 'Gone';
  } else if (kittenAffection <= 3) {
    kitten.mood = 'Angry';
  } else if (kittenAffection <= 5) {
    kitten.mood = 'Tolerant';
  } else { kitten.mood = 'Happy'; }
}






function getStarted() {
  let start = document.getElementById("welcome")
  if (start !== null) {
    start.remove();
  };
  drawKittens();


};



/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, picture: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens()




