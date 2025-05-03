document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const resultDiv = document.getElementById("result");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Простая клиентская валидация
            if (!username || !password) {
                resultDiv.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        Пожалуйста, заполните все поля.
                    </div>`;
                return;
            }
            try {
                const response = await fetch("http://localhost:5127/api/AdminAuth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ Login: username, Password: password })
                });

                let data;
                try {
                    data = await response.json();
                } catch (jsonError) {
                    console.error("Ошибка парсинга JSON:", jsonError);
                    throw new Error("Неверный формат ответа от сервера.");
                }

                if (response.ok) {
                    resultDiv.innerHTML = `
                        <div class="alert alert-success" role="alert">
                            ${data.message}
                        </div>`;
                    // Очистка формы
                    loginForm.reset();
                } else {
                    resultDiv.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            ${data.message || "Ошибка авторизации"}
                        </div>`;
                }
            } catch (error) {
                console.error("Ошибка запроса:", error);
                resultDiv.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Произошла ошибка при подключении к серверу.
                    </div>`;
            }
        });
    }
});