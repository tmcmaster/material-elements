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
import { TextFieldBase } from "../mwc-textfield/mwc-textfield-base.js";
import { html, property, query } from "lit-element/lit-element.js";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export class TextAreaBase extends TextFieldBase {
  constructor() {
    super(...arguments);
    this.rows = 2;
    this.cols = 20;
  }

  get shouldRenderHelperText() {
    return !!this.helper || !!this.validationMessage;
  }

  render() {
    const classes = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--fullwidth': this.fullWidth
    };
    return html`
      <div class="mdc-text-field mdc-text-field--textarea ${classMap(classes)}">
        ${this.renderCharCounter()}
        ${this.renderInput()}
        ${this.outlined ? this.renderOutlined() : this.renderLabelText()}
      </div>
      ${this.renderHelperText()}
    `;
  }

  renderInput() {
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    return html`
      <textarea
          id="text-field"
          class="mdc-text-field__input"
          .value="${this.value}"
          rows="${this.rows}"
          cols="${this.cols}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          maxlength="${ifDefined(maxOrUndef)}"
          @input="${this.handleInputChange}"
          @blur="${this.onInputBlur}">
      </textarea>`;
  }

}

__decorate([query('textarea')], TextAreaBase.prototype, "formElement", void 0);

__decorate([property({
  type: Number
})], TextAreaBase.prototype, "rows", void 0);

__decorate([property({
  type: Number
})], TextAreaBase.prototype, "cols", void 0);