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
    </div>
    
    
`, document.querySelector('body'));

