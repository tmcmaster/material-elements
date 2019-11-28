import { __decorate } from "tslib/tslib.es6.js";
/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import "../mwc-notched-outline/mwc-notched-outline.js";
import { addHasRemoveClass, FormElement } from "../mwc-base/form-element.js";
import { floatingLabel } from "../mwc-floating-label/mwc-floating-label-directive.js";
import { lineRipple } from "../mwc-line-ripple/mwc-line-ripple-directive.js";
import MDCTextFieldFoundation from "../textfield/foundation.js";
import { eventOptions, html, property, query } from "./node_modules/lit-element/lit-element.js";
import { classMap } from "./node_modules/lit-html/directives/class-map.js";
import { ifDefined } from "./node_modules/lit-html/directives/if-defined.js";
import { characterCounter } from './mwc-character-counter-directive.js';
const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'mousewheel'];

const createValidityObj = (customValidity = {}) => {
  /*
   * We need to make ValidityState an object because it is readonly and
   * we cannot use the spread operator. Also, we don't export
   * `CustomValidityState` because it is a leaky implementation and the user
   * already has access to `ValidityState` in lib.dom.ts. Also an interface
   * {a: Type} can be casted to {readonly a: Type} so passing any object
   * should be fine.
   */
  const objectifiedCustomValidity = {}; // eslint-disable-next-line guard-for-in

  for (const propName in customValidity) {
    /*
     * Casting is needed because ValidityState's props are all readonly and
     * thus cannot be set on `onjectifiedCustomValidity`. In the end, the
     * interface is the same as ValidityState (but not readonly), but the
     * function signature casts the output to ValidityState (thus readonly).
     */
    objectifiedCustomValidity[propName] = customValidity[propName];
  }

  return Object.assign({
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: true,
    valueMissing: false
  }, objectifiedCustomValidity);
};

