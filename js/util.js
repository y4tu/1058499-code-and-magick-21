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
        action();
      }
    }),
    submitEventAdd: (target, action) => (target.addEventListener(`submit`, action)),
    isEscapeEventAdd: (target, action) => target.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        action();
      }
    }),
  };
})();
