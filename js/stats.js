'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 15;
const TEXT_HEIGHT = 20;
const BAR_WIDTH = 40;
const BAR_HEIGHT = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.3)`
  );

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;

  const maxTime = getMaxElement(times);
  function color(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (let i = 0; i < players.length; i++) {
    ctx.fillText(
        `Ура Вы победили!`,
        CLOUD_X + GAP + FONT_GAP,
        CLOUD_Y + GAP + TEXT_HEIGHT
    );

    ctx.fillText(
        `Список результатов:`,
        CLOUD_X + GAP + FONT_GAP,
        CLOUD_Y + GAP + TEXT_HEIGHT + TEXT_HEIGHT
    );

    ctx.fillText(
        players[i],
        CLOUD_X + GAP + FONT_GAP + ((GAP + FONT_GAP) * 2 + BAR_WIDTH) * i,
        CLOUD_Y + GAP + BAR_HEIGHT + TEXT_HEIGHT
    );

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(240, 50%, ${color(0, 100)}%)`;
    }

    ctx.fillRect(
        CLOUD_X + GAP + FONT_GAP + ((GAP + FONT_GAP) * 2 + BAR_WIDTH) * i,
        CLOUD_Y + GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) + (GAP + TEXT_HEIGHT + GAP) * 2,
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime - (GAP + TEXT_HEIGHT + GAP) * 2
    );

    ctx.fillStyle = `black`;

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + GAP + FONT_GAP + ((GAP + FONT_GAP) * 2 + BAR_WIDTH) * i,
        CLOUD_Y + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) + (GAP + TEXT_HEIGHT + GAP) * 2
    );
  }
};
