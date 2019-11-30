import {html, render} from "./web_modules/lit-html.js";

import './tm-demo.js';

render(html`
    <style>
        body {
            background: lightgray;
        }
    </style>
    <tm-demo heading="Material Elements">
    
        <section title="MWC Button">
             <style>
                mwc-button {
                    width: 100%;
                }
            </style>
            <mwc-button>MWC Button</mwc-button> 
        </section>
        
        <section title="MWC Checkbox">
            <div>
              <mwc-checkbox></mwc-checkbox>
              <mwc-checkbox checked></mwc-checkbox>
              <mwc-checkbox indeterminate></mwc-checkbox>
            </div>
            <div>
              <mwc-checkbox disabled></mwc-checkbox>
              <mwc-checkbox disabled checked></mwc-checkbox>
              <mwc-checkbox disabled indeterminate></mwc-checkbox>
            </div>
            <div>
              <style>
                mwc-checkbox.pink {
                  --mdc-theme-secondary: #e91e63;
                }
              </style>
              <mwc-checkbox class="pink"></mwc-checkbox>
              <mwc-checkbox class="pink" checked></mwc-checkbox>
              <mwc-checkbox class="pink" indeterminate></mwc-checkbox>
            </div>
        </section>
        
    </tm-demo>
    
`, document.querySelector('body'));