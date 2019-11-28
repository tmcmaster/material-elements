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

import { BaseElement } from "../mwc-base/form-element.js";
import { MDCNotchedOutlineFoundation } from "../notched-outline/foundation.js";
import { html, property, query } from "lit-element/lit-element.js";
export class NotchedOutlineBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCNotchedOutlineFoundation;
    this.width = 0;
    this.open = false;
    this.lastOpen = this.open;
  }

  createAdapter() {
    return {
      addClass: className => this.mdcRoot.classList.add(className),
      removeClass: className => this.mdcRoot.classList.remove(className),
      setNotchWidthProperty: width => this.notchElement.style.setProperty('width', `${width}px`),
      removeNotchWidthProperty: () => this.notchElement.style.removeProperty('width')
    };
  }

  openOrClose(shouldOpen, width) {
    if (!this.mdcFoundation) {
      return;
    }

    if (shouldOpen && width !== undefined) {
      this.mdcFoundation.notch(width);
    } else {
      this.mdcFoundation.closeNotch();
    }
  }

  render() {
    this.openOrClose(this.open, this.width);
    return html`
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        <div class="mdc-notched-outline__notch">
          <slot></slot>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
      </div>`;
  }

}

__decorate([query('.mdc-notched-outline')], NotchedOutlineBase.prototype, "mdcRoot", void 0);

__decorate([property({
  type: Number
})], NotchedOutlineBase.prototype, "width", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], NotchedOutlineBase.prototype, "open", void 0);

__decorate([query('.mdc-notched-outline__notch')], NotchedOutlineBase.prototype, "notchElement", void 0);