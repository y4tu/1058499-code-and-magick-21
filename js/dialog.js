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
  const coatColor = window.util.getRandomColor(COAT_COLORS);
  const eyesColor = window.util.getRandomColor(EYE_COLORS);
  const fireballColor = window.util.getHexColor(window.util.getRandomColor(FIREBALL_COLORS));

  const setWizardColorChangeIf = (evt) => {
    if (evt.target === wizardCoat) {
      onCoatClick();
    } else if (evt.target === wizardEyes) {
      onEyesClick();
    } else if (evt.target === setupFireball) {
      onFireballClick();
    }
  };

  const onCoatClick = () => {
    window.util.colorChange(wizardCoat, wizardCoatColorInput, coatColor);
  };

  const onEyesClick = () => {
    window.util.colorChange(wizardEyes, wizardEyesColorInput, eyesColor);
  };

  const onFireballClick = () => {
    window.util.colorChange(wizardFireball, wizardFireballColorInput, fireballColor);
  };

  const onPopupEscPress = () => {
    if (document.activeElement !== setupUserName) {
      closePopup();
    }
  };

  const openPopup = () => {
    setup.classList.remove(`hidden`);

    window.util.isEscapeEventAdd(document, onPopupEscPress);
    window.util.clickEventAdd(setupPlayer, setWizardColorChangeIf);
    window.util.clickEventAdd(setupClose, closePopup);
    window.util.isEnterEventAdd(setupClose, closePopup);
  };

  const closePopup = () => {
    setup.style.top = `80px`;
    setup.style.left = `50%`;
    setup.classList.add(`hidden`);

    window.util.isEscapeEventRemove(document, onPopupEscPress);
    window.util.clickEventRemove(setupPlayer, setWizardColorChangeIf);
    window.util.clickEventRemove(setupClose, closePopup);
    window.util.isEnterEventRemove(setupClose, closePopup);
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
  window.util.submitEventAdd(setupWizardForm, closePopup);
  window.slider.moveElement(upload, setup);
})();
