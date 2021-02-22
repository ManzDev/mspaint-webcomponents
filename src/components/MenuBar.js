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
