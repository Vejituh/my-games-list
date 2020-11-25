let displayDiv = document.getElementById("page-wrapper");
let inputSearch = document.getElementById("search-game");
let gameList = document.getElementById("game-list");
let gamesObj = [];


async function letsFetch() {
    const response = await fetch('ps.txt')
        if (response.ok) {
            const data = await response.text()
                let gamesArray = data.split('\n')
                for (games of gamesArray) {
                    let game = games.split(",")
                    gamesObj.push({ title: game[0], 
                                    release: new Date(game[1]), 
                                    platform: game[2], 
                                    purchased: game[3] === undefined ? false : game[3] })
                }
                sortObj();
            }
        }

async function getGameArt(game) {
    const res = await fetch (`https://api.rawg.io/api/games?key=de9084d514ad43f4ac46fa3101f4fafd&search=${game}`);
        if (res.ok) {
            const data = await res.json();
            return data.results[0].background_image;
        }
        else {
            return res.status;
        }
}

async function displayResults() {
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
            let img = document.createElement("img")
            if (screen.width > 768) {
                try {
                    if(await getGameArt(game.title)) {
                        img.src =  await getGameArt(game.title);
                        }
                }
                catch (err) {
                        console.log(err);
                        checkPlatform(game, gameDiv);
                }
            } else {
                checkPlatform(game, gameDiv);
            }
            displayGameName.classList.add("game-name");
            displayGameYear.classList.add("game-year");
            displayGameConsole.classList.add("game-console");
            displayGameName.textContent = game.title;
            displayGameYear.textContent = `${game.release.getMonth()+1}`.padStart(2, "0") + `/${game.release.getFullYear()}`;
            displayGameConsole.textContent = game.platform;
            gameDiv.appendChild(displayGameName);
            gameDiv.appendChild(displayGameYear);
            gameDiv.appendChild(displayGameConsole);
            gameDiv.appendChild(img)
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

inputSearch.addEventListener('search', displayResults);