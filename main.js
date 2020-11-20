let displayDiv = document.getElementById("page-wrapper");
let inputSearch = document.getElementById("search-game");
let gameList = document.getElementById("game-list");
let sortedGamesList = [];
let gamesObj = [];
let sort = 0;
let pastSort = 1;


async function letsFetch()  {
    await fetch('ps.txt')
            .then(response => response.text())
            .then(data => {
        let gamesArray = data.split('\n')
        for (games of gamesArray) {
            let game = games.split(",")
            gamesObj.push({title: game[0], release: game[1], platform: game[2], purchased: game[3] === undefined? false:game[3]})
            sortedGamesList.push(games.split(","))
        }
        sortObj();
        console.log(gamesObj)
       while (pastSort >= 1) {
           sortArr();
       }
    })
}


const displayResults = () => {
        gameList.innerHTML = "";
        for(const game of sortedGamesList){
            gamesObj = {title:game[0], release: game[1], platform: game[2], purchased: game[3] === undefined? false:game[3]}
            let [gameTitle, yearOfRelease, platform, purchased] = game;
            if (gameTitle.toLowerCase().includes(inputSearch.value.toLowerCase())) { 
                let gameDiv = document.createElement("div");
                 if (purchased) {
                    gameDiv.classList.add("bought");
                 }
                gameDiv.classList.add("gameContainer");
                let displayGameName = document.createElement("p");
                let displayGameYear = document.createElement("p");
                let displayGameConsole = document.createElement("p");
                displayGameName.classList.add("game-name");
                displayGameYear.classList.add("game-year");
                displayGameConsole.classList.add("game-console");
                displayGameName.textContent = gameTitle;
                displayGameYear.textContent = yearOfRelease;
                displayGameConsole.textContent = platform;
                gameDiv.appendChild(displayGameName);
                gameDiv.appendChild(displayGameYear);
                gameDiv.appendChild(displayGameConsole);
                gameList.appendChild(gameDiv);
            }
        }
}



const sortObj = () => {
    cmp = function(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
}
    gamesObj.sort((a,b) => {
        return cmp(a.release,b.release) || cmp(a.title,b.title)
    })
}

const sortArr = () => {
    sortedGamesList.sort(function(a,b){
        if(a[0] < b[0] && a[1] == b[1]) {
            sort ++;
            if(a[3] === "bought" && !b[3]) {
                b[3] = a[3];
                a.pop();
            } else if (b[3] === "bought" && !a[3]) {
                a[3] = b[3];
                b.pop();
            }
            if(a[2] != b[2]) {
                let temp2 = a[2];
                a[2] = b[2]
                b[2] = temp2;
            }
            let temp = a[0]
             a[0] = b[0];
            b[0] = temp;
        }
        return a[1] - b[1];
    });
    pastSort = sort;
    sort = 0;
}

    inputSearch.addEventListener('search', displayResults);
