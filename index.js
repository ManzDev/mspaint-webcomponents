class WinButton extends HTMLElement {
  constructor() {
    super();
    this.icon = this.getAttribute("icon");
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      div {
        background-color: var(--bgcolor-app);
        background-repeat: no-repeat;
        border: 2px outset #fff;
        width: 16px;
        height: 12px;
      }

      .minimize, .maximize, .close {
        background-image: url(../assets/win95.png);
        margin: 0 1px;
        width: 15px;
        border-width: 1px;
        border-bottom-color: #ccc;
        border-right-color: #ccc;
      }

      .close {
        margin-left: 2px;
      }

      .select-star,
      .select-rect,
      .eraser,
      .fill,
      .picker,
      .glass,
      .pencil,
      .brush,
      .spray,
      .text,
      .line,
      .curve,
      .rect,
      .polyline,
      .circle,
      .rounded {
        --border-size: 1px;

        background-image: var(--image);
        background-position: center;
        width: 20px;
        height: 20px;
        padding: 1px;
        border: 1px solid #fff;
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
      }

      div:active {
        border: var(--border-size, 1px) inset #fff;
      }

      .minimize { background-position: 2px 1px; }
      .maximize { background-position: -15px 1px; }
      .close { background-position: -31px 1px; }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="${this.icon}"></div>
    `;
  }
}

customElements.define("win-button", WinButton);

class TitleBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      .titlebar {
        background: var(--titlebar-color);
        font-family: Arial;
        font-weight: bold;
        font-size: 13px;
        padding: 2px 4px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .titlebar > div {
        display: flex;
      }

      .title {
        width: 100%;
        margin-left: 4px;
      }

      .control {
        width: 58px;
      }

      .icon {
        width: 16px;
        height: 16px;
        background: url(../assets/mspaint.png);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="titlebar">
        <div class="icon"></div>
        <div class="title">Untitled - Paint</div>
        <div class="control">
          <win-button icon="minimize">_</win-button>
          <win-button icon="maximize">[]</win-button>
          <win-button icon="close">X</win-button>
        </div>
      </div>
    `;
  }
}

customElements.define("title-bar", TitleBar);

class MenuBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      :host {
        display: flex;
        font-family: Arial;
        font-size: 12px;
      }

      div {
        padding: 4px 4px;
      }

      div:hover {
        background: var(--titlebar-color);
        color: #fff;
      }

      span {
        text-decoration: underline;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div><span>F</span>ile</div>
      <div><span>E</span>dit</div>
      <div><span>V</span>iew</div>
      <div><span>I</span>mage</div>
      <div><span>O</span>ptions</div>
      <div><span>H</span>elp</div>
    `;
  }
}

customElements.define("menu-bar", MenuBar);

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
      `<win-button icon="${name}" style="--image: url(../assets/icon-${pad(index)}.png)"></win-button>`
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

class FillBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      .rect {
        border: 1px inset #fff;
        width: 42px;
        height: 48px;
        margin: 4px 2px;
      }

      .empty,
      .full {
        width: 42px;
        height: 26px;
        padding: 2px 0;
        background: url(../assets/fillgeom.png) no-repeat 0 center;
      }

      .full {
        background-position: -45px center;
      }

      .selected {
        background-color: var(--titlebar-color);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div class="rect">
        <div class="empty"></div>
        <div class="full selected"></div>
      </div>
    `;
  }
}

customElements.define("fill-bar", FillBar);

class PaintCanvas extends HTMLElement {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.isDrawing = false;
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      :host {
        width: 100%;
        height: 350px;
        margin-right: 2px;
        border: 2px inset #fff;
        border-top-color: #999;
        border-left-color: #999;
        background: var(--canvas-bgcolor);
      }

      .canvas {
        margin: 4px;
        width: 650px;
        height: 300px;
        background: #fff;
        cursor: crosshair;
        position: relative;
      }
    `;
  }

  prepareCanvas() {
    const canvas = this.shadowRoot.querySelector(".canvas");
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 1;
    const setMouseCoords = ev => {
      this.x = ev.clientX - canvas.getBoundingClientRect().left;
      this.y = ev.clientY - canvas.getBoundingClientRect().top;
    };
    canvas.addEventListener("mousemove", ev => {
      setMouseCoords(ev);
      this.dispatchEvent(new CustomEvent("NEW_COORDS", {
        detail: { x: this.x, y: this.y },
        bubbles: true,
        composed: true
      }));
      if (this.isDrawing) {
        context.lineTo(this.x, this.y);
        context.stroke();
      }
    });
    canvas.addEventListener("mousedown", ev => {
      setMouseCoords(ev);
      this.isDrawing = true;
      context.beginPath();
      context.moveTo(this.x, this.y);
    });
    canvas.addEventListener("mouseup", ev => {
      setMouseCoords(ev);
      this.isDrawing = false;
    });
  }

  connectedCallback() {
    this.render();
    this.prepareCanvas();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <canvas class="canvas" width="650" height="300"></canvas>
    `;
  }
}

