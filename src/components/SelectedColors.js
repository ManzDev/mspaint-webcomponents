import "./ColorButton.js";

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
