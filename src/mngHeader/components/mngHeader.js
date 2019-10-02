
export default class MngHeader extends HTMLElement {
  constructor() {
    super();
    this.listenerChangeTitle();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>      
      .header {
        align-items: center;
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
      }
      
      h1 {
        color: #13293D;
      }
    </style>
      <div class="header">
        <h1>Welcome to WebComponents CoP!</h1>
        <h2 id="title">Change me! I'm the title.</h2>
      </div>
    `;
  }

  listenerChangeTitle() {
    window.addEventListener('mngForm.changeTitle', (e) => {
      this.shadowRoot.querySelector('#title').innerHTML = e.detail.title;
    });
  }
}
