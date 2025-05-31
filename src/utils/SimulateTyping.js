// src/utils/simulateTyping.js
const SimulateTyping = (text, delay = 20) =>
  new Promise((resolve) => {
    let result = '';
    let i = 0;

    const interval = setInterval(() => {
      result += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve(result);
      }
    }, delay);
  });

export default SimulateTyping;
