const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const postForm = document.getElementById('post-form');
const modalContainer = document.getElementById('modal-container');
const loginButtonsContainer = document.getElementById('login-btns');
const logoutButtonsContainer = document.getElementById('logout-btns');
const signupModal = document.getElementById('signup-modal');
const loginModal = document.getElementById('login-modal');
const postModal = document.getElementById('post-modal');
const postsContainer = document.getElementById('posts');

// check if is logged in, hide login & signup buttons
const checkIfLoggedIn = () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    loginButtonsContainer.classList.add('hidden');
    logoutButtonsContainer.classList.remove('hidden');
  } else {
    loginButtonsContainer.classList.remove('hidden');
    logoutButtonsContainer.classList.add('hidden');
  }
};

checkIfLoggedIn();

// modals
const showLoginModal = () => {
  modalContainer.classList.remove('hidden');
  loginModal.classList.remove('hidden');
};

const showSignupModal = () => {
  modalContainer.classList.remove('hidden');
  signupModal.classList.remove('hidden');
};

const closeModal = () => {
  modalContainer.classList.add('hidden');
  signupModal.classList.add('hidden');
  loginModal.classList.add('hidden');
  postModal.classList.add('hidden');
};

signupForm.onsubmit = (event) => {
  event.preventDefault();
  console.log('event', event);
  const values = {};
  for (let i = 0; i < event.target.length; i++) {
    if (event.target[i].name && event.target[i].value)
      values[event.target[i].name] = event.target[i].value;
  }

  return fetch('/api/v1/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) {
        modalContainer.classList.add('hidden');
        signupModal.classList.add('hidden');
        localStorage.setItem('isLoggedIn', true);
        checkIfLoggedIn();
      }
    })
    .catch((error) => {
      // TODO: show error message
      console.log(error);
    });
};

loginForm.onsubmit = (event) => {
  event.preventDefault();
  const values = {};
  for (let i = 0; i < event.target.length; i++) {
    if (event.target[i].name && event.target[i].value)
      values[event.target[i].name] = event.target[i].value;
  }

  return fetch('/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) {
        modalContainer.classList.add('hidden');
        loginModal.classList.add('hidden');
        localStorage.setItem('isLoggedIn', true);
        checkIfLoggedIn();
      }
    })
    .catch((error) => {
      // TODO: show error message
      console.log(error);
    });
};

// logout
const logout = () => {
  localStorage.setItem('isLoggedIn', false);
  fetch('/api/v1/users/logout').then(() => {
    window.location.reload();
  });
};

const createPostComponent = (post) => {
  const container = document.createElement('div');
  const title = document.createElement('h3');
  const content = document.createElement('p');
  const votes = document.createElement('div');
  container.classList.add('post-div')
  title.innerText = post.title;
  title.classList.add('post-title');
  content.innerText = post.content;
  content.classList.add('postContent')
  container.appendChild(title);
  container.appendChild(content);
  if (post.img) {
    const img = document.createElement('img');
    img.src = post.img;
    img.classList.add('post-img');
    container.appendChild(img);
  }
  return container;
};

// posts
const getPosts = () =>
  fetch('/api/v1/posts', {
    method: 'GET'
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let postsList = document.createDocumentFragment();
      res.posts.forEach((post) => {
        postsList.appendChild(createPostComponent(post));
      });
      postsContainer.innerHTML = '';
      postsContainer.appendChild(postsList);
    });

getPosts();

const showNewPostModal = () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    modalContainer.classList.remove('hidden');
    postModal.classList.remove('hidden');
  } else {
    showLoginModal();
  }
};

const cancelPost = () => {
  // TODO: clear input values
  modalContainer.classList.add('hidden');
  postModal.classList.add('hidden');
};

postForm.onsubmit = (event) => {
  event.preventDefault();
  const values = {};
  for (let i = 0; i < event.target.length; i++) {
    if (event.target[i].name && event.target[i].value)
      values[event.target[i].name] = event.target[i].value;
  }

  return fetch('/api/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) {
        getPosts();
        modalContainer.classList.add('hidden');
        postModal.classList.add('hidden');
      }
    })
    .catch((error) => {
      // TODO: show error message
      console.log(error);
    });
};
