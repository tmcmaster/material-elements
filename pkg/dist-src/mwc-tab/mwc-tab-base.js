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
// Make TypeScript not remove the import.

import "../mwc-tab-indicator/mwc-tab-indicator.js";
import { addHasRemoveClass, BaseElement } from "../mwc-base/base-element.js";
import { ripple } from "../mwc-ripple/ripple-directive.js";
import MDCTabFoundation from "../tab/foundation.js";
import { html, property, query } from "lit-element/lit-element.js";
import { classMap } from "lit-html/directives/class-map.js";
import { style } from "./mwc-tab-css.js"; // used for generating unique id for each tab

let tabIdCounter = 0;
export class TabBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCTabFoundation;
    this.label = '';
    this.icon = '';
    this.isFadingIndicator = false;
    this.minWidth = false;
    this.isMinWidthIndicator = false;
    this.indicatorIcon = '';
    this.stacked = false;
  }

  _handleClick() {
    this.mdcFoundation.handleClick();
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  connectedCallback() {
    this.dir = document.dir;
    super.connectedCallback();
  }

  firstUpdated() {
    super.firstUpdated(); // create an unique id

    this.id = this.id || `mdc-tab-${++tabIdCounter}`;
  }

  render() {
    const classes = {
      'mdc-tab--min-width': this.minWidth,
      'mdc-tab--stacked': this.stacked
    };
    return html`
      <button
        @click="${this._handleClick}"
        class="mdc-tab ${classMap(classes)}"
        role="tab"
        aria-selected="false"
        tabindex="-1">
        <span class="mdc-tab__content">
          <slot></slot>
          ${this.icon ? html`
          <span class="mdc-tab__icon material-icons">${this.icon}</span>` : ''}
          ${this.label ? html`
          <span class="mdc-tab__text-label">${this.label}</span>` : ''}
          ${this.isMinWidthIndicator ? this.renderIndicator() : ''}
        </span>
        ${this.isMinWidthIndicator ? '' : this.renderIndicator()}
        <span class="mdc-tab__ripple" .ripple="${ripple({
      interactionNode: this,
      unbounded: false
    })}"></span>
      </button>`;
  }

  renderIndicator() {
    return html`<mwc-tab-indicator
        .icon="${this.indicatorIcon}"
        .fade="${this.isFadingIndicator}"></mwc-tab-indicator>`;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      setAttr: (attr, value) => this.mdcRoot.setAttribute(attr, value),
      activateIndicator: previousIndicatorClientRect => this._tabIndicator.activate(previousIndicatorClientRect),
      deactivateIndicator: () => this._tabIndicator.deactivate(),
      notifyInteracted: () => this.dispatchEvent(new CustomEvent(MDCTabFoundation.strings.INTERACTED_EVENT, {
        detail: {
          tabId: this.id
        },
        bubbles: true,
        composed: true,
        cancelable: true
      })),
      getOffsetLeft: () => this.offsetLeft,
      getOffsetWidth: () => this.mdcRoot.offsetWidth,
      getContentOffsetLeft: () => this._contentElement.offsetLeft,
      getContentOffsetWidth: () => this._contentElement.offsetWidth,
      focus: () => this.mdcRoot.focus()
    });
  }

  activate(clientRect) {
    this.mdcFoundation.activate(clientRect);
  }

  deactivate() {
    this.mdcFoundation.deactivate();
  }

  computeDimensions() {
    return this.mdcFoundation.computeDimensions();
  }

  computeIndicatorClientRect() {
    return this.tabIndicator.computeContentClientRect();
  } // NOTE: needed only for ShadyDOM where delegatesFocus is not implemented


  focus() {
    this.mdcRoot.focus();
  }

}
TabBase.styles = style;

__decorate([query('.mdc-tab')], TabBase.prototype, "mdcRoot", void 0);

__decorate([query('mwc-tab-indicator')], TabBase.prototype, "tabIndicator", void 0);

__decorate([property()], TabBase.prototype, "label", void 0);

__decorate([property()], TabBase.prototype, "icon", void 0);

__decorate([property({
  type: Boolean
})], TabBase.prototype, "isFadingIndicator", void 0);

__decorate([property({
  type: Boolean
})], TabBase.prototype, "minWidth", void 0);

__decorate([property({
  type: Boolean
})], TabBase.prototype, "isMinWidthIndicator", void 0);

__decorate([property()], TabBase.prototype, "indicatorIcon", void 0);

__decorate([property({
  type: Boolean
})], TabBase.prototype, "stacked", void 0);

__decorate([query('mwc-tab-indicator')], TabBase.prototype, "_tabIndicator", void 0);

__decorate([query('.mdc-tab__content')], TabBase.prototype, "_contentElement", void 0);