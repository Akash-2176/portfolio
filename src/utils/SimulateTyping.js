// src/utils/simulateTyping.js
const SimulateTyping = async (text, onUpdate = null, delay = 20) => {
  let current = '';

  for (let i = 0; i < text.length; i++) {
    current += text[i];
    if (onUpdate) {
      onUpdate(current);
    }
    await new Promise((res) => setTimeout(res, delay));
  }

  return current;
};

export default SimulateTyping;
