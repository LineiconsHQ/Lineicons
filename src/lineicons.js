import { LitElement, css, html } from "lit";
import { svgMap } from "./svg-map.js"; // Import your generated svgMap

class LineIcon extends LitElement {
  static properties = {
    name: { type: String },
    type: { type: String, attribute: "type" }, // e.g., regular or sharp
    variant: { type: String, attribute: "variant" }, // e.g., outlined, solid, two-tone, stroke, bulk
    styleString: { type: String, attribute: "style" },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 24px;
      height: 24px;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  constructor() {
    super();
    this.name = ""; // The name of the icon (e.g., 'adobe')
    this.type = "regular"; // Default type
    this.variant = "outlined"; // Default variant
    this.styleString = "";
  }

  render() {
    const svgContent = svgMap[this.type]?.[this.variant]?.[this.name] || "";

    return html`
      <div style=${this.styleString}>
        ${svgContent ? html([svgContent]) : html`<span>Icon not found</span>`}
      </div>
    `;
  }
}

customElements.define("line-icon", LineIcon);
