import { LitElement, html } from "lit";
import "./components/header.js";
import "./components/word-viewer.js";
import "./components/carousel.js";

class MyApp extends LitElement {
  render() {
    return html`
    <my-header></my-header>
    <p>Hello Lit!</p>
    <word-viewer words="👋.from.html"></word-viewer>
    <h2>motion-carousel</h2>
    <motion-carousel id="carousel">
      <img src="https://picsum.photos/seed/1/200">
      <img src="https://picsum.photos/seed/2/200">
      <img src="https://picsum.photos/seed/3/200">
      <img src="https://picsum.photos/seed/4/200">
      <img src="https://picsum.photos/seed/5/200">
      <img src="https://picsum.photos/seed/6/200">
    </motion-carousel>
    `
  }
}
customElements.define('my-app', MyApp)
