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
    }
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
    })
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
