let displayDiv = document.getElementById("page-wrapper");
let inputSearch = document.getElementById("search-game");
let gameList = document.getElementById("game-list");
let sortedArr = [];
let gamesArray;
let sort = 0;
let pastSort = 1;


const letsFetch = () => {
    fetch('ps.txt').then(x => x.text()).then(games => {
        gamesArray = games.split('\n')
        gamesArray.forEach((element) => {
            sortedArr.push(element.split(","))
        })
       while (pastSort > 0) {
           sortArr();
       }
       sortedArr.pop();
    })
}

const displayResults = () => {
        gameList.innerHTML = "";
        sortedArr.forEach((element) => {
            if (element[0].toLowerCase().includes(inputSearch.value.toLowerCase())) {
                let gameDiv = document.createElement("div");
                gameDiv.classList.add("gameContainer");
                let gameName = document.createElement("p");
                let gameYear = document.createElement("p");
                let gameConsole = document.createElement("p");
                gameName.classList.add("game-name");
                gameYear.classList.add("game-year");
                gameConsole.classList.add("game-console");
                gameName.textContent = element[0];
                gameYear.textContent = element[1];
                gameConsole.textContent = element[2];
                gameDiv.appendChild(gameName);
                gameDiv.appendChild(gameYear);
                gameDiv.appendChild(gameConsole);
                gameList.appendChild(gameDiv);
            }
        })
}

const sortArr = () => {
    sortedArr.sort(function(a,b){
        if(a[0] < b[0] && a[1] == b[1]) {
            sort ++;
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

window.addEventListener("keydown", (e) => {
    if(e.code === "Enter") {
            displayResults();
        }
    });

    inputSearch.addEventListener('search', displayResults);
