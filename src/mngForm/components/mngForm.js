
export default class MngForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <h1>Form!!!!</h1>
      <form>
        <input id="update-header" placeholder="Introduce el nuevo titulo:" value="" />
        <button type="submit">Change Title</button>
      </form>
    `;
  }
}
