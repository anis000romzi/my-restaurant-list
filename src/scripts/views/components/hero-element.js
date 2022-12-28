class HeroElement extends HTMLElement {
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

    .hero {
        display: flex;
        align-items: center;
        min-height: 380px;
        width: 100%;
        text-align: center;
        background-image: url("./images/heros/hero-image_4-large.jpg");
        background-position: center;
        background-color: #2596be;
    }
  
    .hero__inner {
        margin: 0 auto;
        max-width: 800px;
    }
  
    .hero__tagline {
        color: #fff;
        margin-top: 16px;
        font-size: 4em;
        font-weight: 300;
    }

    @media screen and (max-width: 600px) {
      .hero {
        background-image: url("./images/heros/hero-image_4-small.jpg");
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
