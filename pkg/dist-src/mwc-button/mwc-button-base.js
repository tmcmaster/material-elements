import { __decorate } from "tslib/tslib.es6.js";
import { ripple } from "../mwc-ripple/ripple-directive.js";
import { html, LitElement, property, query } from "./node_modules/lit-element/lit-element.js";
import { classMap } from "./node_modules/lit-html/directives/class-map.js";
export class ButtonBase extends LitElement {
  constructor() {
    super(...arguments);
    this.raised = false;
    this.unelevated = false;
    this.outlined = false;
    this.dense = false;
    this.disabled = false;
    this.trailingIcon = false;
    this.icon = '';
    this.label = '';
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  focus() {
    const buttonElement = this.buttonElement;

    if (buttonElement) {
      const ripple = buttonElement.ripple;

      if (ripple) {
        ripple.handleFocus();
      }

      buttonElement.focus();
    }
  }

  blur() {
    const buttonElement = this.buttonElement;

    if (buttonElement) {
      const ripple = buttonElement.ripple;

      if (ripple) {
        ripple.handleBlur();
      }

      buttonElement.blur();
    }
  }

  render() {
    const classes = {
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense
    };
    const mdcButtonIcon = html`<span class="material-icons mdc-button__icon">${this.icon}</span>`;
    const buttonRipple = ripple({
      unbounded: false
    });
    return html`
      <button id="button"
              .ripple="${buttonRipple}"
              class="mdc-button ${classMap(classes)}"
              ?disabled="${this.disabled}"
              aria-label="${this.label || this.icon}">
        <div class="mdc-button__ripple"></div>
        ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
        <span class="mdc-button__label">${this.label}</span>
        ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
        <slot></slot>
      </button>`;
  }

}

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "raised", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "unelevated", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "outlined", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "dense", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], ButtonBase.prototype, "disabled", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "trailingIcon", void 0);

__decorate([property()], ButtonBase.prototype, "icon", void 0);

__decorate([property()], ButtonBase.prototype, "label", void 0);

__decorate([query('#button')], ButtonBase.prototype, "buttonElement", void 0);