document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Simple client-side validation (you'll do more robust validation on the server)
    if (username.trim() === '' || password.trim() === '') {
      alert('Lütfen kullanıcı adını ve şifreyi girin.');
      return;
    }
    
    // 1. Create the request payload
    const loginData = {
      username: username,
      password: password
    };
  
    // 2. Make the fetch request
    fetch('/login', { // replace /login with actual endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // If response is successful, parse as JSON
        } else {
            throw new Error('Login failed'); // If response isn't successful, throw error
        }
    })
    .then(data => {
        // Handle successful login (e.g., redirect, update UI)
        if (data.success) { // Assuming server sends success property
          window.location.href = '/home/index.html';
        } else {
          alert('Invalid username or password'); // Or show a more specific error message
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login'); // Inform the user of the error
    });
  });
  
  