// Get sections for different views
const loginSection = document.getElementById('loginSection');
const forgotPasswordSection = document.getElementById('forgotPasswordSection');
const registerSection = document.getElementById('registerSection');

// Simulated user roles for demonstration
const users = {
    admin: {
        password: 'admin123',
        role: 'admin',
    },
    user: {
        password: 'password123',
        role: 'user',
    },
};

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    // Check if the user exists in the simulated user database
    if (users[username] && users[username].password === password) {
        const role = users[username].role;

        // Check the role of the user
        if (role === 'admin') {
            alert('Đăng nhập thành công! Chào mừng ADMIN.');
            window.location.href = '/kho-tong.html'; // Redirect to central warehouse page
        } else {
            alert('Đăng nhập thành công! Chào mừng USER.');
            loginSection.classList.add('hidden');
        }
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});

// Forgot password toggle visibility
document.getElementById('forgotPasswordButton')?.addEventListener('click', function () {
    forgotPasswordSection.classList.toggle('hidden');
});

// Handle forgot password functionality
document.getElementById('forgotPasswordForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('forgotUsername').value.trim().toLowerCase();
    const newPasswordForgot = document.getElementById('newPasswordForgot').value;
    const confirmPasswordForgot = document.getElementById('confirmPasswordForgot').value;
    const message = document.getElementById('forgotPasswordMessage');

    if (!users[username]) {
        message.textContent = 'Người dùng không tồn tại!';
        message.classList.remove('hidden');
        return;
    }

    if (newPasswordForgot !== confirmPasswordForgot) {
        message.textContent = 'Mật khẩu mới và xác nhận mật khẩu không khớp!';
        message.classList.remove('hidden');
        return;
    }

    // Update password in the simulated database
    users[username].password = newPasswordForgot;

    alert('Mật khẩu đã được đổi thành công!');
    message.textContent = 'Mật khẩu đã được thay đổi thành công!';
    message.classList.remove('hidden');

    document.getElementById('forgotPasswordForm').reset();
});

// Register functionality
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const message = document.getElementById('registerMessage');

    if (users[username]) {
        message.textContent = 'Tên đăng nhập đã tồn tại!';
        message.classList.remove('hidden');
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = 'Mật khẩu và xác nhận mật khẩu không khớp!';
        message.classList.remove('hidden');
        return;
    }

    // Add the new user to the simulated database
    users[username] = { password, role: 'user' };

    alert(`Đăng ký thành công với tài khoản: ${username}`);
    message.textContent = 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.';
    message.classList.remove('hidden');

    document.getElementById('registerForm').reset();




    const express = require('express');
    const app = express();

    // Serve static files from the 'Public' folder
    app.use(express.static('Public'));

    // Routes (example route to serve your HTML file)
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    // Start the server
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });

});

