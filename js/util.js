'use strict';

(() => {
  window.util = {
    getColorByName: (name, color) => {
      if (name === `Вы`) {
        return color;
      } else {
        return `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;
      }
    },
    getRandomArrayElement: (array) => {
      return array[Math.floor(Math.random() * array.length)];
    },
    getHexColor: (rgb) => {
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

      return (rgb && rgb.length === 4) ? `#` +
        (`0` + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        (`0` + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        (`0` + parseInt(rgb[3], 10).toString(16)).slice(-2) : ``;
    },
    getRandomColor: (colors) => window.util.getRandomArrayElement(colors),
    getMaxElement: (array) => {
      let maxElement = array[0];
      for (let i = 1; i < array.length; i++) {
        if (array[i] > maxElement) {
          maxElement = array[i];
        }
      }
      return maxElement;
    },
    clickEventAdd: (target, action) => (target.addEventListener(`click`, action)),
    isEnterEventAdd: (target, action) => target.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        action();
      }
    }),
    submitEventAdd: (target, action) => (target.addEventListener(`submit`, action)),
    isEscapeEventAdd: (target, action) => target.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        action();
      }
    }),
    clickEventRemove: (target, action) => (target.removeEventListener(`click`, action)),
    isEnterEventRemove: (target, action) => target.removeEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        action();
      }
    }),
    submitEventRemove: (target, action) => (target.removeEventListener(`submit`, action)),
    isEscapeEventRemove: (target, action) => target.removeEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        action();
      }
    }),
    colorChange: (target, input, targetColor) => {
      if (target.tagName.toLowerCase() === `div`) {
        target.style = `background-color: ${targetColor}`;
      } else {
        target.style = `fill: ${targetColor}`;
      }
      input.value = targetColor;
    }
  };
})();
