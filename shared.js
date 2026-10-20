// might use this some day idk
setInterval(() => {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00', '#800080'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomBlink = document.querySelector('.blink');
    if (randomBlink) {
        randomBlink.style.color = randomColor;
    }
}, 500);
