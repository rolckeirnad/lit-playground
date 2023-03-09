import { LitElement, html } from "lit";

class MyApp extends LitElement {
  render() {
    return html`
    <p>Hello Lit!</p>
    `
  }
}
customElements.define('my-app', MyApp)
