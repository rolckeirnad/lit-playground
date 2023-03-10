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

  render() {
    const splittedWords = this.words.split('.');
    const actualWord = splittedWords[this.idx % splittedWords.length];
    return html`
    <pre>${actualWord}</pre>
    `;
  }
}
customElements.define('word-viewer', WordViewer);
