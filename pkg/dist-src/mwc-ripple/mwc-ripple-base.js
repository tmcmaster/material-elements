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

import { html, LitElement, property } from "./node_modules/lit-element/lit-element.js";
import { classMap } from "./node_modules/lit-html/directives/class-map.js";
import { ripple } from './ripple-directive.js';
export class RippleBase extends LitElement {
  constructor() {
    super(...arguments);
    this.primary = false;
    this.accent = false;
    this.unbounded = false;
    this.disabled = false;
    this.interactionNode = this;
  }

  connectedCallback() {
    if (this.interactionNode === this) {
      const parent = this.parentNode;

      if (parent instanceof HTMLElement) {
        this.interactionNode = parent;
      } else if (parent instanceof ShadowRoot && parent.host instanceof HTMLElement) {
        this.interactionNode = parent.host;
      }
    }

    super.connectedCallback();
  } // TODO(sorvell) #css: sizing.


  render() {
    const classes = {
      'mdc-ripple-surface--primary': this.primary,
      'mdc-ripple-surface--accent': this.accent
    };
    const {
      disabled,
      unbounded,
      active,
      interactionNode
    } = this;
    const rippleOptions = {
      disabled,
      unbounded,
      interactionNode
    };

    if (active !== undefined) {
      rippleOptions.active = active;
    }

    return html`
      <div .ripple="${ripple(rippleOptions)}"
          class="mdc-ripple-surface ${classMap(classes)}"></div>`;
  }

}

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "primary", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "active", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "accent", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "unbounded", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "disabled", void 0);

__decorate([property({
  attribute: false
})], RippleBase.prototype, "interactionNode", void 0);