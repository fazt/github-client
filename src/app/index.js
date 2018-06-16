const UI= require('./ui');
const Github = require('./github');

const { client_id, client_secret }= require('./config.json');

// Classes Initialization
const github = new Github(client_id, client_secret);
const ui = new UI();

// DOM Elements
const userForm = document.getElementById('userForm');

// DOM Events
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const textSearch = document.getElementById('textSearch').value;
  if (textSearch !== '') {
    github.fetchUser(textSearch)
      .then(data => {
        if (data.userData.message === 'Not Found') {
          ui.showMessage('User not Found', 'alert alert-danger mt-2 col-md-12');
        } else {
          // Render Profile
          ui.showProfile(data.userData);
          ui.showRepositories(data.repositories);
        }
      });
  } else {
    ui.reset();
  }
});
