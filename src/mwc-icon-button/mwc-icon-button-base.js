import { __decorate } from "tslib/tslib.es6.js";
/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

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

import { ripple } from "../mwc-ripple/ripple-directive.js";
import { html, LitElement, property } from "lit-element/lit-element.js";
export class IconButtonBase extends LitElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.icon = '';
    this.label = '';
  }

  render() {
    return html`<button
    .ripple="${ripple()}"
    class="mdc-icon-button"
    aria-label="${this.label || this.icon}"
    ?disabled="${this.disabled}">
    <i class="material-icons">${this.icon}</i>
    <slot></slot>
  </button>`;
  }

}

__decorate([property({
  type: Boolean,
  reflect: true
})], IconButtonBase.prototype, "disabled", void 0);

__decorate([property({
  type: String
})], IconButtonBase.prototype, "icon", void 0);

__decorate([property({
  type: String
})], IconButtonBase.prototype, "label", void 0); //# sourceMappingURL=mwc-icon-button-base.js.map