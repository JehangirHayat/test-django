// ===============================
// DASHBOARD SETTINGS.JS (Vanilla JS con i18n Django - CORREGIDO)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // CSRF TOKEN HELPER
  // ===============================
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // ===============================
  // ELEMENTOS Y VARIABLES
  // ===============================
  const dashboardPopup = document.getElementById('dashboardSettingsPopup');
  const btnAjustes = document.getElementById('btnAjustes');
  const closeDashboardSettings = document.getElementById('closeDashboardSettings');
  const themeToggle = document.getElementById('dashboardThemeToggle');
  const langButtons = document.querySelectorAll('.lang-btn');
  const dashboardCSS = document.querySelector('link[href*="Dashboard_"]');
  const settingsCSS = document.querySelector('link[href*="Dashboard_settings_"]');
  const logoImg = document.getElementById('dashboardLogo');

  // Variables de Django (inyectadas desde el template)
  const currentLang = window.CURRENT_LANGUAGE || "es";
  const csrftoken = window.CSRF_TOKEN || getCookie("csrftoken");
  const THEME_STORAGE_KEY = "theme";

  // ===============================
  // POPUP DE AJUSTES
  // ===============================
  const openSettingsPopup = () => {
    dashboardPopup.classList.add('show');
    document.body.classList.add('no-scroll');
  };
  const closeSettingsPopup = () => {
    dashboardPopup.classList.remove('show');
    document.body.classList.remove('no-scroll');
  };

  btnAjustes?.addEventListener('click', openSettingsPopup);
  closeDashboardSettings?.addEventListener('click', closeSettingsPopup);
  dashboardPopup?.addEventListener('click', (e) => {
    if (e.target === dashboardPopup) closeSettingsPopup();
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dashboardPopup?.classList.contains('show')) {
      closeSettingsPopup();
    }
  });

  // ===============================
  // CAMBIO DE IDIOMA (Django i18n)
  // ===============================
  // Marcar el idioma activo según CURRENT_LANGUAGE
  langButtons.forEach(btn => {
    const lang = btn.dataset.lang;
    if (lang === currentLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }

    // Cambiar idioma al hacer clic
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const selectedLang = this.dataset.lang;
      if (selectedLang === currentLang) return;

      const currentPath = window.location.pathname;
      // reemplazar el prefijo del idioma (ajusta los idiomas si tienes más)
      const newPath = currentPath.replace(/^\/(es|en|eu|fr|de)\//, `/${selectedLang}/`);

      // Crear formulario oculto para /i18n/setlang/
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/i18n/setlang/';
      form.style.display = 'none';

      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = 'csrfmiddlewaretoken';
      csrfInput.value = csrftoken;

      const langInput = document.createElement('input');
      langInput.type = 'hidden';
      langInput.name = 'language';
      langInput.value = selectedLang;

      const nextInput = document.createElement('input');
      nextInput.type = 'hidden';
      nextInput.name = 'next';
      nextInput.value = newPath;

      form.append(csrfInput, langInput, nextInput);
      document.body.appendChild(form);
      form.submit();
    });
  });

  // ===============================
  // CAMBIO DE TEMA
  // ===============================
  const applyTheme = (theme) => {
    const isLight = theme === "light";
    if (themeToggle) themeToggle.checked = isLight;

    // Dashboard principal
    if (dashboardCSS) {
      const basePath = dashboardCSS.href.substring(0, dashboardCSS.href.lastIndexOf('/') + 1);
      const newPath = basePath.replace(/(Light|Dark)\//, `${isLight ? 'Light' : 'Dark'}/`) +
                      (isLight ? "Dashboard_light.css" : "Dashboard_dark.css");
      dashboardCSS.href = newPath;
    }

    // CSS del popup de ajustes
    if (settingsCSS) {
      const basePath = settingsCSS.href.substring(0, settingsCSS.href.lastIndexOf('/') + 1);
      const newPath = basePath.replace(/(Light|Dark)\//, `${isLight ? 'Light' : 'Dark'}/`) +
                      (isLight ? "Dashboard_settings_light.css" : "Dashboard_settings_dark.css");
      settingsCSS.href = newPath;
    }

    // Logo (ajusta si tienes diferentes logos para light/dark)
    if (logoImg) {
      const basePath = logoImg.src.substring(0, logoImg.src.lastIndexOf('/') + 1);
      logoImg.src = basePath + (isLight ? 'logo.png' : 'logo.png');
    }
  };

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  applyTheme(savedTheme);

  themeToggle?.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  });

  // ===============================
  // IMPORTAR/EXPORTAR
  // ===============================
  const btnSelectImport = document.getElementById('btnSelectImport');
  const importFileInput = document.getElementById('importFileInput');
  const btnImport = document.getElementById('btnImport');
  const importFileName = document.getElementById('importFileName');
  const btnExport = document.getElementById('btnExport');
  const exportFormat = document.getElementById('exportFormat');

  // IMPORTAR
  if (btnSelectImport && importFileInput) {
    btnSelectImport.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (importFileName) {
        importFileName.textContent = file ? file.name : 'Ningún archivo seleccionado';
      }
      if (btnImport) {
        btnImport.disabled = !file;
      }
    });
  }

  if (btnImport) {
    btnImport.addEventListener('click', () => {
      const file = importFileInput.files[0];
      if (!file) {
        alert("Por favor, selecciona un archivo válido");
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      fetch('import/', { 
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrftoken,  
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            alert(data.success);
            // Opcional: recargar la página para mostrar los datos importados
            // window.location.reload();
          } else if (data.error) {
            console.error('Error en importación:', data.details || data.error);
            alert(`Error: ${data.error}`);
          }
        })
        .catch(err => {
          console.error('Error en la petición de importación:', err);
          alert("Error al importar los datos. Verifica la consola para más detalles.");
        });
    });
  }

  // EXPORTAR
  if (btnExport && exportFormat) {
    btnExport.addEventListener('click', async() => {
      const format = exportFormat.value;
      if (!format) {
        alert('Por favor selecciona un formato de exportación');
        return;
      }
      
      console.log('Exportando en formato:', format);
      
      try {
        // CORREGIDO: Template literal con backticks
        const response = await fetch(`export/?format=${format}`, {
          method: 'GET',
          headers: {
            'X-CSRFToken': csrftoken,  
          }, 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Obtener el archivo como blob (binario)
        const blob = await response.blob();

        // Crear URL temporal y disparar la descarga
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // CORREGIDO: Template literal con backticks
        a.download = `datos.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        
        console.log('Exportación completada exitosamente');
      } catch (err) {
        console.error('Error en exportación:', err);
        alert('Error inesperado al exportar. Verifica la consola para más detalles.');
      }
    });
  }
});