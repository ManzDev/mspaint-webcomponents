import "./SelectedColors.js";
import "./ColorButton.js";

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
