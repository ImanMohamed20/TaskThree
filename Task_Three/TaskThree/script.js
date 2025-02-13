document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const name = document.getElementById("registerName").value;
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            // التحقق من عدم وجود البريد مسبقًا
            if (users.some(user => user.email === email)) {
                document.getElementById("registerMessage").innerText = "Email already registered!";
                return;
            }

            // إضافة المستخدم الجديد
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            document.getElementById("registerMessage").innerText = "Registration successful! You can now log in.";
            registerForm.reset();
        });
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "profile.html";
            } else {
                document.getElementById("loginMessage").innerText = "Invalid email or password!";
            }
        });
    }

    if (window.location.pathname.includes("profile.html")) {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            window.location.href = "index.html";
        } else {
            document.getElementById("userName").innerText = loggedInUser.name;
            document.getElementById("userEmail").innerText = loggedInUser.email;
        }

        document.getElementById("logoutButton").addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }
});
