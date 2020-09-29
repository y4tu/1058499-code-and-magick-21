'use strict';
const Colors = {
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
};

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [` да Марья`, ` Верон`, ` Мирабелла`, ` Вальц`, ` Онопко`, ` Топольницкая`, ` Нионго`, ` Ирвинг`];
const COAT_COLORS = [Colors.LIGHT_BLUE, Colors.PINK, Colors.VIOLET, Colors.LIGHT_GREEN, Colors.SPECIAL_YELLOW, Colors.BLACK];
const EYE_COLORS = [Colors.BLACK, Colors.RED, Colors.BLUE, Colors.YELLOW, Colors.GREEN];
const userDialog = document.querySelector(`.setup`);
const fragment = document.createDocumentFragment();
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const wizards = [];

const getWizardName = () => WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)];
const getCoatColor = () => COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
const getEyesColor = () => EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)];

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

for (let i = 0; i < 4; i++) {
  wizards.push({
    name: getWizardName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  });
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
userDialog.classList.remove(`hidden`);
