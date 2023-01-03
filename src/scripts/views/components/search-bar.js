class SearchBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  _fontAwesomeLoader() {
    const fontAwesomeScript = document.querySelector(
      'script[src*="fontawesome"]',
    );

    const id = setInterval(() => {
      const fontAwesomeFont = document.querySelector('#fa-v5-font-face');
      const fontAwesomeMain = document.querySelector('#fa-main');
      if (fontAwesomeScript && fontAwesomeFont && fontAwesomeMain) {
        this._shadowRoot.appendChild(fontAwesomeScript.cloneNode());
        this._shadowRoot.appendChild(fontAwesomeFont.cloneNode('deep'));
        this._shadowRoot.appendChild(fontAwesomeMain.cloneNode('deep'));
        clearInterval(id);
      }
    }, 200);
  }

  _searchRestaurant() {
    const searchButton = this._shadowRoot.querySelector('#searchButton');
    searchButton.addEventListener('click', () => {
      const searchInput = this._shadowRoot.querySelector('#searchInput').value;
      window.location.href = `#/search/${searchInput}`;
      console.log(searchInput);
    });
  }

  connectedCallback() {
    this._fontAwesomeLoader();
    this.render();
    this._searchRestaurant();
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
          display: flex;
          position: sticky;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          top: 0;
          z-index: 2;
      }
      
      .search__form-control {
        flex: auto;
        padding: 1em 0.5em;
        background-color: #f3f3f3;
        border: solid 0px;
        min-width: 44px;
        min-height: 44px;
        margin: 5px 2px 5px 0px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      }
        
      .search__form-button {
        border: rgb(255, 113, 113) 1px solid;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        padding: 1em 1.1em;
        color: rgb(255, 113, 113);
        background-color: #fff;
        margin: 5px 0px;
      }

      .search__form-button:hover {
        color: #fff;
        background-color: rgb(255, 113, 113);
      }

      @media screen and (min-width: 712px) {
          :host {
            width: 80%;
          }
      }

      @media screen and (min-width: 850px) {
          :host {
            width: 70%;
          }
      }

      
      @media screen and (min-width: 900px) {
          :host {
          position: fixed;
          top: 12%;
          width: 60%;
          }
      }

      @media screen and (min-width: 1000px) {
        :host {
        position: fixed;
        top: 12%;
        width: 50%;
        }
      }
    </style>

    <input id="searchInput" type="text" class="search__form-control" placeholder="Search by name or categories">
    <button id="searchButton" class="search__form-button">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
    `;
  }
}

customElements.define('search-bar', SearchBar);
