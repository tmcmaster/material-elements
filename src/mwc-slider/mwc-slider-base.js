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

import { applyPassive } from "../dom/events.js";
import { addHasRemoveClass, FormElement, observer } from "../mwc-base/form-element.js";
import MDCSliderFoundation from "../slider/foundation.js";
import { eventOptions, html, property, query } from "lit-element/lit-element.js";
import { classMap } from "lit-html/directives/class-map.js";
import { styleMap } from "lit-html/directives/style-map.js";
const INPUT_EVENT = 'input';
const CHANGE_EVENT = 'change';
export class SliderBase extends FormElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCSliderFoundation;
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.step = 0;
    this.disabled = false;
    this.pin = false;
    this.markers = false;
    this.pinMarkerText = '';
    this.trackMarkerContainerStyles = {};
    this.thumbContainerStyles = {};
    this.trackStyles = {};
    this.isFoundationDestroyed = false;
  } // TODO(sorvell) #css: needs a default width


  render() {
    const isDiscrete = this.step !== 0;
    const hostClassInfo = {
      'mdc-slider--discrete': isDiscrete,
      'mdc-slider--display-markers': this.markers && isDiscrete
    };
    let markersTemplate = '';

    if (isDiscrete && this.markers) {
      markersTemplate = html`
        <div
            class="mdc-slider__track-marker-container"
            style="${styleMap(this.trackMarkerContainerStyles)}">
        </div>`;
    }

    let pin = '';

    if (this.pin) {
      pin = html`
      <div class="mdc-slider__pin">
        <span class="mdc-slider__pin-value-marker">${this.pinMarkerText}</span>
      </div>`;
    }

    return html`
      <div class="mdc-slider ${classMap(hostClassInfo)}"
           tabindex="0" role="slider"
           aria-valuemin="${this.min}" aria-valuemax="${this.max}"
           aria-valuenow="${this.value}" aria-disabled="${this.disabled}"
           data-step="${this.step}"
           @mousedown=${this.layout}
           @touchstart=${this.layout}>
        <div class="mdc-slider__track-container">
          <div
              class="mdc-slider__track"
              style="${styleMap(this.trackStyles)}">
          </div>
          ${markersTemplate}
        </div>
        <div
            class="mdc-slider__thumb-container"
            style="${styleMap(this.thumbContainerStyles)}">
          <!-- TODO: use cache() directive -->
          ${pin}
          <svg class="mdc-slider__thumb" width="21" height="21">
            <circle cx="10.5" cy="10.5" r="7.875"></circle>
          </svg>
        <div class="mdc-slider__focus-ring"></div>
      </div>
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.mdcRoot && this.isFoundationDestroyed) {
      this.isFoundationDestroyed = false;
      this.mdcFoundation.init();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.isFoundationDestroyed = true;
    this.mdcFoundation.destroy();
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      getAttribute: name => this.mdcRoot.getAttribute(name),
      setAttribute: (name, value) => this.mdcRoot.setAttribute(name, value),
      removeAttribute: name => this.mdcRoot.removeAttribute(name),
      computeBoundingRect: () => {
        const rect = this.mdcRoot.getBoundingClientRect();
        const myRect = {
          bottom: rect.bottom,
          height: rect.height,
          left: rect.left + window.pageXOffset,
          right: rect.right,
          top: rect.top,
          width: rect.width
        };
        return myRect;
      },
      getTabIndex: () => this.mdcRoot.tabIndex,
      registerInteractionHandler: (type, handler) => {
        const init = type === 'touchstart' ? applyPassive() : undefined;
        this.mdcRoot.addEventListener(type, handler, init);
      },
      deregisterInteractionHandler: (type, handler) => this.mdcRoot.removeEventListener(type, handler),
      registerThumbContainerInteractionHandler: (type, handler) => {
        const init = type === 'touchstart' ? applyPassive() : undefined;
        this.thumbContainer.addEventListener(type, handler, init);
      },
      deregisterThumbContainerInteractionHandler: (type, handler) => this.thumbContainer.removeEventListener(type, handler),
      registerBodyInteractionHandler: (type, handler) => document.body.addEventListener(type, handler),
      deregisterBodyInteractionHandler: (type, handler) => document.body.removeEventListener(type, handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler, applyPassive()),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      notifyInput: () => {
        const value = this.mdcFoundation.getValue();

        if (value !== this.value) {
          this.value = value;
          this.dispatchEvent(new CustomEvent(INPUT_EVENT, {
            detail: this,
            composed: true,
            bubbles: true,
            cancelable: true
          }));
        }
      },
      notifyChange: () => {
        this.dispatchEvent(new CustomEvent(CHANGE_EVENT, {
          detail: this,
          composed: true,
          bubbles: true,
          cancelable: true
        }));
      },
      setThumbContainerStyleProperty: (propertyName, value) => {
        this.thumbContainerStyles[propertyName] = value;
        this.requestUpdate();
      },
      setTrackStyleProperty: (propertyName, value) => {
        this.trackStyles[propertyName] = value;
        this.requestUpdate();
      },
      setMarkerValue: value => this.pinMarkerText = value.toLocaleString(),
      setTrackMarkers: (step, max, min) => {
        // calculates the CSS for the notches on the slider. Taken from
        // https://github.com/material-components/material-components-web/blob/8f851d9ed2f75dc8b8956d15b3bb2619e59fa8a9/packages/mdc-slider/component.ts#L122
        const stepStr = step.toLocaleString();
        const maxStr = max.toLocaleString();
        const minStr = min.toLocaleString(); // keep calculation in css for better rounding/subpixel behavior

        const markerAmount = `((${maxStr} - ${minStr}) / ${stepStr})`;
        const markerWidth = '2px';
        const markerBkgdImage = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
        const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
        const markerBkgdShorthand = `${markerBkgdImage} ${markerBkgdLayout}`;
        this.trackMarkerContainerStyles['background'] = markerBkgdShorthand;
        this.requestUpdate();
      },
      isRTL: () => getComputedStyle(this.mdcRoot).direction === 'rtl'
    });
  }

  resetFoundation() {
    if (this.mdcFoundation) {
      this.mdcFoundation.destroy();
      this.mdcFoundation.init();
    }
  }
  /**
   * Layout is called on mousedown / touchstart as the dragging animations of
   * slider are calculated based off of the bounding rect which can change
   * between interactions with this component, and this is the only location
   * in the foundation that udpates the rects. e.g. scrolling horizontally
   * causes adverse effects on the bounding rect vs mouse drag / touchmove
   * location.
   */


  layout() {
    this.mdcFoundation.layout();
  }

}

__decorate([query('.mdc-slider')], SliderBase.prototype, "mdcRoot", void 0);

__decorate([query('.mdc-slider')], SliderBase.prototype, "formElement", void 0);

__decorate([query('.mdc-slider__thumb-container')], SliderBase.prototype, "thumbContainer", void 0);

__decorate([query('.mdc-slider__pin-value-marker')], SliderBase.prototype, "pinMarker", void 0);

__decorate([property({
  type: Number
}), observer(function (value) {
  this.mdcFoundation.setValue(value);
})], SliderBase.prototype, "value", void 0);

__decorate([property({
  type: Number
}), observer(function (value) {
  this.mdcFoundation.setMin(value);
})], SliderBase.prototype, "min", void 0);

__decorate([property({
  type: Number
}), observer(function (value) {
  this.mdcFoundation.setMax(value);
})], SliderBase.prototype, "max", void 0);

__decorate([property({
  type: Number
}), observer(function (value, old) {
  const oldWasDiscrete = old !== 0;
  const newIsDiscrete = value !== 0;

  if (oldWasDiscrete !== newIsDiscrete) {
    this.resetFoundation();
  }

  this.mdcFoundation.setStep(value);
})], SliderBase.prototype, "step", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function (value) {
  this.mdcFoundation.setDisabled(value);
})], SliderBase.prototype, "disabled", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], SliderBase.prototype, "pin", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function () {
  this.mdcFoundation.setupTrackMarker();
})], SliderBase.prototype, "markers", void 0);

__decorate([property({
  type: String
})], SliderBase.prototype, "pinMarkerText", void 0);

__decorate([property({
  type: Object
})], SliderBase.prototype, "trackMarkerContainerStyles", void 0);

__decorate([property({
  type: Object
})], SliderBase.prototype, "thumbContainerStyles", void 0);

__decorate([property({
  type: Object
})], SliderBase.prototype, "trackStyles", void 0);

__decorate([eventOptions({
  capture: true,
  passive: true
})], SliderBase.prototype, "layout", null); //# sourceMappingURL=mwc-slider-base.js.map