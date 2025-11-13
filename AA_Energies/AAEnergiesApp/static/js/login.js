/********** LOGIN & SETTINGS (Compatible con Django i18n - ACTUALIZADO) **********/
document.addEventListener("DOMContentLoaded", () => {
  // ================== STORAGE KEYS ==================
  const THEME_STORAGE_KEY = "theme";

  // ================== CSRF TOKEN HELPER ==================
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrftoken = getCookie("csrftoken");

  // ================== ELEMENTS ==================
  const loginForm = document.getElementById("loginForm");
  const alertMessage = document.getElementById("alertMessage");
  const usernameField = document.getElementById("username");
  const passwordField = document.getElementById("password");
  const settingsPopup = document.getElementById("settingsPopup");
  const settingsToggle = document.querySelector(".settings-toggle");
  const closePopup = document.getElementById("closePopup");
  const themeToggle = document.getElementById("themeToggle");
  const langButtons = document.querySelectorAll(".lang-btn");
  const loginCSS = document.getElementById("loginStylesheet");
  const ajustesCSS = document.getElementById("ajustesStylesheet");

  // ================== LANGUAGE (desde Django) ==================
  const currentLang = window.CURRENT_LANGUAGE || "es";

  // Marcar botón de idioma activo
  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  // ================== MENSAJES DE ERROR/ÉXITO ==================
  const messages = {
    en: {
      loginSuccess: "Login successful",
      loginError: "Incorrect username or password",
      serverError: "Server error. Please try again.",
    },
    es: {
      loginSuccess: "Inicio de sesión correcto",
      loginError: "Usuario o contraseña incorrectos",
      serverError: "Error del servidor. Inténtalo de nuevo.",
    },
    eu: {
      loginSuccess: "Saioa hasi da",
      loginError: "Erabiltzaile edo pasahitz okerra",
      serverError: "Zerbitzari errorea. Saiatu berriro.",
    },
  };
  const t = messages[currentLang] || messages.es;

  // ================== LOGIN SUBMIT ==================
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    // Limpiar estados previos
    usernameField.classList.remove("invalid");
    passwordField.classList.remove("invalid");
    alertMessage.className = "alert-message";
    alertMessage.textContent = "";

    // Validación básica
    if (!username || !password) {
      alertMessage.className = "alert-message error show";
      alertMessage.textContent = t.loginError;
      if (!username) usernameField.classList.add("invalid");
      if (!password) passwordField.classList.add("invalid");
      return;
    }

    try {
      const response = await fetch(`/${currentLang}/login_api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Guardar rol y usuario en localStorage
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("username", data.username);

        // Mostrar en consola
        console.log(`Usuario '${data.username}' ha iniciado sesión con rol: ${data.rol}`);

        // Mostrar mensaje de éxito
        alertMessage.className = "alert-message success show";
        alertMessage.textContent = t.loginSuccess;

        setTimeout(() => {
          window.location.href = `/${currentLang}/dashboard/`;
        }, 1000);
      } else {
        alertMessage.className = "alert-message error show";
        alertMessage.textContent = t.loginError;
        usernameField.classList.add("invalid");
        passwordField.classList.add("invalid");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alertMessage.className = "alert-message error show";
      alertMessage.textContent = t.serverError;
    }
  });

  // ================== SETTINGS POPUP ==================
  settingsToggle?.addEventListener("click", () => {
    settingsPopup.classList.add("show");
    document.body.classList.add("no-scroll");
  });

  const closeSettings = () => {
    settingsPopup.classList.remove("show");
    document.body.classList.remove("no-scroll");
  };

  closePopup?.addEventListener("click", closeSettings);
  settingsPopup?.addEventListener("click", (e) => {
    if (e.target === settingsPopup) closeSettings();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && settingsPopup.classList.contains("show")) {
      closeSettings();
    }
  });

  // ================== LANGUAGE SWITCH ==================
  langButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const selectedLang = btn.dataset.lang;
      if (selectedLang === currentLang) return;

      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/(es|en|eu|fr|de)\//, `/${selectedLang}/`);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/i18n/setlang/";
      form.style.display = "none";

      const csrfInput = document.createElement("input");
      csrfInput.type = "hidden";
      csrfInput.name = "csrfmiddlewaretoken";
      csrfInput.value = csrftoken;

      const langInput = document.createElement("input");
      langInput.type = "hidden";
      langInput.name = "language";
      langInput.value = selectedLang;

      const nextInput = document.createElement("input");
      nextInput.type = "hidden";
      nextInput.name = "next";
      nextInput.value = newPath;

      form.append(csrfInput, langInput, nextInput);
      document.body.appendChild(form);
      form.submit();
    });
  });

  // ================== THEME SWITCH ==================
  const applyTheme = (theme) => {
    const isLight = theme === "light";
    if (themeToggle) themeToggle.checked = isLight;

    if (loginCSS) {
      loginCSS.href = isLight
        ? "/static/css/Light/Login_light.css"
        : "/static/css/Dark/Login_dark.css";
    }
    if (ajustesCSS) {
      ajustesCSS.href = isLight
        ? "/static/css/Light/Settings_light.css"
        : "/static/css/Dark/Settings_dark.css";
    }

    document.body.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("dark-mode", !isLight);
  };

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  applyTheme(savedTheme);

  themeToggle?.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  });

  // ================== ACCESIBILIDAD ==================
  settingsPopup?.addEventListener("keydown", (e) => {
    if (!settingsPopup.classList.contains("show")) return;

    if (e.key === "Tab") {
      const focusableElements = settingsPopup.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
});
