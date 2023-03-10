import { css, html, LitElement } from "lit";

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
    <pre @click=${this.switchWordDirection}>${actualWord}</pre>
    `;
  }
}
customElements.define('word-viewer', WordViewer);
