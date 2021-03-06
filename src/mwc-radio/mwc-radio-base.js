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
import MDCRadioFoundation from "../radio/foundation.js";
import { html, property, query } from "lit-element/lit-element.js";
export class RadioBase extends FormElement {
  constructor() {
    super(...arguments);
    this._checked = false;
    this.disabled = false;
    this.value = '';
    this.name = '';
    this.mdcFoundationClass = MDCRadioFoundation;
  }

  get checked() {
    return this._checked;
  }
  /**
   * We define our own getter/setter for `checked` because we need to track
   * changes to it synchronously.
   *
   * The order in which the `checked` property is set across radio buttons
   * within the same group is very important. However, we can't rely on
   * UpdatingElement's `updated` callback to observe these changes (which is
   * also what the `@observer` decorator uses), because it batches changes to
   * all properties.
   *
   * Consider:
   *
   *   radio1.disabled = true;
   *   radio2.checked = true;
   *   radio1.checked = true;
   *
   * In this case we'd first see all changes for radio1, and then for radio2,
   * and we couldn't tell that radio1 was the most recently checked.
   */


  set checked(checked) {
    const oldValue = this._checked;

    if (!!checked === !!oldValue) {
      return;
    }

    this._checked = checked;

    if (this.formElement) {
      this.formElement.checked = checked;
    }

    if (this._selectionController !== undefined) {
      this._selectionController.update(this);
    }

    this.requestUpdate('checked', oldValue);
  }

  connectedCallback() {
    super.connectedCallback(); // Note that we must defer creating the selection controller until the
    // element has connected, because selection controllers are keyed by the
    // radio's shadow root. For example, if we're stamping in a lit-html map
    // or repeat, then we'll be constructed before we're added to a root node.
    //
    // Also note if we aren't using native shadow DOM, then we don't technically
    // need a SelectionController, because our inputs will share document-scoped
    // native selection groups. However, it simplifies implementation and
    // testing to use one in all cases. In particular, it means we correctly
    // manage groups before the first update stamps the native input.
    //
    // eslint-disable-next-line @typescript-eslint/no-use-before-define

    this._selectionController = SelectionController.getController(this);

    this._selectionController.register(this); // With native <input type="radio">, when a checked radio is added to the
    // root, then it wins. Immediately update to emulate this behavior.


    this._selectionController.update(this);
  }

  disconnectedCallback() {
    // The controller is initialized in connectedCallback, so if we are in
    // disconnectedCallback then it must be initialized.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._selectionController.unregister(this);

    this._selectionController = undefined;
  }

  focusNative() {
    this.formElement.focus();
  }

  get ripple() {
    return this.rippleElement.ripple;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      setNativeControlDisabled: disabled => {
        this.formElement.disabled = disabled;
      }
    });
  }

  _changeHandler() {
    this.checked = this.formElement.checked;
  }

  _focusHandler() {
    if (this._selectionController !== undefined) {
      this._selectionController.focus(this);
    }
  }

  _clickHandler() {
    // Firefox has weird behavior with radios if they are not focused
    this.formElement.focus();
  }

  render() {
    return html`
      <div class="mdc-radio" .ripple=${ripple()}>
        <input
          class="mdc-radio__native-control"
          type="radio"
          name="${this.name}"
          .checked="${this.checked}"
          .value="${this.value}"
          @change="${this._changeHandler}"
          @focus="${this._focusHandler}"
          @click="${this._clickHandler}">
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
        <div class="mdc-radio__ripple"></div>
      </div>`;
  }

  firstUpdated() {
    super.firstUpdated(); // We might not have been able to synchronize this from the checked setter
    // earlier, if checked was set before the input was stamped.

    this.formElement.checked = this.checked;

    if (this._selectionController !== undefined) {
      this._selectionController.update(this);
    }
  }

}

__decorate([query('.mdc-radio')], RadioBase.prototype, "mdcRoot", void 0);

__decorate([query('input')], RadioBase.prototype, "formElement", void 0);

