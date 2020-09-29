'use strict';

const LIGHT_BLUE = `rgb(101, 137, 164)`;
const PINK = `rgb(241, 43, 107)`;
const VIOLET = `rgb(146, 100, 161)`;
const LIGHT_GREEN = `rgb(56, 159, 117)`;
const SPECIAL_YELLOW = `rgb(215, 210, 55)`;
const BLACK = `rgb(0, 0, 0)`;
const RED = `rgb(255, 0, 0)`;
const BLUE = `rgb(0, 0, 255)`;
const YELLOW = `rgb(255, 255, 0)`;
const GREEN = `rgb(0, 128, 0)`;
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [LIGHT_BLUE, PINK, VIOLET, LIGHT_GREEN, SPECIAL_YELLOW, BLACK];
const EYE_COLORS = [BLACK, RED, BLUE, YELLOW, GREEN];
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

for (let i = 0; i < wizards.length; i++) {
  wizards[i] = {
    name: getWizardName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  };
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
userDialog.classList.remove(`hidden`);
