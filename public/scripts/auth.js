// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('questions').onSnapshot(snapshot => {
        setupQuestions(snapshot.docs);
        setupUI(user);
      }, err => console.log(err.message));
    } else {
      setupUI();
      setupQuestions([]);
    }
  });

  // create new question
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('questions').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});
  
// signup
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
      signupForm.querySelector('.error').innerHTML = err.message;
    });
  });
  
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    console.log("User Logged out")
    e.preventDefault();
    auth.signOut();
  });

  // logout_mobile
  const mobileLogout = document.querySelector('#logout_mobile');
  mobileLogout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
      loginForm.querySelector('.error').innerHTML = err.message;
    })
  });