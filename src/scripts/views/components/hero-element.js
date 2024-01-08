class HeroElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const randomImageNumber = Math.floor(Math.random() * 4) + 1;
    this._shadowRoot.innerHTML = /* HTML */ ` <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 380px;
          width: 100%;
          text-align: center;
          background-image: url("./images/heros/hero-image_${randomImageNumber}-large.jpg");
          background-position: center;
          background-color: rgb(255, 113, 113);
        }

        .hero__inner {
          color: white;
          width: 100%;
          background-color: rgba(0,0,0,0.5);
        }

        .hero__tagline {
          margin: 0 auto;
          max-width: 800px;
          font-size: 4em;
          font-weight: 300;
        }

        @media screen and (max-width: 600px) {
          .hero {
            background-image: url("./images/heros/hero-image_${randomImageNumber}-small.jpg");
          }
        }
      </style>

      <div class="hero">
        <div class="hero__inner">
          <h2 class="hero__tagline">Most Complete Restaurant Database</h2>
        </div>
      </div>`;
  }
}

customElements.define('hero-element', HeroElement);
