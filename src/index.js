import { LitElement, html } from "lit";
import "./components/header.js";

class MyApp extends LitElement {
  render() {
    return html`
    <my-header></my-header>
    <p>Hello Lit!</p>
    `
  }
}
customElements.define('my-app', MyApp)
