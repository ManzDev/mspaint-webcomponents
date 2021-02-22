import "./TitleBar.js";
import "./MenuBar.js";
import "./ToolBar.js";
import "./FillBar.js";
import "./PaintCanvas.js";
import "./PaletteBar.js";
import "./StatusBar.js";

class MspaintApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      * {
        cursor: default;
        user-select: none;
      }
      .mspaint {
        display: flex;
        flex-direction: column;
        border: 2px outset #fff;
        width: var(--app-width);
        height: var(--app-height);
        background: var(--bgcolor-app);
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      }

      .left-bar {
        border-top: 1px inset #ddd;
        border-bottom: 1px inset #999;
        box-shadow: 0 1px 0 #fff;
        padding-left: 5px;
      }

      .mspaint > div {
        display: flex;
      }
    `;
  }

  connectedCallback() {
    this.render();
    const statusBar = this.shadowRoot.querySelector("status-bar");
    this.addEventListener("NEW_COORDS", data => statusBar.updateCoords(data));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="mspaint">
        <title-bar></title-bar>
        <menu-bar></menu-bar>
        <div>
          <div class="left-bar">
            <tool-bar></tool-bar>
            <fill-bar></fill-bar>
          </div>
          <paint-canvas></paint-canvas>
        </div>
        <palette-bar></palette-bar>
        <status-bar></status-bar>
      </div>
    `;
  }
}

customElements.define("mspaint-app", MspaintApp);
