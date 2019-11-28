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

import { customElement } from "./node_modules/lit-element/lit-element.js";
import { SliderBase } from './mwc-slider-base.js';
import { style } from './mwc-slider-css.js';
let Slider = class Slider extends SliderBase {};
Slider.styles = style;
Slider = __decorate([customElement('mwc-slider')], Slider);
export { Slider };