export class TextFieldBase extends FormElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCTextFieldFoundation;
    this.value = '';
    this.type = 'text';
    this.placeholder = '';
    this.label = '';
    this.icon = '';
    this.iconTrailing = '';
    this.disabled = false;
    this.required = false;
    this.maxLength = -1;
    this.outlined = false;
    this.fullWidth = false;
    this.helper = '';
    this.validateOnInitialRender = false;
    this.validationMessage = '';
    this.pattern = '';
    this.min = '';
    this.max = '';
    this.step = null;
    this.helperPersistent = false;
    this.charCounter = false;
    this.outlineOpen = false;
    this.outlineWidth = 0;
    this.isUiValid = true;
    this._validity = createValidityObj();
    this.validityTransform = null;
  }

  get validity() {
    this._checkValidity(this.value);

    return this._validity;
  }

  get willValidate() {
    return this.formElement.willValidate;
  }

  get selectionStart() {
    return this.formElement.selectionStart;
  }

  get selectionEnd() {
    return this.formElement.selectionEnd;
  }

  get shouldRenderHelperText() {
    return !!this.helper || !!this.validationMessage || this.charCounterVisible;
  }

  get charCounterVisible() {
    return this.charCounter && this.maxLength !== -1;
  }

  focus() {
    const focusEvt = new CustomEvent('focus');
    this.formElement.dispatchEvent(focusEvt);
    this.formElement.focus();
  }

  blur() {
    const blurEvt = new CustomEvent('blur');
    this.formElement.dispatchEvent(blurEvt);
    this.formElement.blur();
  }

  select() {
    this.formElement.select();
  }

  setSelectionRange(selectionStart, selectionEnd, selectionDirection) {
    this.formElement.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  render() {
    const classes = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--fullwidth': this.fullWidth,
      'mdc-text-field--with-leading-icon': this.icon,
      'mdc-text-field--with-trailing-icon': this.iconTrailing
    };
    return html`
      <div class="mdc-text-field ${classMap(classes)}">
        ${this.icon ? this.renderIcon(this.icon) : ''}
        ${this.renderInput()}
        ${this.iconTrailing ? this.renderIcon(this.iconTrailing) : ''}
        ${this.outlined ? this.renderOutlined() : this.renderLabelText()}
      </div>
      ${this.renderHelperText(this.renderCharCounter())}
    `;
  }

  updated(changedProperties) {
    const maxLength = changedProperties.get('maxLength');
    const maxLengthBecameDefined = maxLength === -1 && this.maxLength !== -1;
    const maxLengthBecameUndefined = maxLength !== undefined && maxLength !== -1 && this.maxLength === -1;
    /* We want to recreate the foundation if maxLength changes to defined or
     * undefined, because the textfield foundation needs to be instantiated with
     * the char counter's foundation, and the char counter's foundation needs
     * to have maxLength defined to be instantiated. Additionally, there is no
     * exposed API on the MdcTextFieldFoundation to dynamically add a char
     * counter foundation, so we must recreate it.
     */

    if (maxLengthBecameDefined || maxLengthBecameUndefined) {
      this.createFoundation();
    }

    if (changedProperties.has('value') && changedProperties.get('value') !== undefined) {
      this.mdcFoundation.setValue(this.value);
    }
  }

  renderInput() {
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    return html`
      <input
          id="text-field"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          maxlength="${ifDefined(maxOrUndef)}"
          pattern="${ifDefined(this.pattern ? this.pattern : undefined)}"
          min="${ifDefined(this.min === '' ? undefined : this.min)}"
          max="${ifDefined(this.max === '' ? undefined : this.max)}"
          step="${ifDefined(this.step === null ? undefined : this.step)}"
          @input="${this.handleInputChange}"
          @blur="${this.onInputBlur}">`;
  }

  renderIcon(icon) {
    return html`<i class="material-icons mdc-text-field__icon">${icon}</i>`;
  }

  renderOutlined() {
    let labelTemplate = '';

    if (this.label) {
      labelTemplate = html`
        <label
            .floatingLabelFoundation=${floatingLabel(this.label)}
            @labelchange=${this.onLabelChange}
            for="text-field">
          ${this.label}
        </label>
      `;
    }

    return html`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${labelTemplate}
      </mwc-notched-outline>`;
  }

  renderLabelText() {
    let labelTemplate = '';

    if (this.label && !this.fullWidth) {
      labelTemplate = html`
      <label
          .floatingLabelFoundation=${floatingLabel(this.label)}
          for="text-field">
        ${this.label}
      </label>`;
    }

    return html`
      ${labelTemplate}
      <div .lineRippleFoundation=${lineRipple()}></div>
    `;
  }

  renderHelperText(charCounterTemplate) {
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    const classes = {
      'mdc-text-field-helper-text--persistent': this.helperPersistent,
      'mdc-text-field-helper-text--validation-msg': showValidationMessage
    };
    const rootClasses = {
      hidden: !this.shouldRenderHelperText
    };
    return html`
      <div class="mdc-text-field-helper-line ${classMap(rootClasses)}">
        <div class="mdc-text-field-helper-text ${classMap(classes)}">
          ${showValidationMessage ? this.validationMessage : this.helper}
        </div>
        ${charCounterTemplate}
      </div>
    `;
  }

  renderCharCounter() {
    const counterClasses = {
      hidden: !this.charCounterVisible
    };
    return html`
      <div
          class="${classMap(counterClasses)}"
          .charCounterFoundation=${characterCounter()}>
      </div>`;
  }

  onInputBlur() {
    this.reportValidity();
  }

  checkValidity() {
    const isValid = this._checkValidity(this.value);

    if (!isValid) {
      const invalidEvent = new Event('invalid', {
        bubbles: false,
        cancelable: true
      });
      this.dispatchEvent(invalidEvent);
    }

    return isValid;
  }

  reportValidity() {
    const isValid = this.checkValidity();
    this.mdcFoundation.setValid(isValid);
    this.isUiValid = isValid;
    return isValid;
  }

  _checkValidity(value) {
    const nativeValidity = this.formElement.validity;
    let validity = createValidityObj(nativeValidity);

    if (this.validityTransform) {
      const customValidity = this.validityTransform(value, validity);
      validity = Object.assign(Object.assign({}, validity), customValidity);
      this.mdcFoundation.setUseNativeValidation(false);
    } else {
      this.mdcFoundation.setUseNativeValidation(true);
    }

    this._validity = validity;
    return this._validity.valid;
  }

  setCustomValidity(message) {
    this.validationMessage = message;
    this.formElement.setCustomValidity(message);
  }

  handleInputChange() {
    this.value = this.formElement.value;
  }

  createFoundation() {
    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.destroy();
    }

    this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter(), {
      characterCounter: this.maxLength !== -1 ? this.charCounterElement.charCounterFoundation : undefined
    });
    this.mdcFoundation.init();
  }

  createAdapter() {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.getRootAdapterMethods()), this.getInputAdapterMethods()), this.getLabelAdapterMethods()), this.getLineRippleAdapterMethods()), this.getOutlineAdapterMethods());
  }

  getRootAdapterMethods() {
    return Object.assign({
      registerTextFieldInteractionHandler: (evtType, handler) => this.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => this.removeEventListener(evtType, handler),
      registerValidationAttributeChangeHandler: () => {
        const getAttributesList = mutationsList => {
          return mutationsList.map(mutation => mutation.attributeName).filter(attributeName => attributeName);
        };

        const observer = new MutationObserver(mutationsList => {
          const attributes = getAttributesList(mutationsList);

          if (attributes.indexOf('maxlength') !== -1 && this.maxLength !== -1) {
            this.charCounterElement.charCounterFoundation.setCounterValue(this.value.length, this.maxLength);
          }
        });
        const config = {
          attributes: true
        };
        observer.observe(this.formElement, config);
        return observer;
      },
      deregisterValidationAttributeChangeHandler: observer => observer.disconnect()
    }, addHasRemoveClass(this.mdcRoot));
  }

  getInputAdapterMethods() {
    return {
      getNativeInput: () => this.formElement,
      isFocused: () => this.shadowRoot ? this.shadowRoot.activeElement === this.formElement : false,
      registerInputInteractionHandler: (evtType, handler) => this.formElement.addEventListener(evtType, handler, {
        passive: evtType in passiveEvents
      }),
      deregisterInputInteractionHandler: (evtType, handler) => this.formElement.removeEventListener(evtType, handler)
    };
  }

  getLabelAdapterMethods() {
    return {
      floatLabel: shouldFloat => this.labelElement && this.labelElement.floatingLabelFoundation.float(shouldFloat),
      getLabelWidth: () => {
        return this.labelElement ? this.labelElement.floatingLabelFoundation.getWidth() : 0;
      },
      hasLabel: () => Boolean(this.labelElement),
      shakeLabel: shouldShake => this.labelElement && this.labelElement.floatingLabelFoundation.shake(shouldShake)
    };
  }

  getLineRippleAdapterMethods() {
    return {
      activateLineRipple: () => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.activate();
        }
      },
      deactivateLineRipple: () => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.deactivate();
        }
      },
      setLineRippleTransformOrigin: normalizedX => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.setRippleCenter(normalizedX);
        }
      }
    };
  }

  async firstUpdated() {
    const outlineElement = this.outlineElement;

    if (outlineElement) {
      await outlineElement.updateComplete;
    }

    super.firstUpdated();

    if (this.validateOnInitialRender) {
      this.reportValidity();
    }
  }

  getOutlineAdapterMethods() {
    return {
      closeOutline: () => this.outlineElement && (this.outlineOpen = false),
      hasOutline: () => Boolean(this.outlineElement),
      notchOutline: labelWidth => {
        const outlineElement = this.outlineElement;

        if (outlineElement && !this.outlineOpen) {
          this.outlineWidth = labelWidth;
          this.outlineOpen = true;
        }
      }
    };
  }

  async onLabelChange() {
    if (this.label) {
      await this.layout();
    }
  }

  async layout() {
    await this.updateComplete;

    if (this.labelElement && this.outlineElement) {
      /* When the textfield automatically notches due to a value and label
       * being defined, the textfield may be set to `display: none` by the user.
       * this means that the notch is of size 0px. We provide this function so
       * that the user may manually resize the notch to the floated label's
       * width.
       */
      const labelWidth = this.labelElement.floatingLabelFoundation.getWidth();

      if (this.outlineOpen) {
        this.outlineWidth = labelWidth;
      }
    }
  }

}

