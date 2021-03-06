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
// Make TypeScript not remove the imports.

import "../mwc-tab/mwc-tab.js";
import "../mwc-tab-scroller/mwc-tab-scroller.js";
import { BaseElement, observer } from "../mwc-base/base-element.js";
import { Tab } from "../mwc-tab/mwc-tab.js";
import MDCTabBarFoundation from "../tab-bar/foundation.js";
import { html, property, query } from "lit-element/lit-element.js";
export class TabBarBase extends BaseElement {
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
})], TabBarBase.prototype, "activeIndex", void 0); //# sourceMappingURL=mwc-tab-bar-base.js.map