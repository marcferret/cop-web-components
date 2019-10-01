
export default class MngHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <h1 id="title">Hello!!!</h1>
    `;
  }
}
