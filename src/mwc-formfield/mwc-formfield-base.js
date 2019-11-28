import { __decorate } from "tslib/tslib.es6.js";
import MDCFormFieldFoundation from "../form-field/foundation.js";
import { BaseElement, observer } from "../mwc-base/base-element.js";
import { FormElement } from "../mwc-base/form-element.js";
import { findAssignedElement } from "../mwc-base/utils.js";
import { html, property, query } from "./node_modules/lit-element/lit-element.js";
import { classMap } from "./node_modules/lit-html/directives/class-map.js";
export class FormfieldBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.alignEnd = false;
    this.label = '';
    this.mdcFoundationClass = MDCFormFieldFoundation;
  }

  createAdapter() {
    return {
      registerInteractionHandler: (type, handler) => {
        this.labelEl.addEventListener(type, handler);
      },
      deregisterInteractionHandler: (type, handler) => {
        this.labelEl.removeEventListener(type, handler);
      },
      activateInputRipple: () => {
        const input = this.input;

        if (input instanceof FormElement && input.ripple) {
          input.ripple.activate();
        }
      },
      deactivateInputRipple: () => {
        const input = this.input;

        if (input instanceof FormElement && input.ripple) {
          input.ripple.deactivate();
        }
      }
    };
  }

  get input() {
    return findAssignedElement(this.slotEl, '*');
  }

  render() {
    return html`
      <div class="mdc-form-field ${classMap({
      'mdc-form-field--align-end': this.alignEnd
    })}">
        <slot></slot>
        <label class="mdc-label"
               @click="${this._labelClick}">${this.label}</label>
      </div>`;
  }

  _labelClick() {
    const input = this.input;

    if (input) {
      input.focus();
      input.click();
    }
  }

}

__decorate([property({
  type: Boolean
})], FormfieldBase.prototype, "alignEnd", void 0);

__decorate([property({
  type: String
}), observer(async function (label) {
  const input = this.input;

  if (input) {
    if (input.localName === 'input') {
      input.setAttribute('aria-label', label);
    } else if (input instanceof FormElement) {
      await input.updateComplete;
      input.setAriaLabel(label);
    }
  }
})], FormfieldBase.prototype, "label", void 0);

__decorate([query('.mdc-form-field')], FormfieldBase.prototype, "mdcRoot", void 0);

__decorate([query('slot')], FormfieldBase.prototype, "slotEl", void 0);

__decorate([query('label')], FormfieldBase.prototype, "labelEl", void 0); //# sourceMappingURL=mwc-formfield-base.js.map