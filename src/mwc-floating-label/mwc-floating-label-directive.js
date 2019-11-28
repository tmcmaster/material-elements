import { MDCFloatingLabelFoundation } from "../floating-label/foundation.js";
import { directive } from "./node_modules/lit-html/lit-html.js";

const createAdapter = labelElement => {
  return {
    addClass: className => labelElement.classList.add(className),
    removeClass: className => labelElement.classList.remove(className),
    getWidth: () => labelElement.scrollWidth,
    registerInteractionHandler: (evtType, handler) => {
      labelElement.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      labelElement.removeEventListener(evtType, handler);
    }
  };
};

const partToFoundationMap = new WeakMap();
export const floatingLabel = directive(label => part => {
  const lastFoundation = partToFoundationMap.get(part);

  if (!lastFoundation) {
    const labelElement = part.committer.element;
    labelElement.classList.add('mdc-floating-label');
    const adapter = createAdapter(labelElement);
    const foundation = new MDCFloatingLabelFoundation(adapter);
    foundation.init();
    part.setValue(foundation);
    partToFoundationMap.set(part, {
      label,
      foundation
    });
  } else if (lastFoundation.label !== label) {
    const labelElement = part.committer.element;
    const labelChangeEvent = new Event('labelchange');
    labelElement.dispatchEvent(labelChangeEvent);
  }
}); //# sourceMappingURL=mwc-floating-label-directive.js.map