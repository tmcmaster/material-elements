import { __extends, __assign, __decorate, __read } from 'tslib/tslib.es6.js';
import { LitElement, query, property, html, css, customElement, eventOptions } from 'lit-element/lit-element.js';
import 'blocking-elements/dist/blocking-elements.js';
import 'wicg-inert/src/inert.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { directive, noChange, NodePart, templateFactory } from 'lit-html/lit-html.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
  CLOSING: 'mdc-dialog--closing',
  OPEN: 'mdc-dialog--open',
  OPENING: 'mdc-dialog--opening',
  SCROLLABLE: 'mdc-dialog--scrollable',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  STACKED: 'mdc-dialog--stacked'
};
var strings = {
  ACTION_ATTRIBUTE: 'data-mdc-dialog-action',
  BUTTON_DEFAULT_ATTRIBUTE: 'data-mdc-dialog-button-default',
  BUTTON_SELECTOR: '.mdc-dialog__button',
  CLOSED_EVENT: 'MDCDialog:closed',
  CLOSE_ACTION: 'close',
  CLOSING_EVENT: 'MDCDialog:closing',
  CONTAINER_SELECTOR: '.mdc-dialog__container',
  CONTENT_SELECTOR: '.mdc-dialog__content',
  DESTROY_ACTION: 'destroy',
  INITIAL_FOCUS_ATTRIBUTE: 'data-mdc-dialog-initial-focus',
  OPENED_EVENT: 'MDCDialog:opened',
  OPENING_EVENT: 'MDCDialog:opening',
  SCRIM_SELECTOR: '.mdc-dialog__scrim',
  SUPPRESS_DEFAULT_PRESS_SELECTOR: ['textarea', '.mdc-menu .mdc-list-item'].join(', '),
  SURFACE_SELECTOR: '.mdc-dialog__surface'
};
var numbers = {
  DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
  DIALOG_ANIMATION_OPEN_TIME_MS: 150
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation =
/** @class */
function () {
  function MDCFoundation(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }

    this.adapter_ = adapter;
  }

  Object.defineProperty(MDCFoundation, "cssClasses", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "strings", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "numbers", {
    get: function () {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFoundation, "defaultAdapter", {
    get: function () {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    },
    enumerable: true,
    configurable: true
  });

  MDCFoundation.prototype.init = function () {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function () {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCDialogFoundation =
/** @class */
function (_super) {
  __extends(MDCDialogFoundation, _super);

  function MDCDialogFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCDialogFoundation.defaultAdapter, adapter)) || this;

    _this.isOpen_ = false;
    _this.animationFrame_ = 0;
    _this.animationTimer_ = 0;
    _this.layoutFrame_ = 0;
    _this.escapeKeyAction_ = strings.CLOSE_ACTION;
    _this.scrimClickAction_ = strings.CLOSE_ACTION;
    _this.autoStackButtons_ = true;
    _this.areButtonsStacked_ = false;
    return _this;
  }

  Object.defineProperty(MDCDialogFoundation, "cssClasses", {
    get: function () {
      return cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "strings", {
    get: function () {
      return strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "numbers", {
    get: function () {
      return numbers;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDialogFoundation, "defaultAdapter", {
    get: function () {
      return {
        addBodyClass: function () {
          return undefined;
        },
        addClass: function () {
          return undefined;
        },
        areButtonsStacked: function () {
          return false;
        },
        clickDefaultButton: function () {
          return undefined;
        },
        eventTargetMatches: function () {
          return false;
        },
        getActionFromEvent: function () {
          return '';
        },
        getInitialFocusEl: function () {
          return null;
        },
        hasClass: function () {
          return false;
        },
        isContentScrollable: function () {
          return false;
        },
        notifyClosed: function () {
          return undefined;
        },
        notifyClosing: function () {
          return undefined;
        },
        notifyOpened: function () {
          return undefined;
        },
        notifyOpening: function () {
          return undefined;
        },
        releaseFocus: function () {
          return undefined;
        },
        removeBodyClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        reverseButtons: function () {
          return undefined;
        },
        trapFocus: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCDialogFoundation.prototype.init = function () {
    if (this.adapter_.hasClass(cssClasses.STACKED)) {
      this.setAutoStackButtons(false);
    }
  };

  MDCDialogFoundation.prototype.destroy = function () {
    if (this.isOpen_) {
      this.close(strings.DESTROY_ACTION);
    }

    if (this.animationTimer_) {
      clearTimeout(this.animationTimer_);
      this.handleAnimationTimerEnd_();
    }

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
      this.layoutFrame_ = 0;
    }
  };

  MDCDialogFoundation.prototype.open = function () {
    var _this = this;

    this.isOpen_ = true;
    this.adapter_.notifyOpening();
    this.adapter_.addClass(cssClasses.OPENING); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame_(function () {
      _this.adapter_.addClass(cssClasses.OPEN);

      _this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);

      _this.layout();

      _this.animationTimer_ = setTimeout(function () {
        _this.handleAnimationTimerEnd_();

        _this.adapter_.trapFocus(_this.adapter_.getInitialFocusEl());

        _this.adapter_.notifyOpened();
      }, numbers.DIALOG_ANIMATION_OPEN_TIME_MS);
    });
  };

  MDCDialogFoundation.prototype.close = function (action) {
    var _this = this;

    if (action === void 0) {
      action = '';
    }

    if (!this.isOpen_) {
      // Avoid redundant close calls (and events), e.g. from keydown on elements that inherently emit click
      return;
    }

    this.isOpen_ = false;
    this.adapter_.notifyClosing(action);
    this.adapter_.addClass(cssClasses.CLOSING);
    this.adapter_.removeClass(cssClasses.OPEN);
    this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = 0;
    clearTimeout(this.animationTimer_);
    this.animationTimer_ = setTimeout(function () {
      _this.adapter_.releaseFocus();

      _this.handleAnimationTimerEnd_();

      _this.adapter_.notifyClosed(action);
    }, numbers.DIALOG_ANIMATION_CLOSE_TIME_MS);
  };

  MDCDialogFoundation.prototype.isOpen = function () {
    return this.isOpen_;
  };

  MDCDialogFoundation.prototype.getEscapeKeyAction = function () {
    return this.escapeKeyAction_;
  };

  MDCDialogFoundation.prototype.setEscapeKeyAction = function (action) {
    this.escapeKeyAction_ = action;
  };

  MDCDialogFoundation.prototype.getScrimClickAction = function () {
    return this.scrimClickAction_;
  };

  MDCDialogFoundation.prototype.setScrimClickAction = function (action) {
    this.scrimClickAction_ = action;
  };

  MDCDialogFoundation.prototype.getAutoStackButtons = function () {
    return this.autoStackButtons_;
  };

  MDCDialogFoundation.prototype.setAutoStackButtons = function (autoStack) {
    this.autoStackButtons_ = autoStack;
  };

  MDCDialogFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };
  /** Handles click on the dialog root element. */


  MDCDialogFoundation.prototype.handleClick = function (evt) {
    var isScrim = this.adapter_.eventTargetMatches(evt.target, strings.SCRIM_SELECTOR); // Check for scrim click first since it doesn't require querying ancestors.

    if (isScrim && this.scrimClickAction_ !== '') {
      this.close(this.scrimClickAction_);
    } else {
      var action = this.adapter_.getActionFromEvent(evt);

      if (action) {
        this.close(action);
      }
    }
  };
  /** Handles keydown on the dialog root element. */


  MDCDialogFoundation.prototype.handleKeydown = function (evt) {
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;

    if (!isEnter) {
      return;
    }

    var action = this.adapter_.getActionFromEvent(evt);

    if (action) {
      // Action button callback is handled in `handleClick`,
      // since space/enter keydowns on buttons trigger click events.
      return;
    }

    var isDefault = !this.adapter_.eventTargetMatches(evt.target, strings.SUPPRESS_DEFAULT_PRESS_SELECTOR);

    if (isEnter && isDefault) {
      this.adapter_.clickDefaultButton();
    }
  };
  /** Handles keydown on the document. */


  MDCDialogFoundation.prototype.handleDocumentKeydown = function (evt) {
    var isEscape = evt.key === 'Escape' || evt.keyCode === 27;

    if (isEscape && this.escapeKeyAction_ !== '') {
      this.close(this.escapeKeyAction_);
    }
  };

  MDCDialogFoundation.prototype.layoutInternal_ = function () {
    if (this.autoStackButtons_) {
      this.detectStackedButtons_();
    }

    this.detectScrollableContent_();
  };

  MDCDialogFoundation.prototype.handleAnimationTimerEnd_ = function () {
    this.animationTimer_ = 0;
    this.adapter_.removeClass(cssClasses.OPENING);
    this.adapter_.removeClass(cssClasses.CLOSING);
  };
  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   */


  MDCDialogFoundation.prototype.runNextAnimationFrame_ = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(function () {
      _this.animationFrame_ = 0;
      clearTimeout(_this.animationTimer_);
      _this.animationTimer_ = setTimeout(callback, 0);
    });
  };

  MDCDialogFoundation.prototype.detectStackedButtons_ = function () {
    // Remove the class first to let us measure the buttons' natural positions.
    this.adapter_.removeClass(cssClasses.STACKED);
    var areButtonsStacked = this.adapter_.areButtonsStacked();

    if (areButtonsStacked) {
      this.adapter_.addClass(cssClasses.STACKED);
    }

    if (areButtonsStacked !== this.areButtonsStacked_) {
      this.adapter_.reverseButtons();
      this.areButtonsStacked_ = areButtonsStacked;
    }
  };

  MDCDialogFoundation.prototype.detectScrollableContent_ = function () {
    // Remove the class first to let us measure the natural height of the content.
    this.adapter_.removeClass(cssClasses.SCROLLABLE);

    if (this.adapter_.isContentScrollable()) {
      this.adapter_.addClass(cssClasses.SCROLLABLE);
    }
  };

  return MDCDialogFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Stores result from applyPassive to avoid redundant processing to detect
 * passive event listener support.
 */
var supportsPassive_;
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */

function applyPassive(globalObj, forceRefresh) {
  if (globalObj === void 0) {
    globalObj = window;
  }

  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported_1 = false;

    try {
      globalObj.document.addEventListener('test', function () {
        return undefined;
      }, {
        get passive() {
          isSupported_1 = true;
          return isSupported_1;
        }

      });
    } catch (e) {} // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.


    supportsPassive_ = isSupported_1;
  }

  return supportsPassive_ ? {
    passive: true
  } : false;
}

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
  if (element.closest) {
    return element.closest(selector);
  }

  var el = element;

  while (el) {
    if (matches(el, selector)) {
      return el;
    }

    el = el.parentElement;
  }

  return null;
}
function matches(element, selector) {
  var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
  return nativeMatches.call(element, selector);
}

const observer = observer => // eslint-disable-next-line @typescript-eslint/no-explicit-any
(proto, propName) => {
  // if we haven't wrapped `updated` in this class, do so
  if (!proto.constructor._observers) {
    proto.constructor._observers = new Map();
    const userUpdated = proto.updated;

    proto.updated = function (changedProperties) {
      userUpdated.call(this, changedProperties);
      changedProperties.forEach((v, k) => {
        const observer = this.constructor._observers.get(k);

        if (observer !== undefined) {
          observer.call(this, this[k], v);
        }
      });
    }; // clone any existing observers (superclasses)

  } else if (!proto.constructor.hasOwnProperty('_observers')) {
    const observers = proto.constructor._observers;
    proto.constructor._observers = new Map();
    observers.forEach( // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (v, k) => proto.constructor._observers.set(k, v));
  } // set this method


  proto.constructor._observers.set(propName, observer);
};

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
function findAssignedElement(slot, selector) {
  for (const node of slot.assignedNodes({
    flatten: true
  })) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node;

      if (matches(el, selector)) {
        return el;
      }
    }
  }

  return null;
}
function addHasRemoveClass(element) {
  return {
    addClass: className => {
      element.classList.add(className);
    },
    removeClass: className => {
      element.classList.remove(className);
    },
    hasClass: className => element.classList.contains(className)
  };
}
let supportsPassive = false;

const fn = () => {};

const optionsBlock = {
  get passive() {
    supportsPassive = true;
    return false;
  }

};
document.addEventListener('x', fn, optionsBlock);
document.removeEventListener('x', fn);
/**
 * Do event listeners suport the `passive` option?
 */

const supportsPassiveEventListener = supportsPassive;

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
class BaseElement extends LitElement {
  /**
   * Create and attach the MDC Foundation to the instance
   */
  createFoundation() {
    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.destroy();
    }

    this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
    this.mdcFoundation.init();
  }

  firstUpdated() {
    this.createFoundation();
  }

}

const blockingElements = document.$blockingElements;
class DialogBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.hideActions = false;
    this.stacked = false;
    this.heading = '';
    this.scrimClickAction = 'close';
    this.escapeKeyAction = 'close';
    this.open = false;
    this.defaultAction = 'close';
    this.actionAttribute = 'dialogAction';
    this.initialFocusAttribute = 'dialogInitialFocus';
    this.mdcFoundationClass = MDCDialogFoundation;
    this.boundLayout = null;
    this.boundHandleClick = null;
    this.boundHandleKeydown = null;
    this.boundHandleDocumentKeydown = null;
  }

  get primaryButton() {
    let assignedNodes = this.primarySlot.assignedNodes();
    assignedNodes = assignedNodes.filter(node => node instanceof HTMLElement);
    const button = assignedNodes[0];
    return button ? button : null;
  }

  emitNotification(name, action) {
    const init = {
      detail: action ? {
        action
      } : {}
    };
    const ev = new CustomEvent(name, init);
    this.dispatchEvent(ev);
  }

  getInitialFocusEl() {
    const initFocusSelector = `[${this.initialFocusAttribute}]`; // only search light DOM. This typically handles all the cases

    const lightDomQs = this.querySelector(initFocusSelector);

    if (lightDomQs) {
      return lightDomQs;
    } // if not in light dom, search each flattened distributed node.


    const primarySlot = this.primarySlot;
    const primaryNodes = primarySlot.assignedNodes({
      flatten: true
    });
    const primaryFocusElement = this.searchNodeTreesForAttribute(primaryNodes, this.initialFocusAttribute);

    if (primaryFocusElement) {
      return primaryFocusElement;
    }

    const secondarySlot = this.secondarySlot;
    const secondaryNodes = secondarySlot.assignedNodes({
      flatten: true
    });
    const secondaryFocusElement = this.searchNodeTreesForAttribute(secondaryNodes, this.initialFocusAttribute);

    if (secondaryFocusElement) {
      return secondaryFocusElement;
    }

    const contentSlot = this.contentSlot;
    const contentNodes = contentSlot.assignedNodes({
      flatten: true
    });
    const initFocusElement = this.searchNodeTreesForAttribute(contentNodes, this.initialFocusAttribute);
    return initFocusElement;
  }

  searchNodeTreesForAttribute(nodes, attribute) {
    for (const node of nodes) {
      if (!(node instanceof HTMLElement)) {
        continue;
      }

      if (node.hasAttribute(attribute)) {
        return node;
      } else {
        const selection = node.querySelector(`[${attribute}]`);

        if (selection) {
          return selection;
        }
      }
    }

    return null;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      addBodyClass: () => document.body.style.overflow = 'hidden',
      removeBodyClass: () => document.body.style.overflow = '',
      areButtonsStacked: () => this.stacked,
      clickDefaultButton: () => {
        const primary = this.primaryButton;

        if (primary) {
          primary.click();
        }
      },
      eventTargetMatches: (target, selector) => target ? matches(target, selector) : false,
      getActionFromEvent: e => {
        if (!e.target) {
          return '';
        }

        const element = closest(e.target, `[${this.actionAttribute}]`);
        const action = element && element.getAttribute(this.actionAttribute);
        return action;
      },
      getInitialFocusEl: () => {
        return this.getInitialFocusEl();
      },
      isContentScrollable: () => {
        const el = this.contentElement;
        return el ? el.scrollHeight > el.offsetHeight : false;
      },
      notifyClosed: action => this.emitNotification('closed', action),
      notifyClosing: action => {
        if (!this.closingDueToDisconnect) {
          // Don't set our open state to closed just because we were
          // disconnected. That way if we get reconnected, we'll know to
          // re-open.
          this.open = false;
        }

        this.emitNotification('closing', action);
      },
      notifyOpened: () => this.emitNotification('opened'),
      notifyOpening: () => {
        this.open = true;
        this.emitNotification('opening');
      },
      reverseButtons: () => {},
      releaseFocus: () => {
        blockingElements.remove(this);
      },
      trapFocus: el => {
        blockingElements.push(this);

        if (el) {
          el.focus();
        }
      }
    });
  }

  render() {
    const classes = {
      [cssClasses.STACKED]: this.stacked
    };
    let heading = html``;

    if (this.heading) {
      heading = html`
        <h2 id="title" class="mdc-dialog__title">${this.heading}</h2>`;
    }

    const actionsClasses = {
      'mdc-dialog__actions': !this.hideActions
    };
    return html`
    <div class="mdc-dialog ${classMap(classes)}"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="title"
        aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          ${heading}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer
              id="actions"
              class="${classMap(actionsClasses)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
             <slot name="primaryAction"></slot>
            </span>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`;
  }

  firstUpdated() {
    super.firstUpdated();
    this.mdcFoundation.setAutoStackButtons(true);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.open && this.mdcFoundation && !this.mdcFoundation.isOpen()) {
      // We probably got disconnected while we were still open. Re-open,
      // matching the behavior of native <dialog>.
      this.setEventListeners();
      this.mdcFoundation.open();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.open && this.mdcFoundation) {
      // If this dialog is opened and then disconnected, we want to close
      // the foundation, so that 1) any pending timers are cancelled
      // (in particular for trapFocus), and 2) if we reconnect, we can open
      // the foundation again to retrigger animations and focus.
      this.removeEventListeners();
      this.closingDueToDisconnect = true;
      this.mdcFoundation.close(this.currentAction || this.defaultAction);
      this.closingDueToDisconnect = false;
      this.currentAction = undefined; // When we close normally, the releaseFocus callback handles removing
      // ourselves from the blocking elements stack. However, that callback
      // happens on a delay, and when we are closing due to a disconnect we
      // need to remove ourselves before the blocking element polyfill's
      // mutation observer notices and logs a warning, since it's not valid to
      // be in the blocking elements stack while disconnected.

      blockingElements.remove(this);
    }
  }

  forceLayout() {
    this.mdcFoundation.layout();
  }

  focus() {
    const initialFocusEl = this.getInitialFocusEl();
    initialFocusEl && initialFocusEl.focus();
  }

  blur() {
    if (!this.shadowRoot) {
      return;
    }

    const activeEl = this.shadowRoot.activeElement;

    if (activeEl) {
      if (activeEl instanceof HTMLElement) {
        activeEl.blur();
      }
    } else {
      const root = this.getRootNode();
      const activeEl = root instanceof Document ? root.activeElement : null;

      if (activeEl instanceof HTMLElement) {
        activeEl.blur();
      }
    }
  }

  setEventListeners() {
    this.boundHandleClick = this.mdcFoundation.handleClick.bind(this.mdcFoundation);

    this.boundLayout = () => {
      if (this.open) {
        this.mdcFoundation.layout.bind(this.mdcFoundation);
      }
    };

    this.boundHandleKeydown = this.mdcFoundation.handleKeydown.bind(this.mdcFoundation);
    this.boundHandleDocumentKeydown = this.mdcFoundation.handleDocumentKeydown.bind(this.mdcFoundation);
    this.mdcRoot.addEventListener('click', this.boundHandleClick);
    window.addEventListener('resize', this.boundLayout, applyPassive());
    window.addEventListener('orientationchange', this.boundLayout, applyPassive());
    this.addEventListener('keydown', this.boundHandleKeydown, applyPassive());
    document.addEventListener('keydown', this.boundHandleDocumentKeydown, applyPassive());
  }

  removeEventListeners() {
    if (this.boundHandleClick) {
      this.mdcRoot.removeEventListener('click', this.boundHandleClick);
    }

    if (this.boundLayout) {
      window.removeEventListener('resize', this.boundLayout);
      window.removeEventListener('orientationchange', this.boundLayout);
    }

    if (this.boundHandleKeydown) {
      this.mdcRoot.removeEventListener('keydown', this.boundHandleKeydown);
    }

    if (this.boundHandleDocumentKeydown) {
      this.mdcRoot.removeEventListener('keydown', this.boundHandleDocumentKeydown);
    }
  }

}

__decorate([query('.mdc-dialog')], DialogBase.prototype, "mdcRoot", void 0);

__decorate([query('slot[name="primaryAction"]')], DialogBase.prototype, "primarySlot", void 0);

__decorate([query('slot[name="secondaryAction"]')], DialogBase.prototype, "secondarySlot", void 0);

__decorate([query('#contentSlot')], DialogBase.prototype, "contentSlot", void 0);

__decorate([query('.mdc-dialog__content')], DialogBase.prototype, "contentElement", void 0);

__decorate([query('.mdc-container')], DialogBase.prototype, "conatinerElement", void 0);

__decorate([property({
  type: Boolean
})], DialogBase.prototype, "hideActions", void 0);

__decorate([property({
  type: Boolean
}), observer(function () {
  this.forceLayout();
})], DialogBase.prototype, "stacked", void 0);

__decorate([property({
  type: String
})], DialogBase.prototype, "heading", void 0);

__decorate([property({
  type: String
}), observer(function (newAction) {
  this.mdcFoundation.setScrimClickAction(newAction);
})], DialogBase.prototype, "scrimClickAction", void 0);

__decorate([property({
  type: String
}), observer(function (newAction) {
  this.mdcFoundation.setEscapeKeyAction(newAction);
})], DialogBase.prototype, "escapeKeyAction", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function (isOpen) {
  // Check isConnected because we could have been disconnected before first
  // update. If we're now closed, then we shouldn't start the MDC foundation
  // opening animation. If we're now closed, then we've already closed the
  // foundation in disconnectedCallback.
  if (this.mdcFoundation && this.isConnected) {
    if (isOpen) {
      this.setEventListeners();
      this.mdcFoundation.open();
    } else {
      this.removeEventListeners();
      this.mdcFoundation.close(this.currentAction || this.defaultAction);
      this.currentAction = undefined;
    }
  }
})], DialogBase.prototype, "open", void 0);

__decorate([property()], DialogBase.prototype, "defaultAction", void 0);

__decorate([property()], DialogBase.prototype, "actionAttribute", void 0);

__decorate([property()], DialogBase.prototype, "initialFocusAttribute", void 0);

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
const style = css`.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7}.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12);display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;display:block;position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog__content{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.5rem;font-weight:400;letter-spacing:.03125em;text-decoration:inherit;text-transform:inherit;flex-grow:1;box-sizing:border-box;margin:0;padding:20px 24px;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{transform:scale(1)}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{transform:scale(1);opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}#actions:not(.mdc-dialog__actions){display:none}@media(min-width: 560px){.mdc-dialog .mdc-dialog__surface{max-width:560px;max-width:var(--mdc-dialog-max-width, 560px)}}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32);background-color:var(--mdc-dialog-scrim-color, rgba(0, 0, 0, 0.32))}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87);color:var(--mdc-dialog-heading-ink-color, rgba(0, 0, 0, 0.87))}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6);color:var(--mdc-dialog-content-ink-color, rgba(0, 0, 0, 0.6))}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0,0,0,.12);border-color:var(--mdc-dialog-scroll-divider-color, rgba(0, 0, 0, 0.12))}.mdc-dialog .mdc-dialog__surface{min-width:280px;min-width:var(--mdc-dialog-min-width, 280px)}.mdc-dialog .mdc-dialog__surface{max-height:var(--mdc-dialog-max-height, calc(100% - 32px));border-radius:4px;border-radius:var(--mdc-dialog-shape-radius, 4px)}#actions ::slotted(*){margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] #actions ::slotted(*),#actions ::slotted(*)[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog[dir=rtl] #actions ::slotted(*),[dir=rtl] .mdc-dialog #actions ::slotted(*){text-align:left}.mdc-dialog--stacked #actions{flex-direction:column-reverse}.mdc-dialog--stacked #actions *:not(:last-child) ::slotted(*){flex-basis:1e-9px;margin-top:12px}`;

let Dialog = class Dialog extends DialogBase {};
Dialog.styles = style;
Dialog = __decorate([customElement('mwc-dialog')], Dialog);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$1 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded'
};
var strings$1 = {
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top'
};
var numbers$1 = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
};

/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  var document = windowObj.document;
  var node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug'; // Append to head instead of body because this script might be invoked in the
  // head, in which case the body doesn't exist yet. The probe works either way.

  document.head.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  var computedStyle = windowObj.getComputedStyle(node);
  var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';

  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }

  return hasPseudoVarBug;
}

function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }

  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables_;
  }

  var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return false;
  }

  var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  var weAreFeatureDetectingSafari10plus = CSS.supports('(--css-vars: yes)') && CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVars = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVars = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }

  return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return {
      x: 0,
      y: 0
    };
  }

  var x = pageOffset.x,
      y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY; // Determine touch point relative to the ripple container.

  if (evt.type === 'touchstart') {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup', 'contextmenu']; // simultaneous nested activations

var activatedTargets = [];

var MDCRippleFoundation =
/** @class */
function (_super) {
  __extends(MDCRippleFoundation, _super);

  function MDCRippleFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;

    _this.activationAnimationHasEnded_ = false;
    _this.activationTimer_ = 0;
    _this.fgDeactivationRemovalTimer_ = 0;
    _this.fgScale_ = '0';
    _this.frame_ = {
      width: 0,
      height: 0
    };
    _this.initialSize_ = 0;
    _this.layoutFrame_ = 0;
    _this.maxRadius_ = 0;
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    _this.activationState_ = _this.defaultActivationState_();

    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;

      _this.runDeactivationUXLogicIfReady_();
    };

    _this.activateHandler_ = function (e) {
      return _this.activate_(e);
    };

    _this.deactivateHandler_ = function () {
      return _this.deactivate_();
    };

    _this.focusHandler_ = function () {
      return _this.handleFocus();
    };

    _this.blurHandler_ = function () {
      return _this.handleBlur();
    };

    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    return _this;
  }

  Object.defineProperty(MDCRippleFoundation, "cssClasses", {
    get: function () {
      return cssClasses$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "strings", {
    get: function () {
      return strings$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "numbers", {
    get: function () {
      return numbers$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        browserSupportsCssVars: function () {
          return true;
        },
        computeBoundingRect: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        containsEventTarget: function () {
          return true;
        },
        deregisterDocumentInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        deregisterResizeHandler: function () {
          return undefined;
        },
        getWindowPageOffset: function () {
          return {
            x: 0,
            y: 0
          };
        },
        isSurfaceActive: function () {
          return true;
        },
        isSurfaceDisabled: function () {
          return true;
        },
        isUnbounded: function () {
          return true;
        },
        registerDocumentInteractionHandler: function () {
          return undefined;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        registerResizeHandler: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        updateCssVariable: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCRippleFoundation.prototype.init = function () {
    var _this = this;

    var supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      var _a = MDCRippleFoundation.cssClasses,
          ROOT_1 = _a.ROOT,
          UNBOUNDED_1 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.addClass(ROOT_1);

        if (_this.adapter_.isUnbounded()) {
          _this.adapter_.addClass(UNBOUNDED_1); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple


          _this.layoutInternal_();
        }
      });
    }
  };

  MDCRippleFoundation.prototype.destroy = function () {
    var _this = this;

    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      var _a = MDCRippleFoundation.cssClasses,
          ROOT_2 = _a.ROOT,
          UNBOUNDED_2 = _a.UNBOUNDED;
      requestAnimationFrame(function () {
        _this.adapter_.removeClass(ROOT_2);

        _this.adapter_.removeClass(UNBOUNDED_2);

        _this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };
  /**
   * @param evt Optional event containing position information.
   */


  MDCRippleFoundation.prototype.activate = function (evt) {
    this.activate_(evt);
  };

  MDCRippleFoundation.prototype.deactivate = function () {
    this.deactivate_();
  };

  MDCRippleFoundation.prototype.layout = function () {
    var _this = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(function () {
      _this.layoutInternal_();

      _this.layoutFrame_ = 0;
    });
  };

  MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
    var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  };

  MDCRippleFoundation.prototype.handleFocus = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };

  MDCRippleFoundation.prototype.handleBlur = function () {
    var _this = this;

    requestAnimationFrame(function () {
      return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
    });
  };
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   */


  MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
    return this.adapter_.browserSupportsCssVars();
  };

  MDCRippleFoundation.prototype.defaultActivationState_ = function () {
    return {
      activationEvent: undefined,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  /**
   * supportsPressRipple Passed from init to save a redundant function call
   */


  MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
    var _this = this;

    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
      });

      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  };

  MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
    var _this = this;

    if (evt.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
        _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
      });
    }
  };

  MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
    var _this = this;

    ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  };

  MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
    var _this = this;

    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
      _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
    });
  };

  MDCRippleFoundation.prototype.removeCssVars_ = function () {
    var _this = this;

    var rippleStrings = MDCRippleFoundation.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function (key) {
      if (key.indexOf('VAR_') === 0) {
        _this.adapter_.updateCssVariable(rippleStrings[key], null);
      }
    });
  };

  MDCRippleFoundation.prototype.activate_ = function (evt) {
    var _this = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = evt === undefined;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
    var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
      return _this.adapter_.containsEventTarget(target);
    });

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (evt !== undefined) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(function () {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && evt !== undefined && (evt.key === ' ' || evt.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);

        if (activationState.wasElementMadeActive) {
          _this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        _this.activationState_ = _this.defaultActivationState_();
      }
    });
  };

  MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
    return evt !== undefined && evt.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  };

  MDCRippleFoundation.prototype.animateActivation_ = function () {
    var _this = this;

    var _a = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
    var _b = MDCRippleFoundation.cssClasses,
        FG_DEACTIVATION = _b.FG_DEACTIVATION,
        FG_ACTIVATION = _b.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal_();
    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates_(),
          startPoint = _c.startPoint,
          endPoint = _c.endPoint;

      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
    var _a = this.activationState_,
        activationEvent = _a.activationEvent,
        wasActivatedByPointer = _a.wasActivatedByPointer;
    var startPoint;

    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint: startPoint,
      endPoint: endPoint
    };
  };

  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
    var _this = this; // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.


    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _a = this.activationState_,
        hasDeactivationUXRun = _a.hasDeactivationUXRun,
        isActivated = _a.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this.adapter_.removeClass(FG_DEACTIVATION);
      }, numbers$1.FG_DEACTIVATION_MS);
    }
  };

  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
    var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  MDCRippleFoundation.prototype.resetActivationState_ = function () {
    var _this = this;

    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(function () {
      return _this.previousActivationEvent_ = undefined;
    }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  };

  MDCRippleFoundation.prototype.deactivate_ = function () {
    var _this = this;

    var activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    var state = __assign({}, activationState);

    if (activationState.isProgrammatic) {
      requestAnimationFrame(function () {
        return _this.animateDeactivation_(state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function () {
        _this.activationState_.hasDeactivationUXRun = true;

        _this.animateDeactivation_(state);

        _this.resetActivationState_();
      });
    }
  };

  MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
    var wasActivatedByPointer = _a.wasActivatedByPointer,
        wasElementMadeActive = _a.wasElementMadeActive;

    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.layoutInternal_ = function () {
    var _this = this;

    this.frame_ = this.adapter_.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    var getBoundedRadius = function () {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    var initialSize = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE); // Unbounded ripple size should always be even number to equally center align.

    if (this.adapter_.isUnbounded() && initialSize % 2 !== 0) {
      this.initialSize_ = initialSize - 1;
    } else {
      this.initialSize_ = initialSize;
    }

    this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  };

  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
    var _a = MDCRippleFoundation.strings,
        VAR_FG_SIZE = _a.VAR_FG_SIZE,
        VAR_LEFT = _a.VAR_LEFT,
        VAR_TOP = _a.VAR_TOP,
        VAR_FG_SCALE = _a.VAR_FG_SCALE;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
    }
  };

  return MDCRippleFoundation;
}(MDCFoundation);

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
const style$1 = css`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}`;

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
const supportsCssVariablesWin = supportsCssVariables(window); // NOTE: This is a workaround for
// https://bugs.webkit.org/show_bug.cgi?id=173027. Since keyframes on
// pseudo-elements (:after) are not supported in Shadow DOM, we put the keyframe
// style into the <head> element.

const isSafari = navigator.userAgent.match(/Safari/);
let didApplyRippleStyle = false;

