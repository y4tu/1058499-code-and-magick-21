'use strict';

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

const getHexColor = (rgb) => {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

  return (rgb && rgb.length === 4) ? `#` +
    (`0` + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    (`0` + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    (`0` + parseInt(rgb[3], 10).toString(16)).slice(-2) : ``;
};

const WIZARD_NUMBER = 4;
const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];
const WIZARD_SURNAMES = [
  ` да Марья`,
  ` Верон`,
  ` Мирабелла`,
  ` Вальц`,
  ` Онопко`,
  ` Топольницкая`,
  ` Нионго`,
  ` Ирвинг`
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
const FIREBALL_COLORS = [
  colors.RED_FIREBALL,
  colors.BLUE_FIREBALL,
  colors.AQUAMARINE_FIREBALL,
  colors.MAGENTA_FIREBALL,
  colors.YELLOW_FIREBALL
];
const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const setupSubmit = setup.querySelector(`.setup-submit`);
const setupForm = setup.querySelector(`.setup-wizard-form`);
const setupUserName = setup.querySelector(`.setup-user-name`);
const wizardCoat = setup.querySelector(`.wizard-coat`);
const wizardEyes = setup.querySelector(`.wizard-eyes`);
const fireballColor = setup.querySelector(`.setup-fireball-wrap`);
const wizardCoatColorInput = setup.querySelector(`input[name="coat-color"]`);
const wizardEyesColorInput = setup.querySelector(`input[name="eyes-color"]`);
const wizardFireballColorInput = setup.querySelector(`input[name="fireball-color"]`);

const randomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getWizardName = () => randomArrayElement(WIZARD_NAMES) + randomArrayElement(WIZARD_SURNAMES);
const getCoatColor = () => randomArrayElement(COAT_COLORS);
const getEyesColor = () => randomArrayElement(EYE_COLORS);
const getFireballColor = () => randomArrayElement(FIREBALL_COLORS);

const generateWizards = (number) => {
  const wizards = [];

  for (let i = 0; i < number; i++) {
    wizards.push({
      name: getWizardName(),
      coatColor: getCoatColor(),
      eyesColor: getEyesColor()
    });
  }

  return wizards;
};

const createWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizards = (array) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createWizard(array[i]));
  }

  similarListElement.appendChild(fragment);
};

const wizards = generateWizards(WIZARD_NUMBER);
renderWizards(wizards);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

const onPopupEscPress = function (evt) {
  if (document.activeElement === setupUserName && evt.key === `Escape`) {
    evt.preventDefault();
  } else if (document.activeElement !== setupUserName && evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

const sendForm = () => {
  setupForm.action = `https://21.javascript.pages.academy/code-and-magick`;

  setupForm.submit();

  closePopup();
};

const changeCoatColor = () => {
  let currentCoatColor = getCoatColor();

  wizardCoat.style = `fill: ${currentCoatColor}`;
  wizardCoatColorInput.value = currentCoatColor;
};

const changeEyesColor = () => {
  let currentEyesColor = getEyesColor();

  wizardEyes.style = `fill: ${currentEyesColor}`;
  wizardEyesColorInput.value = currentEyesColor;
};

const changeFireballColor = () => {
  let currentFireballColor = getFireballColor();

  fireballColor.style = `background-color: ${currentFireballColor}`;
  wizardFireballColorInput.value = getHexColor(currentFireballColor);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupSubmit.addEventListener(`click`, function () {
  sendForm();
});

setupSubmit.addEventListener(`click`, function (evt) {
  if (evt.key === `Enter`) {
    sendForm();
  }
});

wizardCoat.addEventListener(`click`, function () {
  changeCoatColor();
});

wizardEyes.addEventListener(`click`, function () {
  changeEyesColor();
});

fireballColor.addEventListener(`click`, function () {
  changeFireballColor();
});
