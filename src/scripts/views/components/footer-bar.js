class FooterBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = /* HTML */ ` <style>
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

      Copyright© ${new Date().getFullYear()} - My Restaurant List`;
  }
}

customElements.define('footer-bar', FooterBar);
