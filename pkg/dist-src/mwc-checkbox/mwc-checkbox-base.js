import { __decorate } from "tslib/tslib.es6.js";
import MDCCheckboxFoundation from "../checkbox/foundation.js";
import { addHasRemoveClass, FormElement, observer } from "../mwc-base/form-element.js";
import { rippleNode } from "../mwc-ripple/ripple-directive.js";
import { html, property, query } from "lit-element/lit-element.js";
export class CheckboxBase extends FormElement {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.indeterminate = false;
    this.disabled = false;
    this.value = '';
    this.mdcFoundationClass = MDCCheckboxFoundation;
  }

  get ripple() {
    return this.mdcRoot.ripple;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      forceLayout: () => {
        this.mdcRoot.offsetWidth;
      },
      isAttachedToDOM: () => this.isConnected,
      isIndeterminate: () => this.indeterminate,
      isChecked: () => this.checked,
      hasNativeControl: () => Boolean(this.formElement),
      setNativeControlDisabled: disabled => {
        this.formElement.disabled = disabled;
      },
      setNativeControlAttr: (attr, value) => {
        this.formElement.setAttribute(attr, value);
      },
      removeNativeControlAttr: attr => {
        this.formElement.removeAttribute(attr);
      }
    });
  }

  render() {
    return html`
      <div class="mdc-checkbox"
           @animationend="${this._animationEndHandler}">
        <input type="checkbox"
              class="mdc-checkbox__native-control"
              @change="${this._changeHandler}"
              .indeterminate="${this.indeterminate}"
              .checked="${this.checked}"
              .value="${this.value}">
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark"
              viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
        <div class="mdc-checkbox__ripple"></div>
      </div>`;
  }

  firstUpdated() {
    super.firstUpdated();
    this.mdcRoot.ripple = rippleNode({
      surfaceNode: this.mdcRoot,
      interactionNode: this.formElement
    });
  }

  _changeHandler() {
    this.checked = this.formElement.checked;
    this.indeterminate = this.formElement.indeterminate;
    this.mdcFoundation.handleChange();
  }

  _animationEndHandler() {
    this.mdcFoundation.handleAnimationEnd();
  }

}

__decorate([query('.mdc-checkbox')], CheckboxBase.prototype, "mdcRoot", void 0);

__decorate([query('input')], CheckboxBase.prototype, "formElement", void 0);

__decorate([property({
  type: Boolean
})], CheckboxBase.prototype, "checked", void 0);

__decorate([property({
  type: Boolean
})], CheckboxBase.prototype, "indeterminate", void 0);

__decorate([property({
  type: Boolean
}), observer(function (value) {
  this.mdcFoundation.setDisabled(value);
})], CheckboxBase.prototype, "disabled", void 0);

__decorate([property({
  type: String
})], CheckboxBase.prototype, "value", void 0);