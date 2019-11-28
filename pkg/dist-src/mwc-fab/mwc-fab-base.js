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
import { html, LitElement, property } from "./node_modules/lit-element/lit-element.js";
import { classMap } from "./node_modules/lit-html/directives/class-map.js";
export class FabBase extends LitElement {
  constructor() {
    super(...arguments);
    this.mini = false;
    this.exited = false;
    this.disabled = false;
    this.extended = false;
    this.showIconAtEnd = false;
    this.icon = '';
    this.label = '';
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  render() {
    const classes = {
      'mdc-fab--mini': this.mini,
      'mdc-fab--exited': this.exited,
      'mdc-fab--extended': this.extended
    };
    const showLabel = this.label !== '' && this.extended;
    let iconTemplate = '';

    if (this.icon) {
      iconTemplate = html`
        <span class="material-icons mdc-fab__icon">${this.icon}</span>`;
    }

    let label = html``;

    if (showLabel) {
      label = html`<span class="mdc-fab__label">${this.label}</span>`;
    }

    return html`
      <button
          class="mdc-fab ${classMap(classes)}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"
          .ripple="${ripple()}">
        <div class="mdc-fab__ripple"></div>
        ${this.showIconAtEnd ? label : ''}
        ${iconTemplate}
        ${!this.showIconAtEnd ? label : ''}
      </button>`;
  }

}

__decorate([property({
  type: Boolean
})], FabBase.prototype, "mini", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "exited", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "disabled", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "extended", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "showIconAtEnd", void 0);

__decorate([property()], FabBase.prototype, "icon", void 0);

__decorate([property()], FabBase.prototype, "label", void 0);