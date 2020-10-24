'use strict';

(() => {
  const getColorByName = (name, color) => {
    if (name === `Вы`) {
      return color;
    } else {
      return `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;
    }
  };

  const getRandomArrayElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const getHexColor = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? `#` +
      (`0` + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      (`0` + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      (`0` + parseInt(rgb[3], 10).toString(16)).slice(-2) : ``;
  };

  const getRandomColor = (colors) => window.util.getRandomArrayElement(colors);

  const getMaxElement = (array) => {
    let maxElement = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  };

  const clickEventAdd = (target, action) => target.addEventListener(`click`, action);

  const isEnterEventAdd = (target, action) => target.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      action();
    }
  });

  const submitEventAdd = (target, action) => target.addEventListener(`submit`, action);

  const isEscapeEventAdd = (target, action) => target.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  });

  const clickEventRemove = (target, action) => target.removeEventListener(`click`, action);

  const isEnterEventRemove = (target, action) => target.removeEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      action();
    }
  });

  const submitEventRemove = (target, action) => target.removeEventListener(`submit`, action);

  const isEscapeEventRemove = (target, action) => target.removeEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      action();
    }
  });

  const colorAccept = (target, input, targetColor) => {
    if (target.tagName.toLowerCase() === `div`) {
      target.style.backgroundColor = targetColor;
    } else {
      target.style.fill = targetColor;
    }
    input.value = targetColor;
  };

  window.util = {
    getColorByName,
    getRandomArrayElement,
    getHexColor,
    getRandomColor,
    getMaxElement,
    clickEventAdd,
    isEnterEventAdd,
    submitEventAdd,
    isEscapeEventAdd,
    clickEventRemove,
    isEnterEventRemove,
    submitEventRemove,
    isEscapeEventRemove,
    colorAccept,
  };
})();
