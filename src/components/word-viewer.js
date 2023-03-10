import { html, LitElement } from "lit";

class WordViewer extends LitElement {
  static properties = {
    words: {},
  }

  constructor() {
    super();
    this.words = 'Initial value!';
  }

  render() {
    return html`
    <pre>${this.words}</pre>
    `;
  }
}
customElements.define('word-viewer', WordViewer);
