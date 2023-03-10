import { LitElement, html } from "lit";
import "./components/header.js";
import "./components/word-viewer.js";

class MyApp extends LitElement {
  render() {
    return html`
    <my-header></my-header>
    <p>Hello Lit!</p>
    <word-viewer words="👋.from.html"></word-viewer>
    `
  }
}
customElements.define('my-app', MyApp)
