import { html, LitElement } from "lit";

class WordViewer extends LitElement {
  static properties = {
    words: {},
    idx: { state: true },
  }

  constructor() {
    super();
    this.words = 'Initial value!';
    this.idx = 0;
  }

  // We use an array function to pass the correct component
  nextWord = () => this.idx += 1;

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
    const actualWord = splittedWords[this.idx % splittedWords.length];
    return html`
    <pre>${actualWord}</pre>
    `;
  }
}
customElements.define('word-viewer', WordViewer);
