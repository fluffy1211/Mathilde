const page = document.querySelector('.page');
const searchbtn = document.querySelector('.search-btn');
const searchinput = document.querySelector('.search-input');
const audio = new Audio('./assets/cat-meow.mp3');
const persee = new Audio('./assets/persee-goat.ogg');
const cassio = new Audio('./assets/cassio-goat.ogg');

// $(function(){
//     $("#includedContent").load("test.html"); 
//   });


key = "live_ZbvoahPlQP8h4FWrU5YaIyDZ3NHVJDrWdOoucgP9Ri8NSl9tAJjZf3tAAKpLVr5Z"

searchbtn.addEventListener('click', () => {
    console.log(searchinput.value);
    page.innerHTML = ''; // Clear the content on the page

    if (searchinput.value.toLowerCase() === 'persée' || searchinput.value === 'Persée') {
        persee.play();
        const breedInfoElement = document.createElement('div');
        breedInfoElement.innerHTML = `
        <div class="cards animate__animated animate__fadeInUp">
                <h2 class="catname ">Persée le GOAT</h2>
                <p class="catdesc">Persée est le roi des chats. Son humain préféré se prénomme Gabriel. <br>Pour la petite anecode, il a sauté du 6eme étage mais rien de cassé !</p>
                <p class="dogfriendly">Dog Friendly: Pas trop je crois</p>
                <p class="affectionlevel">Affection Level: High</p>
                <img class="catimg" src="./assets/persee.jpg" alt="Persée Image">
        </div>
        `;
        page.appendChild(breedInfoElement);

    } else if (searchinput.value.toLowerCase() === 'cassio' || searchinput.value === 'Cassio') {
        cassio.play();
        const breedInfoElement = document.createElement('div');
        breedInfoElement.innerHTML = `
        <div class="cards">
            <h2 class="catname">Cassio la GOAT</h2>
            <p class="catdesc">Cassio adore les caresses sur les fesses. Ca tombe bien, Gabriel aime ça aussi !</p>
            <p class="dogfriendly">Dog Friendly: Yes</p>
            <p class="affectionlevel">Affection Level: Medium</p>
            <img class="catimg" src="./assets/cassio.jpg" alt="Cassio Image">
        </div>
        `;
        page.appendChild(breedInfoElement);

    } else {
        axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${searchinput.value}&api_key=${key}`)
            .then(response => response.data)
            .then(response => {
                audio.play();
                const breedInfo = response[0];
                const breedName = breedInfo.name;
                const breedDescription = breedInfo.description;
                const breedImageURL = breedInfo.image.url;
                const breedDogFriendly = breedInfo.dog_friendly;
                const breedAffectionLevel = breedInfo.affection_level;

                const breedInfoElement = document.createElement('div');
                breedInfoElement.innerHTML = `
                <div class="cards">
                    <h2 class="catname">${breedName}</h2>
                    <p class="catdesc">${breedDescription}</p>
                    <p class="dogfriendly">Dog Friendly: ${breedDogFriendly}</p>
                    <p class="affectionlevel">Affection Level: ${breedAffectionLevel}</p>
                    <img class="catimg" src="${breedImageURL}" alt="${breedName} Image">
                </div>
                `;
                page.appendChild(breedInfoElement);
            })
            .catch(error => {
                console.error(error);
            });
    }
});

searchinput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchbtn.click();
    }
});
