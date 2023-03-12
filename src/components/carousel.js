import { css, html, LitElement } from "lit";

export class MotionCarousel extends LitElement {
  static styles = css`
  :host {
    display: inline-block;
    overflow: hidden;
    position: relative;
    /* Defaults */
    width: 200px;
    height: 200px;
    border-radius: 4px;
    background: gainsboro;
    cursor: pointer;
  }

  .fit {
    position: relative;
    height: 100%;
    width: 100%;
  }

  ::slotted(*) {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  `
  static properties = {
    selected: { type: Number },
  }

  constructor() {
    super();
    this.selected = 0;
  }

  selectedInternal = 0;

  get maxSelected() {
    return this.childElementCount - 1;
  }

  hasValidSelected() {
    return this.selected >= 0 && this.selected <= this.maxSelected;
  }

  render() {
    if (this.hasValidSelected()) {
      this.selectedInternal = this.selected;
    }

    return html`
      <div class="fit">
        <slot name="selected"></slot>
      </div>
    `;
  }

  // We need to remove the slot attribute from the previous assigned child.
  previous = 0;

  // This is a lifecycle method.
  updated(changedProperties) {
    // If the selected value is valid, we update slot and previous value.
    if (changedProperties.has('selected') && this.hasValidSelected()) {
      this.updateSlots();
      this.previous = this.selected;
    }
  }

  // We need to match the slot attribute with the slot name
  updateSlots() {
    this.children[this.previous]?.removeAttribute('slot');
    this.children[this.selected]?.setAttribute('slot', 'selected');
  }

}
customElements.define('motion-carousel', MotionCarousel);