const applyRippleStyle = () => {
  didApplyRippleStyle = true;
  const part = new NodePart({
    templateFactory
  }); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

  part.appendInto(document.head);
  part.setValue(style$1);
  part.commit();
};
/**
 * Applied a ripple to the node specified by {surfaceNode}.
 * @param options {RippleNodeOptions}
 */


const rippleNode = options => {
  if (isSafari && !didApplyRippleStyle) {
    applyRippleStyle();
  } // TODO(sorvell): This directive requires bringing css yourself. We probably
  // need to do this because of ShadyCSS, but on Safari, the keyframes styling
  // must be global. Perhaps this directive could fix that.


  const surfaceNode = options.surfaceNode;
  const interactionNode = options.interactionNode || surfaceNode; // only style interaction node if not in the same root

  if (interactionNode.getRootNode() !== surfaceNode.getRootNode()) {
    if (interactionNode.style.position === '') {
      interactionNode.style.position = 'relative';
    }
  }

  const adapter = {
    browserSupportsCssVars: () => supportsCssVariablesWin,
    isUnbounded: () => options.unbounded === undefined ? true : options.unbounded,
    isSurfaceActive: () => matches(interactionNode, ':active'),
    isSurfaceDisabled: () => Boolean(interactionNode.hasAttribute('disabled')),
    addClass: className => surfaceNode.classList.add(className),
    removeClass: className => surfaceNode.classList.remove(className),
    containsEventTarget: target => interactionNode.contains(target),
    registerInteractionHandler: (type, handler) => interactionNode.addEventListener(type, handler, applyPassive()),
    deregisterInteractionHandler: (type, handler) => interactionNode.removeEventListener(type, handler, applyPassive()),
    registerDocumentInteractionHandler: (evtType, handler) => // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.documentElement.addEventListener(evtType, handler, applyPassive()),
    deregisterDocumentInteractionHandler: (evtType, handler) => // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.documentElement.removeEventListener(evtType, handler, applyPassive()),
    registerResizeHandler: handler => window.addEventListener('resize', handler),
    deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
    updateCssVariable: (varName, value) => surfaceNode.style.setProperty(varName, value),
    computeBoundingRect: () => surfaceNode.getBoundingClientRect(),
    getWindowPageOffset: () => ({
      x: window.pageXOffset,
      y: window.pageYOffset
    })
  };
  const rippleFoundation = new MDCRippleFoundation(adapter);
  rippleFoundation.init();
  return rippleFoundation;
};
const rippleInteractionNodes = new WeakMap();
/**
 * A directive that applies a Material ripple to a part node. The directive
 * should be applied to a PropertyPart.
 * @param options {RippleOptions}
 */

const ripple = directive((options = {}) => part => {
  const surfaceNode = part.committer.element;
  const interactionNode = options.interactionNode || surfaceNode;
  let rippleFoundation = part.value; // if the interaction node changes, destroy and invalidate the foundation.

  const existingInteractionNode = rippleInteractionNodes.get(rippleFoundation);

  if (existingInteractionNode !== undefined && existingInteractionNode !== interactionNode) {
    rippleFoundation.destroy();
    rippleFoundation = noChange;
  } // make the ripple, if needed


  if (rippleFoundation === noChange) {
    rippleFoundation = rippleNode(Object.assign({}, options, {
      surfaceNode
    }));
    rippleInteractionNodes.set(rippleFoundation, interactionNode);
    part.setValue(rippleFoundation); // otherwise update settings as needed.
  } else {
    if (options.unbounded !== undefined) {
      rippleFoundation.setUnbounded(options.unbounded);
    }

    if (options.disabled !== undefined) {
      rippleFoundation.setUnbounded(options.disabled);
    }
  }

  if (options.active === true) {
    rippleFoundation.activate();
  } else if (options.active === false) {
    rippleFoundation.deactivate();
  }
});

class IconButtonBase extends LitElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.icon = '';
    this.label = '';
  }

  render() {
    return html`<button
    .ripple="${ripple()}"
    class="mdc-icon-button"
    aria-label="${this.label || this.icon}"
    ?disabled="${this.disabled}">
    <i class="material-icons">${this.icon}</i>
    <slot></slot>
  </button>`;
  }

}

__decorate([property({
  type: Boolean,
  reflect: true
})], IconButtonBase.prototype, "disabled", void 0);

__decorate([property({
  type: String
})], IconButtonBase.prototype, "icon", void 0);

__decorate([property({
  type: String
})], IconButtonBase.prototype, "label", void 0);

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
const style$2 = css`.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-icon-button{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-icon-button::before,.mdc-icon-button::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-icon-button::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-icon-button.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button::before,.mdc-icon-button::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded::before,.mdc-icon-button.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button::before,.mdc-icon-button::after{background-color:#000}.mdc-icon-button:hover::before{opacity:.04}.mdc-icon-button.mdc-ripple-upgraded--background-focused::before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-icon-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-block;outline:none}:host,.mdc-icon-button{vertical-align:top}.mdc-icon-button{width:var(--mdc-icon-button-size, 48px);height:var(--mdc-icon-button-size, 48px);padding:calc((var(--mdc-icon-button-size, 48px) - var(--mdc-icon-size, 24px)) / 2)}.mdc-icon-button>i{position:absolute;top:0;padding-top:inherit}.mdc-icon-button i,.mdc-icon-button svg,.mdc-icon-button img,.mdc-icon-button ::slotted(*){display:block;width:var(--mdc-icon-size, 24px);height:var(--mdc-icon-size, 24px)}.mdc-ripple-upgraded:focus::before,.mdc-ripple-upgraded:focus::after{background-color:currentColor;background-color:var(--mdc-theme-on-primary, currentColor);opacity:.12;opacity:var(--mdc-icon-button-ripple-opacity, 0.12)}`;

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
let IconButton = class IconButton extends IconButtonBase {};
IconButton.styles = style$2;
IconButton = __decorate([customElement('mwc-icon-button')], IconButton);

class ButtonBase extends LitElement {
  constructor() {
    super(...arguments);
    this.raised = false;
    this.unelevated = false;
    this.outlined = false;
    this.dense = false;
    this.disabled = false;
    this.trailingIcon = false;
    this.icon = '';
    this.label = '';
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  focus() {
    const buttonElement = this.buttonElement;

    if (buttonElement) {
      const ripple = buttonElement.ripple;

      if (ripple) {
        ripple.handleFocus();
      }

      buttonElement.focus();
    }
  }

  blur() {
    const buttonElement = this.buttonElement;

    if (buttonElement) {
      const ripple = buttonElement.ripple;

      if (ripple) {
        ripple.handleBlur();
      }

      buttonElement.blur();
    }
  }

  render() {
    const classes = {
      'mdc-button--raised': this.raised,
      'mdc-button--unelevated': this.unelevated,
      'mdc-button--outlined': this.outlined,
      'mdc-button--dense': this.dense
    };
    const mdcButtonIcon = html`<span class="material-icons mdc-button__icon">${this.icon}</span>`;
    const buttonRipple = ripple({
      unbounded: false
    });
    return html`
      <button id="button"
              .ripple="${buttonRipple}"
              class="mdc-button ${classMap(classes)}"
              ?disabled="${this.disabled}"
              aria-label="${this.label || this.icon}">
        <div class="mdc-button__ripple"></div>
        ${this.icon && !this.trailingIcon ? mdcButtonIcon : ''}
        <span class="mdc-button__label">${this.label}</span>
        ${this.icon && this.trailingIcon ? mdcButtonIcon : ''}
        <slot></slot>
      </button>`;
  }

}

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "raised", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "unelevated", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "outlined", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "dense", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], ButtonBase.prototype, "disabled", void 0);

__decorate([property({
  type: Boolean
})], ButtonBase.prototype, "trailingIcon", void 0);

__decorate([property()], ButtonBase.prototype, "icon", void 0);

__decorate([property()], ButtonBase.prototype, "label", void 0);

__decorate([query('#button')], ButtonBase.prototype, "buttonElement", void 0);

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
const style$3 = css`.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-elevation-overlay{background-color:#fff}.mdc-button{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.0892857143em;text-decoration:none;text-transform:uppercase;padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:disabled{background-color:transparent}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0,0,0,.37)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee}@supports not (-ms-ime-align: auto){.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-primary, #6200ee)}}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0,0,0,.12)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0,0,0,.37)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined:not(:disabled){border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--outlined:disabled{border-color:rgba(0,0,0,.37)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-button{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button .mdc-button__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded .mdc-button__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-button.mdc-ripple-upgraded--foreground-activation .mdc-button__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation .mdc-button__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{background-color:#6200ee}@supports not (-ms-ime-align: auto){.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{background-color:var(--mdc-theme-primary, #6200ee)}}.mdc-button:hover .mdc-button__ripple::before{opacity:.04}.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:.12}.mdc-button:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:.12}.mdc-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-button .mdc-button__ripple{position:absolute;box-sizing:content-box;width:100%;height:100%;overflow:hidden}.mdc-button:not(.mdc-button--outlined) .mdc-button__ripple{top:0;left:0}.mdc-button--raised .mdc-button__ripple::before,.mdc-button--raised .mdc-button__ripple::after,.mdc-button--unelevated .mdc-button__ripple::before,.mdc-button--unelevated .mdc-button__ripple::after{background-color:#fff}@supports not (-ms-ime-align: auto){.mdc-button--raised .mdc-button__ripple::before,.mdc-button--raised .mdc-button__ripple::after,.mdc-button--unelevated .mdc-button__ripple::before,.mdc-button--unelevated .mdc-button__ripple::after{background-color:var(--mdc-theme-on-primary, #fff)}}.mdc-button--raised:hover .mdc-button__ripple::before,.mdc-button--unelevated:hover .mdc-button__ripple::before{opacity:.08}.mdc-button--raised.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--raised:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before,.mdc-button--unelevated.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:.24}.mdc-button--raised:not(.mdc-ripple-upgraded) .mdc-button__ripple::after,.mdc-button--unelevated:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button--raised:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:.24}.mdc-button--raised.mdc-ripple-upgraded,.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-button{height:36px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;outline:none;vertical-align:top}:host([disabled]){pointer-events:none}.mdc-button{flex:auto;text-transform:var(--mdc-button-text-transform, uppercase);letter-spacing:var(--mdc-button-letter-spacing, 0.0892857143em);padding:0 var(--mdc-button-horizontal-padding, 8px) 0 var(--mdc-button-horizontal-padding, 8px)}.mdc-button.mdc-button--raised,.mdc-button.mdc-button--unelevated{padding:0 var(--mdc-button-horizontal-padding, 16px) 0 var(--mdc-button-horizontal-padding, 16px)}.mdc-button.mdc-button--outlined{padding:0 calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px)) 0 calc(var(--mdc-button-horizontal-padding, 16px) - var(--mdc-button-outline-width, 1px));border-width:var(--mdc-button-outline-width, 1px);border-color:var(--mdc-button-outline-color, var(--mdc-theme-primary, #6200ee))}:host([disabled]) .mdc-button.mdc-button--raised,:host([disabled]) .mdc-button.mdc-button--unelevated{background-color:var(--mdc-button-disabled-fill-color, rgba(0, 0, 0, 0.12));color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.37))}:host([disabled]) .mdc-button:not(.mdc-button--raised):not(.mdc-button--unelevated){color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.37))}:host([disabled]) .mdc-button.mdc-button--outlined{border-color:var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.37));border-color:var(--mdc-button-disabled-outline-color, var(--mdc-button-disabled-ink-color, rgba(0, 0, 0, 0.37)))}`;

let Button = class Button extends ButtonBase {};
Button.styles = style$3;
Button = __decorate([customElement('mwc-button')], Button);

class FabBase extends LitElement {
  constructor() {
    super(...arguments);
    this.mini = false;
    this.exited = false;
    this.disabled = false;
    this.extended = false;
    this.showIconAtEnd = false;
    this.icon = '';
    this.label = '';
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  render() {
    const classes = {
      'mdc-fab--mini': this.mini,
      'mdc-fab--exited': this.exited,
      'mdc-fab--extended': this.extended
    };
    const showLabel = this.label !== '' && this.extended;
    let iconTemplate = '';

    if (this.icon) {
      iconTemplate = html`
        <span class="material-icons mdc-fab__icon">${this.icon}</span>`;
    }

    let label = html``;

    if (showLabel) {
      label = html`<span class="mdc-fab__label">${this.label}</span>`;
    }

    return html`
      <button
          class="mdc-fab ${classMap(classes)}"
          ?disabled="${this.disabled}"
          aria-label="${this.label || this.icon}"
          .ripple="${ripple()}">
        <div class="mdc-fab__ripple"></div>
        ${this.showIconAtEnd ? label : ''}
        ${iconTemplate}
        ${!this.showIconAtEnd ? label : ''}
      </button>`;
  }

}

__decorate([property({
  type: Boolean
})], FabBase.prototype, "mini", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "exited", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "disabled", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "extended", void 0);

__decorate([property({
  type: Boolean
})], FabBase.prototype, "showIconAtEnd", void 0);

__decorate([property()], FabBase.prototype, "icon", void 0);

__decorate([property()], FabBase.prototype, "label", void 0);

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
const style$4 = css`.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.mdc-touch-target-wrapper{display:inline}.mdc-fab{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);background-color:#018786;color:#fff;color:var(--mdc-theme-on-secondary, #fff)}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover,.mdc-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-fab:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}@supports not (-ms-ime-align: auto){.mdc-fab{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-fab .mdc-fab__icon{width:24px;height:24px;font-size:24px}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.0892857143em;text-decoration:none;text-transform:uppercase;border-radius:24px;padding:0 20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:-8px;margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:-8px}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:-8px;margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;right:0;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-fab{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-fab .mdc-fab__ripple::before,.mdc-fab .mdc-fab__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-fab .mdc-fab__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-fab.mdc-ripple-upgraded .mdc-fab__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-fab.mdc-ripple-upgraded .mdc-fab__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-fab.mdc-ripple-upgraded--unbounded .mdc-fab__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-fab.mdc-ripple-upgraded--foreground-activation .mdc-fab__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-fab.mdc-ripple-upgraded--foreground-deactivation .mdc-fab__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-fab .mdc-fab__ripple::before,.mdc-fab .mdc-fab__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-fab.mdc-ripple-upgraded .mdc-fab__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-fab .mdc-fab__ripple::before,.mdc-fab .mdc-fab__ripple::after{background-color:#fff}@supports not (-ms-ime-align: auto){.mdc-fab .mdc-fab__ripple::before,.mdc-fab .mdc-fab__ripple::after{background-color:var(--mdc-theme-on-secondary, #fff)}}.mdc-fab:hover .mdc-fab__ripple::before{opacity:.08}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__ripple::before,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__ripple::before{transition-duration:75ms;opacity:.24}.mdc-fab:not(.mdc-ripple-upgraded) .mdc-fab__ripple::after{transition:opacity 150ms linear}.mdc-fab:not(.mdc-ripple-upgraded):active .mdc-fab__ripple::after{transition-duration:75ms;opacity:.24}.mdc-fab.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-fab .mdc-fab__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden}:host{outline:none}`;

let Fab = class Fab extends FabBase {};
Fab.styles = style$4;
Fab = __decorate([customElement('mwc-fab')], Fab);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$2 = {
  ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
  ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
  ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
  ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked',
  ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
  ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
  BACKGROUND: 'mdc-checkbox__background',
  CHECKED: 'mdc-checkbox--checked',
  CHECKMARK: 'mdc-checkbox__checkmark',
  CHECKMARK_PATH: 'mdc-checkbox__checkmark-path',
  DISABLED: 'mdc-checkbox--disabled',
  INDETERMINATE: 'mdc-checkbox--indeterminate',
  MIXEDMARK: 'mdc-checkbox__mixedmark',
  NATIVE_CONTROL: 'mdc-checkbox__native-control',
  ROOT: 'mdc-checkbox',
  SELECTED: 'mdc-checkbox--selected',
  UPGRADED: 'mdc-checkbox--upgraded'
};
var strings$2 = {
  ARIA_CHECKED_ATTR: 'aria-checked',
  ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed',
  NATIVE_CONTROL_SELECTOR: '.mdc-checkbox__native-control',
  TRANSITION_STATE_CHECKED: 'checked',
  TRANSITION_STATE_INDETERMINATE: 'indeterminate',
  TRANSITION_STATE_INIT: 'init',
  TRANSITION_STATE_UNCHECKED: 'unchecked'
};
var numbers$2 = {
  ANIM_END_LATCH_MS: 250
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCCheckboxFoundation =
/** @class */
function (_super) {
  __extends(MDCCheckboxFoundation, _super);

  function MDCCheckboxFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCCheckboxFoundation.defaultAdapter, adapter)) || this;

    _this.currentCheckState_ = strings$2.TRANSITION_STATE_INIT;
    _this.currentAnimationClass_ = '';
    _this.animEndLatchTimer_ = 0;
    _this.enableAnimationEndHandler_ = false;
    return _this;
  }

  Object.defineProperty(MDCCheckboxFoundation, "cssClasses", {
    get: function () {
      return cssClasses$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "strings", {
    get: function () {
      return strings$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "numbers", {
    get: function () {
      return numbers$2;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCCheckboxFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        forceLayout: function () {
          return undefined;
        },
        hasNativeControl: function () {
          return false;
        },
        isAttachedToDOM: function () {
          return false;
        },
        isChecked: function () {
          return false;
        },
        isIndeterminate: function () {
          return false;
        },
        removeClass: function () {
          return undefined;
        },
        removeNativeControlAttr: function () {
          return undefined;
        },
        setNativeControlAttr: function () {
          return undefined;
        },
        setNativeControlDisabled: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCCheckboxFoundation.prototype.init = function () {
    this.currentCheckState_ = this.determineCheckState_();
    this.updateAriaChecked_();
    this.adapter_.addClass(cssClasses$2.UPGRADED);
  };

  MDCCheckboxFoundation.prototype.destroy = function () {
    clearTimeout(this.animEndLatchTimer_);
  };

  MDCCheckboxFoundation.prototype.setDisabled = function (disabled) {
    this.adapter_.setNativeControlDisabled(disabled);

    if (disabled) {
      this.adapter_.addClass(cssClasses$2.DISABLED);
    } else {
      this.adapter_.removeClass(cssClasses$2.DISABLED);
    }
  };
  /**
   * Handles the animationend event for the checkbox
   */


  MDCCheckboxFoundation.prototype.handleAnimationEnd = function () {
    var _this = this;

    if (!this.enableAnimationEndHandler_) {
      return;
    }

    clearTimeout(this.animEndLatchTimer_);
    this.animEndLatchTimer_ = setTimeout(function () {
      _this.adapter_.removeClass(_this.currentAnimationClass_);

      _this.enableAnimationEndHandler_ = false;
    }, numbers$2.ANIM_END_LATCH_MS);
  };
  /**
   * Handles the change event for the checkbox
   */


  MDCCheckboxFoundation.prototype.handleChange = function () {
    this.transitionCheckState_();
  };

  MDCCheckboxFoundation.prototype.transitionCheckState_ = function () {
    if (!this.adapter_.hasNativeControl()) {
      return;
    }

    var oldState = this.currentCheckState_;
    var newState = this.determineCheckState_();

    if (oldState === newState) {
      return;
    }

    this.updateAriaChecked_();
    var TRANSITION_STATE_UNCHECKED = strings$2.TRANSITION_STATE_UNCHECKED;
    var SELECTED = cssClasses$2.SELECTED;

    if (newState === TRANSITION_STATE_UNCHECKED) {
      this.adapter_.removeClass(SELECTED);
    } else {
      this.adapter_.addClass(SELECTED);
    } // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.


    if (this.currentAnimationClass_.length > 0) {
      clearTimeout(this.animEndLatchTimer_);
      this.adapter_.forceLayout();
      this.adapter_.removeClass(this.currentAnimationClass_);
    }

    this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
    this.currentCheckState_ = newState; // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.

    if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
      this.adapter_.addClass(this.currentAnimationClass_);
      this.enableAnimationEndHandler_ = true;
    }
  };

  MDCCheckboxFoundation.prototype.determineCheckState_ = function () {
    var TRANSITION_STATE_INDETERMINATE = strings$2.TRANSITION_STATE_INDETERMINATE,
        TRANSITION_STATE_CHECKED = strings$2.TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED = strings$2.TRANSITION_STATE_UNCHECKED;

    if (this.adapter_.isIndeterminate()) {
      return TRANSITION_STATE_INDETERMINATE;
    }

    return this.adapter_.isChecked() ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  };

  MDCCheckboxFoundation.prototype.getTransitionAnimationClass_ = function (oldState, newState) {
    var TRANSITION_STATE_INIT = strings$2.TRANSITION_STATE_INIT,
        TRANSITION_STATE_CHECKED = strings$2.TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED = strings$2.TRANSITION_STATE_UNCHECKED;
    var _a = MDCCheckboxFoundation.cssClasses,
        ANIM_UNCHECKED_CHECKED = _a.ANIM_UNCHECKED_CHECKED,
        ANIM_UNCHECKED_INDETERMINATE = _a.ANIM_UNCHECKED_INDETERMINATE,
        ANIM_CHECKED_UNCHECKED = _a.ANIM_CHECKED_UNCHECKED,
        ANIM_CHECKED_INDETERMINATE = _a.ANIM_CHECKED_INDETERMINATE,
        ANIM_INDETERMINATE_CHECKED = _a.ANIM_INDETERMINATE_CHECKED,
        ANIM_INDETERMINATE_UNCHECKED = _a.ANIM_INDETERMINATE_UNCHECKED;

    switch (oldState) {
      case TRANSITION_STATE_INIT:
        if (newState === TRANSITION_STATE_UNCHECKED) {
          return '';
        }

        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;

      case TRANSITION_STATE_UNCHECKED:
        return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;

      case TRANSITION_STATE_CHECKED:
        return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;

      default:
        // TRANSITION_STATE_INDETERMINATE
        return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  };

  MDCCheckboxFoundation.prototype.updateAriaChecked_ = function () {
    // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
    if (this.adapter_.isIndeterminate()) {
      this.adapter_.setNativeControlAttr(strings$2.ARIA_CHECKED_ATTR, strings$2.ARIA_CHECKED_INDETERMINATE_VALUE);
    } else {
      // The on/off state does not need to keep track of aria-checked, since
      // the screenreader uses the checked property on the checkbox element.
      this.adapter_.removeNativeControlAttr(strings$2.ARIA_CHECKED_ATTR);
    }
  };

  return MDCCheckboxFoundation;
}(MDCFoundation);

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
class FormElement extends BaseElement {
  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
  }

  click() {
    if (this.formElement) {
      this.formElement.focus();
      this.formElement.click();
    }
  }

  setAriaLabel(label) {
    if (this.formElement) {
      this.formElement.setAttribute('aria-label', label);
    }
  }

  firstUpdated() {
    super.firstUpdated();
    this.mdcRoot.addEventListener('change', e => {
      this.dispatchEvent(new Event('change', e));
    });
  }

}

class CheckboxBase extends FormElement {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.indeterminate = false;
    this.disabled = false;
    this.value = '';
    this.mdcFoundationClass = MDCCheckboxFoundation;
  }

  get ripple() {
    return this.mdcRoot.ripple;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      forceLayout: () => {
        this.mdcRoot.offsetWidth;
      },
      isAttachedToDOM: () => this.isConnected,
      isIndeterminate: () => this.indeterminate,
      isChecked: () => this.checked,
      hasNativeControl: () => Boolean(this.formElement),
      setNativeControlDisabled: disabled => {
        this.formElement.disabled = disabled;
      },
      setNativeControlAttr: (attr, value) => {
        this.formElement.setAttribute(attr, value);
      },
      removeNativeControlAttr: attr => {
        this.formElement.removeAttribute(attr);
      }
    });
  }

  render() {
    return html`
      <div class="mdc-checkbox"
           @animationend="${this._animationEndHandler}">
        <input type="checkbox"
              class="mdc-checkbox__native-control"
              @change="${this._changeHandler}"
              .indeterminate="${this.indeterminate}"
              .checked="${this.checked}"
              .value="${this.value}">
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark"
              viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
        <div class="mdc-checkbox__ripple"></div>
      </div>`;
  }

  firstUpdated() {
    super.firstUpdated();
    this.mdcRoot.ripple = rippleNode({
      surfaceNode: this.mdcRoot,
      interactionNode: this.formElement
    });
  }

  _changeHandler() {
    this.checked = this.formElement.checked;
    this.indeterminate = this.formElement.indeterminate;
    this.mdcFoundation.handleChange();
  }

  _animationEndHandler() {
    this.mdcFoundation.handleAnimationEnd();
  }

}

__decorate([query('.mdc-checkbox')], CheckboxBase.prototype, "mdcRoot", void 0);

__decorate([query('input')], CheckboxBase.prototype, "formElement", void 0);

__decorate([property({
  type: Boolean
})], CheckboxBase.prototype, "checked", void 0);

__decorate([property({
  type: Boolean
})], CheckboxBase.prototype, "indeterminate", void 0);

__decorate([property({
  type: Boolean
}), observer(function (value) {
  this.mdcFoundation.setDisabled(value);
})], CheckboxBase.prototype, "disabled", void 0);

__decorate([property({
  type: String
})], CheckboxBase.prototype, "value", void 0);

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
const style$5 = css`.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}.mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,.mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:#018786}@supports not (-ms-ime-align: auto){.mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,.mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#018786}@supports not (-ms-ime-align: auto){.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before{opacity:.04}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#018786}@supports not (-ms-ime-align: auto){.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(0,0,0,.54);background-color:transparent}.mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}@keyframes mdc-checkbox-fade-in-background-uu204a2{0%{border-color:rgba(0,0,0,.54);background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}}@keyframes mdc-checkbox-fade-out-background-uu204a2{0%,80%{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}100%{border-color:rgba(0,0,0,.54);background-color:transparent}}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-uu204a2}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-uu204a2}.mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(0,0,0,.38);background-color:transparent}.mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0,0,0,.38)}.mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff}.mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff}@media screen and (-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__background .mdc-checkbox__background::before{background-color:#000}@supports not (-ms-ime-align: auto){.mdc-checkbox__background .mdc-checkbox__background::before{background-color:var(--mdc-theme-on-surface, #000)}}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none !important}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-checkbox{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-checkbox .mdc-checkbox__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-checkbox.mdc-ripple-upgraded--unbounded .mdc-checkbox__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-checkbox.mdc-ripple-upgraded--foreground-activation .mdc-checkbox__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-checkbox.mdc-ripple-upgraded--foreground-deactivation .mdc-checkbox__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{background-color:#000}@supports not (-ms-ime-align: auto){.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{background-color:var(--mdc-theme-on-surface, #000)}}.mdc-checkbox:hover .mdc-checkbox__ripple::before{opacity:.04}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:.12}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-checkbox__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-ripple-upgraded--background-focused .mdc-checkbox__background::before{content:none}:host{outline:none}`;

let Checkbox = class Checkbox extends CheckboxBase {};
Checkbox.styles = style$5;
Checkbox = __decorate([customElement('mwc-checkbox')], Checkbox);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$3 = {
  ANIMATE: 'mdc-drawer--animate',
  CLOSING: 'mdc-drawer--closing',
  DISMISSIBLE: 'mdc-drawer--dismissible',
  MODAL: 'mdc-drawer--modal',
  OPEN: 'mdc-drawer--open',
  OPENING: 'mdc-drawer--opening',
  ROOT: 'mdc-drawer'
};
var strings$3 = {
  APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
  CLOSE_EVENT: 'MDCDrawer:closed',
  OPEN_EVENT: 'MDCDrawer:opened',
  SCRIM_SELECTOR: '.mdc-drawer-scrim'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCDismissibleDrawerFoundation =
/** @class */
function (_super) {
  __extends(MDCDismissibleDrawerFoundation, _super);

  function MDCDismissibleDrawerFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCDismissibleDrawerFoundation.defaultAdapter, adapter)) || this;

    _this.animationFrame_ = 0;
    _this.animationTimer_ = 0;
    return _this;
  }

  Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
    get: function () {
      return strings$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
    get: function () {
      return cssClasses$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        elementHasClass: function () {
          return false;
        },
        notifyClose: function () {
          return undefined;
        },
        notifyOpen: function () {
          return undefined;
        },
        saveFocus: function () {
          return undefined;
        },
        restoreFocus: function () {
          return undefined;
        },
        focusActiveNavigationItem: function () {
          return undefined;
        },
        trapFocus: function () {
          return undefined;
        },
        releaseFocus: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCDismissibleDrawerFoundation.prototype.destroy = function () {
    if (this.animationFrame_) {
      cancelAnimationFrame(this.animationFrame_);
    }

    if (this.animationTimer_) {
      clearTimeout(this.animationTimer_);
    }
  };
  /**
   * Opens the drawer from the closed state.
   */


  MDCDismissibleDrawerFoundation.prototype.open = function () {
    var _this = this;

    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(cssClasses$3.OPEN);
    this.adapter_.addClass(cssClasses$3.ANIMATE); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame_(function () {
      _this.adapter_.addClass(cssClasses$3.OPENING);
    });
    this.adapter_.saveFocus();
  };
  /**
   * Closes the drawer from the open state.
   */


  MDCDismissibleDrawerFoundation.prototype.close = function () {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(cssClasses$3.CLOSING);
  };
  /**
   * Returns true if the drawer is in the open position.
   * @return true if drawer is in open state.
   */


  MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
    return this.adapter_.hasClass(cssClasses$3.OPEN);
  };
  /**
   * Returns true if the drawer is animating open.
   * @return true if drawer is animating open.
   */


  MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
    return this.adapter_.hasClass(cssClasses$3.OPENING) || this.adapter_.hasClass(cssClasses$3.ANIMATE);
  };
  /**
   * Returns true if the drawer is animating closed.
   * @return true if drawer is animating closed.
   */


  MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
    return this.adapter_.hasClass(cssClasses$3.CLOSING);
  };
  /**
   * Keydown handler to close drawer when key is escape.
   */


  MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
    var keyCode = evt.keyCode,
        key = evt.key;
    var isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  };
  /**
   * Handles the `transitionend` event when the drawer finishes opening/closing.
   */


  MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
    var OPENING = cssClasses$3.OPENING,
        CLOSING = cssClasses$3.CLOSING,
        OPEN = cssClasses$3.OPEN,
        ANIMATE = cssClasses$3.ANIMATE,
        ROOT = cssClasses$3.ROOT; // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.

    var isRootElement = this.isElement_(evt.target) && this.adapter_.elementHasClass(evt.target, ROOT);

    if (!isRootElement) {
      return;
    }

    if (this.isClosing()) {
      this.adapter_.removeClass(OPEN);
      this.closed_();
      this.adapter_.restoreFocus();
      this.adapter_.notifyClose();
    } else {
      this.adapter_.focusActiveNavigationItem();
      this.opened_();
      this.adapter_.notifyOpen();
    }

    this.adapter_.removeClass(ANIMATE);
    this.adapter_.removeClass(OPENING);
    this.adapter_.removeClass(CLOSING);
  };
  /**
   * Extension point for when drawer finishes open animation.
   */


  MDCDismissibleDrawerFoundation.prototype.opened_ = function () {}; // tslint:disable-line:no-empty

  /**
   * Extension point for when drawer finishes close animation.
   */


  MDCDismissibleDrawerFoundation.prototype.closed_ = function () {}; // tslint:disable-line:no-empty

  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   */


  MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame_ = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(function () {
      _this.animationFrame_ = 0;
      clearTimeout(_this.animationTimer_);
      _this.animationTimer_ = setTimeout(callback, 0);
    });
  };

  MDCDismissibleDrawerFoundation.prototype.isElement_ = function (element) {
    // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
    return Boolean(element.classList);
  };

  return MDCDismissibleDrawerFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/* istanbul ignore next: subclass is not a branch statement */

var MDCModalDrawerFoundation =
/** @class */
function (_super) {
  __extends(MDCModalDrawerFoundation, _super);

  function MDCModalDrawerFoundation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Handles click event on scrim.
   */


  MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
    this.close();
  };
  /**
   * Called when drawer finishes open animation.
   */


  MDCModalDrawerFoundation.prototype.opened_ = function () {
    this.adapter_.trapFocus();
  };
  /**
   * Called when drawer finishes close animation.
   */


  MDCModalDrawerFoundation.prototype.closed_ = function () {
    this.adapter_.releaseFocus();
  };

  return MDCModalDrawerFoundation;
}(MDCDismissibleDrawerFoundation);

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
const blockingElements$1 = document.$blockingElements;
class DrawerBase extends BaseElement {
  constructor() {
    super(...arguments);
    this._previousFocus = null;
    this.open = false;
    this.hasHeader = false;
    this.type = '';
  }

