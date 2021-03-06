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

import { addHasRemoveClass, FormElement, observer } from "../mwc-base/form-element.js";
import { ripple } from "../mwc-ripple/ripple-directive.js";
import MDCSwitchFoundation from "../switch/foundation.js";
import { html, property, query } from "lit-element/lit-element.js";
export class SwitchBase extends FormElement {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
    this.mdcFoundationClass = MDCSwitchFoundation;
  }

  _changeHandler(e) {
    this.mdcFoundation.handleChange(e); // catch "click" event and sync properties

    this.checked = this.formElement.checked;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      setNativeControlChecked: checked => {
        this.formElement.checked = checked;
      },
      setNativeControlDisabled: disabled => {
        this.formElement.disabled = disabled;
      }
    });
  }

  get ripple() {
    return this.rippleNode.ripple;
  }

  render() {
    return html`
      <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay" .ripple="${ripple({
      interactionNode: this
    })}">
          <div class="mdc-switch__thumb">
            <input
              type="checkbox"
              id="basic-switch"
              class="mdc-switch__native-control"
              role="switch"
              @change="${this._changeHandler}">
          </div>
        </div>
      </div>
      <slot></slot>`;
  }

}

__decorate([property({
  type: Boolean
}), observer(function (value) {
  this.mdcFoundation.setChecked(value);
})], SwitchBase.prototype, "checked", void 0);

__decorate([property({
  type: Boolean
}), observer(function (value) {
  this.mdcFoundation.setDisabled(value);
})], SwitchBase.prototype, "disabled", void 0);

__decorate([query('.mdc-switch')], SwitchBase.prototype, "mdcRoot", void 0);

__decorate([query('input')], SwitchBase.prototype, "formElement", void 0);

__decorate([query('.mdc-switch__thumb-underlay')], SwitchBase.prototype, "rippleNode", void 0); //# sourceMappingURL=mwc-switch-base.js.map