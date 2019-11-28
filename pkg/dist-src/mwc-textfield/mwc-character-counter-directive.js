import { MDCTextFieldCharacterCounterFoundation } from "../textfield/character-counter/foundation.js";
import { directive } from "lit-html/lit-html.js";

const createAdapter = hostElement => {
  return {
    setContent: content => hostElement.textContent = content
  };
};

const partToFoundationMap = new WeakMap();
export const characterCounter = directive(() => part => {
  const lastFoundation = partToFoundationMap.get(part);

  if (!lastFoundation) {
    const hostElement = part.committer.element;
    hostElement.classList.add('mdc-text-field-character-counter');
    const adapter = createAdapter(hostElement);
    const foundation = new MDCTextFieldCharacterCounterFoundation(adapter);
    foundation.init();
    part.setValue(foundation);
    partToFoundationMap.set(part, foundation);
  }
});