  get mdcFoundationClass() {
    return this.type === 'modal' ? MDCModalDrawerFoundation : MDCDismissibleDrawerFoundation;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      elementHasClass: (element, className) => element.classList.contains(className),
      saveFocus: () => {
        // Note, casting to avoid cumbersome runtime check.
        this._previousFocus = this.getRootNode().activeElement;
      },
      restoreFocus: () => {
        const previousFocus = this._previousFocus && this._previousFocus.focus;

        if (previousFocus) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this._previousFocus.focus();
        }
      },
      notifyClose: () => {
        this.open = false;
        this.dispatchEvent(new Event(strings$3.CLOSE_EVENT, {
          bubbles: true,
          cancelable: true
        }));
      },
      notifyOpen: () => {
        this.open = true;
        this.dispatchEvent(new Event(strings$3.OPEN_EVENT, {
          bubbles: true,
          cancelable: true
        }));
      },
      // TODO(sorvell): Implement list focusing integration.
      focusActiveNavigationItem: () => {},
      trapFocus: () => {
        blockingElements$1.push(this);
        this.appContent.inert = true;
      },
      releaseFocus: () => {
        blockingElements$1.remove(this);
        this.appContent.inert = false;
      }
    });
  }

  _handleScrimClick() {
    if (this.mdcFoundation instanceof MDCModalDrawerFoundation) {
      this.mdcFoundation.handleScrimClick();
    }
  }

  render() {
    const dismissible = this.type === 'dismissible' || this.type === 'modal';
    const modal = this.type === 'modal';
    const header = this.hasHeader ? html`
      <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title"><slot name="title"></slot></h3>
        <h6 class="mdc-drawer__subtitle"><slot name="subtitle"></slot></h6>
        <slot name="header"></slot>
      </div>
      ` : '';
    return html`
      <aside class="mdc-drawer
          ${classMap({
      'mdc-drawer--dismissible': dismissible,
      'mdc-drawer--modal': modal
    })}">
        ${header}
        <div class="mdc-drawer__content"><slot></slot></div>
      </aside>
      ${modal ? html`<div class="mdc-drawer-scrim"
                          @click="${this._handleScrimClick}"></div>` : ''}
      <div class="mdc-drawer-app-content">
        <slot name="appContent"></slot>
      </div>
      `;
  } // note, we avoid calling `super.firstUpdated()` to control when
  // `createFoundation()` is called.


  firstUpdated() {
    this.mdcRoot.addEventListener('keydown', e => this.mdcFoundation.handleKeydown(e));
    this.mdcRoot.addEventListener('transitionend', e => this.mdcFoundation.handleTransitionEnd(e));
  }

  updated(changedProperties) {
    if (changedProperties.has('type')) {
      this.createFoundation();
    }
  }

}

__decorate([query('.mdc-drawer')], DrawerBase.prototype, "mdcRoot", void 0);

__decorate([query('.mdc-drawer-app-content')], DrawerBase.prototype, "appContent", void 0);

__decorate([observer(function (value) {
  if (this.type === '') {
    return;
  }

  if (value) {
    this.mdcFoundation.open();
  } else {
    this.mdcFoundation.close();
  }
}), property({
  type: Boolean,
  reflect: true
})], DrawerBase.prototype, "open", void 0);

__decorate([property({
  type: Boolean
})], DrawerBase.prototype, "hasHeader", void 0);

__decorate([property({
  reflect: true
})], DrawerBase.prototype, "type", void 0);

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
const style$6 = css`.mdc-drawer{border-color:rgba(0,0,0,.12);background-color:#fff;border-radius:0 0 0 0;z-index:6;width:256px;display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;height:100%;border-right-width:1px;border-right-style:solid;overflow:hidden;transition-property:transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer .mdc-drawer__title{color:rgba(0,0,0,.87)}.mdc-drawer .mdc-list-group__subheader{color:rgba(0,0,0,.6)}.mdc-drawer .mdc-drawer__subtitle{color:rgba(0,0,0,.6)}.mdc-drawer .mdc-list-item__graphic{color:rgba(0,0,0,.6)}.mdc-drawer .mdc-list-item{color:rgba(0,0,0,.87)}.mdc-drawer .mdc-list-item--activated .mdc-list-item__graphic{color:#6200ee}.mdc-drawer .mdc-list-item--activated{color:rgba(98,0,238,.87)}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-radius:0 0 0 0}.mdc-drawer .mdc-list-item{border-radius:4px}.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:256px;margin-right:0}[dir=rtl] .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content,.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:256px}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-right-width:0;border-left-width:1px;border-right-style:none;border-left-style:solid}.mdc-drawer .mdc-list-item{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.375rem;font-weight:500;letter-spacing:.0071428571em;text-decoration:inherit;text-transform:inherit;height:calc(48px - 2 * 4px);margin:8px 8px;padding:0 8px}.mdc-drawer .mdc-list-item:nth-child(1){margin-top:2px}.mdc-drawer .mdc-list-item:nth-last-child(1){margin-bottom:0}.mdc-drawer .mdc-list-group__subheader{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin:0;padding:0 16px}.mdc-drawer .mdc-list-group__subheader::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-drawer .mdc-list-divider{margin:3px 0 4px 0}.mdc-drawer .mdc-list-item__text,.mdc-drawer .mdc-list-item__graphic{pointer-events:none}.mdc-drawer--animate{transform:translateX(-100%)}[dir=rtl] .mdc-drawer--animate,.mdc-drawer--animate[dir=rtl]{transform:translateX(100%)}.mdc-drawer--opening{transform:translateX(0);transition-duration:250ms}[dir=rtl] .mdc-drawer--opening,.mdc-drawer--opening[dir=rtl]{transform:translateX(0)}.mdc-drawer--closing{transform:translateX(-100%);transition-duration:200ms}[dir=rtl] .mdc-drawer--closing,.mdc-drawer--closing[dir=rtl]{transform:translateX(100%)}.mdc-drawer__header{flex-shrink:0;box-sizing:border-box;min-height:64px;padding:0 16px 4px}.mdc-drawer__title{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-drawer__title::before{display:inline-block;width:0;height:36px;content:"";vertical-align:0}.mdc-drawer__title::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-drawer__subtitle{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin-bottom:0}.mdc-drawer__subtitle::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-drawer__content{height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch}.mdc-drawer--dismissible{left:0;right:initial;display:none;position:absolute}[dir=rtl] .mdc-drawer--dismissible,.mdc-drawer--dismissible[dir=rtl]{left:initial;right:0}.mdc-drawer--dismissible.mdc-drawer--open{display:flex}.mdc-drawer-app-content{margin-left:0;margin-right:0;position:relative}[dir=rtl] .mdc-drawer-app-content,.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:0}.mdc-drawer--modal{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);left:0;right:initial;display:none;position:fixed}.mdc-drawer--modal+.mdc-drawer-scrim{background-color:rgba(0,0,0,.32)}[dir=rtl] .mdc-drawer--modal,.mdc-drawer--modal[dir=rtl]{left:initial;right:0}.mdc-drawer--modal.mdc-drawer--open{display:flex}.mdc-drawer-scrim{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer--open+.mdc-drawer-scrim{display:block}.mdc-drawer--animate+.mdc-drawer-scrim{opacity:0}.mdc-drawer--opening+.mdc-drawer-scrim{transition-duration:250ms;opacity:1}.mdc-drawer--closing+.mdc-drawer-scrim{transition-duration:200ms;opacity:0}.mdc-drawer-app-content{overflow:auto;flex:1}:host{display:flex;height:100%}`;

