import { css, html, LitElement } from "lit";
import { styleMap } from "lit/directives/style-map.js";

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

  .selected {
    top: -100%;
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

  get selectedSlot() {
    return (this.__selectedSlot ??=
      this.renderRoot?.querySelector('slot[name="selected"]') ?? null);
  }

  get previousSlot() {
    return (this.__previousSlot ??=
      this.renderRoot?.querySelector('slot[name="previous"]') ?? null);
  }

  selectedInternal = 0;

  get maxSelected() {
    return this.childElementCount - 1;
  }

  hasValidSelected() {
    return this.selected >= 0 && this.selected <= this.maxSelected;
  }

  clickHandler(event) {
    const i = this.selected + (Number(!event.shiftKey) || -1);
    this.selected = i > this.maxSelected ? 0 : i < 0 ? this.maxSelected : i;
    // We fire and event describing the user action so other code easily could respond.
    const changed = new CustomEvent('change', { detail: this.selected, bubbles: true, composed: true });
    this.dispatchEvent(changed);
  }

  left = 0;
  render() {
    if (this.hasValidSelected()) {
      this.selectedInternal = this.selected;
    }

    const animateLeft = ``;
    const selectedLeft = ``;
    const previousLeft = ``;

    return html`
      <div class="fit"
        @click=${this.clickHandler}
        style=${styleMap({ left: animateLeft })}
      >
        <div class="fit" style=${styleMap({ left: previousLeft })}>
          <slot name="previous"></slot>
        </div>
        <div class="fit selected" style=${styleMap({ left: selectedLeft })}>
          <slot name="selected"></slot>
        </div>
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
    // unset old slot state
    this.selectedSlot.assignedElements()[0]?.removeAttribute('slot');
    this.previousSlot.assignedElements()[0]?.removeAttribute('slot');
    // set slots
    this.children[this.previous]?.setAttribute('slot', 'previous');
    this.children[this.selected]?.setAttribute('slot', 'selected');
  }

}
customElements.define('motion-carousel', MotionCarousel);