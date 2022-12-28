const errorTemplate = (errorMessage) => `
    <div id="errorContainer">
        <h2 id="errorTitle">${errorMessage}</h2>
        <p id="errorIcon">(┬┬﹏┬┬)</p>
    </div>
`;

const errorReviewTemplate = (errorMessage) => `
    <div class="restaurant-detail__review__item">
        <div class="content">
            <span>Error!</span>
            <p>${errorMessage}</p>
        </div>
        <small>( ${'´'}･･)ﾉ(._.${'`'})</small>
    </div>
`;

export { errorTemplate, errorReviewTemplate };
