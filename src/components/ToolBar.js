import "./WinButton.js";

const BUTTONS = [
  "select-star", "select-rect", "eraser", "fill", "picker", "glass", "pencil", "brush",
  "spray", "text", "line", "curve", "rect", "polyline", "circle", "rounded"
];

class ToolBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      div {
        display: flex;
        flex-wrap: wrap;
        width: 55px;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  getToolButtons() {
    const pad = number => number.toString().padStart(2, "0");
    return BUTTONS.map((name, index) =>
      `<win-button icon="${name}" style="--image: url(/assets/icon-${pad(index)}.png)"></win-button>`
    ).join("");
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div>${this.getToolButtons()}</div>
    `;
  }
}

customElements.define("tool-bar", ToolBar);
