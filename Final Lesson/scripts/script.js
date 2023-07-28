//elements
playbuttom = document.getElementById("playbuttom")
home = document.getElementById("home")
menu = document.getElementById("menu")
image = document.getElementById("image")
gamebuttom = document.getElementById("gamebuttom")
keyboard = document.getElementById("keyboard")
type = document.getElementById("type")
typing = document.getElementById("typing")
count_down = document.getElementById("count-down")
start_count = document.getElementById("start-count")
exit = document.getElementById("exit")
text = document.getElementById("text")
input = document.getElementById("input")
score = document.getElementById("score")
high_score = document.getElementById("high-score")
time = document.getElementById("time")
game_over = document.getElementById("game-over")
try_again = document.getElementById("try-again")
your_score = document.getElementById("your-score")
sound = document.getElementById("sound")
stop_playing = document.getElementById("stop-playing")
//
//variables
let scoreNumber = 0
let timecount = 10
//
//events
playbuttom.addEventListener("click" , () => {
    home.style.display = "none";
    menu.style.display = "block";
   
   
})


gamebuttom.addEventListener("click" , () => {
    menu.style.display = "none";
    image.style.display = "none";
    keyboard.style.display = "block";
    Keyboard();
})


type.addEventListener("click" , () => {
   
    count_down.style.display = "block"
    menu.style.display = "none";
    image.style.display = "none";
    count  = 3;
    start_count.innerHTML = count
    id = setInterval(() => {
    count--;
    start_count.innerHTML = count
    if (count <= -1) {
    clearInterval(id)
    start_count.style.display="none"
        count_down.style.display = "none"
    typing.style.display = "block"
    TypeGame()
    }
    }, 1000);




})


exit.addEventListener("click" , () => {
    location.reload()
    keyboard.style.display = "none";
   
})
try_again.addEventListener("click" , () => {
    location.reload()
    game_over.style.display = "none";
})
stop_playing.addEventListener("click" , () => {
    location.reload()
    typing.style.display = "none"
})
 //
//functions
function Keyboard() {
    let oneLetter = randomItem(letterArr)
    let oneElement = document.getElementById(oneLetter)
   
    console.log(oneElement);
    oneElement.classList.add("selected");
    document.addEventListener("keyup" , (e) => {
        let wrong = document.getElementById(e.code)
        console.log(e);
        if (e.code === oneElement.id){
            oneElement.classList.remove("selected");
            oneLetter = randomItem(letterArr);
            oneElement = document.getElementById(oneLetter);
            oneElement.classList.add("selected");
           sound.play()
        }
        else wrong.classList.add("hit");
        setTimeout(() =>{wrong.classList.remove("hit")},300);
    });
};
function randomItem(letterArr) {
   return letterArr[Math.floor(Math.random() * letterArr.length)];
};


function TypeGame() {
    let highscore;
    if(!localStorage.scoreNumber){
        localStorage.scoreNumber = 0;
    }
    highscore = localStorage.scoreNumber;
    high_score.innerHTML = highscore;

    scoreNumber = 0;
    let oneWord = randomWord(wordArr);
    text.innerHTML = oneWord;
    score.innerHTML = scoreNumber;
    time.innerHTML = timecount;

    id = setInterval(() => {
        timecount--;
        time.innerHTML = timecount;
        if (timecount <= -1) {
            clearInterval(id);
            game_over.style.display = "block";
            typing.style.display = "none";
            your_score.innerHTML = scoreNumber;
        };
    },1000);
    input.addEventListener("keyup", (ev) => {
  
        if(ev.code == "Enter" && input.value != ""){        
            if (input.value == oneWord) {
            input.value = "";
            scoreNumber += 1;
            oneWord = randomWord(wordArr);
            text.innerHTML = oneWord;
            score.innerHTML = scoreNumber;
            if (timecount < 10) timecount += 3;
            if(scoreNumber >= highscore){
                highscore = scoreNumber;
                localStorage.scoreNumber = highscore;
                high_score.innerHTML = highscore;
            }
            }
            else{
            input.value = "";
            oneWord = randomWord(wordArr);
            text.innerHTML = oneWord;
            score.innerHTML = scoreNumber;
            timecount -= 3;
            };
       };
    });
};


function randomWord(wordArr) {
    return wordArr[Math.floor(Math.random() * wordArr.length)]
}

