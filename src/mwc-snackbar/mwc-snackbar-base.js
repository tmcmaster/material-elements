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

import { addHasRemoveClass, BaseElement, observer } from "../mwc-base/base-element.js";
import MDCSnackbarFoundation from "../snackbar/foundation.js";
import { html, property, query } from "lit-element/lit-element.js";
import { classMap } from "lit-html/directives/class-map.js";
import { accessibleSnackbarLabel } from "./accessible-snackbar-label-directive.js";
const {
  OPENING_EVENT,
  OPENED_EVENT,
  CLOSING_EVENT,
  CLOSED_EVENT
} = MDCSnackbarFoundation.strings;
export class SnackbarBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCSnackbarFoundation;
    this.isOpen = false;
    this.timeoutMs = 5000;
    this.closeOnEscape = false;
    this.labelText = '';
    this.stacked = false;
    this.leading = false;
  }

  render() {
    const classes = {
      'mdc-snackbar--stacked': this.stacked,
      'mdc-snackbar--leading': this.leading
    };
    return html`
      <div class="mdc-snackbar ${classMap(classes)}" @keydown="${this._handleKeydown}">
        <div class="mdc-snackbar__surface">
          ${accessibleSnackbarLabel(this.labelText, this.isOpen)}
          <div class="mdc-snackbar__actions">
            <slot name="action" @click="${this._handleActionClick}"></slot>
            <slot name="dismiss" @click="${this._handleDismissClick}"></slot>
          </div>
        </div>
      </div>`;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      // We handle announce ourselves with the accessible directive.
      announce: () => {},
      notifyClosed: reason => {
        this.dispatchEvent(new CustomEvent(CLOSED_EVENT, {
          bubbles: true,
          cancelable: true,
          detail: {
            reason: reason
          }
        }));
      },
      notifyClosing: reason => {
        this.isOpen = false;
        this.dispatchEvent(new CustomEvent(CLOSING_EVENT, {
          bubbles: true,
          cancelable: true,
          detail: {
            reason: reason
          }
        }));
      },
      notifyOpened: () => {
        this.dispatchEvent(new CustomEvent(OPENED_EVENT, {
          bubbles: true,
          cancelable: true
        }));
      },
      notifyOpening: () => {
        this.isOpen = true;
        this.dispatchEvent(new CustomEvent(OPENING_EVENT, {
          bubbles: true,
          cancelable: true
        }));
      }
    });
  }

  open() {
    this.isOpen = true;

    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.open();
    }
  }

  close(reason = '') {
    this.isOpen = false;

    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.close(reason);
    }
  }

  firstUpdated() {
    super.firstUpdated();

    if (this.isOpen) {
      this.mdcFoundation.open();
    }
  }

  _handleKeydown(e) {
    this.mdcFoundation.handleKeyDown(e);
  }

  _handleActionClick(e) {
    this.mdcFoundation.handleActionButtonClick(e);
  }

  _handleDismissClick(e) {
    this.mdcFoundation.handleActionIconClick(e);
  }

}

__decorate([query('.mdc-snackbar')], SnackbarBase.prototype, "mdcRoot", void 0);

__decorate([query('.mdc-snackbar__label')], SnackbarBase.prototype, "labelElement", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], SnackbarBase.prototype, "isOpen", void 0);

__decorate([observer(function (value) {
  this.mdcFoundation.setTimeoutMs(value);
}), property({
  type: Number
})], SnackbarBase.prototype, "timeoutMs", void 0);

__decorate([observer(function (value) {
  this.mdcFoundation.setCloseOnEscape(value);
}), property({
  type: Boolean
})], SnackbarBase.prototype, "closeOnEscape", void 0);

__decorate([property({
  type: String
})], SnackbarBase.prototype, "labelText", void 0);

__decorate([property({
  type: Boolean
})], SnackbarBase.prototype, "stacked", void 0);

__decorate([property({
  type: Boolean
})], SnackbarBase.prototype, "leading", void 0); //# sourceMappingURL=mwc-snackbar-base.js.map