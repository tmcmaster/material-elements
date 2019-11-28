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
import { TopAppBarBase } from "../mwc-top-app-bar/mwc-top-app-bar-base.js";
import { passiveEventOptionsIfSupported } from "../mwc-top-app-bar/mwc-top-app-bar-base-base.js";
import MDCFixedTopAppBarFoundation from "../top-app-bar/fixed/foundation.js";
export class TopAppBarFixedBase extends TopAppBarBase {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCFixedTopAppBarFoundation;
  }

  barClasses() {
    return Object.assign(Object.assign({}, super.barClasses()), {
      'mdc-top-app-bar--fixed': true
    });
  }

  registerListeners() {
    this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
  }

  unregisterListeners() {
    this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
  }

}