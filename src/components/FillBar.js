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
