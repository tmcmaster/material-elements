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
import { __decorate } from "tslib/tslib.es6.js";
import MDCIconButtonToggleFoundation from "../icon-button/foundation.js";
import { addHasRemoveClass, BaseElement, observer } from "../mwc-base/base-element.js";
import { ripple } from "../mwc-ripple/ripple-directive.js";
import { html, property, query } from "lit-element/lit-element.js";
export class IconButtonToggleBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCIconButtonToggleFoundation;
    this.label = '';
    this.disabled = false;
    this.onIcon = '';
    this.offIcon = '';
    this.on = false;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      setAttr: (name, value) => {
        this.mdcRoot.setAttribute(name, value);
      },
      notifyChange: evtData => {
        this.dispatchEvent(new CustomEvent('MDCIconButtonToggle:change', {
          detail: evtData,
          bubbles: true
        }));
      }
    });
  }

  handleClick() {
    this.on = !this.on;
    this.mdcFoundation.handleClick();
  }

  focus() {
    this.mdcRoot.focus();
  }

  render() {
    return html`
      <button
        .ripple="${ripple()}"
        class="mdc-icon-button"
        @click="${this.handleClick}"
        aria-hidden="true"
        aria-label="${this.label}"
        ?disabled="${this.disabled}">
        <span class="mdc-icon-button__icon">
          <slot name="offIcon">
            <i class="material-icons">${this.offIcon}</i>
          </slot>
        </span>
        <span class="mdc-icon-button__icon mdc-icon-button__icon--on">
          <slot name="onIcon">
            <i class="material-icons">${this.onIcon}</i>
          </slot>
        </span>
      </button>`;
  }

}

__decorate([query('.mdc-icon-button')], IconButtonToggleBase.prototype, "mdcRoot", void 0);

__decorate([property({
  type: String
})], IconButtonToggleBase.prototype, "label", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], IconButtonToggleBase.prototype, "disabled", void 0);

__decorate([property({
  type: String
})], IconButtonToggleBase.prototype, "onIcon", void 0);

__decorate([property({
  type: String
})], IconButtonToggleBase.prototype, "offIcon", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function (state) {
  this.mdcFoundation.toggle(state);
})], IconButtonToggleBase.prototype, "on", void 0); //# sourceMappingURL=mwc-icon-button-toggle-base.js.map