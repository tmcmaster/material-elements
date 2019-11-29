import {html, render} from "./web_modules/lit-html.js";

render(html`
    <style>
        body {
          background-color: lightgray;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
        } 
        
        div {
            
        }
        
        h3 {
            width: 100%;
            text-align: left;
        }
    </style>
    <div>
        <h3>Material Elements</h3>
        <mwc-button>MWC Button</mwc-button>
        <mwc-textfield label="label"></mwc-textfield>
        
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
    </div>
    
    
    
`, document.querySelector('body'));

