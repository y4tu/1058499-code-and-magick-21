'use strict';

(() => {
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const GAP = 10;
  const FONT_GAP = 15;
  const TEXT_HEIGHT = 20;
  const BAR_WIDTH = 40;
  const BAR_HEIGHT = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP;
  const OPACITY_BLACK = `rgba(0, 0, 0, 0.3)`;
  const BLACK = `rgba(0, 0, 0, 1)`;
  const WHITE = `rgba(255, 255, 255, 1)`;
  const RED = `rgba(255, 0, 0, 1)`;
  const HOORAY = `Ура Вы победили!`;
  const RESULTS = `Список результатов:`;

  const renderCloud = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  window.renderStatistics = function (ctx, players, times) {
    const maxTime = window.util.getMaxElement(times);
    const textPosX = CLOUD_X + GAP + FONT_GAP;
    const textPosY = CLOUD_Y + GAP + TEXT_HEIGHT;

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, OPACITY_BLACK);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE);
    ctx.fillStyle = BLACK;
    ctx.fillText(HOORAY, textPosX, textPosY);
    ctx.fillText(RESULTS, textPosX, textPosY + TEXT_HEIGHT);

    for (let i = 0; i < players.length; i++) {
      const currentPosX = CLOUD_X + GAP + FONT_GAP + ((GAP + FONT_GAP) * 2 + BAR_WIDTH) * i;
      const currentPosY = CLOUD_Y + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) + (GAP + TEXT_HEIGHT + GAP) * 2;

      ctx.fillText(players[i], currentPosX, CLOUD_Y + GAP + BAR_HEIGHT + TEXT_HEIGHT);
      ctx.fillText(Math.round(times[i]).toString(), currentPosX, currentPosY);
      ctx.fillStyle = window.util.getColorByName(players[i], RED);
      ctx.fillRect(
          currentPosX,
          currentPosY + GAP,
          BAR_WIDTH,
          (BAR_HEIGHT * times[i]) / maxTime - (GAP + TEXT_HEIGHT + GAP) * 2
      );
      ctx.fillStyle = BLACK;
    }
  };
})();
