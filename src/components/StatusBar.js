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
