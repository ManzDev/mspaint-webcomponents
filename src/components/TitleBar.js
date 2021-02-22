import "./WinButton.js";

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
        background: url(/assets/mspaint.png);
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
