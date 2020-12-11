let displayDiv = document.getElementById("page-wrapper");
let inputSearch = document.getElementById("search-game");
let gameList = document.getElementById("game-list");
let gamesObj = [];
let failedToFetch = false;

const getGamesFile = async () => {
    try {
        let response = await fetch('https://raw.githubusercontent.com/rafaelg1402/my-games-list/main/ps.txt') 
    let data = await response.text();
    return data;
    }
    catch (e){
        console.log(e)
    }
}

const splitFile = (data)  => {
                let gamesArray = data.split('\n')
                for (games of gamesArray) {
                    let game = games.split(",")
                    let [year, month] = game[1].split(" ");
                    gamesObj.push({ title: game[0], 
                                    release: new Date(`${month} 01 ${year}`), 
                                    platform: game[2], 
                                    purchased: game[3] === undefined ? false : game[3] })
                sortObj();
            }
        }

const displayResults = () => {
    gameList.innerHTML = "";
    for (const game of gamesObj) {
        if (game.title.toLowerCase().includes(inputSearch.value.toLowerCase())) {
            let gameDiv = document.createElement("div");
            if (game.purchased) {
                gameDiv.classList.add("bought");
            }
            gameDiv.classList.add("gameContainer");
            let displayGameName = document.createElement("p");
            let displayGameYear = document.createElement("p");
            let displayGameConsole = document.createElement("p");
            checkPlatform(game, gameDiv);
            displayGameName.classList.add("game-name");
            displayGameYear.classList.add("game-year");
            displayGameConsole.classList.add("game-console");
            displayGameName.textContent = game.title;
            displayGameYear.textContent = `${game.release.getMonth()+1}`.padStart(2, "0") + `/${game.release.getFullYear()}`;
            displayGameConsole.textContent = game.platform;
            gameDiv.appendChild(displayGameName);
            gameDiv.appendChild(displayGameYear);
            gameDiv.appendChild(displayGameConsole);
            gameList.appendChild(gameDiv);
        }
    }
}

function checkPlatform(game, gameDiv) {
    if (game.platform === 'switch') {
        gameDiv.style.backgroundImage = 'linear-gradient(to right, #27A8D8, #DF4E45)';
        gameDiv.style.color = '#252429'
    } else if (game.platform === 'ps1') {
        gameDiv.style.backgroundImage = 'linear-gradient(to right, #AAA6A5, #AFC6E4)';
        gameDiv.style.color = '#3E3C3E'
    } else if (game.platform === 'ps2') {
        gameDiv.style.backgroundImage = 'linear-gradient(to right, #292E32, #254C87)';
    } else if (game.platform === 'ps3') {
        gameDiv.style.backgroundImage = 'linear-gradient(to right, #0E0E10, #3F3F3F)';
    } else if (game.platform === 'ps4') {
        gameDiv.style.backgroundImage = 'linear-gradient(to right, #0B0D0C, #232228)';
    } else if (game.platform === 'ps5') {
        gameDiv.style.backgroundImage = 'linear-gradient(to right, #DBDFE8, #7B81F4)';
        gameDiv.style.color = '#030A12'
    } else if (game.platform === 'pc') {
        gameDiv.style.backgroundImage = 'linear-gradient(to right, #171A21, #173E59)';
    }
}

const sortObj = () => {
    cmp = function (a, b) {
        if (a > b) return +1;
        if (a < b) return -1;
        return 0;
    }
    gamesObj.sort((a, b) => {
        return cmp(a.release, b.release) || cmp(a.title, b.title)
    })
}

getGamesFile()
    .then(splitFile)
    .catch(e => console.log(`Error: ${e}`));

inputSearch.addEventListener('keyup', displayResults);