customElements.define("paint-canvas", PaintCanvas);

class ColorButton extends HTMLElement {
  constructor() {
    super();
    this.color = this.getAttribute("color") || "#000000";
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      div {
        border: 1px inset #fff;
        border-top-color: #999;
        border-left-color: #999;
        box-shadow: 1px 1px 0 var(--shadow-color, rgba(0,0,0, 0.5)) inset;
        background-color: var(--color);
        width: 14px;
        height: 14px;
        margin: 1px;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div style="--color: ${this.color}"></div>
    `;
  }
}

customElements.define("color-button", ColorButton);

class SelectedColors extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      div {
        --shadow-color: rgba(150, 150, 150, 0.5);

        border: 1px inset #fff;
        border-top-color: #999;
        border-left-color: #999;
        box-shadow: 1px 1px 0 rgba(0,0,0, 0.5) inset;
        width: 32px;
        height: 32px;
        background: #d8dad9;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .foreground {
        transform: translate(5px, -4px) scale(-1);
        z-index: 1;
      }
      .background {
        transform: translate(-5px, 4px) scale(-1);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      <div>
        <color-button class="foreground" color="#000000"></color-button>
        <color-button class="background" color="#ffffff"></color-button>
      </div>
    `;
  }
}

customElements.define("selected-colors", SelectedColors);

const PALETTE = [
  "#000000", "#847a7b", "#810102", "#78830b", "#0a840b", "#008571", "#080683", "#83037e", "#7c812f", "#084e46", "#0c79f2", "#0d3f72",
  "#3c00f4", "#864410", "#ffffff", "#c4bbbc", "#f30200", "#fffe0a", "#0ef900", "#0afefe", "#0604ed", "#fe00fc", "#f4f283", "#00f673",
  "#6ff6f2", "#7a7eff", "#fc0884", "#ee8253"
];

class PaletteBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      :host {
        padding-top: 8px;
        padding-left: 2px;
        display: flex;
      }
      div {
        margin-left: 2px;
        display: grid;
        grid-template-columns: repeat(14, 17px);
        grid-template-rows: repeat(2, 17px);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  getPalette() {
    return PALETTE.map(color => `<color-button color="${color}"></color-button>`).join("");
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>

      <selected-colors></selected-colors>
      <div>${this.getPalette()}</div>
    `;
  }
}

customElements.define("palette-bar", PaletteBar);

class StatusBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get styles() {
    return `
      .status-bar {
        display: flex;
        font-family: Arial;
        font-size: 11px;
      }
      .status-bar > div {
        border: 1px inset #fff;
        margin: 2px;
        padding-left: 2px;
        padding-top: 4px;
        padding-bottom: 1px;
      }
      .message-bar {
        width: 100%;
      }
      .coords-bar {
        width: 130px;
        background: url(../assets/coords.png) no-repeat;
        text-indent: 16px;
      }
      .resize-bar {
        width: 130px;
        background: url(../assets/resize.png) no-repeat;
        text-indent: 16px;
      }
      .status-bar .icon-resize {
        border: 0;
        width: 16px;
        background: repeating-linear-gradient(-45deg, #ddd 0 1px, #888 2px 3px);
        clip-path: polygon(0 100%, 100% 20%, 100% 100%);
      }
      a {
        color: #001ad2;
        text-decoration: none;
      }
      a:hover {
        color: #cc0c0c;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  updateCoords(data) {
    const coordsBar = this.shadowRoot.querySelector(".coords-bar");
    coordsBar.textContent = `${data.detail.x}, ${data.detail.y}`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>

      <div class="status-bar">
        <div class="message-bar">
          Microsoft Paint (Windows 95) by <a href="https://twitter.com/Manz">Manz</a> with <a href="https://lenguajejs.com/webcomponents/">WebComponents</a> -
          <a href="https://manz.dev">manz.dev</a>
        </div>
        <div class="coords-bar">0, 0</div>
        <div class="resize-bar"></div>
        <div class="icon-resize"></div>
      </div>
    `;
  }
}

customElements.define("status-bar", StatusBar);

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