__decorate([query('.mdc-text-field')], TextFieldBase.prototype, "mdcRoot", void 0);

__decorate([query('input')], TextFieldBase.prototype, "formElement", void 0);

__decorate([query('.mdc-floating-label')], TextFieldBase.prototype, "labelElement", void 0);

__decorate([query('.mdc-line-ripple')], TextFieldBase.prototype, "lineRippleElement", void 0);

__decorate([query('mwc-notched-outline')], TextFieldBase.prototype, "outlineElement", void 0);

__decorate([query('.mdc-notched-outline__notch')], TextFieldBase.prototype, "notchElement", void 0);

__decorate([query('.mdc-text-field-character-counter')], TextFieldBase.prototype, "charCounterElement", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "value", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "type", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "placeholder", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "label", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "icon", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "iconTrailing", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], TextFieldBase.prototype, "disabled", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "required", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "maxLength", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], TextFieldBase.prototype, "outlined", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], TextFieldBase.prototype, "fullWidth", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "helper", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "validateOnInitialRender", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "validationMessage", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "pattern", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "min", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "max", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "step", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "helperPersistent", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "charCounter", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "outlineOpen", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "outlineWidth", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "isUiValid", void 0);

__decorate([eventOptions({
  passive: true
})], TextFieldBase.prototype, "handleInputChange", null); //# sourceMappingURL=mwc-textfield-base.js.map