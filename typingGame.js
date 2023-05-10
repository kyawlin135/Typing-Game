const pTag = document.getElementsByTagName('p')[0],
inputTag = document.querySelector('.typing'),
timeTag = document.querySelector('.time'),
mistakeTag = document.querySelector('.mistake'),
cpmTag = document.querySelector('.cpm'),
wpmTag = document.querySelector('.wpm'),
tryAgainBtn = document.getElementsByTagName('button')[0];

const radomParagraph = () => {
    const currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)]
    pTag.textContent = currentParagraph;
    typingChara = pTag.textContent.split('');
    pTag.innerHTML = '';
    typingChara.forEach(ele => {
    pTag.innerHTML += `<span>${ele}</span>`;
})
}


radomParagraph();

// window.addEventListener('load', () => inputTag.focus())

document.addEventListener('click', () => inputTag.focus())

let mistake = 0;
let counter = 0;

const maxtime = 240;
let time = 240;
let timeTalker = true;

const allSpan = document.getElementsByTagName('span');

const isTyping = () => {
    if(time === 0){
        return;
    }else{
        if(counter === allSpan.length){
            clearInterval(timeInterval);
            return;
        }else{
            let inputValue = inputTag.value.split('');
            if(allSpan.length-1 !== counter){
                let nextSpan = allSpan[counter+1];
                nextSpan.classList.add('active');
            }
            let currentSpan = allSpan[counter];

            if(typingChara[counter] === inputValue[counter]){
                currentSpan.classList.add('correct');
                currentSpan.classList.remove('active');
                counter++;
            }else{
                currentSpan.classList.add('incorrect');
                currentSpan.classList.remove('active');
                mistake++;
                mistakeTag.textContent = `Mistakes: ${mistake}`
                counter++;
            }

            let cpm = counter - mistake;
            cpm = cpm < 0 ? 0 : cpm;
            cpmTag.textContent = `Cpm: ${cpm}`;
            let wpm = Math.round(((counter - mistake)/5) / (maxtime - time) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;
            wpmTag.textContent = `Wpm: ${wpm}`


            if(timeTalker){
                    timeInterval = setInterval(() => {
                    time--;
                    timeTag.textContent = `Time Left: ${time}`;
                    if(time === 0){
                        clearInterval(timeInterval);
                    }
                }, 1000)
                timeTalker = false;
            }
        }
        
    }

}

inputTag.addEventListener('input', isTyping)

tryAgainBtn.addEventListener('click', () => {
    radomParagraph();
    time = 240;
    if(timeTalker === false){
        clearInterval(timeInterval);
    }
    timeTalker = true;
    timeTag.textContent = `Time Left: 240`;
    wpmTag.textContent = `Wpm: 0`;
    wpm = 0;
    cpmTag.textContent = `Cpm: 0`
    cpm = 0;
    counter = 0;
    mistake = 0;
    mistakeTag.textContent = `Mistakes: 0`;
    inputTag.value = '';
})
