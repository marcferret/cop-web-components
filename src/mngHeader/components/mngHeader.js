
export default class MngHeader extends HTMLElement {
  constructor() {
    super();
    this.listenerChangeTitle();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <h1 id="title">Hello!!!</h1>
    `;
  }

  listenerChangeTitle() {
    window.addEventListener('mngForm.changeTitle', (e) => {
      this.shadowRoot.querySelector('#title').innerHTML = e.detail.title;
    });
  }
}
