document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const messageElement = document.getElementById("message");

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });
            
            const data = await response.json();

            if (response.ok) {
                showMessage(data.message || "Registro exitoso. Redirigiendo al login...", "success");
                
                // Limpiar formulario
                registerForm.reset();
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                showMessage(data.error || "Error en el registro", "error");
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