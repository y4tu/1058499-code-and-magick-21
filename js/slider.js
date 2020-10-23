'use strict';

(() => {
  window.slider = {
    moveElement: (handleElement, drivenElement) => {
      handleElement.addEventListener(`mousedown`, (evt) => {
        evt.preventDefault();

        let startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        const dragged = false;

        const onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          let shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          drivenElement.style.top = (drivenElement.offsetTop - shift.y) + `px`;
          drivenElement.style.left = (drivenElement.offsetLeft - shift.x) + `px`;
        };

        const onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);

          if (dragged === true) {
            const onClickPreventDefault = (clickEvt) => {
              clickEvt.preventDefault();
              handleElement.removeEventListener(`click`, onClickPreventDefault);
            };
            handleElement.addEventListener(`click`, onClickPreventDefault);
          }
        };

        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);
      });
    },
  };
})();
