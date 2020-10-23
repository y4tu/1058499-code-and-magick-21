'use strict';

(() => {
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

  const FIREBALL_COLORS = [
    colors.RED_FIREBALL,
    colors.BLUE_FIREBALL,
    colors.AQUAMARINE_FIREBALL,
    colors.MAGENTA_FIREBALL,
    colors.YELLOW_FIREBALL
  ];

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

  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);
  const setupPlayer = setup.querySelector(`.setup-player`);
  const setupWizardForm = setup.querySelector(`.setup-wizard-form`);
  const setupUserName = setup.querySelector(`.setup-user-name`);
  const upload = document.querySelector(`.upload`);
  const wizardCoat = setup.querySelector(`.wizard-coat`);
  const wizardEyes = setup.querySelector(`.wizard-eyes`);
  const wizardFireballWrap = setup.querySelector(`.setup-fireball-wrap`);
  const wizardFireball = setup.querySelector(`.setup-fireball`);
  const wizardCoatColorInput = setup.querySelector(`input[name="coat-color"]`);
  const wizardEyesColorInput = setup.querySelector(`input[name="eyes-color"]`);
  const wizardFireballColorInput = setup.querySelector(`input[name="fireball-color"]`);

  const getFireballColor = () => window.util.getRandomArrayElement(FIREBALL_COLORS);

  const onPopupEscPress = (evt) => {
    if (document.activeElement !== setupUserName && evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onCoatColorChange = () => {
    let currentCoatColor = window.setup.getCoatColor();

    wizardCoat.style = `fill: ${currentCoatColor}`;
    wizardCoatColorInput.value = currentCoatColor;
  };

  const onEyesColorChange = () => {
    let currentEyesColor = window.setup.getEyesColor();

    wizardEyes.style = `fill: ${currentEyesColor}`;
    wizardEyesColorInput.value = currentEyesColor;
  };

  const onFireballColorChange = () => {

    let currentFireballColor = window.util.getHexColor(getFireballColor());

    wizardFireballWrap.style = `background-color: ${currentFireballColor}`;
    wizardFireballColorInput.value = currentFireballColor;
  };

  const openPopup = () => {
    setup.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);

    setupPlayer.addEventListener(`click`, (evt) => {
      if (evt.target === wizardCoat) {
        onCoatColorChange();
      } else if (evt.target === wizardEyes) {
        onEyesColorChange();
      } else if (evt.target === wizardFireball) {
        onFireballColorChange();
      }
    });
  };

  const closePopup = () => {
    setup.style.top = `80px`;
    setup.style.left = `50%`;

    setup.classList.add(`hidden`);

    window.util.isEscapeEventAdd(document, onPopupEscPress);

    setupPlayer.removeEventListener(`click`, (evt) => {
      if (evt.target === wizardCoat) {
        onCoatColorChange();
      } else if (evt.target === wizardEyes) {
        onEyesColorChange();
      } else if (evt.target === wizardFireball) {
        onFireballColorChange();
      }
    });
  };

  window.dialog = {
    colors,
    setupOpen,
    getCoatColor: () => window.util.getRandomArrayElement(COAT_COLORS),
    getEyesColor: () => window.util.getRandomArrayElement(EYE_COLORS),
    openPopup: openPopup(),
  };

  window.util.clickEventAdd(setupOpen, openPopup);
  window.util.isEnterEventAdd(setupOpen, openPopup);
  window.util.clickEventAdd(setupClose, closePopup);
  window.util.isEnterEventAdd(setupClose, closePopup);
  window.util.submitEventAdd(setupWizardForm, closePopup);
  window.slider.moveElement(upload, setup);
})();
