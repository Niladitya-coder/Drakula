function showLoginForm(type) {
    document.getElementById('option-selection').style.display = 'none';
    document.getElementById(`${type}-login`).style.display = 'block';
}

function showOptions() {
    document.getElementById('option-selection').style.display = 'flex';
    document.getElementById('donor-login').style.display = 'none';
    document.getElementById('hospital-login').style.display = 'none';
}

function handleDonorLogin(event) {
    event.preventDefault();
    const email = document.getElementById('donor-email').value;
    const password = document.getElementById('donor-password').value;
    
    // Create request data
    const requestData = {
        type: 'donor',
        email: email,
        password: password
    };
    
    // Send login request to PHP backend
    fetch('../php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store user data in localStorage for client-side access
            localStorage.setItem('user_id', data.user.id);
            localStorage.setItem('user_name', data.user.name);
            localStorage.setItem('user_email', data.user.email);
            localStorage.setItem('user_type', data.user.type);
            
            // Redirect to dashboard
            window.location.href = data.redirect;
        } else {
            // Show error message
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    });
}

function handleHospitalLogin(event) {
    event.preventDefault();
    const email = document.getElementById('hospital-email').value;
    const password = document.getElementById('hospital-password').value;
    
    // Create request data
    const requestData = {
        type: 'hospital',
        email: email,
        password: password
    };
    
    // Send login request to PHP backend
    fetch('../php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store user data in localStorage for client-side access
            localStorage.setItem('user_id', data.user.id);
            localStorage.setItem('user_name', data.user.name);
            localStorage.setItem('user_email', data.user.email);
            localStorage.setItem('user_type', data.user.type);
            
            // Redirect to dashboard
            window.location.href = data.redirect;
        } else {
            // Show error message
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    });
}