import { __decorate } from "tslib/tslib.es6.js";
import MDCLinearProgressFoundation from "../linear-progress/foundation.js";
import { addHasRemoveClass, BaseElement, observer } from "../mwc-base/base-element.js";
import { html, property, query } from "lit-element/lit-element.js";
export class LinearProgressBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCLinearProgressFoundation;
    this.indeterminate = false;
    this.progress = 0;
    this.buffer = 1;
    this.reverse = false;
    this.closed = false;
    this.ariaLabel = '';
  }

  render() {
    return html`
      <div role="progressbar"
        class="mdc-linear-progress"
        aria-label="${this.ariaLabel}"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow="0">
        <div class="mdc-linear-progress__buffering-dots"></div>
        <div class="mdc-linear-progress__buffer"></div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>`;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      forceLayout: () => this.mdcRoot.offsetWidth,
      getPrimaryBar: () => this.primaryBar,
      getBuffer: () => this.bufferElement,
      removeAttribute: name => {
        this.mdcRoot.removeAttribute(name);
      },
      setAttribute: (name, value) => {
        this.mdcRoot.setAttribute(name, value);
      },
      setStyle: (el, property, value) => {
        // TODO(aomarks) Consider moving this type to the
        // MDCLinearProgressAdapter parameter type, but note that the "-webkit"
        // prefixed CSS properties are not declared in CSSStyleDeclaration.
        //
        // Exclude read-only properties.
        el.style[property] = value;
      }
    });
  }

  open() {
    this.closed = false;
  }

  close() {
    this.closed = true;
  }

}

__decorate([query('.mdc-linear-progress')], LinearProgressBase.prototype, "mdcRoot", void 0);

__decorate([query('.mdc-linear-progress__primary-bar')], LinearProgressBase.prototype, "primaryBar", void 0);

__decorate([query('.mdc-linear-progress__buffer')], LinearProgressBase.prototype, "bufferElement", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function (value) {
  this.mdcFoundation.setDeterminate(!value);
})], LinearProgressBase.prototype, "indeterminate", void 0);

__decorate([property({
  type: Number
}), observer(function (value) {
  this.mdcFoundation.setProgress(value);
})], LinearProgressBase.prototype, "progress", void 0);

__decorate([property({
  type: Number
}), observer(function (value) {
  this.mdcFoundation.setBuffer(value);
})], LinearProgressBase.prototype, "buffer", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function (value) {
  this.mdcFoundation.setReverse(value);
})], LinearProgressBase.prototype, "reverse", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function (value) {
  if (value) {
    this.mdcFoundation.close();
  } else {
    this.mdcFoundation.open();
  }
})], LinearProgressBase.prototype, "closed", void 0);

__decorate([property()], LinearProgressBase.prototype, "ariaLabel", void 0);