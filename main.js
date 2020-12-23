let inputSearch = document.getElementById("search-game");
let gameList = document.getElementById("game-list");
let mainBtnDiv = document.querySelector(".main-btns");
let gamesObj = [];
let failedToFetch = false;
let limit = 12;

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

const displayNumOfGames = () => {
    let pc = 0, ps1 = 0, ps2 = 0, ps3 = 0, ps4 = 0, ps5 = 0, Ninswitch = 0, maxNumOfGames;
    maxNumOfGames = gamesObj.length + 1;
    Object.values(gamesObj).forEach(game => {
        switch (game.platform) {
            case "pc":
                pc++;
                break;
            case "ps1":
                ps1++;
                break;
            case "ps2":
                ps2++
                break;
            case "ps3":
                ps3++;
                break;
            case "ps4":
                ps4++;
                break;
            case "ps5":
                ps5++
                break;
            case "switch":
                Ninswitch++;
                break;
        }
    })
    let div = document.createElement("div");
    div.classList.add("grid");
    let divContent = `<div class="card allPlats"><span><strong>Games:</strong> ${maxNumOfGames}</span></div>
                      <div class="card plat pc"><span><strong>PC:</strong> ${pc}</span></div>
                      <div class="card plat ps1"><span><strong>PS1:</strong> ${ps1}</span></div>
                      <div class="card plat ps2"><span><strong>PS2:</strong> ${ps2}</span></div>
                      <div class="card plat ps3"><span><strong>PS3:</strong> ${ps3}</span></div>
                      <div class="card plat ps4"><span><strong>PS4:</strong> ${ps4}</span></div>
                      <div class="card plat ps5"><span><strong>PS5:</strong> ${ps5}</span></div>
                      <div class="card plat switch"><span><strong>Switch:</strong> ${Ninswitch}</span></div>
                    `;
    div.innerHTML = divContent
    mainBtnDiv.appendChild(div);


}

const results = (game) => {
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
    displayGameConsole.src = `resources/images/${game.platform}.webp`;
    gameDiv.appendChild(displayGameName);
    gameDiv.appendChild(displayGameYear);
    gameDiv.appendChild(displayGameConsole);
    gameList.appendChild(gameDiv);
}

const displayResults = () => {
    gameList.innerHTML = "";
    for (const game of gamesObj) {
        if (game.title.toLowerCase().includes(inputSearch.value.toLowerCase()) && gameList.childNodes.length < limit) {
            results(game);
        }
    }
}

window.onwheel = function (ev) {
    if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) && gameList.childNodes.length > 11 && limit < gamesObj.length) {
        let newLength = Array.from(gamesObj.slice(limit, (limit + 12)))
        limit = limit + 12;
        for (const game of newLength) {
            results(game);
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
    .then(displayNumOfGames)
    .catch(e => console.log(`Error: ${e}`));

inputSearch.addEventListener('keyup', displayResults);