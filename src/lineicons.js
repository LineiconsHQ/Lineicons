import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { svgMap } from "./svg-map.js";

class LineIcon extends LitElement {
  static properties = {
    name: { type: String },
    type: { type: String },
    styleString: { type: String, attribute: "style" },
  };

  static styles = css`
    :host {
      display: inline-block;
      width: 24px;
      height: 24px;
      color: currentColor; /* Use inherited color */
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor; /* Set default fill to currentColor */
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.type = "regular"; // Default type if not specified
    this.styleString = "";
  }

  render() {
    let svgContent = svgMap[this.type]?.[this.name];

    if (!svgContent) {
      console.error(`Icon "${this.name}" not found in ${this.type} type!`);
      return html`<div>Icon not found</div>`;
    }

    // Replace any fill attributes in the SVG content with `currentColor`
    svgContent = svgContent.replace(/fill="[^"]*"/g, 'fill="currentColor"');

    return html`
      <div style=${this.styleString}>${unsafeHTML(svgContent)}</div>
    `;
  }
}

customElements.define("line-icon", LineIcon);