let Drawer = class Drawer extends DrawerBase {};
Drawer.styles = style$6;
Drawer = __decorate([customElement('mwc-drawer')], Drawer);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$4 = {
  ICON_BUTTON_ON: 'mdc-icon-button--on',
  ROOT: 'mdc-icon-button'
};
var strings$4 = {
  ARIA_PRESSED: 'aria-pressed',
  CHANGE_EVENT: 'MDCIconButtonToggle:change'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCIconButtonToggleFoundation =
/** @class */
function (_super) {
  __extends(MDCIconButtonToggleFoundation, _super);

  function MDCIconButtonToggleFoundation(adapter) {
    return _super.call(this, __assign({}, MDCIconButtonToggleFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCIconButtonToggleFoundation, "cssClasses", {
    get: function () {
      return cssClasses$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCIconButtonToggleFoundation, "strings", {
    get: function () {
      return strings$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCIconButtonToggleFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        notifyChange: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setAttr: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCIconButtonToggleFoundation.prototype.init = function () {
    this.adapter_.setAttr(strings$4.ARIA_PRESSED, "" + this.isOn());
  };

  MDCIconButtonToggleFoundation.prototype.handleClick = function () {
    this.toggle();
    this.adapter_.notifyChange({
      isOn: this.isOn()
    });
  };

  MDCIconButtonToggleFoundation.prototype.isOn = function () {
    return this.adapter_.hasClass(cssClasses$4.ICON_BUTTON_ON);
  };

  MDCIconButtonToggleFoundation.prototype.toggle = function (isOn) {
    if (isOn === void 0) {
      isOn = !this.isOn();
    }

    if (isOn) {
      this.adapter_.addClass(cssClasses$4.ICON_BUTTON_ON);
    } else {
      this.adapter_.removeClass(cssClasses$4.ICON_BUTTON_ON);
    }

    this.adapter_.setAttr(strings$4.ARIA_PRESSED, "" + isOn);
  };

  return MDCIconButtonToggleFoundation;
}(MDCFoundation);

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
class IconButtonToggleBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCIconButtonToggleFoundation;
    this.label = '';
    this.disabled = false;
    this.onIcon = '';
    this.offIcon = '';
    this.on = false;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      setAttr: (name, value) => {
        this.mdcRoot.setAttribute(name, value);
      },
      notifyChange: evtData => {
        this.dispatchEvent(new CustomEvent('MDCIconButtonToggle:change', {
          detail: evtData,
          bubbles: true
        }));
      }
    });
  }

  handleClick() {
    this.on = !this.on;
    this.mdcFoundation.handleClick();
  }

  focus() {
    this.mdcRoot.focus();
  }

  render() {
    return html`
      <button
        .ripple="${ripple()}"
        class="mdc-icon-button"
        @click="${this.handleClick}"
        aria-hidden="true"
        aria-label="${this.label}"
        ?disabled="${this.disabled}">
        <span class="mdc-icon-button__icon">
          <slot name="offIcon">
            <i class="material-icons">${this.offIcon}</i>
          </slot>
        </span>
        <span class="mdc-icon-button__icon mdc-icon-button__icon--on">
          <slot name="onIcon">
            <i class="material-icons">${this.onIcon}</i>
          </slot>
        </span>
      </button>`;
  }

}

__decorate([query('.mdc-icon-button')], IconButtonToggleBase.prototype, "mdcRoot", void 0);

__decorate([property({
  type: String
})], IconButtonToggleBase.prototype, "label", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], IconButtonToggleBase.prototype, "disabled", void 0);

__decorate([property({
  type: String
})], IconButtonToggleBase.prototype, "onIcon", void 0);

__decorate([property({
  type: String
})], IconButtonToggleBase.prototype, "offIcon", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
}), observer(function (state) {
  this.mdcFoundation.toggle(state);
})], IconButtonToggleBase.prototype, "on", void 0);

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
let IconButtonToggle = class IconButtonToggle extends IconButtonToggleBase {};
IconButtonToggle.styles = style$2;
IconButtonToggle = __decorate([customElement('mwc-icon-button-toggle')], IconButtonToggle);

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$5 = {
  ROOT: 'mdc-form-field'
};
var strings$5 = {
  LABEL_SELECTOR: '.mdc-form-field > label'
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCFormFieldFoundation =
/** @class */
function (_super) {
  __extends(MDCFormFieldFoundation, _super);

  function MDCFormFieldFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCFormFieldFoundation.defaultAdapter, adapter)) || this;

    _this.clickHandler_ = function () {
      return _this.handleClick_();
    };

    return _this;
  }

  Object.defineProperty(MDCFormFieldFoundation, "cssClasses", {
    get: function () {
      return cssClasses$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFormFieldFoundation, "strings", {
    get: function () {
      return strings$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFormFieldFoundation, "defaultAdapter", {
    get: function () {
      return {
        activateInputRipple: function () {
          return undefined;
        },
        deactivateInputRipple: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        registerInteractionHandler: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCFormFieldFoundation.prototype.init = function () {
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
  };

  MDCFormFieldFoundation.prototype.destroy = function () {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
  };

  MDCFormFieldFoundation.prototype.handleClick_ = function () {
    var _this = this;

    this.adapter_.activateInputRipple();
    requestAnimationFrame(function () {
      return _this.adapter_.deactivateInputRipple();
    });
  };

  return MDCFormFieldFoundation;
}(MDCFoundation);

class FormfieldBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.alignEnd = false;
    this.label = '';
    this.mdcFoundationClass = MDCFormFieldFoundation;
  }

  createAdapter() {
    return {
      registerInteractionHandler: (type, handler) => {
        this.labelEl.addEventListener(type, handler);
      },
      deregisterInteractionHandler: (type, handler) => {
        this.labelEl.removeEventListener(type, handler);
      },
      activateInputRipple: () => {
        const input = this.input;

        if (input instanceof FormElement && input.ripple) {
          input.ripple.activate();
        }
      },
      deactivateInputRipple: () => {
        const input = this.input;

        if (input instanceof FormElement && input.ripple) {
          input.ripple.deactivate();
        }
      }
    };
  }

  get input() {
    return findAssignedElement(this.slotEl, '*');
  }

  render() {
    return html`
      <div class="mdc-form-field ${classMap({
      'mdc-form-field--align-end': this.alignEnd
    })}">
        <slot></slot>
        <label class="mdc-label"
               @click="${this._labelClick}">${this.label}</label>
      </div>`;
  }

  _labelClick() {
    const input = this.input;

    if (input) {
      input.focus();
      input.click();
    }
  }

}

__decorate([property({
  type: Boolean
})], FormfieldBase.prototype, "alignEnd", void 0);

__decorate([property({
  type: String
}), observer(async function (label) {
  const input = this.input;

  if (input) {
    if (input.localName === 'input') {
      input.setAttribute('aria-label', label);
    } else if (input instanceof FormElement) {
      await input.updateComplete;
      input.setAriaLabel(label);
    }
  }
})], FormfieldBase.prototype, "label", void 0);

__decorate([query('.mdc-form-field')], FormfieldBase.prototype, "mdcRoot", void 0);

__decorate([query('slot')], FormfieldBase.prototype, "slotEl", void 0);

__decorate([query('label')], FormfieldBase.prototype, "labelEl", void 0);

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
const style$7 = css`.mdc-form-field{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field{align-items:center}::slotted(*){font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}::slotted(mwc-switch){margin-right:10px}[dir=rtl] ::slotted(mwc-switch),::slotted(mwc-switch)[dir=rtl]{margin-left:10px}`;

let Formfield = class Formfield extends FormfieldBase {};
Formfield.styles = style$7;
Formfield = __decorate([customElement('mwc-formfield')], Formfield);

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
const style$8 = css`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

let Icon = class Icon extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

};
Icon.styles = style$8;
Icon = __decorate([customElement('mwc-icon')], Icon);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** CSS classes used by the switch. */
var cssClasses$6 = {
  /** Class used for a switch that is in the "checked" (on) position. */
  CHECKED: 'mdc-switch--checked',

  /** Class used for a switch that is disabled. */
  DISABLED: 'mdc-switch--disabled'
};
/** String constants used by the switch. */

var strings$6 = {
  /** A CSS selector used to locate the native HTML control for the switch.  */
  NATIVE_CONTROL_SELECTOR: '.mdc-switch__native-control',

  /** A CSS selector used to locate the ripple surface element for the switch. */
  RIPPLE_SURFACE_SELECTOR: '.mdc-switch__thumb-underlay'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCSwitchFoundation =
/** @class */
function (_super) {
  __extends(MDCSwitchFoundation, _super);

  function MDCSwitchFoundation(adapter) {
    return _super.call(this, __assign({}, MDCSwitchFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCSwitchFoundation, "strings", {
    /** The string constants used by the switch. */
    get: function () {
      return strings$6;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSwitchFoundation, "cssClasses", {
    /** The CSS classes used by the switch. */
    get: function () {
      return cssClasses$6;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSwitchFoundation, "defaultAdapter", {
    /** The default Adapter for the switch. */
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setNativeControlChecked: function () {
          return undefined;
        },
        setNativeControlDisabled: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });
  /** Sets the checked state of the switch. */

  MDCSwitchFoundation.prototype.setChecked = function (checked) {
    this.adapter_.setNativeControlChecked(checked);
    this.updateCheckedStyling_(checked);
  };
  /** Sets the disabled state of the switch. */


  MDCSwitchFoundation.prototype.setDisabled = function (disabled) {
    this.adapter_.setNativeControlDisabled(disabled);

    if (disabled) {
      this.adapter_.addClass(cssClasses$6.DISABLED);
    } else {
      this.adapter_.removeClass(cssClasses$6.DISABLED);
    }
  };
  /** Handles the change event for the switch native control. */


  MDCSwitchFoundation.prototype.handleChange = function (evt) {
    var nativeControl = evt.target;
    this.updateCheckedStyling_(nativeControl.checked);
  };
  /** Updates the styling of the switch based on its checked state. */


  MDCSwitchFoundation.prototype.updateCheckedStyling_ = function (checked) {
    if (checked) {
      this.adapter_.addClass(cssClasses$6.CHECKED);
    } else {
      this.adapter_.removeClass(cssClasses$6.CHECKED);
    }
  };

  return MDCSwitchFoundation;
}(MDCFoundation);

class SwitchBase extends FormElement {
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

__decorate([query('.mdc-switch__thumb-underlay')], SwitchBase.prototype, "rippleNode", void 0);

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
const style$9 = css`.mdc-switch__thumb-underlay{left:-18px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-18px}.mdc-switch__native-control{width:68px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch.mdc-switch--checked .mdc-switch__track{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-switch.mdc-switch--checked .mdc-switch__thumb{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__track{background-color:#000;border-color:#000}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb{background-color:#fff;border-color:#fff}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:32px;height:14px;border:1px solid;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-20px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(20px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay::before,.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay::after{background-color:#9e9e9e}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:hover::before{opacity:.08}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay.mdc-ripple-upgraded--background-focused::before,.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-switch__thumb-underlay{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-switch__thumb-underlay::before,.mdc-switch__thumb-underlay::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-switch__thumb-underlay::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-switch__thumb-underlay::before,.mdc-switch__thumb-underlay::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::before,.mdc-switch__thumb-underlay.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-switch__thumb-underlay::before,.mdc-switch__thumb-underlay::after{background-color:#018786}@supports not (-ms-ime-align: auto){.mdc-switch__thumb-underlay::before,.mdc-switch__thumb-underlay::after{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-switch__thumb-underlay:hover::before{opacity:.04}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--background-focused::before,.mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-switch__thumb-underlay.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}:host{outline:none}`;

let Switch = class Switch extends SwitchBase {};
Switch.styles = style$9;
Switch = __decorate([customElement('mwc-switch')], Switch);

class RippleBase extends LitElement {
  constructor() {
    super(...arguments);
    this.primary = false;
    this.accent = false;
    this.unbounded = false;
    this.disabled = false;
    this.interactionNode = this;
  }

  connectedCallback() {
    if (this.interactionNode === this) {
      const parent = this.parentNode;

      if (parent instanceof HTMLElement) {
        this.interactionNode = parent;
      } else if (parent instanceof ShadowRoot && parent.host instanceof HTMLElement) {
        this.interactionNode = parent.host;
      }
    }

    super.connectedCallback();
  } // TODO(sorvell) #css: sizing.


  render() {
    const classes = {
      'mdc-ripple-surface--primary': this.primary,
      'mdc-ripple-surface--accent': this.accent
    };
    const {
      disabled,
      unbounded,
      active,
      interactionNode
    } = this;
    const rippleOptions = {
      disabled,
      unbounded,
      interactionNode
    };

    if (active !== undefined) {
      rippleOptions.active = active;
    }

    return html`
      <div .ripple="${ripple(rippleOptions)}"
          class="mdc-ripple-surface ${classMap(classes)}"></div>`;
  }

}

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "primary", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "active", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "accent", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "unbounded", void 0);

__decorate([property({
  type: Boolean
})], RippleBase.prototype, "disabled", void 0);

__decorate([property({
  attribute: false
})], RippleBase.prototype, "interactionNode", void 0);

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
const style$a = css`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000}.mdc-ripple-surface:hover::before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee}@supports not (-ms-ime-align: auto){.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:var(--mdc-theme-primary, #6200ee)}}.mdc-ripple-surface--primary:hover::before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786}@supports not (-ms-ime-align: auto){.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-ripple-surface--accent:hover::before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-ripple-surface{pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0}`;

let Ripple = class Ripple extends RippleBase {};
Ripple.styles = style$a;
Ripple = __decorate([customElement('mwc-ripple')], Ripple);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$7 = {
  NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control'
};
var cssClasses$7 = {
  DISABLED: 'mdc-radio--disabled',
  ROOT: 'mdc-radio'
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCRadioFoundation =
/** @class */
function (_super) {
  __extends(MDCRadioFoundation, _super);

  function MDCRadioFoundation(adapter) {
    return _super.call(this, __assign({}, MDCRadioFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCRadioFoundation, "cssClasses", {
    get: function () {
      return cssClasses$7;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRadioFoundation, "strings", {
    get: function () {
      return strings$7;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCRadioFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setNativeControlDisabled: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCRadioFoundation.prototype.setDisabled = function (disabled) {
    var DISABLED = MDCRadioFoundation.cssClasses.DISABLED;
    this.adapter_.setNativeControlDisabled(disabled);

    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  };

  return MDCRadioFoundation;
}(MDCFoundation);

class RadioBase extends FormElement {
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


class SelectionController {
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

}

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
const style$b = css`.mdc-touch-target-wrapper{display:inline}.mdc-radio{padding:10px;display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0,0,0,.54)}.mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0,0,0,.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0,0,0,.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:rgba(0,0,0,.38)}.mdc-radio .mdc-radio__background::before{background-color:#018786}@supports not (-ms-ime-align: auto){.mdc-radio .mdc-radio__background::before{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-radio .mdc-radio__background::before{top:-10px;left:-10px;width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-radio{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-radio .mdc-radio__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-radio.mdc-ripple-upgraded--unbounded .mdc-radio__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-radio.mdc-ripple-upgraded--foreground-activation .mdc-radio__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-radio.mdc-ripple-upgraded--foreground-deactivation .mdc-radio__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before,.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{background-color:#018786}@supports not (-ms-ime-align: auto){.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{background-color:var(--mdc-theme-secondary, #018786)}}.mdc-radio:hover .mdc-radio__ripple::before{opacity:.04}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__ripple::before,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__ripple::before{transition-duration:75ms;opacity:.12}.mdc-radio:not(.mdc-ripple-upgraded) .mdc-radio__ripple::after{transition:opacity 150ms linear}.mdc-radio:not(.mdc-ripple-upgraded):active .mdc-radio__ripple::after{transition-duration:75ms;opacity:.12}.mdc-radio.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__background::before{content:none}.mdc-radio__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}:host{display:inline-block;outline:none}.mdc-radio{vertical-align:bottom}`;

let Radio = class Radio extends RadioBase {};
Radio.styles = style$b;
Radio = __decorate([customElement('mwc-radio')], Radio);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$8 = {
  CLOSING: 'mdc-snackbar--closing',
  OPEN: 'mdc-snackbar--open',
  OPENING: 'mdc-snackbar--opening'
};
var strings$8 = {
  ACTION_SELECTOR: '.mdc-snackbar__action',
  ARIA_LIVE_LABEL_TEXT_ATTR: 'data-mdc-snackbar-label-text',
  CLOSED_EVENT: 'MDCSnackbar:closed',
  CLOSING_EVENT: 'MDCSnackbar:closing',
  DISMISS_SELECTOR: '.mdc-snackbar__dismiss',
  LABEL_SELECTOR: '.mdc-snackbar__label',
  OPENED_EVENT: 'MDCSnackbar:opened',
  OPENING_EVENT: 'MDCSnackbar:opening',
  REASON_ACTION: 'action',
  REASON_DISMISS: 'dismiss',
  SURFACE_SELECTOR: '.mdc-snackbar__surface'
};
var numbers$3 = {
  DEFAULT_AUTO_DISMISS_TIMEOUT_MS: 5000,
  INDETERMINATE: -1,
  MAX_AUTO_DISMISS_TIMEOUT_MS: 10000,
  MIN_AUTO_DISMISS_TIMEOUT_MS: 4000,
  // These variables need to be kept in sync with the values in _variables.scss.
  SNACKBAR_ANIMATION_CLOSE_TIME_MS: 75,
  SNACKBAR_ANIMATION_OPEN_TIME_MS: 150,

  /**
   * Number of milliseconds to wait between temporarily clearing the label text
   * in the DOM and subsequently restoring it. This is necessary to force IE 11
   * to pick up the `aria-live` content change and announce it to the user.
   */
  ARIA_LIVE_DELAY_MS: 1000
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var OPENING = cssClasses$8.OPENING,
    OPEN = cssClasses$8.OPEN,
    CLOSING = cssClasses$8.CLOSING;
var REASON_ACTION = strings$8.REASON_ACTION,
    REASON_DISMISS = strings$8.REASON_DISMISS;

var MDCSnackbarFoundation =
/** @class */
function (_super) {
  __extends(MDCSnackbarFoundation, _super);

  function MDCSnackbarFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCSnackbarFoundation.defaultAdapter, adapter)) || this;

    _this.isOpen_ = false;
    _this.animationFrame_ = 0;
    _this.animationTimer_ = 0;
    _this.autoDismissTimer_ = 0;
    _this.autoDismissTimeoutMs_ = numbers$3.DEFAULT_AUTO_DISMISS_TIMEOUT_MS;
    _this.closeOnEscape_ = true;
    return _this;
  }

  Object.defineProperty(MDCSnackbarFoundation, "cssClasses", {
    get: function () {
      return cssClasses$8;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSnackbarFoundation, "strings", {
    get: function () {
      return strings$8;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSnackbarFoundation, "numbers", {
    get: function () {
      return numbers$3;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSnackbarFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        announce: function () {
          return undefined;
        },
        notifyClosed: function () {
          return undefined;
        },
        notifyClosing: function () {
          return undefined;
        },
        notifyOpened: function () {
          return undefined;
        },
        notifyOpening: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCSnackbarFoundation.prototype.destroy = function () {
    this.clearAutoDismissTimer_();
    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = 0;
    clearTimeout(this.animationTimer_);
    this.animationTimer_ = 0;
    this.adapter_.removeClass(OPENING);
    this.adapter_.removeClass(OPEN);
    this.adapter_.removeClass(CLOSING);
  };

  MDCSnackbarFoundation.prototype.open = function () {
    var _this = this;

    this.clearAutoDismissTimer_();
    this.isOpen_ = true;
    this.adapter_.notifyOpening();
    this.adapter_.removeClass(CLOSING);
    this.adapter_.addClass(OPENING);
    this.adapter_.announce(); // Wait a frame once display is no longer "none", to establish basis for animation

    this.runNextAnimationFrame_(function () {
      _this.adapter_.addClass(OPEN);

      _this.animationTimer_ = setTimeout(function () {
        var timeoutMs = _this.getTimeoutMs();

        _this.handleAnimationTimerEnd_();

        _this.adapter_.notifyOpened();

        if (timeoutMs !== numbers$3.INDETERMINATE) {
          _this.autoDismissTimer_ = setTimeout(function () {
            _this.close(REASON_DISMISS);
          }, timeoutMs);
        }
      }, numbers$3.SNACKBAR_ANIMATION_OPEN_TIME_MS);
    });
  };
  /**
   * @param reason Why the snackbar was closed. Value will be passed to CLOSING_EVENT and CLOSED_EVENT via the
   *     `event.detail.reason` property. Standard values are REASON_ACTION and REASON_DISMISS, but custom
   *     client-specific values may also be used if desired.
   */


  MDCSnackbarFoundation.prototype.close = function (reason) {
    var _this = this;

    if (reason === void 0) {
      reason = '';
    }

    if (!this.isOpen_) {
      // Avoid redundant close calls (and events), e.g. repeated interactions as the snackbar is animating closed
      return;
    }

    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = 0;
    this.clearAutoDismissTimer_();
    this.isOpen_ = false;
    this.adapter_.notifyClosing(reason);
    this.adapter_.addClass(cssClasses$8.CLOSING);
    this.adapter_.removeClass(cssClasses$8.OPEN);
    this.adapter_.removeClass(cssClasses$8.OPENING);
    clearTimeout(this.animationTimer_);
    this.animationTimer_ = setTimeout(function () {
      _this.handleAnimationTimerEnd_();

      _this.adapter_.notifyClosed(reason);
    }, numbers$3.SNACKBAR_ANIMATION_CLOSE_TIME_MS);
  };

  MDCSnackbarFoundation.prototype.isOpen = function () {
    return this.isOpen_;
  };

  MDCSnackbarFoundation.prototype.getTimeoutMs = function () {
    return this.autoDismissTimeoutMs_;
  };

  MDCSnackbarFoundation.prototype.setTimeoutMs = function (timeoutMs) {
    // Use shorter variable names to make the code more readable
    var minValue = numbers$3.MIN_AUTO_DISMISS_TIMEOUT_MS;
    var maxValue = numbers$3.MAX_AUTO_DISMISS_TIMEOUT_MS;
    var indeterminateValue = numbers$3.INDETERMINATE;

    if (timeoutMs === numbers$3.INDETERMINATE || timeoutMs <= maxValue && timeoutMs >= minValue) {
      this.autoDismissTimeoutMs_ = timeoutMs;
    } else {
      throw new Error("\n        timeoutMs must be an integer in the range " + minValue + "\u2013" + maxValue + "\n        (or " + indeterminateValue + " to disable), but got '" + timeoutMs + "'");
    }
  };

  MDCSnackbarFoundation.prototype.getCloseOnEscape = function () {
    return this.closeOnEscape_;
  };

  MDCSnackbarFoundation.prototype.setCloseOnEscape = function (closeOnEscape) {
    this.closeOnEscape_ = closeOnEscape;
  };

  MDCSnackbarFoundation.prototype.handleKeyDown = function (evt) {
    var isEscapeKey = evt.key === 'Escape' || evt.keyCode === 27;

    if (isEscapeKey && this.getCloseOnEscape()) {
      this.close(REASON_DISMISS);
    }
  };

  MDCSnackbarFoundation.prototype.handleActionButtonClick = function (_evt) {
    this.close(REASON_ACTION);
  };

  MDCSnackbarFoundation.prototype.handleActionIconClick = function (_evt) {
    this.close(REASON_DISMISS);
  };

  MDCSnackbarFoundation.prototype.clearAutoDismissTimer_ = function () {
    clearTimeout(this.autoDismissTimer_);
    this.autoDismissTimer_ = 0;
  };

  MDCSnackbarFoundation.prototype.handleAnimationTimerEnd_ = function () {
    this.animationTimer_ = 0;
    this.adapter_.removeClass(cssClasses$8.OPENING);
    this.adapter_.removeClass(cssClasses$8.CLOSING);
  };
  /**
   * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
   */


  MDCSnackbarFoundation.prototype.runNextAnimationFrame_ = function (callback) {
    var _this = this;

    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(function () {
      _this.animationFrame_ = 0;
      clearTimeout(_this.animationTimer_);
      _this.animationTimer_ = setTimeout(callback, 0);
    });
  };

  return MDCSnackbarFoundation;
}(MDCFoundation);

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
const {
  ARIA_LIVE_LABEL_TEXT_ATTR
} = MDCSnackbarFoundation.strings;
const {
  ARIA_LIVE_DELAY_MS
} = MDCSnackbarFoundation.numbers;
/**
 * Maps an accessibleLabel container part to its label element and the timeoutID
 * of the task that restores its text content from ::before back to textContent.
 */

const stateMap = new WeakMap();
/**
 * A lit directive implementation of @material/mdc-snackbar/util.ts#announce,
 * which does some tricks to ensure that snackbar labels will be handled
 * correctly by screen readers.
 *
 * The existing MDC announce util function is difficult to use directly here,
 * because Lit can crash when DOM that it is managing changes outside of its
 * purvue. In this case, we would render our labelText as the text content of
 * the label div, but the MDC announce function then clears that text content,
 * and resets it after a timeout (see below for why). We do the same thing here,
 * but in a way that fits into Lit's lifecycle.
 *
 * TODO(aomarks) Investigate whether this can be simplified; but to do that we
 * first need testing infrastructure to verify that it remains compatible with
 * screen readers. For example, can we just create an entirely new label node
 * every time we open or labelText changes? If not, and the async text/::before
 * swap is strictly required, can we at elast make this directive more generic
 * (e.g. so that we don't hard-code the name of the label class).
 */

const accessibleSnackbarLabel = directive((labelText, isOpen) => part => {
  if (!isOpen) {
    // We never need to do anything if we're closed, even if the label also
    // changed in this batch of changes. We'll fully reset the label text
    // whenever we next open.
    return;
  }

  let maybeState = stateMap.get(part);

  if (maybeState === undefined) {
    // Create the label element once, the first time we open.
    const labelEl = document.createElement('div');
    labelEl.setAttribute('class', 'mdc-snackbar__label');
    labelEl.setAttribute('role', 'status');
    labelEl.setAttribute('aria-live', 'polite');
    labelEl.textContent = labelText; // endNode can't be a Document, so it must have a parent.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    part.endNode.parentNode.insertBefore(labelEl, part.endNode);
    maybeState = {
      labelEl,
      timerId: null
    };
    stateMap.set(part, maybeState); // No need to do anything more for ARIA the first time we open. We just
    // created the element with the current label, so screen readers will
    // detect it fine.

    return;
  }

  const state = maybeState;
  const labelEl = state.labelEl; // Temporarily disable `aria-live` to prevent JAWS+Firefox from announcing
  // the message twice.

  labelEl.setAttribute('aria-live', 'off'); // Temporarily clear `textContent` to force a DOM mutation event that will
  // be detected by screen readers. `aria-live` elements are only announced
  // when the element's `textContent` *changes*, so snackbars sent to the
  // browser in the initial HTML response won't be read unless we clear the
  // element's `textContent` first. Similarly, displaying the same snackbar
  // message twice in a row doesn't trigger a DOM mutation event, so screen
  // readers won't announce the second message unless we first clear
  // `textContent`.
  //
  // We have to clear the label text two different ways to make it work in
  // all browsers and screen readers:
  //
  //   1. `textContent = ''` is required for IE11 + JAWS
  //   2. `innerHTML = '&nbsp;'` is required for Chrome + JAWS and NVDA
  //
  // All other browser/screen reader combinations support both methods.
  //
  // The wrapper `<span>` visually hides the space character so that it
  // doesn't cause jank when added/removed. N.B.: Setting `position:
  // absolute`, `opacity: 0`, or `height: 0` prevents Chrome from detecting
  // the DOM change.
  //
  // This technique has been tested in:
  //
  //   * JAWS 2019:
  //       - Chrome 70
  //       - Firefox 60 (ESR)
  //       - IE 11
  //   * NVDA 2018:
  //       - Chrome 70
  //       - Firefox 60 (ESR)
  //       - IE 11
  //   * ChromeVox 53

  labelEl.textContent = '';
  labelEl.innerHTML = '<span style="display: inline-block; width: 0; height: 1px;">' + '&nbsp;</span>'; // Prevent visual jank by temporarily displaying the label text in the
  // ::before pseudo-element. CSS generated content is normally announced by
  // screen readers (except in IE 11; see
  // https://tink.uk/accessibility-support-for-css-generated-content/);
  // however, `aria-live` is turned off, so this DOM update will be ignored
  // by screen readers.

  labelEl.setAttribute(ARIA_LIVE_LABEL_TEXT_ATTR, labelText);

  if (state.timerId !== null) {
    // We hadn't yet swapped the textContent back in since the last time we
    // opened or changed the label. Cancel that task so we don't clobber the
    // new label.
    clearTimeout(state.timerId);
  }

  state.timerId = window.setTimeout(() => {
    state.timerId = null; // Allow screen readers to announce changes to the DOM again.

    labelEl.setAttribute('aria-live', 'polite'); // Remove the message from the ::before pseudo-element.

    labelEl.removeAttribute(ARIA_LIVE_LABEL_TEXT_ATTR); // Restore the original label text, which will be announced by
    // screen readers.

    labelEl.textContent = labelText;
  }, ARIA_LIVE_DELAY_MS);
});

const {
  OPENING_EVENT,
  OPENED_EVENT,
  CLOSING_EVENT,
  CLOSED_EVENT
} = MDCSnackbarFoundation.strings;
class SnackbarBase extends BaseElement {
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
})], SnackbarBase.prototype, "leading", void 0);

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
const style$c = css`.mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{background-color:#333}.mdc-snackbar__label{color:rgba(255,255,255,.87)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12)}.mdc-snackbar__surface{border-radius:4px}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;transform:scale(0.8);opacity:0}.mdc-snackbar--open .mdc-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit;flex-grow:1;box-sizing:border-box;margin:0;padding:14px 16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{margin-left:0;margin-right:8px;display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}[dir=rtl] .mdc-snackbar__actions,.mdc-snackbar__actions[dir=rtl]{margin-left:8px;margin-right:0}.mdc-snackbar__action:not(:disabled){color:#bb86fc}.mdc-snackbar__action::before,.mdc-snackbar__action::after{background-color:#bb86fc}.mdc-snackbar__action:hover::before{opacity:.08}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-snackbar__action.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-snackbar__dismiss{color:rgba(255,255,255,.87)}.mdc-snackbar__dismiss::before,.mdc-snackbar__dismiss::after{background-color:rgba(255,255,255,.87)}.mdc-snackbar__dismiss:hover::before{opacity:.08}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-snackbar__dismiss.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}slot[name=action]::slotted(mwc-button){--mdc-theme-primary: var(--mdc-snackbar-action-color, #bb86fc)}slot[name=dismiss]::slotted(mwc-icon-button){--mdc-icon-size: 18px;--mdc-icon-button-size: 36px;color:rgba(255, 255, 255, 0.87);margin-left:8px;margin-right:0}[dir=rtl] slot[name=dismiss]::slotted(mwc-icon-button),slot[name=dismiss]::slotted(mwc-icon-button)[dir=rtl]{margin-left:0;margin-right:8px}`;

let Snackbar = class Snackbar extends SnackbarBase {};
Snackbar.styles = style$c;
Snackbar = __decorate([customElement('mwc-snackbar')], Snackbar);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssPropertyNameMap = {
  animation: {
    prefixed: '-webkit-animation',
    standard: 'animation'
  },
  transform: {
    prefixed: '-webkit-transform',
    standard: 'transform'
  },
  transition: {
    prefixed: '-webkit-transition',
    standard: 'transition'
  }
};
var jsEventTypeMap = {
  animationend: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationEnd',
    standard: 'animationend'
  },
  animationiteration: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationIteration',
    standard: 'animationiteration'
  },
  animationstart: {
    cssProperty: 'animation',
    prefixed: 'webkitAnimationStart',
    standard: 'animationstart'
  },
  transitionend: {
    cssProperty: 'transition',
    prefixed: 'webkitTransitionEnd',
    standard: 'transitionend'
  }
};

function isWindow(windowObj) {
  return Boolean(windowObj.document) && typeof windowObj.document.createElement === 'function';
}

function getCorrectPropertyName(windowObj, cssProperty) {
  if (isWindow(windowObj) && cssProperty in cssPropertyNameMap) {
    var el = windowObj.document.createElement('div');
    var _a = cssPropertyNameMap[cssProperty],
        standard = _a.standard,
        prefixed = _a.prefixed;
    var isStandard = standard in el.style;
    return isStandard ? standard : prefixed;
  }

  return cssProperty;
}
function getCorrectEventName(windowObj, eventType) {
  if (isWindow(windowObj) && eventType in jsEventTypeMap) {
    var el = windowObj.document.createElement('div');
    var _a = jsEventTypeMap[eventType],
        standard = _a.standard,
        prefixed = _a.prefixed,
        cssProperty = _a.cssProperty;
    var isStandard = cssProperty in el.style;
    return isStandard ? standard : prefixed;
  }

  return eventType;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$9 = {
  ACTIVE: 'mdc-slider--active',
  DISABLED: 'mdc-slider--disabled',
  DISCRETE: 'mdc-slider--discrete',
  FOCUS: 'mdc-slider--focus',
  HAS_TRACK_MARKER: 'mdc-slider--display-markers',
  IN_TRANSIT: 'mdc-slider--in-transit',
  IS_DISCRETE: 'mdc-slider--discrete'
};
var strings$9 = {
  ARIA_DISABLED: 'aria-disabled',
  ARIA_VALUEMAX: 'aria-valuemax',
  ARIA_VALUEMIN: 'aria-valuemin',
  ARIA_VALUENOW: 'aria-valuenow',
  CHANGE_EVENT: 'MDCSlider:change',
  INPUT_EVENT: 'MDCSlider:input',
  PIN_VALUE_MARKER_SELECTOR: '.mdc-slider__pin-value-marker',
  STEP_DATA_ATTR: 'data-step',
  THUMB_CONTAINER_SELECTOR: '.mdc-slider__thumb-container',
  TRACK_MARKER_CONTAINER_SELECTOR: '.mdc-slider__track-marker-container',
  TRACK_SELECTOR: '.mdc-slider__track'
};
var numbers$4 = {
  PAGE_FACTOR: 4
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var DOWN_EVENTS = ['mousedown', 'pointerdown', 'touchstart'];
var UP_EVENTS = ['mouseup', 'pointerup', 'touchend'];
var MOVE_EVENT_MAP = {
  mousedown: 'mousemove',
  pointerdown: 'pointermove',
  touchstart: 'touchmove'
};
var KEY_IDS = {
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  END: 'End',
  HOME: 'Home',
  PAGE_DOWN: 'PageDown',
  PAGE_UP: 'PageUp'
};

var MDCSliderFoundation =
/** @class */
function (_super) {
  __extends(MDCSliderFoundation, _super);

  function MDCSliderFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCSliderFoundation.defaultAdapter, adapter)) || this;
    /**
     * We set this to NaN since we want it to be a number, but we can't use '0' or '-1'
     * because those could be valid tabindices set by the client code.
     */


    _this.savedTabIndex_ = NaN;
    _this.active_ = false;
    _this.inTransit_ = false;
    _this.isDiscrete_ = false;
    _this.hasTrackMarker_ = false;
    _this.handlingThumbTargetEvt_ = false;
    _this.min_ = 0;
    _this.max_ = 100;
    _this.step_ = 0;
    _this.value_ = 0;
    _this.disabled_ = false;
    _this.preventFocusState_ = false;

    _this.thumbContainerPointerHandler_ = function () {
      return _this.handlingThumbTargetEvt_ = true;
    };

    _this.interactionStartHandler_ = function (evt) {
      return _this.handleDown_(evt);
    };

    _this.keydownHandler_ = function (evt) {
      return _this.handleKeydown_(evt);
    };

    _this.focusHandler_ = function () {
      return _this.handleFocus_();
    };

    _this.blurHandler_ = function () {
      return _this.handleBlur_();
    };

    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    return _this;
  }

  Object.defineProperty(MDCSliderFoundation, "cssClasses", {
    get: function () {
      return cssClasses$9;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSliderFoundation, "strings", {
    get: function () {
      return strings$9;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSliderFoundation, "numbers", {
    get: function () {
      return numbers$4;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCSliderFoundation, "defaultAdapter", {
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        hasClass: function () {
          return false;
        },
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        getAttribute: function () {
          return null;
        },
        setAttribute: function () {
          return undefined;
        },
        removeAttribute: function () {
          return undefined;
        },
        computeBoundingRect: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        getTabIndex: function () {
          return 0;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        },
        registerThumbContainerInteractionHandler: function () {
          return undefined;
        },
        deregisterThumbContainerInteractionHandler: function () {
          return undefined;
        },
        registerBodyInteractionHandler: function () {
          return undefined;
        },
        deregisterBodyInteractionHandler: function () {
          return undefined;
        },
        registerResizeHandler: function () {
          return undefined;
        },
        deregisterResizeHandler: function () {
          return undefined;
        },
        notifyInput: function () {
          return undefined;
        },
        notifyChange: function () {
          return undefined;
        },
        setThumbContainerStyleProperty: function () {
          return undefined;
        },
        setTrackStyleProperty: function () {
          return undefined;
        },
        setMarkerValue: function () {
          return undefined;
        },
        setTrackMarkers: function () {
          return undefined;
        },
        isRTL: function () {
          return false;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCSliderFoundation.prototype.init = function () {
    var _this = this;

    this.isDiscrete_ = this.adapter_.hasClass(cssClasses$9.IS_DISCRETE);
    this.hasTrackMarker_ = this.adapter_.hasClass(cssClasses$9.HAS_TRACK_MARKER);
    DOWN_EVENTS.forEach(function (evtName) {
      _this.adapter_.registerInteractionHandler(evtName, _this.interactionStartHandler_);

      _this.adapter_.registerThumbContainerInteractionHandler(evtName, _this.thumbContainerPointerHandler_);
    });
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
    this.layout(); // At last step, provide a reasonable default value to discrete slider

    if (this.isDiscrete_ && this.getStep() === 0) {
      this.step_ = 1;
    }
  };

  MDCSliderFoundation.prototype.destroy = function () {
    var _this = this;

    DOWN_EVENTS.forEach(function (evtName) {
      _this.adapter_.deregisterInteractionHandler(evtName, _this.interactionStartHandler_);

      _this.adapter_.deregisterThumbContainerInteractionHandler(evtName, _this.thumbContainerPointerHandler_);
    });
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  };

  MDCSliderFoundation.prototype.setupTrackMarker = function () {
    if (this.isDiscrete_ && this.hasTrackMarker_ && this.getStep() !== 0) {
      this.adapter_.setTrackMarkers(this.getStep(), this.getMax(), this.getMin());
    }
  };

  MDCSliderFoundation.prototype.layout = function () {
    this.rect_ = this.adapter_.computeBoundingRect();
    this.updateUIForCurrentValue_();
  };

  MDCSliderFoundation.prototype.getValue = function () {
    return this.value_;
  };

  MDCSliderFoundation.prototype.setValue = function (value) {
    this.setValue_(value, false);
  };

  MDCSliderFoundation.prototype.getMax = function () {
    return this.max_;
  };

  MDCSliderFoundation.prototype.setMax = function (max) {
    if (max < this.min_) {
      throw new Error('Cannot set max to be less than the slider\'s minimum value');
    }

    this.max_ = max;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(strings$9.ARIA_VALUEMAX, String(this.max_));
    this.setupTrackMarker();
  };

  MDCSliderFoundation.prototype.getMin = function () {
    return this.min_;
  };

  MDCSliderFoundation.prototype.setMin = function (min) {
    if (min > this.max_) {
      throw new Error('Cannot set min to be greater than the slider\'s maximum value');
    }

    this.min_ = min;
    this.setValue_(this.value_, false, true);
    this.adapter_.setAttribute(strings$9.ARIA_VALUEMIN, String(this.min_));
    this.setupTrackMarker();
  };

  MDCSliderFoundation.prototype.getStep = function () {
    return this.step_;
  };

  MDCSliderFoundation.prototype.setStep = function (step) {
    if (step < 0) {
      throw new Error('Step cannot be set to a negative number');
    }

    if (this.isDiscrete_ && (typeof step !== 'number' || step < 1)) {
      step = 1;
    }

    this.step_ = step;
    this.setValue_(this.value_, false, true);
    this.setupTrackMarker();
  };

  MDCSliderFoundation.prototype.isDisabled = function () {
    return this.disabled_;
  };

  MDCSliderFoundation.prototype.setDisabled = function (disabled) {
    this.disabled_ = disabled;
    this.toggleClass_(cssClasses$9.DISABLED, this.disabled_);

    if (this.disabled_) {
      this.savedTabIndex_ = this.adapter_.getTabIndex();
      this.adapter_.setAttribute(strings$9.ARIA_DISABLED, 'true');
      this.adapter_.removeAttribute('tabindex');
    } else {
      this.adapter_.removeAttribute(strings$9.ARIA_DISABLED);

      if (!isNaN(this.savedTabIndex_)) {
        this.adapter_.setAttribute('tabindex', String(this.savedTabIndex_));
      }
    }
  };
  /**
   * Called when the user starts interacting with the slider
   */


  MDCSliderFoundation.prototype.handleDown_ = function (downEvent) {
    var _this = this;

    if (this.disabled_) {
      return;
    }

    this.preventFocusState_ = true;
    this.setInTransit_(!this.handlingThumbTargetEvt_);
    this.handlingThumbTargetEvt_ = false;
    this.setActive_(true);

    var moveHandler = function (moveEvent) {
      _this.handleMove_(moveEvent);
    };

    var moveEventType = MOVE_EVENT_MAP[downEvent.type]; // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
    // do not always fire these consistently in pairs.
    // (See https://github.com/material-components/material-components-web/issues/1192)

    var upHandler = function () {
      _this.handleUp_();

      _this.adapter_.deregisterBodyInteractionHandler(moveEventType, moveHandler);

      UP_EVENTS.forEach(function (evtName) {
        return _this.adapter_.deregisterBodyInteractionHandler(evtName, upHandler);
      });
    };

    this.adapter_.registerBodyInteractionHandler(moveEventType, moveHandler);
    UP_EVENTS.forEach(function (evtName) {
      return _this.adapter_.registerBodyInteractionHandler(evtName, upHandler);
    });
    this.setValueFromEvt_(downEvent);
  };
  /**
   * Called when the user moves the slider
   */


  MDCSliderFoundation.prototype.handleMove_ = function (evt) {
    evt.preventDefault();
    this.setValueFromEvt_(evt);
  };
  /**
   * Called when the user's interaction with the slider ends
   */


  MDCSliderFoundation.prototype.handleUp_ = function () {
    this.setActive_(false);
    this.adapter_.notifyChange();
  };
  /**
   * Returns the pageX of the event
   */


  MDCSliderFoundation.prototype.getPageX_ = function (evt) {
    if (evt.targetTouches && evt.targetTouches.length > 0) {
      return evt.targetTouches[0].pageX;
    }

    return evt.pageX;
  };
  /**
   * Sets the slider value from an event
   */


  MDCSliderFoundation.prototype.setValueFromEvt_ = function (evt) {
    var pageX = this.getPageX_(evt);
    var value = this.computeValueFromPageX_(pageX);
    this.setValue_(value, true);
  };
  /**
   * Computes the new value from the pageX position
   */


  MDCSliderFoundation.prototype.computeValueFromPageX_ = function (pageX) {
    var _a = this,
        max = _a.max_,
        min = _a.min_;

    var xPos = pageX - this.rect_.left;
    var pctComplete = xPos / this.rect_.width;

    if (this.adapter_.isRTL()) {
      pctComplete = 1 - pctComplete;
    } // Fit the percentage complete between the range [min,max]
    // by remapping from [0, 1] to [min, min+(max-min)].


    return min + pctComplete * (max - min);
  };
  /**
   * Handles keydown events
   */


  MDCSliderFoundation.prototype.handleKeydown_ = function (evt) {
    var keyId = this.getKeyId_(evt);
    var value = this.getValueForKeyId_(keyId);

    if (isNaN(value)) {
      return;
    } // Prevent page from scrolling due to key presses that would normally scroll the page


    evt.preventDefault();
    this.adapter_.addClass(cssClasses$9.FOCUS);
    this.setValue_(value, true);
    this.adapter_.notifyChange();
  };
  /**
   * Returns the computed name of the event
   */


  MDCSliderFoundation.prototype.getKeyId_ = function (kbdEvt) {
    if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
      return KEY_IDS.ARROW_LEFT;
    }

    if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
      return KEY_IDS.ARROW_RIGHT;
    }

    if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
      return KEY_IDS.ARROW_UP;
    }

    if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
      return KEY_IDS.ARROW_DOWN;
    }

    if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
      return KEY_IDS.HOME;
    }

    if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
      return KEY_IDS.END;
    }

    if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
      return KEY_IDS.PAGE_UP;
    }

    if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
      return KEY_IDS.PAGE_DOWN;
    }

    return '';
  };
  /**
   * Computes the value given a keyboard key ID
   */


  MDCSliderFoundation.prototype.getValueForKeyId_ = function (keyId) {
    var _a = this,
        max = _a.max_,
        min = _a.min_,
        step = _a.step_;

    var delta = step || (max - min) / 100;
    var valueNeedsToBeFlipped = this.adapter_.isRTL() && (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);

    if (valueNeedsToBeFlipped) {
      delta = -delta;
    }

    switch (keyId) {
      case KEY_IDS.ARROW_LEFT:
      case KEY_IDS.ARROW_DOWN:
        return this.value_ - delta;

      case KEY_IDS.ARROW_RIGHT:
      case KEY_IDS.ARROW_UP:
        return this.value_ + delta;

      case KEY_IDS.HOME:
        return this.min_;

      case KEY_IDS.END:
        return this.max_;

      case KEY_IDS.PAGE_UP:
        return this.value_ + delta * numbers$4.PAGE_FACTOR;

      case KEY_IDS.PAGE_DOWN:
        return this.value_ - delta * numbers$4.PAGE_FACTOR;

      default:
        return NaN;
    }
  };

  MDCSliderFoundation.prototype.handleFocus_ = function () {
    if (this.preventFocusState_) {
      return;
    }

    this.adapter_.addClass(cssClasses$9.FOCUS);
  };

  MDCSliderFoundation.prototype.handleBlur_ = function () {
    this.preventFocusState_ = false;
    this.adapter_.removeClass(cssClasses$9.FOCUS);
  };
  /**
   * Sets the value of the slider
   */


  MDCSliderFoundation.prototype.setValue_ = function (value, shouldFireInput, force) {
    if (force === void 0) {
      force = false;
    }

    if (value === this.value_ && !force) {
      return;
    }

    var _a = this,
        min = _a.min_,
        max = _a.max_;

    var valueSetToBoundary = value === min || value === max;

    if (this.step_ && !valueSetToBoundary) {
      value = this.quantize_(value);
    }

    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    this.value_ = value;
    this.adapter_.setAttribute(strings$9.ARIA_VALUENOW, String(this.value_));
    this.updateUIForCurrentValue_();

    if (shouldFireInput) {
      this.adapter_.notifyInput();

      if (this.isDiscrete_) {
        this.adapter_.setMarkerValue(value);
      }
    }
  };
  /**
   * Calculates the quantized value
   */


  MDCSliderFoundation.prototype.quantize_ = function (value) {
    var numSteps = Math.round(value / this.step_);
    return numSteps * this.step_;
  };

  MDCSliderFoundation.prototype.updateUIForCurrentValue_ = function () {
    var _this = this;

    var _a = this,
        max = _a.max_,
        min = _a.min_,
        value = _a.value_;

    var pctComplete = (value - min) / (max - min);
    var translatePx = pctComplete * this.rect_.width;

    if (this.adapter_.isRTL()) {
      translatePx = this.rect_.width - translatePx;
    }

    var transformProp = getCorrectPropertyName(window, 'transform');
    var transitionendEvtName = getCorrectEventName(window, 'transitionend');

    if (this.inTransit_) {
      var onTransitionEnd_1 = function () {
        _this.setInTransit_(false);

        _this.adapter_.deregisterThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd_1);
      };

      this.adapter_.registerThumbContainerInteractionHandler(transitionendEvtName, onTransitionEnd_1);
    }

    requestAnimationFrame(function () {
      // NOTE(traviskaufman): It would be nice to use calc() here,
      // but IE cannot handle calcs in transforms correctly.
      // See: https://goo.gl/NC2itk
      // Also note that the -50% offset is used to center the slider thumb.
      _this.adapter_.setThumbContainerStyleProperty(transformProp, "translateX(" + translatePx + "px) translateX(-50%)");

      _this.adapter_.setTrackStyleProperty(transformProp, "scaleX(" + pctComplete + ")");
    });
  };
  /**
   * Toggles the active state of the slider
   */


  MDCSliderFoundation.prototype.setActive_ = function (active) {
    this.active_ = active;
    this.toggleClass_(cssClasses$9.ACTIVE, this.active_);
  };
  /**
   * Toggles the inTransit state of the slider
   */


  MDCSliderFoundation.prototype.setInTransit_ = function (inTransit) {
    this.inTransit_ = inTransit;
    this.toggleClass_(cssClasses$9.IN_TRANSIT, this.inTransit_);
  };
  /**
   * Conditionally adds or removes a class based on shouldBePresent
   */


  MDCSliderFoundation.prototype.toggleClass_ = function (className, shouldBePresent) {
    if (shouldBePresent) {
      this.adapter_.addClass(className);
    } else {
      this.adapter_.removeClass(className);
    }
  };

  return MDCSliderFoundation;
}(MDCFoundation);

const INPUT_EVENT = 'input';
const CHANGE_EVENT = 'change';
class SliderBase extends FormElement {
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
})], SliderBase.prototype, "layout", null);

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
const style$d = css`@keyframes mdc-slider-emphasize{0%{animation-timing-function:ease-out}50%{animation-timing-function:ease-in;transform:scale(0.85)}100%{transform:scale(0.571)}}.mdc-slider{position:relative;width:100%;height:48px;cursor:pointer;touch-action:pan-x;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-container{background-color:rgba(1,135,134,.26)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-marker-container{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__thumb{fill:#018786;fill:var(--mdc-theme-secondary, #018786);stroke:#018786;stroke:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__focus-ring{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__pin{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__pin{color:#fff;color:var(--mdc-theme-text-primary-on-dark, white)}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__track{background-color:#9a9a9a}.mdc-slider--disabled .mdc-slider__track-container{background-color:rgba(154,154,154,.26)}.mdc-slider--disabled .mdc-slider__track-marker-container{background-color:#9a9a9a}.mdc-slider--disabled .mdc-slider__thumb{fill:#9a9a9a;stroke:#9a9a9a}.mdc-slider--disabled .mdc-slider__thumb{stroke:#fff;stroke:var(--mdc-slider-bg-color-behind-component, white)}.mdc-slider:focus{outline:none}.mdc-slider__track-container{position:absolute;top:50%;width:100%;height:2px;overflow:hidden}.mdc-slider__track{position:absolute;width:100%;height:100%;transform-origin:left top;will-change:transform}.mdc-slider[dir=rtl] .mdc-slider__track,[dir=rtl] .mdc-slider .mdc-slider__track{transform-origin:right top}.mdc-slider__track-marker-container{display:flex;margin-right:0;margin-left:-1px;visibility:hidden}.mdc-slider[dir=rtl] .mdc-slider__track-marker-container,[dir=rtl] .mdc-slider .mdc-slider__track-marker-container{margin-right:-1px;margin-left:0}.mdc-slider__track-marker-container::after{display:block;width:2px;height:2px;content:""}.mdc-slider__track-marker{flex:1}.mdc-slider__track-marker::after{display:block;width:2px;height:2px;content:""}.mdc-slider__track-marker:first-child::after{width:3px}.mdc-slider__thumb-container{position:absolute;top:15px;left:0;width:21px;height:100%;user-select:none;will-change:transform}.mdc-slider__thumb{position:absolute;top:0;left:0;transform:scale(0.571);stroke-width:3.5;transition:transform 100ms ease-out,fill 100ms ease-out,stroke 100ms ease-out}.mdc-slider__focus-ring{width:21px;height:21px;border-radius:50%;opacity:0;transition:transform 266.67ms ease-out,opacity 266.67ms ease-out,background-color 266.67ms ease-out}.mdc-slider__pin{display:flex;position:absolute;top:0;left:0;align-items:center;justify-content:center;width:26px;height:26px;margin-top:-2px;margin-left:-2px;transform:rotate(-45deg) scale(0) translate(0, 0);border-radius:50% 50% 50% 0%;z-index:1;transition:transform 100ms ease-out}.mdc-slider__pin-value-marker{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.0178571429em;text-decoration:inherit;text-transform:inherit;transform:rotate(45deg)}.mdc-slider--active .mdc-slider__thumb{transform:scale3d(1, 1, 1)}.mdc-slider--focus .mdc-slider__thumb{animation:mdc-slider-emphasize 266.67ms linear}.mdc-slider--focus .mdc-slider__focus-ring{transform:scale3d(1.55, 1.55, 1.55);opacity:.25}.mdc-slider--in-transit .mdc-slider__thumb{transition-delay:140ms}.mdc-slider--in-transit .mdc-slider__thumb-container,.mdc-slider--in-transit .mdc-slider__track,.mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__thumb-container,.mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__track{transition:transform 80ms ease}.mdc-slider--discrete.mdc-slider--active .mdc-slider__thumb{transform:scale(calc(12 / 21))}.mdc-slider--discrete.mdc-slider--active .mdc-slider__pin{transform:rotate(-45deg) scale(1) translate(19px, -20px)}.mdc-slider--discrete.mdc-slider--focus .mdc-slider__thumb{animation:none}.mdc-slider--discrete.mdc-slider--display-markers .mdc-slider__track-marker-container{visibility:visible}:host{display:inline-block;min-width:120px;outline:none}`;

let Slider = class Slider extends SliderBase {};
Slider.styles = style$d;
Slider = __decorate([customElement('mwc-slider')], Slider);

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$a = {
  CLOSED_CLASS: 'mdc-linear-progress--closed',
  INDETERMINATE_CLASS: 'mdc-linear-progress--indeterminate',
  REVERSED_CLASS: 'mdc-linear-progress--reversed'
};
var strings$a = {
  ARIA_VALUENOW: 'aria-valuenow',
  BUFFER_SELECTOR: '.mdc-linear-progress__buffer',
  PRIMARY_BAR_SELECTOR: '.mdc-linear-progress__primary-bar'
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCLinearProgressFoundation =
/** @class */
function (_super) {
  __extends(MDCLinearProgressFoundation, _super);

  function MDCLinearProgressFoundation(adapter) {
    return _super.call(this, __assign({}, MDCLinearProgressFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCLinearProgressFoundation, "cssClasses", {
    get: function () {
      return cssClasses$a;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCLinearProgressFoundation, "strings", {
    get: function () {
      return strings$a;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCLinearProgressFoundation, "defaultAdapter", {
    get: function () {
      return {
        addClass: function () {
          return undefined;
        },
        forceLayout: function () {
          return undefined;
        },
        getBuffer: function () {
          return null;
        },
        getPrimaryBar: function () {
          return null;
        },
        hasClass: function () {
          return false;
        },
        removeAttribute: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setAttribute: function () {
          return undefined;
        },
        setStyle: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCLinearProgressFoundation.prototype.init = function () {
    this.isDeterminate_ = !this.adapter_.hasClass(cssClasses$a.INDETERMINATE_CLASS);
    this.isReversed_ = this.adapter_.hasClass(cssClasses$a.REVERSED_CLASS);
    this.progress_ = 0;
    this.buffer_ = 1;
  };

  MDCLinearProgressFoundation.prototype.setDeterminate = function (isDeterminate) {
    this.isDeterminate_ = isDeterminate;

    if (this.isDeterminate_) {
      this.adapter_.removeClass(cssClasses$a.INDETERMINATE_CLASS);
      this.adapter_.setAttribute(strings$a.ARIA_VALUENOW, this.progress_.toString());
      this.setScale_(this.adapter_.getPrimaryBar(), this.progress_);
      this.setScale_(this.adapter_.getBuffer(), this.buffer_);
    } else {
      if (this.isReversed_) {
        // Adding/removing REVERSED_CLASS starts a translate animation, while
        // adding INDETERMINATE_CLASS starts a scale animation. Here, we reset
        // the translate animation in order to keep it in sync with the new
        // scale animation that will start from adding INDETERMINATE_CLASS
        // below.
        this.adapter_.removeClass(cssClasses$a.REVERSED_CLASS);
        this.adapter_.forceLayout();
        this.adapter_.addClass(cssClasses$a.REVERSED_CLASS);
      }

      this.adapter_.addClass(cssClasses$a.INDETERMINATE_CLASS);
      this.adapter_.removeAttribute(strings$a.ARIA_VALUENOW);
      this.setScale_(this.adapter_.getPrimaryBar(), 1);
      this.setScale_(this.adapter_.getBuffer(), 1);
    }
  };

  MDCLinearProgressFoundation.prototype.setProgress = function (value) {
    this.progress_ = value;

    if (this.isDeterminate_) {
      this.setScale_(this.adapter_.getPrimaryBar(), value);
      this.adapter_.setAttribute(strings$a.ARIA_VALUENOW, value.toString());
    }
  };

  MDCLinearProgressFoundation.prototype.setBuffer = function (value) {
    this.buffer_ = value;

    if (this.isDeterminate_) {
      this.setScale_(this.adapter_.getBuffer(), value);
    }
  };

  MDCLinearProgressFoundation.prototype.setReverse = function (isReversed) {
    this.isReversed_ = isReversed;

    if (!this.isDeterminate_) {
      // Adding INDETERMINATE_CLASS starts a scale animation, while
      // adding/removing REVERSED_CLASS starts a translate animation. Here, we
      // reset the scale animation in order to keep it in sync with the new
      // translate animation that will start from adding/removing REVERSED_CLASS
      // below.
      this.adapter_.removeClass(cssClasses$a.INDETERMINATE_CLASS);
      this.adapter_.forceLayout();
      this.adapter_.addClass(cssClasses$a.INDETERMINATE_CLASS);
    }

    if (this.isReversed_) {
      this.adapter_.addClass(cssClasses$a.REVERSED_CLASS);
    } else {
      this.adapter_.removeClass(cssClasses$a.REVERSED_CLASS);
    }
  };

  MDCLinearProgressFoundation.prototype.open = function () {
    this.adapter_.removeClass(cssClasses$a.CLOSED_CLASS);
  };

  MDCLinearProgressFoundation.prototype.close = function () {
    this.adapter_.addClass(cssClasses$a.CLOSED_CLASS);
  };

  MDCLinearProgressFoundation.prototype.setScale_ = function (el, scaleValue) {
    if (!el) {
      return;
    }

    var value = "scaleX(" + scaleValue + ")";
    this.adapter_.setStyle(el, getCorrectPropertyName(window, 'transform'), value);
  };

  return MDCLinearProgressFoundation;
}(MDCFoundation);

class LinearProgressBase extends BaseElement {
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
const style$e = css`@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{to{transform:translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{to{transform:translateX(10px)}}.mdc-linear-progress{position:relative;width:100%;height:4px;transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top:4px solid}.mdc-linear-progress__buffering-dots{position:absolute;width:100%;height:100%;background-repeat:repeat-x;background-size:10px 4px;animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer{position:absolute;width:100%;height:100%;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%;animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible;animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--reversed .mdc-linear-progress__bar,.mdc-linear-progress--reversed .mdc-linear-progress__buffer{right:0;transform-origin:center right}.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}.mdc-linear-progress--reversed .mdc-linear-progress__buffering-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear}.mdc-linear-progress--closed{opacity:0;animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffering-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer{background-color:#e6e6e6}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}:host{display:block}.mdc-linear-progress__buffer{background-color:#e6e6e6;background-color:var(--mdc-linear-progress-buffer-color, #e6e6e6)}.mdc-linear-progress__buffering-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E");background-image:var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"))}`;

let LinearProgress = class LinearProgress extends LinearProgressBase {};
LinearProgress.styles = style$e;
LinearProgress = __decorate([customElement('mwc-linear-progress')], LinearProgress);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$b = {
  NOTCH_ELEMENT_SELECTOR: '.mdc-notched-outline__notch'
};
var numbers$5 = {
  // This should stay in sync with $mdc-notched-outline-padding * 2.
  NOTCH_ELEMENT_PADDING: 8
};
var cssClasses$b = {
  NO_LABEL: 'mdc-notched-outline--no-label',
  OUTLINE_NOTCHED: 'mdc-notched-outline--notched',
  OUTLINE_UPGRADED: 'mdc-notched-outline--upgraded'
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCNotchedOutlineFoundation =
/** @class */
function (_super) {
  __extends(MDCNotchedOutlineFoundation, _super);

  function MDCNotchedOutlineFoundation(adapter) {
    return _super.call(this, __assign({}, MDCNotchedOutlineFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCNotchedOutlineFoundation, "strings", {
    get: function () {
      return strings$b;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "cssClasses", {
    get: function () {
      return cssClasses$b;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "numbers", {
    get: function () {
      return numbers$5;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCNotchedOutlineFoundation, "defaultAdapter", {
    /**
     * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        setNotchWidthProperty: function () {
          return undefined;
        },
        removeNotchWidthProperty: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Adds the outline notched selector and updates the notch width calculated based off of notchWidth.
   */

  MDCNotchedOutlineFoundation.prototype.notch = function (notchWidth) {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;

    if (notchWidth > 0) {
      notchWidth += numbers$5.NOTCH_ELEMENT_PADDING; // Add padding from left/right.
    }

    this.adapter_.setNotchWidthProperty(notchWidth);
    this.adapter_.addClass(OUTLINE_NOTCHED);
  };
  /**
   * Removes notched outline selector to close the notch in the outline.
   */


  MDCNotchedOutlineFoundation.prototype.closeNotch = function () {
    var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation.cssClasses.OUTLINE_NOTCHED;
    this.adapter_.removeClass(OUTLINE_NOTCHED);
    this.adapter_.removeNotchWidthProperty();
  };

  return MDCNotchedOutlineFoundation;
}(MDCFoundation);

class NotchedOutlineBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCNotchedOutlineFoundation;
    this.width = 0;
    this.open = false;
    this.lastOpen = this.open;
  }

  createAdapter() {
    return {
      addClass: className => this.mdcRoot.classList.add(className),
      removeClass: className => this.mdcRoot.classList.remove(className),
      setNotchWidthProperty: width => this.notchElement.style.setProperty('width', `${width}px`),
      removeNotchWidthProperty: () => this.notchElement.style.removeProperty('width')
    };
  }

  openOrClose(shouldOpen, width) {
    if (!this.mdcFoundation) {
      return;
    }

    if (shouldOpen && width !== undefined) {
      this.mdcFoundation.notch(width);
    } else {
      this.mdcFoundation.closeNotch();
    }
  }

  render() {
    this.openOrClose(this.open, this.width);
    return html`
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        <div class="mdc-notched-outline__notch">
          <slot></slot>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
      </div>`;
  }

}

__decorate([query('.mdc-notched-outline')], NotchedOutlineBase.prototype, "mdcRoot", void 0);

__decorate([property({
  type: Number
})], NotchedOutlineBase.prototype, "width", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], NotchedOutlineBase.prototype, "open", void 0);

__decorate([query('.mdc-notched-outline__notch')], NotchedOutlineBase.prototype, "notchElement", void 0);

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
const style$f = css`.mdc-notched-outline{display:flex;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / .75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}:host{display:block;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] :host,:host[dir=rtl]{text-align:right}::slotted(.mdc-floating-label){display:inline-block;position:relative;top:17px;bottom:auto;max-width:100%}::slotted(.mdc-floating-label--float-above){text-overflow:clip}.mdc-notched-outline--upgraded ::slotted(.mdc-floating-label--float-above){max-width:calc(100% / .75)}.mdc-notched-outline__leading{width:12px;width:var(--mdc-notched-outline-leading-width, 12px);border-radius:4px 0 0 4px;border-radius:var(--mdc-notched-outline-leading-border-radius, 4px 0 0 4px)}.mdc-notched-outline__trailing{border-radius:0 4px 4px 0;border-radius:var(--mdc-notched-outline-trailing-border-radius, 0 4px 4px 0)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-color:var(--mdc-notched-outline-border-color, var(--mdc-theme-primary, #6200ee));border-width:1px;border-width:var(--mdc-notched-outline-stroke-width, 1px)}`;

let NotchedOutline = class NotchedOutline extends NotchedOutlineBase {};
NotchedOutline.styles = style$f;
NotchedOutline = __decorate([customElement('mwc-notched-outline')], NotchedOutline);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$c = {
  ACTIVE: 'mdc-tab-indicator--active',
  FADE: 'mdc-tab-indicator--fade',
  NO_TRANSITION: 'mdc-tab-indicator--no-transition'
};
var strings$c = {
  CONTENT_SELECTOR: '.mdc-tab-indicator__content'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTabIndicatorFoundation =
/** @class */
function (_super) {
  __extends(MDCTabIndicatorFoundation, _super);

  function MDCTabIndicatorFoundation(adapter) {
    return _super.call(this, __assign({}, MDCTabIndicatorFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCTabIndicatorFoundation, "cssClasses", {
    get: function () {
      return cssClasses$c;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabIndicatorFoundation, "strings", {
    get: function () {
      return strings$c;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabIndicatorFoundation, "defaultAdapter", {
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        computeContentClientRect: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        setContentStyleProperty: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTabIndicatorFoundation.prototype.computeContentClientRect = function () {
    return this.adapter_.computeContentClientRect();
  };

  return MDCTabIndicatorFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/* istanbul ignore next: subclass is not a branch statement */

var MDCFadingTabIndicatorFoundation =
/** @class */
function (_super) {
  __extends(MDCFadingTabIndicatorFoundation, _super);

  function MDCFadingTabIndicatorFoundation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCFadingTabIndicatorFoundation.prototype.activate = function () {
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
  };

  MDCFadingTabIndicatorFoundation.prototype.deactivate = function () {
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
  };

  return MDCFadingTabIndicatorFoundation;
}(MDCTabIndicatorFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/* istanbul ignore next: subclass is not a branch statement */

var MDCSlidingTabIndicatorFoundation =
/** @class */
function (_super) {
  __extends(MDCSlidingTabIndicatorFoundation, _super);

  function MDCSlidingTabIndicatorFoundation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCSlidingTabIndicatorFoundation.prototype.activate = function (previousIndicatorClientRect) {
    // Early exit if no indicator is present to handle cases where an indicator
    // may be activated without a prior indicator state
    if (!previousIndicatorClientRect) {
      this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
      return;
    } // This animation uses the FLIP approach. You can read more about it at the link below:
    // https://aerotwist.com/blog/flip-your-animations/
    // Calculate the dimensions based on the dimensions of the previous indicator


    var currentClientRect = this.computeContentClientRect();
    var widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
    var xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
    this.adapter_.setContentStyleProperty('transform', "translateX(" + xPosition + "px) scaleX(" + widthDelta + ")"); // Force repaint before updating classes and transform to ensure the transform properly takes effect

    this.computeContentClientRect();
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
    this.adapter_.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
    this.adapter_.setContentStyleProperty('transform', '');
  };

  MDCSlidingTabIndicatorFoundation.prototype.deactivate = function () {
    this.adapter_.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
  };

  return MDCSlidingTabIndicatorFoundation;
}(MDCTabIndicatorFoundation);

class TabIndicatorBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.icon = '';
    this.fade = false;
  }

  get mdcFoundationClass() {
    return this.fade ? MDCFadingTabIndicatorFoundation : MDCSlidingTabIndicatorFoundation;
  }

  render() {
    const contentClasses = {
      'mdc-tab-indicator__content--icon': this.icon,
      'material-icons': this.icon,
      'mdc-tab-indicator__content--underline': !this.icon
    };
    return html`
      <span class="mdc-tab-indicator ${classMap({
      'mdc-tab-indicator--fade': this.fade
    })}">
        <span class="mdc-tab-indicator__content ${classMap(contentClasses)}">${this.icon}</span>
      </span>
      `;
  }

  updated(changedProperties) {
    if (changedProperties.has('fade')) {
      this.createFoundation();
    }
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      computeContentClientRect: () => this.contentElement.getBoundingClientRect(),
      setContentStyleProperty: (prop, value) => this.contentElement.style.setProperty(prop, value)
    });
  }

  computeContentClientRect() {
    return this.mdcFoundation.computeContentClientRect();
  }

  activate(previousIndicatorClientRect) {
    this.mdcFoundation.activate(previousIndicatorClientRect);
  }

  deactivate() {
    this.mdcFoundation.deactivate();
  }

}

__decorate([query('.mdc-tab-indicator')], TabIndicatorBase.prototype, "mdcRoot", void 0);

__decorate([query('.mdc-tab-indicator__content')], TabIndicatorBase.prototype, "contentElement", void 0);

__decorate([property()], TabIndicatorBase.prototype, "icon", void 0);

__decorate([property({
  type: Boolean
})], TabIndicatorBase.prototype, "fade", void 0);

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
const style$g = css`.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab-indicator .mdc-tab-indicator__content--icon{color:#018786;color:var(--mdc-theme-secondary, #018786)}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

let TabIndicator = class TabIndicator extends TabIndicatorBase {};
TabIndicator.styles = style$g;
TabIndicator = __decorate([customElement('mwc-tab-indicator')], TabIndicator);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$d = {
  ACTIVE: 'mdc-tab--active'
};
var strings$d = {
  ARIA_SELECTED: 'aria-selected',
  CONTENT_SELECTOR: '.mdc-tab__content',
  INTERACTED_EVENT: 'MDCTab:interacted',
  RIPPLE_SELECTOR: '.mdc-tab__ripple',
  TABINDEX: 'tabIndex',
  TAB_INDICATOR_SELECTOR: '.mdc-tab-indicator'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTabFoundation =
/** @class */
function (_super) {
  __extends(MDCTabFoundation, _super);

  function MDCTabFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCTabFoundation.defaultAdapter, adapter)) || this;

    _this.focusOnActivate_ = true;
    return _this;
  }

  Object.defineProperty(MDCTabFoundation, "cssClasses", {
    get: function () {
      return cssClasses$d;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabFoundation, "strings", {
    get: function () {
      return strings$d;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabFoundation, "defaultAdapter", {
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setAttr: function () {
          return undefined;
        },
        activateIndicator: function () {
          return undefined;
        },
        deactivateIndicator: function () {
          return undefined;
        },
        notifyInteracted: function () {
          return undefined;
        },
        getOffsetLeft: function () {
          return 0;
        },
        getOffsetWidth: function () {
          return 0;
        },
        getContentOffsetLeft: function () {
          return 0;
        },
        getContentOffsetWidth: function () {
          return 0;
        },
        focus: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTabFoundation.prototype.handleClick = function () {
    // It's up to the parent component to keep track of the active Tab and
    // ensure we don't activate a Tab that's already active.
    this.adapter_.notifyInteracted();
  };

  MDCTabFoundation.prototype.isActive = function () {
    return this.adapter_.hasClass(cssClasses$d.ACTIVE);
  };
  /**
   * Sets whether the tab should focus itself when activated
   */


  MDCTabFoundation.prototype.setFocusOnActivate = function (focusOnActivate) {
    this.focusOnActivate_ = focusOnActivate;
  };
  /**
   * Activates the Tab
   */


  MDCTabFoundation.prototype.activate = function (previousIndicatorClientRect) {
    this.adapter_.addClass(cssClasses$d.ACTIVE);
    this.adapter_.setAttr(strings$d.ARIA_SELECTED, 'true');
    this.adapter_.setAttr(strings$d.TABINDEX, '0');
    this.adapter_.activateIndicator(previousIndicatorClientRect);

    if (this.focusOnActivate_) {
      this.adapter_.focus();
    }
  };
  /**
   * Deactivates the Tab
   */


  MDCTabFoundation.prototype.deactivate = function () {
    // Early exit
    if (!this.isActive()) {
      return;
    }

    this.adapter_.removeClass(cssClasses$d.ACTIVE);
    this.adapter_.setAttr(strings$d.ARIA_SELECTED, 'false');
    this.adapter_.setAttr(strings$d.TABINDEX, '-1');
    this.adapter_.deactivateIndicator();
  };
  /**
   * Returns the dimensions of the Tab
   */


  MDCTabFoundation.prototype.computeDimensions = function () {
    var rootWidth = this.adapter_.getOffsetWidth();
    var rootLeft = this.adapter_.getOffsetLeft();
    var contentWidth = this.adapter_.getContentOffsetWidth();
    var contentLeft = this.adapter_.getContentOffsetLeft();
    return {
      contentLeft: rootLeft + contentLeft,
      contentRight: rootLeft + contentLeft + contentWidth,
      rootLeft: rootLeft,
      rootRight: rootLeft + rootWidth
    };
  };

  return MDCTabFoundation;
}(MDCFoundation);

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
const style$h = css`.mdc-tab{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.0892857143em;text-decoration:none;text-transform:uppercase;padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab .mdc-tab__text-label{color:rgba(0,0,0,.6)}.mdc-tab .mdc-tab__icon{color:rgba(0,0,0,.54);fill:currentColor}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-tab--active .mdc-tab__icon{color:#6200ee;color:var(--mdc-theme-primary, #6200ee);fill:currentColor}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-tab__ripple{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden}.mdc-tab__ripple::before,.mdc-tab__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-tab__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-tab__ripple.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-tab__ripple.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple::before,.mdc-tab__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-tab__ripple.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-tab__ripple::before,.mdc-tab__ripple::after{background-color:#6200ee}@supports not (-ms-ime-align: auto){.mdc-tab__ripple::before,.mdc-tab__ripple::after{background-color:var(--mdc-theme-primary, #6200ee)}}.mdc-tab__ripple:hover::before{opacity:.04}.mdc-tab__ripple.mdc-ripple-upgraded--background-focused::before,.mdc-tab__ripple:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-tab__ripple:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-tab__ripple:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-tab__ripple.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{outline:none;flex:1 0 auto;display:flex;justify-content:center}.mdc-tab{height:var(--mdc-tab-height, 48px);margin-left:0;margin-right:0}.mdc-tab--stacked{height:var(--mdc-tab-stacked-height, 72px)}.mdc-tab::-moz-focus-inner{border:0}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}:host([dir=rtl]) .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:0;padding-right:8px}`;

let tabIdCounter = 0;
class TabBase extends BaseElement {
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
TabBase.styles = style$h;

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

let Tab = class Tab extends TabBase {};
Tab.styles = style$h;
Tab = __decorate([customElement('mwc-tab')], Tab);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$e = {
  ANIMATING: 'mdc-tab-scroller--animating',
  SCROLL_AREA_SCROLL: 'mdc-tab-scroller__scroll-area--scroll',
  SCROLL_TEST: 'mdc-tab-scroller__test'
};
var strings$e = {
  AREA_SELECTOR: '.mdc-tab-scroller__scroll-area',
  CONTENT_SELECTOR: '.mdc-tab-scroller__scroll-content'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTabScrollerRTL =
/** @class */
function () {
  function MDCTabScrollerRTL(adapter) {
    this.adapter_ = adapter;
  }

  return MDCTabScrollerRTL;
}();

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTabScrollerRTLDefault =
/** @class */
function (_super) {
  __extends(MDCTabScrollerRTLDefault, _super);

  function MDCTabScrollerRTLDefault() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTabScrollerRTLDefault.prototype.getScrollPositionRTL = function () {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var right = this.calculateScrollEdges_().right; // Scroll values on most browsers are ints instead of floats so we round

    return Math.round(right - currentScrollLeft);
  };

  MDCTabScrollerRTLDefault.prototype.scrollToRTL = function (scrollX) {
    var edges = this.calculateScrollEdges_();
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(edges.right - scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };

  MDCTabScrollerRTLDefault.prototype.incrementScrollRTL = function (scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };

  MDCTabScrollerRTLDefault.prototype.getAnimatingScrollPosition = function (scrollX) {
    return scrollX;
  };

  MDCTabScrollerRTLDefault.prototype.calculateScrollEdges_ = function () {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return {
      left: 0,
      right: contentWidth - rootWidth
    };
  };

  MDCTabScrollerRTLDefault.prototype.clampScrollValue_ = function (scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  };

  return MDCTabScrollerRTLDefault;
}(MDCTabScrollerRTL);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTabScrollerRTLNegative =
/** @class */
function (_super) {
  __extends(MDCTabScrollerRTLNegative, _super);

  function MDCTabScrollerRTLNegative() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTabScrollerRTLNegative.prototype.getScrollPositionRTL = function (translateX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    return Math.round(translateX - currentScrollLeft);
  };

  MDCTabScrollerRTLNegative.prototype.scrollToRTL = function (scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(-scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };

  MDCTabScrollerRTLNegative.prototype.incrementScrollRTL = function (scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft - scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: clampedScrollLeft - currentScrollLeft
    };
  };

  MDCTabScrollerRTLNegative.prototype.getAnimatingScrollPosition = function (scrollX, translateX) {
    return scrollX - translateX;
  };

  MDCTabScrollerRTLNegative.prototype.calculateScrollEdges_ = function () {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return {
      left: rootWidth - contentWidth,
      right: 0
    };
  };

  MDCTabScrollerRTLNegative.prototype.clampScrollValue_ = function (scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.max(Math.min(edges.right, scrollX), edges.left);
  };

  return MDCTabScrollerRTLNegative;
}(MDCTabScrollerRTL);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTabScrollerRTLReverse =
/** @class */
function (_super) {
  __extends(MDCTabScrollerRTLReverse, _super);

  function MDCTabScrollerRTLReverse() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCTabScrollerRTLReverse.prototype.getScrollPositionRTL = function (translateX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft(); // Scroll values on most browsers are ints instead of floats so we round

    return Math.round(currentScrollLeft - translateX);
  };

  MDCTabScrollerRTLReverse.prototype.scrollToRTL = function (scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: currentScrollLeft - clampedScrollLeft
    };
  };

  MDCTabScrollerRTLReverse.prototype.incrementScrollRTL = function (scrollX) {
    var currentScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    var clampedScrollLeft = this.clampScrollValue_(currentScrollLeft + scrollX);
    return {
      finalScrollPosition: clampedScrollLeft,
      scrollDelta: currentScrollLeft - clampedScrollLeft
    };
  };

  MDCTabScrollerRTLReverse.prototype.getAnimatingScrollPosition = function (scrollX, translateX) {
    return scrollX + translateX;
  };

  MDCTabScrollerRTLReverse.prototype.calculateScrollEdges_ = function () {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return {
      left: contentWidth - rootWidth,
      right: 0
    };
  };

  MDCTabScrollerRTLReverse.prototype.clampScrollValue_ = function (scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.right, scrollX), edges.left);
  };

  return MDCTabScrollerRTLReverse;
}(MDCTabScrollerRTL);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTabScrollerFoundation =
/** @class */
function (_super) {
  __extends(MDCTabScrollerFoundation, _super);

  function MDCTabScrollerFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCTabScrollerFoundation.defaultAdapter, adapter)) || this;
    /**
     * Controls whether we should handle the transitionend and interaction events during the animation.
     */


    _this.isAnimating_ = false;
    return _this;
  }

  Object.defineProperty(MDCTabScrollerFoundation, "cssClasses", {
    get: function () {
      return cssClasses$e;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabScrollerFoundation, "strings", {
    get: function () {
      return strings$e;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabScrollerFoundation, "defaultAdapter", {
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        eventTargetMatchesSelector: function () {
          return false;
        },
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        addScrollAreaClass: function () {
          return undefined;
        },
        setScrollAreaStyleProperty: function () {
          return undefined;
        },
        setScrollContentStyleProperty: function () {
          return undefined;
        },
        getScrollContentStyleValue: function () {
          return '';
        },
        setScrollAreaScrollLeft: function () {
          return undefined;
        },
        getScrollAreaScrollLeft: function () {
          return 0;
        },
        getScrollContentOffsetWidth: function () {
          return 0;
        },
        getScrollAreaOffsetWidth: function () {
          return 0;
        },
        computeScrollAreaClientRect: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        computeScrollContentClientRect: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        computeHorizontalScrollbarHeight: function () {
          return 0;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTabScrollerFoundation.prototype.init = function () {
    // Compute horizontal scrollbar height on scroller with overflow initially hidden, then update overflow to scroll
    // and immediately adjust bottom margin to avoid the scrollbar initially appearing before JS runs.
    var horizontalScrollbarHeight = this.adapter_.computeHorizontalScrollbarHeight();
    this.adapter_.setScrollAreaStyleProperty('margin-bottom', -horizontalScrollbarHeight + 'px');
    this.adapter_.addScrollAreaClass(MDCTabScrollerFoundation.cssClasses.SCROLL_AREA_SCROLL);
  };
  /**
   * Computes the current visual scroll position
   */


  MDCTabScrollerFoundation.prototype.getScrollPosition = function () {
    if (this.isRTL_()) {
      return this.computeCurrentScrollPositionRTL_();
    }

    var currentTranslateX = this.calculateCurrentTranslateX_();
    var scrollLeft = this.adapter_.getScrollAreaScrollLeft();
    return scrollLeft - currentTranslateX;
  };
  /**
   * Handles interaction events that occur during transition
   */


  MDCTabScrollerFoundation.prototype.handleInteraction = function () {
    // Early exit if we aren't animating
    if (!this.isAnimating_) {
      return;
    } // Prevent other event listeners from handling this event


    this.stopScrollAnimation_();
  };
  /**
   * Handles the transitionend event
   */


  MDCTabScrollerFoundation.prototype.handleTransitionEnd = function (evt) {
    // Early exit if we aren't animating or the event was triggered by a different element.
    var evtTarget = evt.target;

    if (!this.isAnimating_ || !this.adapter_.eventTargetMatchesSelector(evtTarget, MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)) {
      return;
    }

    this.isAnimating_ = false;
    this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
  };
  /**
   * Increment the scroll value by the scrollXIncrement using animation.
   * @param scrollXIncrement The value by which to increment the scroll position
   */


  MDCTabScrollerFoundation.prototype.incrementScroll = function (scrollXIncrement) {
    // Early exit for non-operational increment values
    if (scrollXIncrement === 0) {
      return;
    }

    this.animate_(this.getIncrementScrollOperation_(scrollXIncrement));
  };
  /**
   * Increment the scroll value by the scrollXIncrement without animation.
   * @param scrollXIncrement The value by which to increment the scroll position
   */


  MDCTabScrollerFoundation.prototype.incrementScrollImmediate = function (scrollXIncrement) {
    // Early exit for non-operational increment values
    if (scrollXIncrement === 0) {
      return;
    }

    var operation = this.getIncrementScrollOperation_(scrollXIncrement);

    if (operation.scrollDelta === 0) {
      return;
    }

    this.stopScrollAnimation_();
    this.adapter_.setScrollAreaScrollLeft(operation.finalScrollPosition);
  };
  /**
   * Scrolls to the given scrollX value
   */


  MDCTabScrollerFoundation.prototype.scrollTo = function (scrollX) {
    if (this.isRTL_()) {
      return this.scrollToRTL_(scrollX);
    }

    this.scrollTo_(scrollX);
  };
  /**
   * @return Browser-specific {@link MDCTabScrollerRTL} instance.
   */


  MDCTabScrollerFoundation.prototype.getRTLScroller = function () {
    if (!this.rtlScrollerInstance_) {
      this.rtlScrollerInstance_ = this.rtlScrollerFactory_();
    }

    return this.rtlScrollerInstance_;
  };
  /**
   * @return translateX value from a CSS matrix transform function string.
   */


  MDCTabScrollerFoundation.prototype.calculateCurrentTranslateX_ = function () {
    var transformValue = this.adapter_.getScrollContentStyleValue('transform'); // Early exit if no transform is present

    if (transformValue === 'none') {
      return 0;
    } // The transform value comes back as a matrix transformation in the form
    // of `matrix(a, b, c, d, tx, ty)`. We only care about tx (translateX) so
    // we're going to grab all the parenthesized values, strip out tx, and
    // parse it.


    var match = /\((.+?)\)/.exec(transformValue);

    if (!match) {
      return 0;
    }

    var matrixParams = match[1]; // tslint:disable-next-line:ban-ts-ignore "Unused vars" should be a linter warning, not a compiler error.
    // @ts-ignore These unused variables should retain their semantic names for clarity.

    var _a = __read(matrixParams.split(','), 6),
        a = _a[0],
        b = _a[1],
        c = _a[2],
        d = _a[3],
        tx = _a[4],
        ty = _a[5];

    return parseFloat(tx); // tslint:disable-line:ban
  };
  /**
   * Calculates a safe scroll value that is > 0 and < the max scroll value
   * @param scrollX The distance to scroll
   */


  MDCTabScrollerFoundation.prototype.clampScrollValue_ = function (scrollX) {
    var edges = this.calculateScrollEdges_();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  };

  MDCTabScrollerFoundation.prototype.computeCurrentScrollPositionRTL_ = function () {
    var translateX = this.calculateCurrentTranslateX_();
    return this.getRTLScroller().getScrollPositionRTL(translateX);
  };

  MDCTabScrollerFoundation.prototype.calculateScrollEdges_ = function () {
    var contentWidth = this.adapter_.getScrollContentOffsetWidth();
    var rootWidth = this.adapter_.getScrollAreaOffsetWidth();
    return {
      left: 0,
      right: contentWidth - rootWidth
    };
  };
  /**
   * Internal scroll method
   * @param scrollX The new scroll position
   */


  MDCTabScrollerFoundation.prototype.scrollTo_ = function (scrollX) {
    var currentScrollX = this.getScrollPosition();
    var safeScrollX = this.clampScrollValue_(scrollX);
    var scrollDelta = safeScrollX - currentScrollX;
    this.animate_({
      finalScrollPosition: safeScrollX,
      scrollDelta: scrollDelta
    });
  };
  /**
   * Internal RTL scroll method
   * @param scrollX The new scroll position
   */


  MDCTabScrollerFoundation.prototype.scrollToRTL_ = function (scrollX) {
    var animation = this.getRTLScroller().scrollToRTL(scrollX);
    this.animate_(animation);
  };
  /**
   * Internal method to compute the increment scroll operation values.
   * @param scrollX The desired scroll position increment
   * @return MDCTabScrollerAnimation with the sanitized values for performing the scroll operation.
   */


  MDCTabScrollerFoundation.prototype.getIncrementScrollOperation_ = function (scrollX) {
    if (this.isRTL_()) {
      return this.getRTLScroller().incrementScrollRTL(scrollX);
    }

    var currentScrollX = this.getScrollPosition();
    var targetScrollX = scrollX + currentScrollX;
    var safeScrollX = this.clampScrollValue_(targetScrollX);
    var scrollDelta = safeScrollX - currentScrollX;
    return {
      finalScrollPosition: safeScrollX,
      scrollDelta: scrollDelta
    };
  };
  /**
   * Animates the tab scrolling
   * @param animation The animation to apply
   */


  MDCTabScrollerFoundation.prototype.animate_ = function (animation) {
    var _this = this; // Early exit if translateX is 0, which means there's no animation to perform


    if (animation.scrollDelta === 0) {
      return;
    }

    this.stopScrollAnimation_(); // This animation uses the FLIP approach.
    // Read more here: https://aerotwist.com/blog/flip-your-animations/

    this.adapter_.setScrollAreaScrollLeft(animation.finalScrollPosition);
    this.adapter_.setScrollContentStyleProperty('transform', "translateX(" + animation.scrollDelta + "px)"); // Force repaint

    this.adapter_.computeScrollAreaClientRect();
    requestAnimationFrame(function () {
      _this.adapter_.addClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);

      _this.adapter_.setScrollContentStyleProperty('transform', 'none');
    });
    this.isAnimating_ = true;
  };
  /**
   * Stops scroll animation
   */


  MDCTabScrollerFoundation.prototype.stopScrollAnimation_ = function () {
    this.isAnimating_ = false;
    var currentScrollPosition = this.getAnimatingScrollPosition_();
    this.adapter_.removeClass(MDCTabScrollerFoundation.cssClasses.ANIMATING);
    this.adapter_.setScrollContentStyleProperty('transform', 'translateX(0px)');
    this.adapter_.setScrollAreaScrollLeft(currentScrollPosition);
  };
  /**
   * Gets the current scroll position during animation
   */


  MDCTabScrollerFoundation.prototype.getAnimatingScrollPosition_ = function () {
    var currentTranslateX = this.calculateCurrentTranslateX_();
    var scrollLeft = this.adapter_.getScrollAreaScrollLeft();

    if (this.isRTL_()) {
      return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
    }

    return scrollLeft - currentTranslateX;
  };
  /**
   * Determines the RTL Scroller to use
   */


  MDCTabScrollerFoundation.prototype.rtlScrollerFactory_ = function () {
    // Browsers have three different implementations of scrollLeft in RTL mode,
    // dependent on the browser. The behavior is based off the max LTR
    // scrollLeft value and 0.
    //
    // * Default scrolling in RTL *
    //    - Left-most value: 0
    //    - Right-most value: Max LTR scrollLeft value
    //
    // * Negative scrolling in RTL *
    //    - Left-most value: Negated max LTR scrollLeft value
    //    - Right-most value: 0
    //
    // * Reverse scrolling in RTL *
    //    - Left-most value: Max LTR scrollLeft value
    //    - Right-most value: 0
    //
    // We use those principles below to determine which RTL scrollLeft
    // behavior is implemented in the current browser.
    var initialScrollLeft = this.adapter_.getScrollAreaScrollLeft();
    this.adapter_.setScrollAreaScrollLeft(initialScrollLeft - 1);
    var newScrollLeft = this.adapter_.getScrollAreaScrollLeft(); // If the newScrollLeft value is negative,then we know that the browser has
    // implemented negative RTL scrolling, since all other implementations have
    // only positive values.

    if (newScrollLeft < 0) {
      // Undo the scrollLeft test check
      this.adapter_.setScrollAreaScrollLeft(initialScrollLeft);
      return new MDCTabScrollerRTLNegative(this.adapter_);
    }

    var rootClientRect = this.adapter_.computeScrollAreaClientRect();
    var contentClientRect = this.adapter_.computeScrollContentClientRect();
    var rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right); // Undo the scrollLeft test check

    this.adapter_.setScrollAreaScrollLeft(initialScrollLeft); // By calculating the clientRect of the root element and the clientRect of
    // the content element, we can determine how much the scroll value changed
    // when we performed the scrollLeft subtraction above.

    if (rightEdgeDelta === newScrollLeft) {
      return new MDCTabScrollerRTLReverse(this.adapter_);
    }

    return new MDCTabScrollerRTLDefault(this.adapter_);
  };

  MDCTabScrollerFoundation.prototype.isRTL_ = function () {
    return this.adapter_.getScrollContentStyleValue('direction') === 'rtl';
  };

  return MDCTabScrollerFoundation;
}(MDCFoundation);

class TabScrollerBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCTabScrollerFoundation;
    this._scrollbarHeight = -1;
  }

  _handleInteraction() {
    this.mdcFoundation.handleInteraction();
  }

  _handleTransitionEnd(e) {
    this.mdcFoundation.handleTransitionEnd(e);
  }

  render() {
    return html`
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area"
            @wheel="${this._handleInteraction}"
            @touchstart="${this._handleInteraction}"
            @pointerdown="${this._handleInteraction}"
            @mousedown="${this._handleInteraction}"
            @keydown="${this._handleInteraction}"
            @transitionend="${this._handleTransitionEnd}">
          <div class="mdc-tab-scroller__scroll-content"><slot></slot></div>
        </div>
      </div>
      `;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      eventTargetMatchesSelector: (evtTarget, selector) => matches(evtTarget, selector),
      addScrollAreaClass: className => this.scrollAreaElement.classList.add(className),
      setScrollAreaStyleProperty: (prop, value) => this.scrollAreaElement.style.setProperty(prop, value),
      setScrollContentStyleProperty: (prop, value) => this.scrollContentElement.style.setProperty(prop, value),
      getScrollContentStyleValue: propName => window.getComputedStyle(this.scrollContentElement).getPropertyValue(propName),
      setScrollAreaScrollLeft: scrollX => this.scrollAreaElement.scrollLeft = scrollX,
      getScrollAreaScrollLeft: () => this.scrollAreaElement.scrollLeft,
      getScrollContentOffsetWidth: () => this.scrollContentElement.offsetWidth,
      getScrollAreaOffsetWidth: () => this.scrollAreaElement.offsetWidth,
      computeScrollAreaClientRect: () => this.scrollAreaElement.getBoundingClientRect(),
      computeScrollContentClientRect: () => this.scrollContentElement.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () => {
        if (this._scrollbarHeight === -1) {
          this.scrollAreaElement.style.overflowX = 'scroll';
          this._scrollbarHeight = this.scrollAreaElement.offsetHeight - this.scrollAreaElement.clientHeight;
          this.scrollAreaElement.style.overflowX = '';
        }

        return this._scrollbarHeight;
      }
    });
  }
  /**
   * Returns the current visual scroll position
   * @return {number}
   */


  getScrollPosition() {
    return this.mdcFoundation.getScrollPosition();
  }
  /**
   * Returns the width of the scroll content
   * @return {number}
   */


  getScrollContentWidth() {
    return this.scrollContentElement.offsetWidth;
  }
  /**
   * Increments the scroll value by the given amount
   * @param {number} scrollXIncrement The pixel value by which to increment the
   *     scroll value
   */


  incrementScrollPosition(scrollXIncrement) {
    this.mdcFoundation.incrementScroll(scrollXIncrement);
  }
  /**
   * Scrolls to the given pixel position
   * @param {number} scrollX The pixel value to scroll to
   */


  scrollToPosition(scrollX) {
    this.mdcFoundation.scrollTo(scrollX);
  }

}

__decorate([query('.mdc-tab-scroller')], TabScrollerBase.prototype, "mdcRoot", void 0);

__decorate([query('.mdc-tab-scroller__scroll-area')], TabScrollerBase.prototype, "scrollAreaElement", void 0);

__decorate([query('.mdc-tab-scroller__scroll-content')], TabScrollerBase.prototype, "scrollContentElement", void 0);

__decorate([eventOptions({
  passive: true
})], TabScrollerBase.prototype, "_handleInteraction", null);

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
const style$i = css`.mdc-tab-scroller{overflow-y:hidden}.mdc-tab-scroller.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-scroller__test{position:absolute;top:-9999px;width:100px;height:100px;overflow-x:scroll}.mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:touch;display:flex;overflow-x:hidden}.mdc-tab-scroller__scroll-area::-webkit-scrollbar,.mdc-tab-scroller__test::-webkit-scrollbar{display:none}.mdc-tab-scroller__scroll-area--scroll{overflow-x:scroll}.mdc-tab-scroller__scroll-content{position:relative;display:flex;flex:1 0 auto;transform:none;will-change:transform}.mdc-tab-scroller--align-start .mdc-tab-scroller__scroll-content{justify-content:flex-start}.mdc-tab-scroller--align-end .mdc-tab-scroller__scroll-content{justify-content:flex-end}.mdc-tab-scroller--align-center .mdc-tab-scroller__scroll-content{justify-content:center}.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:auto}:host{display:flex}.mdc-tab-scroller{flex:1}`;

let TabScroller = class TabScroller extends TabScrollerBase {};
TabScroller.styles = style$i;
TabScroller = __decorate([customElement('mwc-tab-scroller')], TabScroller);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$f = {
  ARROW_LEFT_KEY: 'ArrowLeft',
  ARROW_RIGHT_KEY: 'ArrowRight',
  END_KEY: 'End',
  ENTER_KEY: 'Enter',
  HOME_KEY: 'Home',
  SPACE_KEY: 'Space',
  TAB_ACTIVATED_EVENT: 'MDCTabBar:activated',
  TAB_SCROLLER_SELECTOR: '.mdc-tab-scroller',
  TAB_SELECTOR: '.mdc-tab'
};
var numbers$6 = {
  ARROW_LEFT_KEYCODE: 37,
  ARROW_RIGHT_KEYCODE: 39,
  END_KEYCODE: 35,
  ENTER_KEYCODE: 13,
  EXTRA_SCROLL_AMOUNT: 20,
  HOME_KEYCODE: 36,
  SPACE_KEYCODE: 32
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ACCEPTABLE_KEYS = new Set(); // IE11 has no support for new Set with iterable so we need to initialize this by hand

ACCEPTABLE_KEYS.add(strings$f.ARROW_LEFT_KEY);
ACCEPTABLE_KEYS.add(strings$f.ARROW_RIGHT_KEY);
ACCEPTABLE_KEYS.add(strings$f.END_KEY);
ACCEPTABLE_KEYS.add(strings$f.HOME_KEY);
ACCEPTABLE_KEYS.add(strings$f.ENTER_KEY);
ACCEPTABLE_KEYS.add(strings$f.SPACE_KEY);
var KEYCODE_MAP = new Map(); // IE11 has no support for new Map with iterable so we need to initialize this by hand

KEYCODE_MAP.set(numbers$6.ARROW_LEFT_KEYCODE, strings$f.ARROW_LEFT_KEY);
KEYCODE_MAP.set(numbers$6.ARROW_RIGHT_KEYCODE, strings$f.ARROW_RIGHT_KEY);
KEYCODE_MAP.set(numbers$6.END_KEYCODE, strings$f.END_KEY);
KEYCODE_MAP.set(numbers$6.HOME_KEYCODE, strings$f.HOME_KEY);
KEYCODE_MAP.set(numbers$6.ENTER_KEYCODE, strings$f.ENTER_KEY);
KEYCODE_MAP.set(numbers$6.SPACE_KEYCODE, strings$f.SPACE_KEY);

var MDCTabBarFoundation =
/** @class */
function (_super) {
  __extends(MDCTabBarFoundation, _super);

  function MDCTabBarFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCTabBarFoundation.defaultAdapter, adapter)) || this;

    _this.useAutomaticActivation_ = false;
    return _this;
  }

  Object.defineProperty(MDCTabBarFoundation, "strings", {
    get: function () {
      return strings$f;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabBarFoundation, "numbers", {
    get: function () {
      return numbers$6;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTabBarFoundation, "defaultAdapter", {
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        scrollTo: function () {
          return undefined;
        },
        incrementScroll: function () {
          return undefined;
        },
        getScrollPosition: function () {
          return 0;
        },
        getScrollContentWidth: function () {
          return 0;
        },
        getOffsetWidth: function () {
          return 0;
        },
        isRTL: function () {
          return false;
        },
        setActiveTab: function () {
          return undefined;
        },
        activateTabAtIndex: function () {
          return undefined;
        },
        deactivateTabAtIndex: function () {
          return undefined;
        },
        focusTabAtIndex: function () {
          return undefined;
        },
        getTabIndicatorClientRectAtIndex: function () {
          return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
          };
        },
        getTabDimensionsAtIndex: function () {
          return {
            rootLeft: 0,
            rootRight: 0,
            contentLeft: 0,
            contentRight: 0
          };
        },
        getPreviousActiveTabIndex: function () {
          return -1;
        },
        getFocusedTabIndex: function () {
          return -1;
        },
        getIndexOfTabById: function () {
          return -1;
        },
        getTabListLength: function () {
          return 0;
        },
        notifyTabActivated: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Switches between automatic and manual activation modes.
   * See https://www.w3.org/TR/wai-aria-practices/#tabpanel for examples.
   */

  MDCTabBarFoundation.prototype.setUseAutomaticActivation = function (useAutomaticActivation) {
    this.useAutomaticActivation_ = useAutomaticActivation;
  };

  MDCTabBarFoundation.prototype.activateTab = function (index) {
    var previousActiveIndex = this.adapter_.getPreviousActiveTabIndex();

    if (!this.indexIsInRange_(index) || index === previousActiveIndex) {
      return;
    }

    var previousClientRect;

    if (previousActiveIndex !== -1) {
      this.adapter_.deactivateTabAtIndex(previousActiveIndex);
      previousClientRect = this.adapter_.getTabIndicatorClientRectAtIndex(previousActiveIndex);
    }

    this.adapter_.activateTabAtIndex(index, previousClientRect);
    this.scrollIntoView(index);
    this.adapter_.notifyTabActivated(index);
  };

  MDCTabBarFoundation.prototype.handleKeyDown = function (evt) {
    // Get the key from the event
    var key = this.getKeyFromEvent_(evt); // Early exit if the event key isn't one of the keyboard navigation keys

    if (key === undefined) {
      return;
    } // Prevent default behavior for movement keys, but not for activation keys, since :active is used to apply ripple


    if (!this.isActivationKey_(key)) {
      evt.preventDefault();
    }

    if (this.useAutomaticActivation_) {
      if (this.isActivationKey_(key)) {
        return;
      }

      var index = this.determineTargetFromKey_(this.adapter_.getPreviousActiveTabIndex(), key);
      this.adapter_.setActiveTab(index);
      this.scrollIntoView(index);
    } else {
      var focusedTabIndex = this.adapter_.getFocusedTabIndex();

      if (this.isActivationKey_(key)) {
        this.adapter_.setActiveTab(focusedTabIndex);
      } else {
        var index = this.determineTargetFromKey_(focusedTabIndex, key);
        this.adapter_.focusTabAtIndex(index);
        this.scrollIntoView(index);
      }
    }
  };
  /**
   * Handles the MDCTab:interacted event
   */


  MDCTabBarFoundation.prototype.handleTabInteraction = function (evt) {
    this.adapter_.setActiveTab(this.adapter_.getIndexOfTabById(evt.detail.tabId));
  };
  /**
   * Scrolls the tab at the given index into view
   * @param index The tab index to make visible
   */


  MDCTabBarFoundation.prototype.scrollIntoView = function (index) {
    // Early exit if the index is out of range
    if (!this.indexIsInRange_(index)) {
      return;
    } // Always scroll to 0 if scrolling to the 0th index


    if (index === 0) {
      return this.adapter_.scrollTo(0);
    } // Always scroll to the max value if scrolling to the Nth index
    // MDCTabScroller.scrollTo() will never scroll past the max possible value


    if (index === this.adapter_.getTabListLength() - 1) {
      return this.adapter_.scrollTo(this.adapter_.getScrollContentWidth());
    }

    if (this.isRTL_()) {
      return this.scrollIntoViewRTL_(index);
    }

    this.scrollIntoView_(index);
  };
  /**
   * Private method for determining the index of the destination tab based on what key was pressed
   * @param origin The original index from which to determine the destination
   * @param key The name of the key
   */


  MDCTabBarFoundation.prototype.determineTargetFromKey_ = function (origin, key) {
    var isRTL = this.isRTL_();
    var maxIndex = this.adapter_.getTabListLength() - 1;
    var shouldGoToEnd = key === strings$f.END_KEY;
    var shouldDecrement = key === strings$f.ARROW_LEFT_KEY && !isRTL || key === strings$f.ARROW_RIGHT_KEY && isRTL;
    var shouldIncrement = key === strings$f.ARROW_RIGHT_KEY && !isRTL || key === strings$f.ARROW_LEFT_KEY && isRTL;
    var index = origin;

    if (shouldGoToEnd) {
      index = maxIndex;
    } else if (shouldDecrement) {
      index -= 1;
    } else if (shouldIncrement) {
      index += 1;
    } else {
      index = 0;
    }

    if (index < 0) {
      index = maxIndex;
    } else if (index > maxIndex) {
      index = 0;
    }

    return index;
  };
  /**
   * Calculates the scroll increment that will make the tab at the given index visible
   * @param index The index of the tab
   * @param nextIndex The index of the next tab
   * @param scrollPosition The current scroll position
   * @param barWidth The width of the Tab Bar
   */


  MDCTabBarFoundation.prototype.calculateScrollIncrement_ = function (index, nextIndex, scrollPosition, barWidth) {
    var nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
    var relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
    var relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
    var leftIncrement = relativeContentRight - numbers$6.EXTRA_SCROLL_AMOUNT;
    var rightIncrement = relativeContentLeft + numbers$6.EXTRA_SCROLL_AMOUNT;

    if (nextIndex < index) {
      return Math.min(leftIncrement, 0);
    }

    return Math.max(rightIncrement, 0);
  };
  /**
   * Calculates the scroll increment that will make the tab at the given index visible in RTL
   * @param index The index of the tab
   * @param nextIndex The index of the next tab
   * @param scrollPosition The current scroll position
   * @param barWidth The width of the Tab Bar
   * @param scrollContentWidth The width of the scroll content
   */


  MDCTabBarFoundation.prototype.calculateScrollIncrementRTL_ = function (index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
    var nextTabDimensions = this.adapter_.getTabDimensionsAtIndex(nextIndex);
    var relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
    var relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
    var leftIncrement = relativeContentRight + numbers$6.EXTRA_SCROLL_AMOUNT;
    var rightIncrement = relativeContentLeft - numbers$6.EXTRA_SCROLL_AMOUNT;

    if (nextIndex > index) {
      return Math.max(leftIncrement, 0);
    }

    return Math.min(rightIncrement, 0);
  };
  /**
   * Determines the index of the adjacent tab closest to either edge of the Tab Bar
   * @param index The index of the tab
   * @param tabDimensions The dimensions of the tab
   * @param scrollPosition The current scroll position
   * @param barWidth The width of the tab bar
   */


  MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdge_ = function (index, tabDimensions, scrollPosition, barWidth) {
    /**
     * Tabs are laid out in the Tab Scroller like this:
     *
     *    Scroll Position
     *    +---+
     *    |   |   Bar Width
     *    |   +-----------------------------------+
     *    |   |                                   |
     *    |   V                                   V
     *    |   +-----------------------------------+
     *    V   |             Tab Scroller          |
     *    +------------+--------------+-------------------+
     *    |    Tab     |      Tab     |        Tab        |
     *    +------------+--------------+-------------------+
     *        |                                   |
     *        +-----------------------------------+
     *
     * To determine the next adjacent index, we look at the Tab root left and
     * Tab root right, both relative to the scroll position. If the Tab root
     * left is less than 0, then we know it's out of view to the left. If the
     * Tab root right minus the bar width is greater than 0, we know the Tab is
     * out of view to the right. From there, we either increment or decrement
     * the index.
     */
    var relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
    var relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
    var relativeRootDelta = relativeRootLeft + relativeRootRight;
    var leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
    var rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;

    if (leftEdgeIsCloser) {
      return index - 1;
    }

    if (rightEdgeIsCloser) {
      return index + 1;
    }

    return -1;
  };
  /**
   * Determines the index of the adjacent tab closest to either edge of the Tab Bar in RTL
   * @param index The index of the tab
   * @param tabDimensions The dimensions of the tab
   * @param scrollPosition The current scroll position
   * @param barWidth The width of the tab bar
   * @param scrollContentWidth The width of the scroller content
   */


  MDCTabBarFoundation.prototype.findAdjacentTabIndexClosestToEdgeRTL_ = function (index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
    var rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
    var rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
    var rootDelta = rootLeft + rootRight;
    var leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
    var rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;

    if (leftEdgeIsCloser) {
      return index + 1;
    }

    if (rightEdgeIsCloser) {
      return index - 1;
    }

    return -1;
  };
  /**
   * Returns the key associated with a keydown event
   * @param evt The keydown event
   */


  MDCTabBarFoundation.prototype.getKeyFromEvent_ = function (evt) {
    if (ACCEPTABLE_KEYS.has(evt.key)) {
      return evt.key;
    }

    return KEYCODE_MAP.get(evt.keyCode);
  };

  MDCTabBarFoundation.prototype.isActivationKey_ = function (key) {
    return key === strings$f.SPACE_KEY || key === strings$f.ENTER_KEY;
  };
  /**
   * Returns whether a given index is inclusively between the ends
   * @param index The index to test
   */


  MDCTabBarFoundation.prototype.indexIsInRange_ = function (index) {
    return index >= 0 && index < this.adapter_.getTabListLength();
  };
  /**
   * Returns the view's RTL property
   */


  MDCTabBarFoundation.prototype.isRTL_ = function () {
    return this.adapter_.isRTL();
  };
  /**
   * Scrolls the tab at the given index into view for left-to-right user agents.
   * @param index The index of the tab to scroll into view
   */


  MDCTabBarFoundation.prototype.scrollIntoView_ = function (index) {
    var scrollPosition = this.adapter_.getScrollPosition();
    var barWidth = this.adapter_.getOffsetWidth();
    var tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
    var nextIndex = this.findAdjacentTabIndexClosestToEdge_(index, tabDimensions, scrollPosition, barWidth);

    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }

    var scrollIncrement = this.calculateScrollIncrement_(index, nextIndex, scrollPosition, barWidth);
    this.adapter_.incrementScroll(scrollIncrement);
  };
  /**
   * Scrolls the tab at the given index into view in RTL
   * @param index The tab index to make visible
   */


  MDCTabBarFoundation.prototype.scrollIntoViewRTL_ = function (index) {
    var scrollPosition = this.adapter_.getScrollPosition();
    var barWidth = this.adapter_.getOffsetWidth();
    var tabDimensions = this.adapter_.getTabDimensionsAtIndex(index);
    var scrollWidth = this.adapter_.getScrollContentWidth();
    var nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL_(index, tabDimensions, scrollPosition, barWidth, scrollWidth);

    if (!this.indexIsInRange_(nextIndex)) {
      return;
    }

    var scrollIncrement = this.calculateScrollIncrementRTL_(index, nextIndex, scrollPosition, barWidth, scrollWidth);
    this.adapter_.incrementScroll(scrollIncrement);
  };

  return MDCTabBarFoundation;
}(MDCFoundation);

class TabBarBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCTabBarFoundation;
    this.activeIndex = 0;
    this._previousActiveIndex = -1;
  }

  _handleTabInteraction(e) {
    this.mdcFoundation.handleTabInteraction(e);
  }

  _handleKeydown(e) {
    this.mdcFoundation.handleKeyDown(e);
  } // TODO(sorvell): can scroller be optional for perf?


  render() {
    return html`
      <div class="mdc-tab-bar" role="tablist"
          @MDCTab:interacted="${this._handleTabInteraction}"
          @keydown="${this._handleKeydown}">
        <mwc-tab-scroller><slot></slot></mwc-tab-scroller>
      </div>
      `;
  } // TODO(sorvell): probably want to memoize this and use a `slotChange` event


  _getTabs() {
    return this.tabsSlot.assignedNodes({
      flatten: true
    }).filter(e => e instanceof Tab);
  }

  _getTab(index) {
    return this._getTabs()[index];
  }

  createAdapter() {
    return {
      scrollTo: scrollX => this.scrollerElement.scrollToPosition(scrollX),
      incrementScroll: scrollXIncrement => this.scrollerElement.incrementScrollPosition(scrollXIncrement),
      getScrollPosition: () => this.scrollerElement.getScrollPosition(),
      getScrollContentWidth: () => this.scrollerElement.getScrollContentWidth(),
      getOffsetWidth: () => this.mdcRoot.offsetWidth,
      isRTL: () => window.getComputedStyle(this.mdcRoot).getPropertyValue('direction') === 'rtl',
      setActiveTab: index => this.mdcFoundation.activateTab(index),
      activateTabAtIndex: (index, clientRect) => {
        const tab = this._getTab(index);

        if (tab !== undefined) {
          tab.activate(clientRect);
        }

        this._previousActiveIndex = index;
      },
      deactivateTabAtIndex: index => {
        const tab = this._getTab(index);

        if (tab !== undefined) {
          tab.deactivate();
        }
      },
      focusTabAtIndex: index => {
        const tab = this._getTab(index);

        if (tab !== undefined) {
          tab.focus();
        }
      },
      // TODO(sorvell): tab may not be able to synchronously answer
      // `computeIndicatorClientRect` if an update is pending or it has not yet
      // updated. If this is necessary, LitElement may need a `forceUpdate`
      // method.
      getTabIndicatorClientRectAtIndex: index => {
        const tab = this._getTab(index);

        return tab !== undefined ? tab.computeIndicatorClientRect() : new DOMRect();
      },
      getTabDimensionsAtIndex: index => {
        const tab = this._getTab(index);

        return tab !== undefined ? tab.computeDimensions() : {
          rootLeft: 0,
          rootRight: 0,
          contentLeft: 0,
          contentRight: 0
        };
      },
      getPreviousActiveTabIndex: () => {
        return this._previousActiveIndex;
      },
      getFocusedTabIndex: () => {
        const tabElements = this._getTabs();

        const activeElement = this.getRootNode().activeElement;
        return tabElements.indexOf(activeElement);
      },
      getIndexOfTabById: id => {
        const tabElements = this._getTabs();

        for (let i = 0; i < tabElements.length; i++) {
          if (tabElements[i].id === id) {
            return i;
          }
        }

        return -1;
      },
      getTabListLength: () => this._getTabs().length,
      notifyTabActivated: index => {
        // Synchronize the tabs `activeIndex` to the foundation.
        // This is needed when a tab is changed via a click, for example.
        this.activeIndex = index;
        this.dispatchEvent(new CustomEvent(MDCTabBarFoundation.strings.TAB_ACTIVATED_EVENT, {
          detail: {
            index
          },
          bubbles: true,
          cancelable: true
        }));
      }
    };
  }

  firstUpdated() {// NOTE: Delay creating foundation until scroller is fully updated.
    // This is necessary because the foundation/adapter synchronously addresses
    // the scroller element.
  }

  _getUpdateComplete() {
    return super._getUpdateComplete().then(() => this.scrollerElement.updateComplete).then(() => {
      if (this.mdcFoundation === undefined) {
        this.createFoundation();
      }
    });
  }

  scrollIndexIntoView(index) {
    this.mdcFoundation.scrollIntoView(index);
  }

}

__decorate([query('.mdc-tab-bar')], TabBarBase.prototype, "mdcRoot", void 0);

__decorate([query('mwc-tab-scroller')], TabBarBase.prototype, "scrollerElement", void 0);

__decorate([query('slot')], TabBarBase.prototype, "tabsSlot", void 0);

__decorate([observer(async function (value) {
  await this.updateComplete; // only provoke the foundation if we are out of sync with it, i.e.
  // ignore an foundation generated set.

  if (value !== this._previousActiveIndex) {
    this.mdcFoundation.activateTab(value);
  }
}), property({
  type: Number
})], TabBarBase.prototype, "activeIndex", void 0);

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
const style$j = css`.mdc-tab-bar{width:100%}.mdc-tab{height:48px}.mdc-tab--stacked{height:72px}:host{display:block}.mdc-tab-bar{flex:1}mwc-tab{--mdc-tab-height: 48px;--mdc-tab-stacked-height: 72px}`;

let TabBar = class TabBar extends TabBarBase {};
TabBar.styles = style$j;
TabBar = __decorate([customElement('mwc-tab-bar')], TabBar);

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
const style$k = css`.mdc-top-app-bar{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee);color:#fff;display:flex;position:fixed;flex-direction:column;justify-content:space-between;box-sizing:border-box;width:100%;z-index:4}.mdc-top-app-bar .mdc-top-app-bar__action-item,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon{color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-top-app-bar .mdc-top-app-bar__action-item::before,.mdc-top-app-bar .mdc-top-app-bar__action-item::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after{background-color:#fff}@supports not (-ms-ime-align: auto){.mdc-top-app-bar .mdc-top-app-bar__action-item::before,.mdc-top-app-bar .mdc-top-app-bar__action-item::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after{background-color:var(--mdc-theme-on-primary, #fff)}}.mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before{opacity:.08}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-top-app-bar__row{display:flex;position:relative;box-sizing:border-box;width:100%;height:64px}.mdc-top-app-bar__section{display:inline-flex;flex:1 1 auto;align-items:center;min-width:0;padding:8px 12px;z-index:1}.mdc-top-app-bar__section--align-start{justify-content:flex-start;order:-1}.mdc-top-app-bar__section--align-end{justify-content:flex-end;order:1}.mdc-top-app-bar__title{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;padding-left:20px;padding-right:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:1}[dir=rtl] .mdc-top-app-bar__title,.mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--short-collapsed{border-radius:0 0 24px 0}[dir=rtl] .mdc-top-app-bar--short-collapsed,.mdc-top-app-bar--short-collapsed[dir=rtl]{border-radius:0 0 0 24px}.mdc-top-app-bar--short{top:0;right:auto;left:0;width:100%;transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-top-app-bar--short,.mdc-top-app-bar--short[dir=rtl]{right:0;left:auto}.mdc-top-app-bar--short .mdc-top-app-bar__row{height:56px}.mdc-top-app-bar--short .mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short .mdc-top-app-bar__title{transition:opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.mdc-top-app-bar--short-collapsed{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);width:56px;transition:width 300ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title{display:none}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item{transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item{width:112px}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--dense .mdc-top-app-bar__row{height:48px}.mdc-top-app-bar--dense .mdc-top-app-bar__section{padding:0 4px}.mdc-top-app-bar--dense .mdc-top-app-bar__title{padding-left:12px;padding-right:0}[dir=rtl] .mdc-top-app-bar--dense .mdc-top-app-bar__title,.mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:12px}.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:128px}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{align-self:flex-end;padding-bottom:2px}.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon{align-self:flex-start}.mdc-top-app-bar--fixed{transition:box-shadow 200ms linear}.mdc-top-app-bar--fixed-scrolled{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 200ms linear}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:96px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section{padding:0 12px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-left:20px;padding-right:0;padding-bottom:9px}[dir=rtl] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title,.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--fixed-adjust{padding-top:64px}.mdc-top-app-bar--dense-fixed-adjust{padding-top:48px}.mdc-top-app-bar--short-fixed-adjust{padding-top:56px}.mdc-top-app-bar--prominent-fixed-adjust{padding-top:128px}.mdc-top-app-bar--dense-prominent-fixed-adjust{padding-top:96px}@media(max-width: 599px){.mdc-top-app-bar__row{height:56px}.mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short{transition:width 200ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed{transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-bottom:6px}.mdc-top-app-bar--fixed-adjust{padding-top:56px}}:host{display:block}.mdc-top-app-bar{color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-top-app-bar--prominent #navigation ::slotted(*),.mdc-top-app-bar--prominent #actions ::slotted(*){align-self:flex-start}#navigation ::slotted(*),#actions ::slotted(*){--mdc-icon-button-ripple-opacity: 0.24}.mdc-top-app-bar--short-collapsed #actions ::slotted(*){transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar__section--align-center{justify-content:center}.mdc-top-app-bar__section--align-center .mdc-top-app-bar__title{padding-left:0;padding-right:0}.center-title .mdc-top-app-bar__section--align-start,.center-title .mdc-top-app-bar__section--align-end{flex-basis:0}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section--align-center .mdc-top-app-bar__title{padding-left:0;padding-right:0}`;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$f = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item'
};
var numbers$7 = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
var strings$g = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTopAppBarBaseFoundation =
/** @class */
function (_super) {
  __extends(MDCTopAppBarBaseFoundation, _super);
  /* istanbul ignore next: optional argument is not a branch statement */


  function MDCTopAppBarBaseFoundation(adapter) {
    return _super.call(this, __assign({}, MDCTopAppBarBaseFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
    get: function () {
      return strings$g;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
    get: function () {
      return cssClasses$f;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
    get: function () {
      return numbers$7;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setStyle: function () {
          return undefined;
        },
        getTopAppBarHeight: function () {
          return 0;
        },
        notifyNavigationIconClicked: function () {
          return undefined;
        },
        getViewportScrollY: function () {
          return 0;
        },
        getTotalActionItems: function () {
          return 0;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });
  /** Other variants of TopAppBar foundation overrides this method */

  MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function () {}; // tslint:disable-line:no-empty

  /** Other variants of TopAppBar foundation overrides this method */


  MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function () {}; // tslint:disable-line:no-empty


  MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function () {
    this.adapter_.notifyNavigationIconClicked();
  };

  return MDCTopAppBarBaseFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INITIAL_VALUE = 0;

var MDCTopAppBarFoundation =
/** @class */
function (_super) {
  __extends(MDCTopAppBarFoundation, _super);
  /* istanbul ignore next: optional argument is not a branch statement */


  function MDCTopAppBarFoundation(adapter) {
    var _this = _super.call(this, adapter) || this;
    /**
     * Indicates if the top app bar was docked in the previous scroll handler iteration.
     */


    _this.wasDocked_ = true;
    /**
     * Indicates if the top app bar is docked in the fully shown position.
     */

    _this.isDockedShowing_ = true;
    /**
     * Variable for current scroll position of the top app bar
     */

    _this.currentAppBarOffsetTop_ = 0;
    /**
     * Used to prevent the top app bar from being scrolled out of view during resize events
     */

    _this.isCurrentlyBeingResized_ = false;
    /**
     * The timeout that's used to throttle the resize events
     */

    _this.resizeThrottleId_ = INITIAL_VALUE;
    /**
     * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
     */

    _this.resizeDebounceId_ = INITIAL_VALUE;
    _this.lastScrollPosition_ = _this.adapter_.getViewportScrollY();
    _this.topAppBarHeight_ = _this.adapter_.getTopAppBarHeight();
    return _this;
  }

  MDCTopAppBarFoundation.prototype.destroy = function () {
    _super.prototype.destroy.call(this);

    this.adapter_.setStyle('top', '');
  };
  /**
   * Scroll handler for the default scroll behavior of the top app bar.
   * @override
   */


  MDCTopAppBarFoundation.prototype.handleTargetScroll = function () {
    var currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
    var diff = currentScrollPosition - this.lastScrollPosition_;
    this.lastScrollPosition_ = currentScrollPosition; // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.

    if (!this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff;

      if (this.currentAppBarOffsetTop_ > 0) {
        this.currentAppBarOffsetTop_ = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
      }

      this.moveTopAppBar_();
    }
  };
  /**
   * Top app bar resize handler that throttle/debounce functions that execute updates.
   * @override
   */


  MDCTopAppBarFoundation.prototype.handleWindowResize = function () {
    var _this = this; // Throttle resize events 10 p/s


    if (!this.resizeThrottleId_) {
      this.resizeThrottleId_ = setTimeout(function () {
        _this.resizeThrottleId_ = INITIAL_VALUE;

        _this.throttledResizeHandler_();
      }, numbers$7.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }

    this.isCurrentlyBeingResized_ = true;

    if (this.resizeDebounceId_) {
      clearTimeout(this.resizeDebounceId_);
    }

    this.resizeDebounceId_ = setTimeout(function () {
      _this.handleTargetScroll();

      _this.isCurrentlyBeingResized_ = false;
      _this.resizeDebounceId_ = INITIAL_VALUE;
    }, numbers$7.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  };
  /**
   * Function to determine if the DOM needs to update.
   */


  MDCTopAppBarFoundation.prototype.checkForUpdate_ = function () {
    var offscreenBoundaryTop = -this.topAppBarHeight_;
    var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
    var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
    var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen; // If it's partially showing, it can't be docked.

    if (partiallyShowing) {
      this.wasDocked_ = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked_) {
        this.wasDocked_ = true;
        return true;
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  };
  /**
   * Function to move the top app bar if needed.
   */


  MDCTopAppBarFoundation.prototype.moveTopAppBar_ = function () {
    if (this.checkForUpdate_()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      var offset = this.currentAppBarOffsetTop_;

      if (Math.abs(offset) >= this.topAppBarHeight_) {
        offset = -numbers$7.MAX_TOP_APP_BAR_HEIGHT;
      }

      this.adapter_.setStyle('top', offset + 'px');
    }
  };
  /**
   * Throttled function that updates the top app bar scrolled values if the
   * top app bar height changes.
   */


  MDCTopAppBarFoundation.prototype.throttledResizeHandler_ = function () {
    var currentHeight = this.adapter_.getTopAppBarHeight();

    if (this.topAppBarHeight_ !== currentHeight) {
      this.wasDocked_ = false; // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.

      this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
      this.topAppBarHeight_ = currentHeight;
    }

    this.handleTargetScroll();
  };

  return MDCTopAppBarFoundation;
}(MDCTopAppBarBaseFoundation);

const passiveEventOptionsIfSupported = supportsPassiveEventListener ? {
  passive: true
} : undefined;
class TopAppBarBaseBase extends BaseElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCTopAppBarBaseFoundation;
    this.centerTitle = false;

    this.handleTargetScroll = () => {
      this.mdcFoundation.handleTargetScroll();
    };

    this.handleNavigationClick = () => {
      this.mdcFoundation.handleNavigationClick();
    };
  }

  get scrollTarget() {
    return this._scrollTarget || window;
  }

  set scrollTarget(value) {
    const old = this.scrollTarget;
    this._scrollTarget = value;
    this.updateRootPosition();
    this.requestUpdate('scrollTarget', old);
  }

  updateRootPosition() {
    if (this.mdcRoot) {
      const windowScroller = this.scrollTarget === window; // we add support for top-app-bar's tied to an element scroller.

      this.mdcRoot.style.position = windowScroller ? '' : 'absolute';
    }
  }

  render() {
    // clang-format off
    let title = html`<span class="mdc-top-app-bar__title"><slot name="title"></slot></span>`;

    if (this.centerTitle) {
      title = html`<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-center">${title}</section>`;
    } // clang-format on


    return html`
      <header class="mdc-top-app-bar ${classMap(this.barClasses())}">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="navigation">
          <slot name="navigationIcon"
            @click=${this.handleNavigationClick}></slot>
          ${this.centerTitle ? null : title}
        </section>
        ${this.centerTitle ? title : null}
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="actions" role="toolbar">
          <slot name="actionItems"></slot>
        </section>
      </div>
    </header>
    <div class="${classMap(this.contentClasses())}">
      <slot></slot>
    </div>
    `;
  }

  createAdapter() {
    return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), {
      setStyle: (property, value) => this.mdcRoot.style.setProperty(property, value),
      getTopAppBarHeight: () => this.mdcRoot.clientHeight,
      notifyNavigationIconClicked: () => {
        this.dispatchEvent(new Event(strings$g.NAVIGATION_EVENT, {
          bubbles: true,
          cancelable: true
        }));
      },
      getViewportScrollY: () => this.scrollTarget instanceof Window ? this.scrollTarget.pageYOffset : this.scrollTarget.scrollTop,
      getTotalActionItems: () => this._actionItemsSlot.assignedNodes({
        flatten: true
      }).length
    });
  }

  registerListeners() {
    this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
  }

  unregisterListeners() {
    this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
  }

  firstUpdated() {
    super.firstUpdated();
    this.updateRootPosition();
    this.registerListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unregisterListeners();
  }

}

__decorate([query('.mdc-top-app-bar')], TopAppBarBaseBase.prototype, "mdcRoot", void 0);

__decorate([query('slot[name="actionItems"]')], TopAppBarBaseBase.prototype, "_actionItemsSlot", void 0);

__decorate([property({
  type: Boolean
})], TopAppBarBaseBase.prototype, "centerTitle", void 0);

__decorate([property()], TopAppBarBaseBase.prototype, "scrollTarget", null);

class TopAppBarBase extends TopAppBarBaseBase {
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
})], TopAppBarBase.prototype, "dense", void 0);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCFixedTopAppBarFoundation =
/** @class */
function (_super) {
  __extends(MDCFixedTopAppBarFoundation, _super);

  function MDCFixedTopAppBarFoundation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * State variable for the previous scroll iteration top app bar state
     */


    _this.wasScrolled_ = false;
    return _this;
  }
  /**
   * Scroll handler for applying/removing the modifier class on the fixed top app bar.
   * @override
   */


  MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function () {
    var currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.wasScrolled_) {
        this.adapter_.removeClass(cssClasses$f.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = false;
      }
    } else {
      if (!this.wasScrolled_) {
        this.adapter_.addClass(cssClasses$f.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = true;
      }
    }
  };

  return MDCFixedTopAppBarFoundation;
}(MDCTopAppBarFoundation);

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
class TopAppBarFixedBase extends TopAppBarBase {
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

let TopAppBarFixed = class TopAppBarFixed extends TopAppBarFixedBase {};
TopAppBarFixed.styles = style$k;
TopAppBarFixed = __decorate([customElement('mwc-top-app-bar-fixed')], TopAppBarFixed);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$g = {
  LABEL_FLOAT_ABOVE: 'mdc-floating-label--float-above',
  LABEL_SHAKE: 'mdc-floating-label--shake',
  ROOT: 'mdc-floating-label'
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCFloatingLabelFoundation =
/** @class */
function (_super) {
  __extends(MDCFloatingLabelFoundation, _super);

  function MDCFloatingLabelFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCFloatingLabelFoundation.defaultAdapter, adapter)) || this;

    _this.shakeAnimationEndHandler_ = function () {
      return _this.handleShakeAnimationEnd_();
    };

    return _this;
  }

  Object.defineProperty(MDCFloatingLabelFoundation, "cssClasses", {
    get: function () {
      return cssClasses$g;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCFloatingLabelFoundation, "defaultAdapter", {
    /**
     * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        getWidth: function () {
          return 0;
        },
        registerInteractionHandler: function () {
          return undefined;
        },
        deregisterInteractionHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCFloatingLabelFoundation.prototype.init = function () {
    this.adapter_.registerInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };

  MDCFloatingLabelFoundation.prototype.destroy = function () {
    this.adapter_.deregisterInteractionHandler('animationend', this.shakeAnimationEndHandler_);
  };
  /**
   * Returns the width of the label element.
   */


  MDCFloatingLabelFoundation.prototype.getWidth = function () {
    return this.adapter_.getWidth();
  };
  /**
   * Styles the label to produce a shake animation to indicate an error.
   * @param shouldShake If true, adds the shake CSS class; otherwise, removes shake class.
   */


  MDCFloatingLabelFoundation.prototype.shake = function (shouldShake) {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;

    if (shouldShake) {
      this.adapter_.addClass(LABEL_SHAKE);
    } else {
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };
  /**
   * Styles the label to float or dock.
   * @param shouldFloat If true, adds the float CSS class; otherwise, removes float and shake classes to dock the label.
   */


  MDCFloatingLabelFoundation.prototype.float = function (shouldFloat) {
    var _a = MDCFloatingLabelFoundation.cssClasses,
        LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE,
        LABEL_SHAKE = _a.LABEL_SHAKE;

    if (shouldFloat) {
      this.adapter_.addClass(LABEL_FLOAT_ABOVE);
    } else {
      this.adapter_.removeClass(LABEL_FLOAT_ABOVE);
      this.adapter_.removeClass(LABEL_SHAKE);
    }
  };

  MDCFloatingLabelFoundation.prototype.handleShakeAnimationEnd_ = function () {
    var LABEL_SHAKE = MDCFloatingLabelFoundation.cssClasses.LABEL_SHAKE;
    this.adapter_.removeClass(LABEL_SHAKE);
  };

  return MDCFloatingLabelFoundation;
}(MDCFoundation);

const createAdapter = labelElement => {
  return {
    addClass: className => labelElement.classList.add(className),
    removeClass: className => labelElement.classList.remove(className),
    getWidth: () => labelElement.scrollWidth,
    registerInteractionHandler: (evtType, handler) => {
      labelElement.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      labelElement.removeEventListener(evtType, handler);
    }
  };
};

const partToFoundationMap = new WeakMap();
const floatingLabel = directive(label => part => {
  const lastFoundation = partToFoundationMap.get(part);

  if (!lastFoundation) {
    const labelElement = part.committer.element;
    labelElement.classList.add('mdc-floating-label');
    const adapter = createAdapter(labelElement);
    const foundation = new MDCFloatingLabelFoundation(adapter);
    foundation.init();
    part.setValue(foundation);
    partToFoundationMap.set(part, {
      label,
      foundation
    });
  } else if (lastFoundation.label !== label) {
    const labelElement = part.committer.element;
    const labelChangeEvent = new Event('labelchange');
    labelElement.dispatchEvent(labelChangeEvent);
  }
});

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$h = {
  LINE_RIPPLE_ACTIVE: 'mdc-line-ripple--active',
  LINE_RIPPLE_DEACTIVATING: 'mdc-line-ripple--deactivating'
};

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCLineRippleFoundation =
/** @class */
function (_super) {
  __extends(MDCLineRippleFoundation, _super);

  function MDCLineRippleFoundation(adapter) {
    var _this = _super.call(this, __assign({}, MDCLineRippleFoundation.defaultAdapter, adapter)) || this;

    _this.transitionEndHandler_ = function (evt) {
      return _this.handleTransitionEnd(evt);
    };

    return _this;
  }

  Object.defineProperty(MDCLineRippleFoundation, "cssClasses", {
    get: function () {
      return cssClasses$h;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCLineRippleFoundation, "defaultAdapter", {
    /**
     * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return false;
        },
        setStyle: function () {
          return undefined;
        },
        registerEventHandler: function () {
          return undefined;
        },
        deregisterEventHandler: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCLineRippleFoundation.prototype.init = function () {
    this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.destroy = function () {
    this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
  };

  MDCLineRippleFoundation.prototype.activate = function () {
    this.adapter_.removeClass(cssClasses$h.LINE_RIPPLE_DEACTIVATING);
    this.adapter_.addClass(cssClasses$h.LINE_RIPPLE_ACTIVE);
  };

  MDCLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
    this.adapter_.setStyle('transform-origin', xCoordinate + "px center");
  };

  MDCLineRippleFoundation.prototype.deactivate = function () {
    this.adapter_.addClass(cssClasses$h.LINE_RIPPLE_DEACTIVATING);
  };

  MDCLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
    // Wait for the line ripple to be either transparent or opaque
    // before emitting the animation end event
    var isDeactivating = this.adapter_.hasClass(cssClasses$h.LINE_RIPPLE_DEACTIVATING);

    if (evt.propertyName === 'opacity') {
      if (isDeactivating) {
        this.adapter_.removeClass(cssClasses$h.LINE_RIPPLE_ACTIVE);
        this.adapter_.removeClass(cssClasses$h.LINE_RIPPLE_DEACTIVATING);
      }
    }
  };

  return MDCLineRippleFoundation;
}(MDCFoundation);

const createAdapter$1 = lineElement => {
  return {
    addClass: className => lineElement.classList.add(className),
    removeClass: className => lineElement.classList.remove(className),
    hasClass: className => lineElement.classList.contains(className),
    setStyle: (propertyName, value) => lineElement.style.setProperty(propertyName, value),
    registerEventHandler: (evtType, handler) => {
      lineElement.addEventListener(evtType, handler);
    },
    deregisterEventHandler: (evtType, handler) => {
      lineElement.removeEventListener(evtType, handler);
    }
  };
};

const partToFoundationMap$1 = new WeakMap();
const lineRipple = directive(() => part => {
  const lastFoundation = partToFoundationMap$1.get(part);

  if (!lastFoundation) {
    const lineElement = part.committer.element;
    lineElement.classList.add('mdc-line-ripple');
    const adapter = createAdapter$1(lineElement);
    const foundation = new MDCLineRippleFoundation(adapter);
    foundation.init();
    part.setValue(foundation);
    partToFoundationMap$1.set(part, foundation);
  }
});

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$h = {
  ARIA_CONTROLS: 'aria-controls',
  ICON_SELECTOR: '.mdc-text-field__icon',
  INPUT_SELECTOR: '.mdc-text-field__input',
  LABEL_SELECTOR: '.mdc-floating-label',
  LINE_RIPPLE_SELECTOR: '.mdc-line-ripple',
  OUTLINE_SELECTOR: '.mdc-notched-outline'
};
var cssClasses$i = {
  DENSE: 'mdc-text-field--dense',
  DISABLED: 'mdc-text-field--disabled',
  FOCUSED: 'mdc-text-field--focused',
  FULLWIDTH: 'mdc-text-field--fullwidth',
  HELPER_LINE: 'mdc-text-field-helper-line',
  INVALID: 'mdc-text-field--invalid',
  NO_LABEL: 'mdc-text-field--no-label',
  OUTLINED: 'mdc-text-field--outlined',
  ROOT: 'mdc-text-field',
  TEXTAREA: 'mdc-text-field--textarea',
  WITH_LEADING_ICON: 'mdc-text-field--with-leading-icon',
  WITH_TRAILING_ICON: 'mdc-text-field--with-trailing-icon'
};
var numbers$8 = {
  DENSE_LABEL_SCALE: 0.923,
  LABEL_SCALE: 0.75
};
/**
 * Whitelist based off of https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * under the "Validation-related attributes" section.
 */

var VALIDATION_ATTR_WHITELIST = ['pattern', 'min', 'max', 'required', 'step', 'minlength', 'maxlength'];
/**
 * Label should always float for these types as they show some UI even if value is empty.
 */

var ALWAYS_FLOAT_TYPES = ['color', 'date', 'datetime-local', 'month', 'range', 'time', 'week'];

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var POINTERDOWN_EVENTS = ['mousedown', 'touchstart'];
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCTextFieldFoundation =
/** @class */
function (_super) {
  __extends(MDCTextFieldFoundation, _super);
  /**
   * @param adapter
   * @param foundationMap Map from subcomponent names to their subfoundations.
   */


  function MDCTextFieldFoundation(adapter, foundationMap) {
    if (foundationMap === void 0) {
      foundationMap = {};
    }

    var _this = _super.call(this, __assign({}, MDCTextFieldFoundation.defaultAdapter, adapter)) || this;

    _this.isFocused_ = false;
    _this.receivedUserInput_ = false;
    _this.isValid_ = true;
    _this.useNativeValidation_ = true;
    _this.helperText_ = foundationMap.helperText;
    _this.characterCounter_ = foundationMap.characterCounter;
    _this.leadingIcon_ = foundationMap.leadingIcon;
    _this.trailingIcon_ = foundationMap.trailingIcon;

    _this.inputFocusHandler_ = function () {
      return _this.activateFocus();
    };

    _this.inputBlurHandler_ = function () {
      return _this.deactivateFocus();
    };

    _this.inputInputHandler_ = function () {
      return _this.handleInput();
    };

    _this.setPointerXOffset_ = function (evt) {
      return _this.setTransformOrigin(evt);
    };

    _this.textFieldInteractionHandler_ = function () {
      return _this.handleTextFieldInteraction();
    };

    _this.validationAttributeChangeHandler_ = function (attributesList) {
      return _this.handleValidationAttributeChange(attributesList);
    };

    return _this;
  }

  Object.defineProperty(MDCTextFieldFoundation, "cssClasses", {
    get: function () {
      return cssClasses$i;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "strings", {
    get: function () {
      return strings$h;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "numbers", {
    get: function () {
      return numbers$8;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldAlwaysFloat_", {
    get: function () {
      var type = this.getNativeInput_().type;
      return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldFloat", {
    get: function () {
      return this.shouldAlwaysFloat_ || this.isFocused_ || !!this.getValue() || this.isBadInput_();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation.prototype, "shouldShake", {
    get: function () {
      return !this.isFocused_ && !this.isValid() && !!this.getValue();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldAdapter} for typing information on parameters and return types.
     */
    get: function () {
      // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
      return {
        addClass: function () {
          return undefined;
        },
        removeClass: function () {
          return undefined;
        },
        hasClass: function () {
          return true;
        },
        registerTextFieldInteractionHandler: function () {
          return undefined;
        },
        deregisterTextFieldInteractionHandler: function () {
          return undefined;
        },
        registerInputInteractionHandler: function () {
          return undefined;
        },
        deregisterInputInteractionHandler: function () {
          return undefined;
        },
        registerValidationAttributeChangeHandler: function () {
          return new MutationObserver(function () {
            return undefined;
          });
        },
        deregisterValidationAttributeChangeHandler: function () {
          return undefined;
        },
        getNativeInput: function () {
          return null;
        },
        isFocused: function () {
          return false;
        },
        activateLineRipple: function () {
          return undefined;
        },
        deactivateLineRipple: function () {
          return undefined;
        },
        setLineRippleTransformOrigin: function () {
          return undefined;
        },
        shakeLabel: function () {
          return undefined;
        },
        floatLabel: function () {
          return undefined;
        },
        hasLabel: function () {
          return false;
        },
        getLabelWidth: function () {
          return 0;
        },
        hasOutline: function () {
          return false;
        },
        notchOutline: function () {
          return undefined;
        },
        closeOutline: function () {
          return undefined;
        }
      }; // tslint:enable:object-literal-sort-keys
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldFoundation.prototype.init = function () {
    var _this = this;

    if (this.adapter_.isFocused()) {
      this.inputFocusHandler_();
    } else if (this.adapter_.hasLabel() && this.shouldFloat) {
      this.notchOutline(true);
      this.adapter_.floatLabel(true);
    }

    this.adapter_.registerInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.registerInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.registerInputInteractionHandler('input', this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function (evtType) {
      _this.adapter_.registerInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.registerTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.validationObserver_ = this.adapter_.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_);
    this.setCharacterCounter_(this.getValue().length);
  };

  MDCTextFieldFoundation.prototype.destroy = function () {
    var _this = this;

    this.adapter_.deregisterInputInteractionHandler('focus', this.inputFocusHandler_);
    this.adapter_.deregisterInputInteractionHandler('blur', this.inputBlurHandler_);
    this.adapter_.deregisterInputInteractionHandler('input', this.inputInputHandler_);
    POINTERDOWN_EVENTS.forEach(function (evtType) {
      _this.adapter_.deregisterInputInteractionHandler(evtType, _this.setPointerXOffset_);
    });
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.adapter_.deregisterTextFieldInteractionHandler(evtType, _this.textFieldInteractionHandler_);
    });
    this.adapter_.deregisterValidationAttributeChangeHandler(this.validationObserver_);
  };
  /**
   * Handles user interactions with the Text Field.
   */


  MDCTextFieldFoundation.prototype.handleTextFieldInteraction = function () {
    var nativeInput = this.adapter_.getNativeInput();

    if (nativeInput && nativeInput.disabled) {
      return;
    }

    this.receivedUserInput_ = true;
  };
  /**
   * Handles validation attribute changes
   */


  MDCTextFieldFoundation.prototype.handleValidationAttributeChange = function (attributesList) {
    var _this = this;

    attributesList.some(function (attributeName) {
      if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
        _this.styleValidity_(true);

        return true;
      }

      return false;
    });

    if (attributesList.indexOf('maxlength') > -1) {
      this.setCharacterCounter_(this.getValue().length);
    }
  };
  /**
   * Opens/closes the notched outline.
   */


  MDCTextFieldFoundation.prototype.notchOutline = function (openNotch) {
    if (!this.adapter_.hasOutline()) {
      return;
    }

    if (openNotch) {
      var isDense = this.adapter_.hasClass(cssClasses$i.DENSE);
      var labelScale = isDense ? numbers$8.DENSE_LABEL_SCALE : numbers$8.LABEL_SCALE;
      var labelWidth = this.adapter_.getLabelWidth() * labelScale;
      this.adapter_.notchOutline(labelWidth);
    } else {
      this.adapter_.closeOutline();
    }
  };
  /**
   * Activates the text field focus state.
   */


  MDCTextFieldFoundation.prototype.activateFocus = function () {
    this.isFocused_ = true;
    this.styleFocused_(this.isFocused_);
    this.adapter_.activateLineRipple();

    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }

    if (this.helperText_) {
      this.helperText_.showToScreenReader();
    }
  };
  /**
   * Sets the line ripple's transform origin, so that the line ripple activate
   * animation will animate out from the user's click location.
   */


  MDCTextFieldFoundation.prototype.setTransformOrigin = function (evt) {
    var touches = evt.touches;
    var targetEvent = touches ? touches[0] : evt;
    var targetClientRect = targetEvent.target.getBoundingClientRect();
    var normalizedX = targetEvent.clientX - targetClientRect.left;
    this.adapter_.setLineRippleTransformOrigin(normalizedX);
  };
  /**
   * Handles input change of text input and text area.
   */


  MDCTextFieldFoundation.prototype.handleInput = function () {
    this.autoCompleteFocus();
    this.setCharacterCounter_(this.getValue().length);
  };
  /**
   * Activates the Text Field's focus state in cases when the input value
   * changes without user input (e.g. programmatically).
   */


  MDCTextFieldFoundation.prototype.autoCompleteFocus = function () {
    if (!this.receivedUserInput_) {
      this.activateFocus();
    }
  };
  /**
   * Deactivates the Text Field's focus state.
   */


  MDCTextFieldFoundation.prototype.deactivateFocus = function () {
    this.isFocused_ = false;
    this.adapter_.deactivateLineRipple();
    var isValid = this.isValid();
    this.styleValidity_(isValid);
    this.styleFocused_(this.isFocused_);

    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }

    if (!this.shouldFloat) {
      this.receivedUserInput_ = false;
    }
  };

  MDCTextFieldFoundation.prototype.getValue = function () {
    return this.getNativeInput_().value;
  };
  /**
   * @param value The value to set on the input Element.
   */


  MDCTextFieldFoundation.prototype.setValue = function (value) {
    // Prevent Safari from moving the caret to the end of the input when the value has not changed.
    if (this.getValue() !== value) {
      this.getNativeInput_().value = value;
    }

    this.setCharacterCounter_(value.length);
    var isValid = this.isValid();
    this.styleValidity_(isValid);

    if (this.adapter_.hasLabel()) {
      this.notchOutline(this.shouldFloat);
      this.adapter_.floatLabel(this.shouldFloat);
      this.adapter_.shakeLabel(this.shouldShake);
    }
  };
  /**
   * @return The custom validity state, if set; otherwise, the result of a native validity check.
   */


  MDCTextFieldFoundation.prototype.isValid = function () {
    return this.useNativeValidation_ ? this.isNativeInputValid_() : this.isValid_;
  };
  /**
   * @param isValid Sets the custom validity state of the Text Field.
   */


  MDCTextFieldFoundation.prototype.setValid = function (isValid) {
    this.isValid_ = isValid;
    this.styleValidity_(isValid);
    var shouldShake = !isValid && !this.isFocused_ && !!this.getValue();

    if (this.adapter_.hasLabel()) {
      this.adapter_.shakeLabel(shouldShake);
    }
  };
  /**
   * Enables or disables the use of native validation. Use this for custom validation.
   * @param useNativeValidation Set this to false to ignore native input validation.
   */


  MDCTextFieldFoundation.prototype.setUseNativeValidation = function (useNativeValidation) {
    this.useNativeValidation_ = useNativeValidation;
  };

  MDCTextFieldFoundation.prototype.isDisabled = function () {
    return this.getNativeInput_().disabled;
  };
  /**
   * @param disabled Sets the text-field disabled or enabled.
   */


  MDCTextFieldFoundation.prototype.setDisabled = function (disabled) {
    this.getNativeInput_().disabled = disabled;
    this.styleDisabled_(disabled);
  };
  /**
   * @param content Sets the content of the helper text.
   */


  MDCTextFieldFoundation.prototype.setHelperTextContent = function (content) {
    if (this.helperText_) {
      this.helperText_.setContent(content);
    }
  };
  /**
   * Sets the aria label of the leading icon.
   */


  MDCTextFieldFoundation.prototype.setLeadingIconAriaLabel = function (label) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the leading icon.
   */


  MDCTextFieldFoundation.prototype.setLeadingIconContent = function (content) {
    if (this.leadingIcon_) {
      this.leadingIcon_.setContent(content);
    }
  };
  /**
   * Sets the aria label of the trailing icon.
   */


  MDCTextFieldFoundation.prototype.setTrailingIconAriaLabel = function (label) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setAriaLabel(label);
    }
  };
  /**
   * Sets the text content of the trailing icon.
   */


  MDCTextFieldFoundation.prototype.setTrailingIconContent = function (content) {
    if (this.trailingIcon_) {
      this.trailingIcon_.setContent(content);
    }
  };
  /**
   * Sets character counter values that shows characters used and the total character limit.
   */


  MDCTextFieldFoundation.prototype.setCharacterCounter_ = function (currentLength) {
    if (!this.characterCounter_) {
      return;
    }

    var maxLength = this.getNativeInput_().maxLength;

    if (maxLength === -1) {
      throw new Error('MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.');
    }

    this.characterCounter_.setCounterValue(currentLength, maxLength);
  };
  /**
   * @return True if the Text Field input fails in converting the user-supplied value.
   */


  MDCTextFieldFoundation.prototype.isBadInput_ = function () {
    // The badInput property is not supported in IE 11 💩.
    return this.getNativeInput_().validity.badInput || false;
  };
  /**
   * @return The result of native validity checking (ValidityState.valid).
   */


  MDCTextFieldFoundation.prototype.isNativeInputValid_ = function () {
    return this.getNativeInput_().validity.valid;
  };
  /**
   * Styles the component based on the validity state.
   */


  MDCTextFieldFoundation.prototype.styleValidity_ = function (isValid) {
    var INVALID = MDCTextFieldFoundation.cssClasses.INVALID;

    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }

    if (this.helperText_) {
      this.helperText_.setValidity(isValid);
    }
  };
  /**
   * Styles the component based on the focused state.
   */


  MDCTextFieldFoundation.prototype.styleFocused_ = function (isFocused) {
    var FOCUSED = MDCTextFieldFoundation.cssClasses.FOCUSED;

    if (isFocused) {
      this.adapter_.addClass(FOCUSED);
    } else {
      this.adapter_.removeClass(FOCUSED);
    }
  };
  /**
   * Styles the component based on the disabled state.
   */


  MDCTextFieldFoundation.prototype.styleDisabled_ = function (isDisabled) {
    var _a = MDCTextFieldFoundation.cssClasses,
        DISABLED = _a.DISABLED,
        INVALID = _a.INVALID;

    if (isDisabled) {
      this.adapter_.addClass(DISABLED);
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.removeClass(DISABLED);
    }

    if (this.leadingIcon_) {
      this.leadingIcon_.setDisabled(isDisabled);
    }

    if (this.trailingIcon_) {
      this.trailingIcon_.setDisabled(isDisabled);
    }
  };
  /**
   * @return The native text input element from the host environment, or an object with the same shape for unit tests.
   */


  MDCTextFieldFoundation.prototype.getNativeInput_ = function () {
    // this.adapter_ may be undefined in foundation unit tests. This happens when testdouble is creating a mock object
    // and invokes the shouldShake/shouldFloat getters (which in turn call getValue(), which calls this method) before
    // init() has been called from the MDCTextField constructor. To work around that issue, we return a dummy object.
    var nativeInput = this.adapter_ ? this.adapter_.getNativeInput() : null;
    return nativeInput || {
      disabled: false,
      maxLength: -1,
      type: 'input',
      validity: {
        badInput: false,
        valid: true
      },
      value: ''
    };
  };

  return MDCTextFieldFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$j = {
  ROOT: 'mdc-text-field-character-counter'
};
var strings$i = {
  ROOT_SELECTOR: "." + cssClasses$j.ROOT
};

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCTextFieldCharacterCounterFoundation =
/** @class */
function (_super) {
  __extends(MDCTextFieldCharacterCounterFoundation, _super);

  function MDCTextFieldCharacterCounterFoundation(adapter) {
    return _super.call(this, __assign({}, MDCTextFieldCharacterCounterFoundation.defaultAdapter, adapter)) || this;
  }

  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "cssClasses", {
    get: function () {
      return cssClasses$j;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "strings", {
    get: function () {
      return strings$i;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCTextFieldCharacterCounterFoundation, "defaultAdapter", {
    /**
     * See {@link MDCTextFieldCharacterCounterAdapter} for typing information on parameters and return types.
     */
    get: function () {
      return {
        setContent: function () {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCTextFieldCharacterCounterFoundation.prototype.setCounterValue = function (currentLength, maxLength) {
    currentLength = Math.min(currentLength, maxLength);
    this.adapter_.setContent(currentLength + " / " + maxLength);
  };

  return MDCTextFieldCharacterCounterFoundation;
}(MDCFoundation);

const createAdapter$2 = hostElement => {
  return {
    setContent: content => hostElement.textContent = content
  };
};

const partToFoundationMap$2 = new WeakMap();
const characterCounter = directive(() => part => {
  const lastFoundation = partToFoundationMap$2.get(part);

  if (!lastFoundation) {
    const hostElement = part.committer.element;
    hostElement.classList.add('mdc-text-field-character-counter');
    const adapter = createAdapter$2(hostElement);
    const foundation = new MDCTextFieldCharacterCounterFoundation(adapter);
    foundation.init();
    part.setValue(foundation);
    partToFoundationMap$2.set(part, foundation);
  }
});

const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'mousewheel'];

const createValidityObj = (customValidity = {}) => {
  /*
   * We need to make ValidityState an object because it is readonly and
   * we cannot use the spread operator. Also, we don't export
   * `CustomValidityState` because it is a leaky implementation and the user
   * already has access to `ValidityState` in lib.dom.ts. Also an interface
   * {a: Type} can be casted to {readonly a: Type} so passing any object
   * should be fine.
   */
  const objectifiedCustomValidity = {}; // eslint-disable-next-line guard-for-in

  for (const propName in customValidity) {
    /*
     * Casting is needed because ValidityState's props are all readonly and
     * thus cannot be set on `onjectifiedCustomValidity`. In the end, the
     * interface is the same as ValidityState (but not readonly), but the
     * function signature casts the output to ValidityState (thus readonly).
     */
    objectifiedCustomValidity[propName] = customValidity[propName];
  }

  return Object.assign({
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valid: true,
    valueMissing: false
  }, objectifiedCustomValidity);
};

class TextFieldBase extends FormElement {
  constructor() {
    super(...arguments);
    this.mdcFoundationClass = MDCTextFieldFoundation;
    this.value = '';
    this.type = 'text';
    this.placeholder = '';
    this.label = '';
    this.icon = '';
    this.iconTrailing = '';
    this.disabled = false;
    this.required = false;
    this.maxLength = -1;
    this.outlined = false;
    this.fullWidth = false;
    this.helper = '';
    this.validateOnInitialRender = false;
    this.validationMessage = '';
    this.pattern = '';
    this.min = '';
    this.max = '';
    this.step = null;
    this.helperPersistent = false;
    this.charCounter = false;
    this.outlineOpen = false;
    this.outlineWidth = 0;
    this.isUiValid = true;
    this._validity = createValidityObj();
    this.validityTransform = null;
  }

  get validity() {
    this._checkValidity(this.value);

    return this._validity;
  }

  get willValidate() {
    return this.formElement.willValidate;
  }

  get selectionStart() {
    return this.formElement.selectionStart;
  }

  get selectionEnd() {
    return this.formElement.selectionEnd;
  }

  get shouldRenderHelperText() {
    return !!this.helper || !!this.validationMessage || this.charCounterVisible;
  }

  get charCounterVisible() {
    return this.charCounter && this.maxLength !== -1;
  }

  focus() {
    const focusEvt = new CustomEvent('focus');
    this.formElement.dispatchEvent(focusEvt);
    this.formElement.focus();
  }

  blur() {
    const blurEvt = new CustomEvent('blur');
    this.formElement.dispatchEvent(blurEvt);
    this.formElement.blur();
  }

  select() {
    this.formElement.select();
  }

  setSelectionRange(selectionStart, selectionEnd, selectionDirection) {
    this.formElement.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  render() {
    const classes = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--fullwidth': this.fullWidth,
      'mdc-text-field--with-leading-icon': this.icon,
      'mdc-text-field--with-trailing-icon': this.iconTrailing
    };
    return html`
      <div class="mdc-text-field ${classMap(classes)}">
        ${this.icon ? this.renderIcon(this.icon) : ''}
        ${this.renderInput()}
        ${this.iconTrailing ? this.renderIcon(this.iconTrailing) : ''}
        ${this.outlined ? this.renderOutlined() : this.renderLabelText()}
      </div>
      ${this.renderHelperText(this.renderCharCounter())}
    `;
  }

  updated(changedProperties) {
    const maxLength = changedProperties.get('maxLength');
    const maxLengthBecameDefined = maxLength === -1 && this.maxLength !== -1;
    const maxLengthBecameUndefined = maxLength !== undefined && maxLength !== -1 && this.maxLength === -1;
    /* We want to recreate the foundation if maxLength changes to defined or
     * undefined, because the textfield foundation needs to be instantiated with
     * the char counter's foundation, and the char counter's foundation needs
     * to have maxLength defined to be instantiated. Additionally, there is no
     * exposed API on the MdcTextFieldFoundation to dynamically add a char
     * counter foundation, so we must recreate it.
     */

    if (maxLengthBecameDefined || maxLengthBecameUndefined) {
      this.createFoundation();
    }

    if (changedProperties.has('value') && changedProperties.get('value') !== undefined) {
      this.mdcFoundation.setValue(this.value);
    }
  }

  renderInput() {
    const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
    return html`
      <input
          id="text-field"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          maxlength="${ifDefined(maxOrUndef)}"
          pattern="${ifDefined(this.pattern ? this.pattern : undefined)}"
          min="${ifDefined(this.min === '' ? undefined : this.min)}"
          max="${ifDefined(this.max === '' ? undefined : this.max)}"
          step="${ifDefined(this.step === null ? undefined : this.step)}"
          @input="${this.handleInputChange}"
          @blur="${this.onInputBlur}">`;
  }

  renderIcon(icon) {
    return html`<i class="material-icons mdc-text-field__icon">${icon}</i>`;
  }

  renderOutlined() {
    let labelTemplate = '';

    if (this.label) {
      labelTemplate = html`
        <label
            .floatingLabelFoundation=${floatingLabel(this.label)}
            @labelchange=${this.onLabelChange}
            for="text-field">
          ${this.label}
        </label>
      `;
    }

    return html`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${labelTemplate}
      </mwc-notched-outline>`;
  }

  renderLabelText() {
    let labelTemplate = '';

    if (this.label && !this.fullWidth) {
      labelTemplate = html`
      <label
          .floatingLabelFoundation=${floatingLabel(this.label)}
          for="text-field">
        ${this.label}
      </label>`;
    }

    return html`
      ${labelTemplate}
      <div .lineRippleFoundation=${lineRipple()}></div>
    `;
  }

  renderHelperText(charCounterTemplate) {
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    const classes = {
      'mdc-text-field-helper-text--persistent': this.helperPersistent,
      'mdc-text-field-helper-text--validation-msg': showValidationMessage
    };
    const rootClasses = {
      hidden: !this.shouldRenderHelperText
    };
    return html`
      <div class="mdc-text-field-helper-line ${classMap(rootClasses)}">
        <div class="mdc-text-field-helper-text ${classMap(classes)}">
          ${showValidationMessage ? this.validationMessage : this.helper}
        </div>
        ${charCounterTemplate}
      </div>
    `;
  }

  renderCharCounter() {
    const counterClasses = {
      hidden: !this.charCounterVisible
    };
    return html`
      <div
          class="${classMap(counterClasses)}"
          .charCounterFoundation=${characterCounter()}>
      </div>`;
  }

  onInputBlur() {
    this.reportValidity();
  }

  checkValidity() {
    const isValid = this._checkValidity(this.value);

    if (!isValid) {
      const invalidEvent = new Event('invalid', {
        bubbles: false,
        cancelable: true
      });
      this.dispatchEvent(invalidEvent);
    }

    return isValid;
  }

  reportValidity() {
    const isValid = this.checkValidity();
    this.mdcFoundation.setValid(isValid);
    this.isUiValid = isValid;
    return isValid;
  }

  _checkValidity(value) {
    const nativeValidity = this.formElement.validity;
    let validity = createValidityObj(nativeValidity);

    if (this.validityTransform) {
      const customValidity = this.validityTransform(value, validity);
      validity = Object.assign(Object.assign({}, validity), customValidity);
      this.mdcFoundation.setUseNativeValidation(false);
    } else {
      this.mdcFoundation.setUseNativeValidation(true);
    }

    this._validity = validity;
    return this._validity.valid;
  }

  setCustomValidity(message) {
    this.validationMessage = message;
    this.formElement.setCustomValidity(message);
  }

  handleInputChange() {
    this.value = this.formElement.value;
  }

  createFoundation() {
    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.destroy();
    }

    this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter(), {
      characterCounter: this.maxLength !== -1 ? this.charCounterElement.charCounterFoundation : undefined
    });
    this.mdcFoundation.init();
  }

  createAdapter() {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.getRootAdapterMethods()), this.getInputAdapterMethods()), this.getLabelAdapterMethods()), this.getLineRippleAdapterMethods()), this.getOutlineAdapterMethods());
  }

  getRootAdapterMethods() {
    return Object.assign({
      registerTextFieldInteractionHandler: (evtType, handler) => this.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => this.removeEventListener(evtType, handler),
      registerValidationAttributeChangeHandler: () => {
        const getAttributesList = mutationsList => {
          return mutationsList.map(mutation => mutation.attributeName).filter(attributeName => attributeName);
        };

        const observer = new MutationObserver(mutationsList => {
          const attributes = getAttributesList(mutationsList);

          if (attributes.indexOf('maxlength') !== -1 && this.maxLength !== -1) {
            this.charCounterElement.charCounterFoundation.setCounterValue(this.value.length, this.maxLength);
          }
        });
        const config = {
          attributes: true
        };
        observer.observe(this.formElement, config);
        return observer;
      },
      deregisterValidationAttributeChangeHandler: observer => observer.disconnect()
    }, addHasRemoveClass(this.mdcRoot));
  }

  getInputAdapterMethods() {
    return {
      getNativeInput: () => this.formElement,
      isFocused: () => this.shadowRoot ? this.shadowRoot.activeElement === this.formElement : false,
      registerInputInteractionHandler: (evtType, handler) => this.formElement.addEventListener(evtType, handler, {
        passive: evtType in passiveEvents
      }),
      deregisterInputInteractionHandler: (evtType, handler) => this.formElement.removeEventListener(evtType, handler)
    };
  }

  getLabelAdapterMethods() {
    return {
      floatLabel: shouldFloat => this.labelElement && this.labelElement.floatingLabelFoundation.float(shouldFloat),
      getLabelWidth: () => {
        return this.labelElement ? this.labelElement.floatingLabelFoundation.getWidth() : 0;
      },
      hasLabel: () => Boolean(this.labelElement),
      shakeLabel: shouldShake => this.labelElement && this.labelElement.floatingLabelFoundation.shake(shouldShake)
    };
  }

  getLineRippleAdapterMethods() {
    return {
      activateLineRipple: () => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.activate();
        }
      },
      deactivateLineRipple: () => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.deactivate();
        }
      },
      setLineRippleTransformOrigin: normalizedX => {
        if (this.lineRippleElement) {
          this.lineRippleElement.lineRippleFoundation.setRippleCenter(normalizedX);
        }
      }
    };
  }

  async firstUpdated() {
    const outlineElement = this.outlineElement;

    if (outlineElement) {
      await outlineElement.updateComplete;
    }

    super.firstUpdated();

    if (this.validateOnInitialRender) {
      this.reportValidity();
    }
  }

  getOutlineAdapterMethods() {
    return {
      closeOutline: () => this.outlineElement && (this.outlineOpen = false),
      hasOutline: () => Boolean(this.outlineElement),
      notchOutline: labelWidth => {
        const outlineElement = this.outlineElement;

        if (outlineElement && !this.outlineOpen) {
          this.outlineWidth = labelWidth;
          this.outlineOpen = true;
        }
      }
    };
  }

  async onLabelChange() {
    if (this.label) {
      await this.layout();
    }
  }

  async layout() {
    await this.updateComplete;

    if (this.labelElement && this.outlineElement) {
      /* When the textfield automatically notches due to a value and label
       * being defined, the textfield may be set to `display: none` by the user.
       * this means that the notch is of size 0px. We provide this function so
       * that the user may manually resize the notch to the floated label's
       * width.
       */
      const labelWidth = this.labelElement.floatingLabelFoundation.getWidth();

      if (this.outlineOpen) {
        this.outlineWidth = labelWidth;
      }
    }
  }

}

__decorate([query('.mdc-text-field')], TextFieldBase.prototype, "mdcRoot", void 0);

__decorate([query('input')], TextFieldBase.prototype, "formElement", void 0);

__decorate([query('.mdc-floating-label')], TextFieldBase.prototype, "labelElement", void 0);

__decorate([query('.mdc-line-ripple')], TextFieldBase.prototype, "lineRippleElement", void 0);

__decorate([query('mwc-notched-outline')], TextFieldBase.prototype, "outlineElement", void 0);

__decorate([query('.mdc-notched-outline__notch')], TextFieldBase.prototype, "notchElement", void 0);

__decorate([query('.mdc-text-field-character-counter')], TextFieldBase.prototype, "charCounterElement", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "value", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "type", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "placeholder", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "label", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "icon", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "iconTrailing", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], TextFieldBase.prototype, "disabled", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "required", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "maxLength", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], TextFieldBase.prototype, "outlined", void 0);

__decorate([property({
  type: Boolean,
  reflect: true
})], TextFieldBase.prototype, "fullWidth", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "helper", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "validateOnInitialRender", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "validationMessage", void 0);

__decorate([property({
  type: String
})], TextFieldBase.prototype, "pattern", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "min", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "max", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "step", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "helperPersistent", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "charCounter", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "outlineOpen", void 0);

__decorate([property({
  type: Number
})], TextFieldBase.prototype, "outlineWidth", void 0);

__decorate([property({
  type: Boolean
})], TextFieldBase.prototype, "isUiValid", void 0);

__decorate([eventOptions({
  passive: true
})], TextFieldBase.prototype, "handleInputChange", null);

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
class TextAreaBase extends TextFieldBase {
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
const style$l = css`.mdc-floating-label{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.009375em;text-decoration:inherit;text-transform:inherit;position:absolute;left:0;transform-origin:left top;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1);line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple{position:absolute;bottom:0;left:0;width:100%;height:2px;transform:scaleX(0);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;z-index:2}.mdc-line-ripple--active{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating{opacity:0}.mdc-notched-outline{display:flex;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / .75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-text-field-helper-text{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.0333333333em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin:0;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;will-change:opacity}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.0333333333em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-leading-icon .mdc-text-field__icon,.mdc-text-field--with-trailing-icon .mdc-text-field__icon{position:absolute;top:50%;transform:translateY(-50%);cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);height:56px;border-radius:4px 4px 0 0;display:inline-flex;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field::before,.mdc-text-field::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-text-field.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field::before,.mdc-text-field::after{background-color:rgba(0,0,0,.87)}.mdc-text-field:hover::before{opacity:.04}.mdc-text-field.mdc-ripple-upgraded--background-focused::before,.mdc-text-field:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-text-field::before,.mdc-text-field::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0,0,0,.87)}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:hover{border-bottom-color:rgba(0,0,0,.87)}.mdc-text-field .mdc-line-ripple{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon{color:rgba(0,0,0,.54)}.mdc-text-field:not(.mdc-text-field--disabled){background-color:#f5f5f5}.mdc-text-field .mdc-floating-label{left:16px;right:initial;top:50%;transform:translateY(-50%);pointer-events:none}[dir=rtl] .mdc-text-field .mdc-floating-label,.mdc-text-field .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--textarea .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--textarea .mdc-floating-label,.mdc-text-field--textarea .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above{left:40px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above[dir=rtl]{left:initial;right:40px}.mdc-text-field__input{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;font-weight:400;letter-spacing:.009375em;text-decoration:inherit;text-transform:inherit;align-self:flex-end;box-sizing:border-box;width:100%;height:100%;padding:20px 16px 6px;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);border:none;border-bottom:1px solid;border-radius:0;background:none;appearance:none}.mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;color:rgba(0,0,0,.54)}.mdc-text-field__input:-ms-input-placeholder{color:rgba(0,0,0,.54) !important}.mdc-text-field--fullwidth .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input:-webkit-autofill{z-index:auto !important}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input{padding-top:16px;padding-bottom:16px}.mdc-text-field__input:-webkit-autofill+.mdc-floating-label{transform:translateY(-50%) scale(0.75);cursor:auto}.mdc-text-field--outlined{border:none;overflow:visible}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined::before,.mdc-text-field--outlined::after{content:none}.mdc-text-field--outlined:not(.mdc-text-field--disabled){background-color:transparent}.mdc-text-field--outlined .mdc-text-field__input{display:flex;padding:12px 16px 14px;border:none !important;background-color:transparent;z-index:1}.mdc-text-field--outlined .mdc-text-field__icon{z-index:2}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--outlined.mdc-text-field--disabled{background-color:transparent}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.06)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{border-bottom:none}.mdc-text-field--outlined.mdc-text-field--dense{height:48px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) scale(1)}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) scale(0.8)}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-dense 250ms 1}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 7px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{top:14px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__icon{top:12px}.mdc-text-field--with-leading-icon .mdc-text-field__icon{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-text-field__icon,.mdc-text-field--with-leading-icon .mdc-text-field__icon[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon .mdc-text-field__input{padding-left:48px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-text-field__input,.mdc-text-field--with-leading-icon .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:48px}.mdc-text-field--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-floating-label,.mdc-text-field--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__input{padding-left:48px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl 250ms 1}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) translateX(-21px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-134%) translateX(21px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) translateX(-21px) scale(0.8)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-120%) translateX(21px) scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl 250ms 1}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{left:32px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:32px}.mdc-text-field--with-trailing-icon .mdc-text-field__icon{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon .mdc-text-field__icon,.mdc-text-field--with-trailing-icon .mdc-text-field__icon[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-trailing-icon .mdc-text-field__input{padding-left:16px;padding-right:48px}[dir=rtl] .mdc-text-field--with-trailing-icon .mdc-text-field__input,.mdc-text-field--with-trailing-icon .mdc-text-field__input[dir=rtl]{padding-left:48px;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__icon{left:initial;right:16px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__icon,.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__icon[dir=rtl]{left:16px;right:initial}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__input{padding-left:16px;padding-right:48px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__input,.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__input[dir=rtl]{padding-left:48px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon{left:16px;right:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon[dir=rtl]{left:auto;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon~.mdc-text-field__icon{right:12px;left:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon~.mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon~.mdc-text-field__icon[dir=rtl]{right:auto;left:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__input{padding-left:48px;padding-right:48px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__input[dir=rtl]{padding-left:48px;padding-right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon{bottom:16px;transform:scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon[dir=rtl]{left:initial;right:12px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:44px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:44px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label{left:44px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:44px}.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:16px;padding-right:44px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:44px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon{left:12px;right:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon[dir=rtl]{left:auto;right:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon~.mdc-text-field__icon{right:12px;left:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon~.mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon~.mdc-text-field__icon[dir=rtl]{right:auto;left:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:44px;padding-right:44px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:44px;padding-right:44px}.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-70%) scale(0.8)}.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-dense 250ms 1}.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 0}.mdc-text-field--dense .mdc-floating-label{font-size:.813rem}.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.813rem}.mdc-text-field__input:required~.mdc-floating-label::after,.mdc-text-field__input:required~.mdc-notched-outline .mdc-floating-label::after{margin-left:1px;content:"*"}.mdc-text-field--textarea{display:inline-flex;width:auto;height:auto;transition:none;overflow:visible}.mdc-text-field--textarea:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.38)}.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-text-field--textarea:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--textarea .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea 250ms 1}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--textarea::before,.mdc-text-field--textarea::after{content:none}.mdc-text-field--textarea:not(.mdc-text-field--disabled){background-color:transparent}.mdc-text-field--textarea .mdc-floating-label--float-above{transform:translateY(-144%) scale(1)}.mdc-text-field--textarea .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-130%) scale(0.75)}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea .mdc-text-field-character-counter{left:initial;right:16px;position:absolute;bottom:13px}[dir=rtl] .mdc-text-field--textarea .mdc-text-field-character-counter,.mdc-text-field--textarea .mdc-text-field-character-counter[dir=rtl]{left:16px;right:initial}.mdc-text-field--textarea .mdc-text-field__input{align-self:auto;box-sizing:border-box;height:auto;margin:8px 1px 1px 0;padding:0 16px 16px;border:none;line-height:1.75rem}.mdc-text-field--textarea .mdc-text-field-character-counter+.mdc-text-field__input{margin-bottom:28px;padding-bottom:0}.mdc-text-field--textarea .mdc-floating-label{top:17px;width:auto;pointer-events:none}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--fullwidth{width:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field--fullwidth.mdc-text-field--disabled .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea){display:block}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea)::before,.mdc-text-field--fullwidth:not(.mdc-text-field--textarea)::after{content:none}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea):not(.mdc-text-field--disabled){background-color:transparent}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__input{padding:0}.mdc-text-field--fullwidth.mdc-text-field--textarea .mdc-text-field__input{resize:vertical}.mdc-text-field--fullwidth.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field--dense+.mdc-text-field-helper-line{margin-bottom:4px}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98,0,238,.87)}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input:hover{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple{background-color:#b00020;background-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid.mdc-text-field--with-trailing-icon:not(.mdc-text-field--with-leading-icon):not(.mdc-text-field--disabled) .mdc-text-field__icon{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid.mdc-text-field--with-trailing-icon.mdc-text-field--with-leading-icon:not(.mdc-text-field--disabled) .mdc-text-field__icon~.mdc-text-field__icon{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--disabled{background-color:#fafafa;border-bottom:none;pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.06)}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0,0,0,.37)}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0,0,0,.37)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0,0,0,.37)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0,0,0,.37)}.mdc-text-field--disabled .mdc-text-field__icon{color:rgba(0,0,0,.3)}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--textarea.mdc-text-field--disabled{background-color:transparent;background-color:#f9f9f9}.mdc-text-field--textarea.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.06)}.mdc-text-field--textarea.mdc-text-field--disabled .mdc-text-field__input{border-bottom:none}@keyframes mdc-floating-label-shake-float-above-text-field-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-70%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-70%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense{0%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl{0%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-textarea{0%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-130%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.hidden,.hidden::before,.hidden::after{display:none}:host{display:inline-block;outline:none}:host([fullwidth]){display:block}.mdc-text-field{display:flex;width:100%;border-radius:4px 4px 0 0;border-radius:var(--mdc-text-field-filled-border-radius, 4px 4px 0 0)}mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38))}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-text-field__input:required~.mdc-floating-label::after,:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-text-field__input:required~.mdc-notched-outline .mdc-floating-label::after{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.37))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.37))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.37))}.mdc-text-field:not(.mdc-text-field--outlined){border-bottom:1px solid}.mdc-text-field:not(.mdc-text-field--outlined) .mdc-line-ripple{bottom:-1px}.mdc-text-field:not(.mdc-text-field--outlined):not(.mdc-text-field--disabled):not(.mdc-text-field--invalid){border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field:not(.mdc-text-field--outlined):not(.mdc-text-field--disabled):not(.mdc-text-field--invalid):hover{border-bottom-color:rgba(0,0,0,.87)}.mdc-text-field:not(.mdc-text-field--outlined):not(.mdc-text-field--disabled).mdc-text-field--invalid{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field:not(.mdc-text-field--outlined) .mdc-floating-label.mdc-floating-label--float-above{transform:translateY(-50%) scale(0.75);font-size:initial}.mdc-text-field:not(.mdc-text-field--outlined).mdc-text-field--disabled{border-bottom-color:rgba(0,0,0,.06)}.mdc-text-field:not(.mdc-text-field--outlined) .mdc-text-field__input,.mdc-text-field:not(.mdc-text-field--outlined) .mdc-text-field-character-counter.hidden+.mdc-text-field__input{padding:0 16px 0 16px;margin:20px 0 1px 0}.mdc-text-field:not(.mdc-text-field--outlined) .mdc-text-field-character-counter:not(.hidden)+.mdc-text-field__input{margin-bottom:28px}.mdc-text-field:not(.mdc-text-field--outlined) .mdc-floating-label{top:18px;left:16px}.mdc-text-field{height:100%}.mdc-text-field.mdc-text-field--outlined.mdc-text-field--disabled{background-color:transparent}.mdc-text-field.mdc-text-field--outlined:not(.mdc-text-field--fullwidth) .mdc-text-field__input{margin-bottom:14px;padding-bottom:0px}.mdc-text-field.mdc-text-field--outlined:not(.mdc-text-field--fullwidth) .mdc-text-field-character-counter{bottom:14px}.mdc-text-field.mdc-text-field--outlined:not(.mdc-text-field--fullwidth) .mdc-text-field-character-counter:not(.hidden)+.mdc-text-field__input{margin-bottom:41px}.mdc-text-field__input{-ms-overflow-style:none;scrollbar-color:transparent transparent;resize:none}.mdc-text-field__input::-webkit-scrollbar{display:none}`;

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
let TextArea = class TextArea extends TextAreaBase {};
TextArea.styles = style$l;
TextArea = __decorate([customElement('mwc-textarea')], TextArea);

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
const style$m = css`.mdc-floating-label{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.009375em;text-decoration:inherit;text-transform:inherit;position:absolute;left:0;transform-origin:left top;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1);line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple{position:absolute;bottom:0;left:0;width:100%;height:2px;transform:scaleX(0);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;z-index:2}.mdc-line-ripple--active{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating{opacity:0}.mdc-notched-outline{display:flex;position:absolute;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / .75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-text-field-helper-text{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.0333333333em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin:0;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;will-change:opacity}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.75rem;line-height:1.25rem;font-weight:400;letter-spacing:.0333333333em;text-decoration:inherit;text-transform:inherit;display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-leading-icon .mdc-text-field__icon,.mdc-text-field--with-trailing-icon .mdc-text-field__icon{position:absolute;top:50%;transform:translateY(-50%);cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);height:56px;border-radius:4px 4px 0 0;display:inline-flex;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field::before,.mdc-text-field::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-text-field.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field::before,.mdc-text-field::after{background-color:rgba(0,0,0,.87)}.mdc-text-field:hover::before{opacity:.04}.mdc-text-field.mdc-ripple-upgraded--background-focused::before,.mdc-text-field:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-text-field::before,.mdc-text-field::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0,0,0,.87)}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:hover{border-bottom-color:rgba(0,0,0,.87)}.mdc-text-field .mdc-line-ripple{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon{color:rgba(0,0,0,.54)}.mdc-text-field:not(.mdc-text-field--disabled){background-color:#f5f5f5}.mdc-text-field .mdc-floating-label{left:16px;right:initial;top:50%;transform:translateY(-50%);pointer-events:none}[dir=rtl] .mdc-text-field .mdc-floating-label,.mdc-text-field .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--textarea .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--textarea .mdc-floating-label,.mdc-text-field--textarea .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above{left:40px;right:initial}[dir=rtl] .mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above,.mdc-text-field--outlined--with-leading-icon .mdc-floating-label--float-above[dir=rtl]{left:initial;right:40px}.mdc-text-field__input{font-family:Roboto, sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;font-weight:400;letter-spacing:.009375em;text-decoration:inherit;text-transform:inherit;align-self:flex-end;box-sizing:border-box;width:100%;height:100%;padding:20px 16px 6px;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);border:none;border-bottom:1px solid;border-radius:0;background:none;appearance:none}.mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;color:rgba(0,0,0,.54)}.mdc-text-field__input:-ms-input-placeholder{color:rgba(0,0,0,.54) !important}.mdc-text-field--fullwidth .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input:-webkit-autofill{z-index:auto !important}.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input{padding-top:16px;padding-bottom:16px}.mdc-text-field__input:-webkit-autofill+.mdc-floating-label{transform:translateY(-50%) scale(0.75);cursor:auto}.mdc-text-field--outlined{border:none;overflow:visible}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined::before,.mdc-text-field--outlined::after{content:none}.mdc-text-field--outlined:not(.mdc-text-field--disabled){background-color:transparent}.mdc-text-field--outlined .mdc-text-field__input{display:flex;padding:12px 16px 14px;border:none !important;background-color:transparent;z-index:1}.mdc-text-field--outlined .mdc-text-field__icon{z-index:2}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--outlined.mdc-text-field--disabled{background-color:transparent}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.06)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{border-bottom:none}.mdc-text-field--outlined.mdc-text-field--dense{height:48px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) scale(1)}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) scale(0.8)}.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-dense 250ms 1}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 7px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{top:14px}.mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__icon{top:12px}.mdc-text-field--with-leading-icon .mdc-text-field__icon{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-text-field__icon,.mdc-text-field--with-leading-icon .mdc-text-field__icon[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon .mdc-text-field__input{padding-left:48px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-text-field__input,.mdc-text-field--with-leading-icon .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:48px}.mdc-text-field--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon .mdc-floating-label,.mdc-text-field--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon{left:16px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__icon[dir=rtl]{left:initial;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__input{padding-left:48px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl 250ms 1}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-134%) translateX(-21px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-134%) translateX(21px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.8rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-120%) translateX(-21px) scale(0.8)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-120%) translateX(21px) scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense 250ms 1}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl 250ms 1}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{left:32px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:32px}.mdc-text-field--with-trailing-icon .mdc-text-field__icon{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon .mdc-text-field__icon,.mdc-text-field--with-trailing-icon .mdc-text-field__icon[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-trailing-icon .mdc-text-field__input{padding-left:16px;padding-right:48px}[dir=rtl] .mdc-text-field--with-trailing-icon .mdc-text-field__input,.mdc-text-field--with-trailing-icon .mdc-text-field__input[dir=rtl]{padding-left:48px;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__icon{left:initial;right:16px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__icon,.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__icon[dir=rtl]{left:16px;right:initial}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__input{padding-left:16px;padding-right:48px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__input,.mdc-text-field--with-trailing-icon.mdc-text-field--outlined .mdc-text-field__input[dir=rtl]{padding-left:48px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon{left:16px;right:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon[dir=rtl]{left:auto;right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon~.mdc-text-field__icon{right:12px;left:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon~.mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__icon~.mdc-text-field__icon[dir=rtl]{right:auto;left:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__input{padding-left:48px;padding-right:48px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon .mdc-text-field__input[dir=rtl]{padding-left:48px;padding-right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon{bottom:16px;transform:scale(0.8)}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon{left:12px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon[dir=rtl]{left:initial;right:12px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:44px;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:16px;padding-right:44px}.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label{left:44px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-floating-label[dir=rtl]{left:initial;right:44px}.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon{left:initial;right:12px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon[dir=rtl]{left:12px;right:initial}.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:16px;padding-right:44px}[dir=rtl] .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:44px;padding-right:16px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon{left:12px;right:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon[dir=rtl]{left:auto;right:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon~.mdc-text-field__icon{right:12px;left:auto}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon~.mdc-text-field__icon,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon~.mdc-text-field__icon[dir=rtl]{right:auto;left:12px}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input{padding-left:44px;padding-right:44px}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input,.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__input[dir=rtl]{padding-left:44px;padding-right:44px}.mdc-text-field--dense .mdc-floating-label--float-above{transform:translateY(-70%) scale(0.8)}.mdc-text-field--dense .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-dense 250ms 1}.mdc-text-field--dense .mdc-text-field__input{padding:12px 12px 0}.mdc-text-field--dense .mdc-floating-label{font-size:.813rem}.mdc-text-field--dense .mdc-floating-label--float-above{font-size:.813rem}.mdc-text-field__input:required~.mdc-floating-label::after,.mdc-text-field__input:required~.mdc-notched-outline .mdc-floating-label::after{margin-left:1px;content:"*"}.mdc-text-field--textarea{display:inline-flex;width:auto;height:auto;transition:none;overflow:visible}.mdc-text-field--textarea:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.38)}.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-text-field--textarea:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--textarea .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea 250ms 1}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading{border-radius:4px 0 0 4px}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-radius:0 4px 4px 0}.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing{border-radius:0 4px 4px 0}[dir=rtl] .mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-radius:4px 0 0 4px}.mdc-text-field--textarea::before,.mdc-text-field--textarea::after{content:none}.mdc-text-field--textarea:not(.mdc-text-field--disabled){background-color:transparent}.mdc-text-field--textarea .mdc-floating-label--float-above{transform:translateY(-144%) scale(1)}.mdc-text-field--textarea .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-130%) scale(0.75)}.mdc-text-field--textarea.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea .mdc-text-field-character-counter{left:initial;right:16px;position:absolute;bottom:13px}[dir=rtl] .mdc-text-field--textarea .mdc-text-field-character-counter,.mdc-text-field--textarea .mdc-text-field-character-counter[dir=rtl]{left:16px;right:initial}.mdc-text-field--textarea .mdc-text-field__input{align-self:auto;box-sizing:border-box;height:auto;margin:8px 1px 1px 0;padding:0 16px 16px;border:none;line-height:1.75rem}.mdc-text-field--textarea .mdc-text-field-character-counter+.mdc-text-field__input{margin-bottom:28px;padding-bottom:0}.mdc-text-field--textarea .mdc-floating-label{top:17px;width:auto;pointer-events:none}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--fullwidth{width:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field--fullwidth.mdc-text-field--disabled .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea){display:block}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea)::before,.mdc-text-field--fullwidth:not(.mdc-text-field--textarea)::after{content:none}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea):not(.mdc-text-field--disabled){background-color:transparent}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__input{padding:0}.mdc-text-field--fullwidth.mdc-text-field--textarea .mdc-text-field__input{resize:vertical}.mdc-text-field--fullwidth.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field--dense+.mdc-text-field-helper-line{margin-bottom:4px}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98,0,238,.87)}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input:hover{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple{background-color:#b00020;background-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid.mdc-text-field--with-trailing-icon:not(.mdc-text-field--with-leading-icon):not(.mdc-text-field--disabled) .mdc-text-field__icon{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid.mdc-text-field--with-trailing-icon.mdc-text-field--with-leading-icon:not(.mdc-text-field--disabled) .mdc-text-field__icon~.mdc-text-field__icon{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover~.mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover~.mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--disabled{background-color:#fafafa;border-bottom:none;pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{border-bottom-color:rgba(0,0,0,.06)}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0,0,0,.37)}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0,0,0,.37)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0,0,0,.37)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0,0,0,.37)}.mdc-text-field--disabled .mdc-text-field__icon{color:rgba(0,0,0,.3)}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--textarea.mdc-text-field--disabled{background-color:transparent;background-color:#f9f9f9}.mdc-text-field--textarea.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--textarea.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--textarea.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.06)}.mdc-text-field--textarea.mdc-text-field--disabled .mdc-text-field__input{border-bottom:none}@keyframes mdc-floating-label-shake-float-above-text-field-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-70%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-70%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-70%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-dense{0%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 0%)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense{0%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - 21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-dense-rtl{0%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -21px)) translateY(-120%) scale(0.8)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -21px)) translateY(-120%) scale(0.8)}100%{transform:translateX(calc(0 - -21px)) translateY(-120%) scale(0.8)}}@keyframes mdc-floating-label-shake-float-above-textarea{0%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-130%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-130%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-130%) scale(0.75)}}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}.hidden,.hidden::before,.hidden::after{display:none}:host{display:inline-block;outline:none}:host([fullwidth]){display:block}.mdc-text-field{display:flex;width:100%;border-radius:4px 4px 0 0;border-radius:var(--mdc-text-field-filled-border-radius, 4px 4px 0 0)}mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38))}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-text-field__input:required~.mdc-floating-label::after,:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-text-field__input:required~.mdc-notched-outline .mdc-floating-label::after{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.37))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.37))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.37))}`;

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
let TextField = class TextField extends TextFieldBase {};
TextField.styles = style$m;
TextField = __decorate([customElement('mwc-textfield')], TextField);

let TopAppBar = class TopAppBar extends TopAppBarBase {};
TopAppBar.styles = style$k;
TopAppBar = __decorate([customElement('mwc-top-app-bar')], TopAppBar);
//# sourceMappingURL=index.js.map