__decorate([query('.mdc-radio__ripple')], RadioBase.prototype, "rippleElement", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], RadioBase.prototype, "checked", null);

__decorate([property({
  type: Boolean
}), observer(function (disabled) {
  this.mdcFoundation.setDisabled(disabled);
})], RadioBase.prototype, "disabled", void 0);

__decorate([property({
  type: String
}), observer(function (value) {
  this.formElement.value = value;
})], RadioBase.prototype, "value", void 0);

__decorate([property({
  type: String
})], RadioBase.prototype, "name", void 0);
/**
 * Unique symbol for marking roots
 */


const selectionController = Symbol('selection controller');

class SelectionSet {
  constructor() {
    this.selected = null;
    this.ordered = null;
    this.set = new Set();
  }

}
/**
 * Only one <input type="radio" name="group"> per group name can be checked at
 * once. However, the scope of "name" is the document/shadow root, so built-in
 * de-selection does not occur when two radio buttons are in different shadow
 * roots. This class bridges the checked state of radio buttons with the same
 * group name across different shadow roots.
 */


export class SelectionController {
  constructor(element) {
    this.sets = {};
    this.focusedSet = null;
    this.mouseIsDown = false;
    this.updating = false;
    element.addEventListener('keydown', e => this.keyDownHandler(e));
    element.addEventListener('mousedown', () => this.mousedownHandler());
    element.addEventListener('mouseup', () => this.mouseupHandler());
  }

  static getController(element) {
    const root = element.getRootNode();
    let controller = root[selectionController];

    if (controller === undefined) {
      controller = new SelectionController(root);
      root[selectionController] = controller;
    }

    return controller;
  }

  keyDownHandler(e) {
    if (!(e.target instanceof RadioBase)) {
      return;
    }

    const element = e.target;

    if (!this.has(element)) {
      return;
    }

    if (e.key == 'ArrowRight' || e.key == 'ArrowDown') {
      this.next(element);
    } else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
      this.previous(element);
    }
  }

  mousedownHandler() {
    this.mouseIsDown = true;
  }

  mouseupHandler() {
    this.mouseIsDown = false;
  }

  has(element) {
    const set = this.getSet(element.name);
    return set.set.has(element);
  }

  previous(element) {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    this.select(order[i - 1] || order[order.length - 1]);
  }

  next(element) {
    const order = this.getOrdered(element);
    const i = order.indexOf(element);
    this.select(order[i + 1] || order[0]);
  }

  select(element) {
    element.click();
  }
  /**
   * Helps to track the focused selection group and if it changes, focuses
   * the selected item in the group. This matches native radio button behavior.
   */


  focus(element) {
    // Only manage focus state when using keyboard
    if (this.mouseIsDown) {
      return;
    }

    const set = this.getSet(element.name);
    const currentFocusedSet = this.focusedSet;
    this.focusedSet = set;

    if (currentFocusedSet != set && set.selected && set.selected != element) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      set.selected.focusNative();
    }
  }

  getOrdered(element) {
    const set = this.getSet(element.name);

    if (!set.ordered) {
      set.ordered = Array.from(set.set);
      set.ordered.sort((a, b) => a.compareDocumentPosition(b) == Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0);
    }

    return set.ordered;
  }

  getSet(name) {
    if (!this.sets[name]) {
      this.sets[name] = new SelectionSet();
    }

    return this.sets[name];
  }

  register(element) {
    const set = this.getSet(element.name);
    set.set.add(element);
    set.ordered = null;
  }

  unregister(element) {
    const set = this.getSet(element.name);
    set.set.delete(element);
    set.ordered = null;

    if (set.selected == element) {
      set.selected = null;
    }
  }

  update(element) {
    if (this.updating) {
      return;
    }

    this.updating = true;

    if (element.checked) {
      const set = this.getSet(element.name);

      for (const e of set.set) {
        e.checked = e == element;
      }

      set.selected = element;
    }

    this.updating = false;
  }

} //# sourceMappingURL=mwc-radio-base.js.map