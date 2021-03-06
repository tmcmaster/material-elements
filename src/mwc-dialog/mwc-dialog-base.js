import { __decorate } from "tslib/tslib.es6.js";
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

import "blocking-elements/dist/blocking-elements.js";
import "wicg-inert/src/inert.js";
import { cssClasses } from "../dialog/constants.js";
import MDCDialogFoundation from "../dialog/foundation.js";
import { applyPassive } from "../dom/events.js";
import { closest, matches } from "../dom/ponyfill.js";
import { addHasRemoveClass, BaseElement, observer } from "../mwc-base/base-element.js";
import { html, property, query } from "lit-element/lit-element.js";
import { classMap } from "lit-html/directives/class-map.js";
const blockingElements = document.$blockingElements;
export class DialogBase extends BaseElement {
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

__decorate([property()], DialogBase.prototype, "initialFocusAttribute", void 0); //# sourceMappingURL=mwc-dialog-base.js.map