import {html, render} from "./web_modules/lit-html.js";

let sites = {
    'src': 'https://github.com/tmcmaster/material-elements',
    'pika': 'https://www.pika.dev/npm/@wonkytech/material-elements',
    'npm': 'https://www.npmjs.com/package/@wonkytech/material-elements',
    'docs': 'https://github.com/tmcmaster/material-elements#readme'
};

render(html`
    <style>
        body {
            padding: 0;
            margin: 0;
            left:0;
            top:0;
            width: 100vw;
            height: 100vh;  
        }
    </style>
    <tm-examples heading="Material Elements" .sites="${sites}">
    
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
        
    </tm-examples>
    
`, document.querySelector('body'));