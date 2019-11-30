import { L as LitElement, c as css, h as html } from '../common/index-4baeda67.js';
import CodeFlask from '../codeflask.js';

window.customElements.define('tm-examples', class extends LitElement {
  // noinspection JSUnusedGlobalSymbols
  static get properties() {
    return {
      heading: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.heading = '';
  } // noinspection JSUnusedGlobalSymbols


  firstUpdated(_changedProperties) {
    const sections = this.shadowRoot.querySelector('#slot').assignedNodes().filter(node => node.nodeName === "SECTION");
    console.log('Sections: ', sections);
    sections.forEach(section => {
      console.log('Section: ', section);
      const main = document.createElement('main');
      const children = [];
      section.childNodes.forEach(child => {
        console.log('Section Child: ', child);
        children.push(child);
      });
      children.forEach(child => {
        let c = section.removeChild(child);
        console.log('Main Child: ', c);
        main.appendChild(c);
      });
      const heading = document.createElement('h3');
      heading.style = 'color:grey;margin-bottom:10px;';
      const title = section.getAttribute('title');
      heading.innerText = title === null ? 'Example' : title;
      section.appendChild(heading);
      const button = document.createElement('button');

      button.onclick = () => {
        this.shadowRoot.getElementById('ddd').viewSource(main);
      };

      button.style = 'float:right;margin-top:-30px;';
      button.appendChild(document.createTextNode('Source'));
      section.appendChild(button);
      section.appendChild(main);
      section.appendChild(document.createElement('hr'));
    });
    this.dialog = this.shadowRoot.getElementById('dialog');
  }

  static get styles() {
    // language=CSS
    return css`
            :host {
                display: flex;
                flex-direction: row;
                justify-content: center;
                background: var(--tm-demo-background, inherit);
                //border: solid green 2px;
                box-sizing: border-box;
                padding: 10px;
                width: 100%;
            }

            article {
                min-width: 500px;
            }
            
            h1 {
                color: gray;
                text-align: center;
            }


            
            button {
                clear: both;
                float: right;
            }

        `;
  } // noinspection JSUnusedGlobalSymbols


  render() {
    return html`
            <article>
                <h1>${this.heading}</h1>
                <hr/>
                <main>
                    <slot id="slot"></slot>
                </main> 
            </article>

            <tm-demo-source id="ddd"></tm-demo-source>
        `;
  }

});
window.customElements.define('tm-demo-source', class extends LitElement {
  // noinspection JSUnusedGlobalSymbols
  static get properties() {
    return {
      title: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.title = 'Source Code';
  } // noinspection JSUnusedGlobalSymbols


  firstUpdated(_changedProperties) {
    this.dialog = this.shadowRoot.getElementById('dialog');
    let codeDiv = this.shadowRoot.getElementById('source');
    this.flask = new CodeFlask(codeDiv, {
      language: 'html'
    });
  }

  static get styles() {
    // language=CSS
    return css`
            main {
                display: inline-block;
                box-sizing: border-box;
                scroll-behavior: auto;
                border: solid lightgray 2px;
                overflow: scroll;
                padding: 20px;
                width: 100%;
                height: 400px;
            }
            #source {
                display: inline-block;
                box-sizing: border-box;
                //border: solid red 2px;
            }
            textarea {
                display: none;
            }
            pre {
                margin: 0;
            }
            h3 {
                margin-bottom: 0;
                text-align: center;
                color: blue;
            }
        `;
  } // noinspection JSUnusedGlobalSymbols


  render() {
    return html`
            <mwc-dialog id="dialog" heading="${this.title}">
                <main>
                    <div id="source"></div>
                </main>
                <mwc-button slot="secondaryAction" dialogAction="cancel">Cancel</mwc-button>
            </mwc-dialog>
        `;
  }

  viewSource(element) {
    const {
      flask,
      dialog
    } = this;
    const lines = element.innerHTML.split('\n').filter(line => line.search(/\S/) > -1);
    const shortestLeadingWhitespace = Math.min(lines.map(line => line.search(/\S/)).filter(n => n > -1).reduce((a, b) => a < b ? a : b));
    const source = lines.map(line => line.substr(shortestLeadingWhitespace)).join('\n');
    flask.updateCode(source);
    dialog.open = true;
  }

});
