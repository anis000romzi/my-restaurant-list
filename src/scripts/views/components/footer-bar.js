class FooterBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    :host {
        background-color: rgb(255, 113, 113);
        width: 100%;
        text-align: center;
        font-weight: 800;
        font-size: 1.15em;
        color: white;
        clear: both;
        position: relative;
        bottom: 0;
      }
    </style>

    Copyright© 2022 - My Restaurant List`;
  }
}

customElements.define('footer-bar', FooterBar);
