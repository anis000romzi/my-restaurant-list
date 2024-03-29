import UrlParser from './routes/url-parser';
import routes from './routes/routes';
import { errorTemplate } from './views/templates/error-template';

class App {
  constructor(mainElement) {
    this._content = mainElement;
  }

  async renderPage() {
    window.scrollTo(0, 0);
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch (error) {
      let errorMessage;
      if (error.message === 'Cannot read properties of undefined (reading \'render\')') {
        errorMessage = 'Page not found';
      } else {
        errorMessage = error;
      }
      this._content.innerHTML = `
        <main tabindex="0" id="pageContent">
          <section
            id="restaurant-list"
            class="restaurant-list"
            tabindex="0"
          >${errorTemplate(errorMessage)}</section>
        </main>
      `;
    }
    const skipLinkElement = document.querySelector('.skip-link');
    skipLinkElement.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#pageContent').focus();
    });
  }
}

export default App;
