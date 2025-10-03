// Get sections for different views
const loginSection = document.getElementById('loginSection');
const forgotPasswordSection = document.getElementById('forgotPasswordSection');
const registerSection = document.getElementById('registerSection');

// Simulated user roles for demonstration
const users = {
    admin: { password: 'admin123', role: 'admin' },
    user: { password: 'password123', role: 'user' },
};

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        const role = users[username].role;
        if (role === 'admin') {
            alert('Đăng nhập thành công! Chào mừng ADMIN.');
            window.location.href = '/kho-tong.html';
        } else {
            alert('Đăng nhập thành công! Chào mừng USER.');
            loginSection.classList.add('hidden');
        }
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});

// Forgot password toggle
document.getElementById('forgotPasswordButton')?.addEventListener('click', () => {
    forgotPasswordSection.classList.toggle('hidden');
});

// Forgot password submit
document.getElementById('forgotPasswordForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('forgotUsername').value.trim().toLowerCase();
    const newPass = document.getElementById('newPasswordForgot').value;
    const confirmPass = document.getElementById('confirmPasswordForgot').value;
    const message = document.getElementById('forgotPasswordMessage');

    if (!users[username]) {
        message.textContent = 'Người dùng không tồn tại!';
        message.classList.remove('hidden');
        return;
    }
    if (newPass !== confirmPass) {
        message.textContent = 'Mật khẩu mới và xác nhận mật khẩu không khớp!';
        message.classList.remove('hidden');
        return;
    }
    users[username].password = newPass;
    alert('Mật khẩu đã được đổi thành công!');
    message.textContent = 'Mật khẩu đã được thay đổi thành công!';
    message.classList.remove('hidden');
    document.getElementById('forgotPasswordForm').reset();
});

// Register submit
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirmPassword').value;
    const message = document.getElementById('registerMessage');

    if (users[username]) {
        message.textContent = 'Tên đăng nhập đã tồn tại!';
        message.classList.remove('hidden');
        return;
    }
    if (password !== confirm) {
        message.textContent = 'Mật khẩu và xác nhận mật khẩu không khớp!';
        message.classList.remove('hidden');
        return;
    }
    users[username] = { password, role: 'user' };
    alert(`Đăng ký thành công với tài khoản: ${username}`);
    message.textContent = 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.';
    message.classList.remove('hidden');
    document.getElementById('registerForm').reset();
});
