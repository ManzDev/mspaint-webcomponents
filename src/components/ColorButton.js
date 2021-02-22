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
