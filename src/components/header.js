import { LitElement, html } from "lit";

export class MyHeader extends LitElement {
  render() {
    return html`
    <h1>This is your header</h1>
    `
  }
}
customElements.define('my-header', MyHeader)