export default class MngForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <h3>Change the title here</h3>
      <input id="updateHeader" placeholder="What's the new title?" value="" />
      <button id="updateHeaderButton">Change Title</button>
    `;
    this.changeTitle();
  }

  changeTitle() {
    const { shadowRoot } = this;

    shadowRoot.querySelector('#updateHeaderButton').addEventListener('click', () => {
      const inputValue = shadowRoot.querySelector('#updateHeader').value;
      const changeTitleEvent = new CustomEvent('mngForm.changeTitle', { detail: { title: inputValue } });
      window.dispatchEvent(changeTitleEvent);
    });
  }
}
