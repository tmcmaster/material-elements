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

import MDCTopAppBarFoundation from "../top-app-bar/standard/foundation.js";
import { property } from "./node_modules/lit-element/lit-element.js";
import { passiveEventOptionsIfSupported, TopAppBarBaseBase } from "./mwc-top-app-bar-base-base.js";
export class TopAppBarBase extends TopAppBarBaseBase {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCTopAppBarFoundation;
    this.prominent = false;
    this.dense = false;

    this.handleResize = () => {
      this.mdcFoundation.handleWindowResize();
    };
  }

  barClasses() {
    return {
      'mdc-top-app-bar--dense': this.dense,
      'mdc-top-app-bar--prominent': this.prominent,
      'center-title': this.centerTitle
    };
  }

  contentClasses() {
    return {
      'mdc-top-app-bar--fixed-adjust': !this.dense && !this.prominent,
      'mdc-top-app-bar--dense-fixed-adjust': this.dense && !this.prominent,
      'mdc-top-app-bar--prominent-fixed-adjust': !this.dense && this.prominent,
      'mdc-top-app-bar--dense-prominent-fixed-adjust': this.dense && this.prominent
    };
  }

  registerListeners() {
    super.registerListeners();
    window.addEventListener('resize', this.handleResize, passiveEventOptionsIfSupported);
  }

  unregisterListeners() {
    super.unregisterListeners();
    window.removeEventListener('resize', this.handleResize);
  }

}

__decorate([property({
  type: Boolean,
  reflect: true
})], TopAppBarBase.prototype, "prominent", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], TopAppBarBase.prototype, "dense", void 0); //# sourceMappingURL=mwc-top-app-bar-base.js.map