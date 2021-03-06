// DOM elements
const questionList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if (user) {
        // account info
        const html = `
      <div>Logged in as ${user.email}</div>
    `;
        accountDetails.innerHTML = html;
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // toggle user elements
        accountDetails.innerHTML = '';
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

// setup questions
const setupQuestions = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const question = doc.data();
            const li = `
        <li class="collection-header">
            <div><h6>${question.title}</h6></div>
        </li>

        <li class="collection-item">
            <div>${question.content}<a href="#!" class="secondary-content">
                <label>
                    <input type="checkbox"/>
                    <span>Yes</span>
                </label>
                <label>
                    <input type="checkbox"/>
                    <span>  No</span>
                </label>
            </a></div>
        </li>
      `;
            html += li;
        });
        questionList.innerHTML = html
    } else {
        questionList.innerHTML = '<h5 class="center-align">Login to attend election</h5>';
    }


};

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});