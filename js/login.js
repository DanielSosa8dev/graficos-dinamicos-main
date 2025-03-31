document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const messageElement = document.getElementById("message");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();

            if (response.ok) {
                // Guardar token y redirigir
                localStorage.setItem("token", data.token);
                showMessage("Inicio de sesión exitoso. Redirigiendo...", "success");
                
                // Redirigir después de 1.5 segundos
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                showMessage(data.error || "Error al iniciar sesión", "error");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            showMessage("Error en la conexión", "error");
        }
    });

    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = `message ${type}`;
        messageElement.style.display = "block";
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            messageElement.style.display = "none";
        }, 5000);
    }
});