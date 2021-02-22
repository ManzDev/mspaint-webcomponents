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
