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
    catch (e) {
        console.log(e)
    }
}

const splitFile = (data) => {
    let gamesArray = data.split('\n')
    for (games of gamesArray) {
        let game = games.split(",")
        let [year, month] = game[1].split(" ");
        gamesObj.push({
            title: game[0],
            release: new Date(`${month} 01 ${year}`),
            platform: game[2],
            purchased: game[3] === undefined ? false : game[3]
        })
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
            let displayGameConsole = document.createElement("img");
            displayGameName.classList.add("game-name");
            displayGameYear.classList.add("game-year");
            displayGameConsole.classList.add("game-console");
            displayGameName.textContent = game.title;
            displayGameYear.textContent = `${game.release.getMonth() + 1}`.padStart(2, "0") + `/${game.release.getFullYear()}`;
            displayGameConsole.src = `${game.platform}.png`;
            gameDiv.appendChild(displayGameName);
            gameDiv.appendChild(displayGameYear);
            gameDiv.appendChild(displayGameConsole);
            gameList.appendChild(gameDiv);
        }
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