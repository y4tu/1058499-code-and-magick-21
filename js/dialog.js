'use strict';

(() => {
  const START_POSITION_X = `50%`;
  const START_POSITION_Y = `80px`;

  const colors = {
    LIGHT_BLUE: `rgb(101, 137, 164)`,
    PINK: `rgb(241, 43, 107)`,
    VIOLET: `rgb(146, 100, 161)`,
    LIGHT_GREEN: `rgb(56, 159, 117)`,
    SPECIAL_YELLOW: `rgb(215, 210, 55)`,
    BLACK: `rgb(0, 0, 0)`,
    RED: `rgb(255, 0, 0)`,
    BLUE: `rgb(0, 0, 255)`,
    YELLOW: `rgb(255, 255, 0)`,
    GREEN: `rgb(0, 128, 0)`,
    RED_FIREBALL: `rgb(238, 72, 48)`,
    BLUE_FIREBALL: `rgb(48, 168, 238)`,
    AQUAMARINE_FIREBALL: `rgb(92, 230, 192)`,
    MAGENTA_FIREBALL: `rgb(232, 72, 213)`,
    YELLOW_FIREBALL: `rgb(230, 232, 72)`
  };

  const colorsMap = {
    BLACK: `black`,
    RED: `red`,
    BLUE: `blue`,
    YELLOW: `yellow`,
    GREEN: `green`
  };

  const COAT_COLORS = [
    colors.LIGHT_BLUE,
    colors.PINK,
    colors.VIOLET,
    colors.LIGHT_GREEN,
    colors.SPECIAL_YELLOW,
    colors.BLACK
  ];

  const EYE_COLORS = [
    colorsMap.BLACK,
    colorsMap.RED,
    colorsMap.BLUE,
    colorsMap.YELLOW,
    colorsMap.GREEN
  ];

  const FIREBALL_COLORS = [
    colors.RED_FIREBALL,
    colors.BLUE_FIREBALL,
    colors.AQUAMARINE_FIREBALL,
    colors.MAGENTA_FIREBALL,
    colors.YELLOW_FIREBALL
  ];

  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);
  const setupPlayer = setup.querySelector(`.setup-player`);
  const setupWizardForm = setup.querySelector(`.setup-wizard-form`);
  const setupUserName = setup.querySelector(`.setup-user-name`);
  const setupFireball = setup.querySelector(`.setup-fireball`);
  const upload = document.querySelector(`.upload`);
  const wizardCoat = setup.querySelector(`.wizard-coat`);
  const wizardEyes = setup.querySelector(`.wizard-eyes`);
  const wizardFireball = setup.querySelector(`.setup-fireball-wrap`);
  const wizardCoatColorInput = setup.querySelector(`input[name="coat-color"]`);
  const wizardEyesColorInput = setup.querySelector(`input[name="eyes-color"]`);
  const wizardFireballColorInput = setup.querySelector(`input[name="fireball-color"]`);

  let coatColor = null;
  let eyesColor = null;
  let fireballColor = null;

  const getCoatColor = () => window.util.getRandomArrayElement(COAT_COLORS);

  const getEyesColor = () => window.util.getRandomArrayElement(EYE_COLORS);

  const getFireballColor = () => window.util.getHexColor(window.util.getRandomColor(FIREBALL_COLORS));

  const colorChange = (color, input, getAction, handle) => {
    color = getAction();

    if (color !== input) {
      handle();
    } else {
      (() => {
        color = getAction();
      })();
      handle();
    }

    return color;
  };

  const onCoatClick = () => {
    window.util.colorAccept(wizardCoat, wizardCoatColorInput, coatColor);
  };

  const onEyesClick = () => {
    window.util.colorAccept(wizardEyes, wizardEyesColorInput, eyesColor);
  };

  const onFireballClick = () => {
    window.util.colorAccept(wizardFireball, wizardFireballColorInput, fireballColor);
  };

  const onWizardColorChange = (evt) => {
    switch (evt.target) {
      case wizardCoat:
        coatColor = colorChange(coatColor, wizardCoatColorInput, getCoatColor, onCoatClick);
        break;

      case wizardEyes:
        eyesColor = colorChange(eyesColor, wizardEyesColorInput, getEyesColor, onEyesClick);
        break;

      case setupFireball:
        fireballColor = colorChange(fireballColor, wizardFireballColorInput, getFireballColor, onFireballClick);
        break;
    }
  };

  const onPopupEscPress = () => {
    if (document.activeElement !== setupUserName) {
      closePopup();
    }
  };

  const openPopup = () => {
    setup.classList.remove(`hidden`);

    window.util.isEscapeEventAdd(document, onPopupEscPress);
    window.util.clickEventAdd(setupPlayer, onWizardColorChange);
    window.util.clickEventAdd(setupClose, closePopup);
    window.util.isEnterEventAdd(setupClose, closePopup);
    window.util.submitEventAdd(setupWizardForm, closePopup);
  };

  const closePopup = () => {
    setup.style.top = START_POSITION_Y;
    setup.style.left = START_POSITION_X;
    setup.classList.add(`hidden`);

    window.util.isEscapeEventRemove(document, onPopupEscPress);
    window.util.clickEventRemove(setupPlayer, onWizardColorChange);
    window.util.clickEventRemove(setupClose, closePopup);
    window.util.isEnterEventRemove(setupClose, closePopup);
    window.util.submitEventRemove(setupWizardForm, closePopup);
  };

  window.util.clickEventAdd(setupOpen, openPopup);
  window.util.isEnterEventAdd(setupOpen, openPopup);
  window.gragAndDrop.moveElement(upload, setup);

  window.dialog = {
    setup,
    colors,
    setupOpen,
    getCoatColor,
    getEyesColor,
    openPopup,
  };
})();
