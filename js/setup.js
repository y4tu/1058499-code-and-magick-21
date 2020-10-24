'use strict';

(() => {
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

  const similarListElement = window.dialog.setup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const getWizardName = () => window.util.getRandomArrayElement(WIZARD_NAMES) +
    window.util.getRandomArrayElement(WIZARD_SURNAMES);

  const generateWizards = (number) => {
    const wizards = [];

    for (let i = 0; i < number; i++) {
      wizards.push({
        name: getWizardName(),
        coatColor: window.dialog.getCoatColor(),
        eyesColor: window.dialog.getEyesColor()
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
  window.dialog.setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  window.util.clickEventAdd(window.dialog.setupOpen, window.dialog.openPopup);
})();

