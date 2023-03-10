import { css, html, LitElement } from "lit";
import { classMap } from 'lit/directives/class-map.js';

class WordViewer extends LitElement {
  static properties = {
    words: {},
    idx: { state: true },
    playDirection: { state: true },
  }

  static styles = css`
    :host {
      background-color: white;
      color: violet;
      cursor: pointer;
      display: block;
    }
    :host(.green){
      color: green;
    }
    pre {
      padding: 0.2em;
    }
    .backwards {
      color: white;
      background-color: violet;
    }
  `;

  constructor() {
    super();
    this.words = 'Initial value!';
    this.idx = 0;
    this.playDirection = 1;
  }

  // We use an arrow function to pass the correct component
  nextWord = () => this.idx += this.playDirection;

  switchWordDirection() {
    this.playDirection *= -1;
  }

  intervalTimer;
  connectedCallback() {
    super.connectedCallback();
    this.intervalTimer = setInterval(this.nextWord, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.intervalTimer);
    this.intervalTimer = undefined;
  }

  render() {
    const splittedWords = this.words.split('.');
    const idx = ((this.idx % splittedWords.length) + splittedWords.length) % splittedWords.length;
    const actualWord = splittedWords[idx];
    return html`
    <pre
      @click=${this.switchWordDirection}
      class="${classMap({ backwards: this.playDirection === -1 })}"
    >${actualWord}</pre>
    `;
  }
}
customElements.define('word-viewer', WordViewer);
