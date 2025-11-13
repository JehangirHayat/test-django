// ===============================
// DASHBOARD.JS (Vanilla JS)
// ===============================

document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // ELEMENTOS
  // ===============================
  const btnAjustes = document.getElementById('btnAjustes');
  const btnLogout = document.getElementById('btnLogout');
  const btnFiltro = document.getElementById('btnFiltro');
  const filterOptions = document.getElementById('filter-options');
  const periodSelect = document.getElementById('period-select');
  const datePicker = document.getElementById('date-picker');
  const datePickerStart = document.getElementById('date-picker-start');
  const datePickerEnd = document.getElementById('date-picker-end');
  const monthPicker = document.getElementById('month-picker');
  const yearPicker = document.getElementById('year-picker');
  const seasonSelect = document.getElementById('season-select');
  const dashboardPopup = document.getElementById('dashboardSettingsPopup');
  const closeDashboardSettings = document.getElementById('closeDashboardSettings');
  const adminSection = document.getElementById('adminStatsSection'); // 👈 añadido

  console.log('btnLogout encontrado:', !!btnLogout);

  // ===============================
  // MOSTRAR SECCIÓN ADMIN (rol)
  // ===============================
  const rol = localStorage.getItem('rol');
  console.log('Rol detectado:', rol);

  if (adminSection) {
    if (rol === 'admin') {
      adminSection.style.display = 'block';
      console.log('Sección admin visible');
    } else {
      adminSection.style.display = 'none';
      console.log('Sección admin oculta');
    }
  }

  // ===============================
  // FUNCIÓN PARA DETECTAR IDIOMA
  // ===============================
  const getCurrentLanguage = () => {
    if (window.CURRENT_LANGUAGE) return window.CURRENT_LANGUAGE;

    const htmlLang = document.documentElement.lang;
    if (htmlLang) return htmlLang.split('-')[0];

    const pathParts = window.location.pathname.split('/').filter(p => p);
    const possibleLangs = ['es', 'en', 'eu'];
    if (pathParts.length > 0 && possibleLangs.includes(pathParts[0])) return pathParts[0];

    const metaLang = document.querySelector('meta[name="language"]');
    if (metaLang) return metaLang.content;

    const bodyLang = document.body.getAttribute('data-language');
    if (bodyLang) return bodyLang;

    return 'es'; // fallback
  };

  const currentLang = getCurrentLanguage();
  console.log('Idioma detectado:', currentLang);

  // ===============================
  // FUNCIÓN PARA OBTENER CSRF TOKEN
  // ===============================
  const getCSRFToken = () => {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  // ===============================
  // FILTROS (actualizado)
  // ===============================
  const updateFiltersVisibility = (value) => {
    // Ocultar todos por defecto
    if (datePicker) datePicker.style.display = 'none';
    if (datePickerStart) datePickerStart.style.display = 'none';
    if (datePickerEnd) datePickerEnd.style.display = 'none';
    if (monthPicker) monthPicker.style.display = 'none';
    if (yearPicker) yearPicker.style.display = 'none';
    if (seasonSelect) seasonSelect.style.display = 'none';

    // Mostrar según selección
    switch (value) {
      case 'dia':
        if (datePicker) datePicker.style.display = 'inline-block';
        break;
      case 'semana':
        if (datePickerStart) datePickerStart.style.display = 'inline-block';
        if (datePickerEnd) datePickerEnd.style.display = 'inline-block';
        break;
      case 'mes':
        if (monthPicker) monthPicker.style.display = 'inline-block';
        if (yearPicker) yearPicker.style.display = 'inline-block';
        break;
      case 'año':
        if (yearPicker) yearPicker.style.display = 'inline-block';
        break;
      case 'otro':
        if (seasonSelect) seasonSelect.style.display = 'inline-block';
        break;
    }
  };

  if (btnFiltro && filterOptions) {
    btnFiltro.addEventListener('click', () => {
      const visible = filterOptions.style.display === 'block';
      filterOptions.style.display = visible ? 'none' : 'block';
      btnFiltro.setAttribute('aria-expanded', !visible);
      filterOptions.setAttribute('aria-hidden', visible);
    });
  }

  if (periodSelect) {
    periodSelect.addEventListener('change', () => {
      updateFiltersVisibility(periodSelect.value);
    });
    updateFiltersVisibility(periodSelect.value);
  }

  // ===============================
  // POPUP AJUSTES
  // ===============================
  const openSettingsPopup = () => {
    if (!dashboardPopup) return;
    dashboardPopup.classList.add('show');
    dashboardPopup.classList.remove('closing');
    document.body.classList.add('no-scroll');
  };

  const closeSettingsPopup = () => {
    if (!dashboardPopup) return;
    dashboardPopup.classList.add('closing');
    setTimeout(() => {
      dashboardPopup.classList.remove('show', 'closing');
      document.body.classList.remove('no-scroll');
    }, 300);
  };

  if (btnAjustes) {
    btnAjustes.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Botón ajustes clickeado');
      openSettingsPopup();
    });
  }

  if (closeDashboardSettings) {
    closeDashboardSettings.addEventListener('click', closeSettingsPopup);
  }

  if (dashboardPopup) {
    dashboardPopup.addEventListener('click', (e) => {
      if (e.target === dashboardPopup) closeSettingsPopup();
    });
  }

  // ===============================
  // LOGOUT SEGURO (con CSRF Token)
  // ===============================
  if (btnLogout) {
    console.log('Agregando event listener a btnLogout');

    btnLogout.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log('Logout clickeado');

      const lang = getCurrentLanguage();
      const csrfToken = getCSRFToken();

      try {
        const response = await fetch(`/${lang}/logout/`, {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Limpia el rol y el usuario guardados
          localStorage.removeItem('rol');
          localStorage.removeItem('username');

          window.location.href = `/${lang}/login/`;
        } else {
          console.error('Error al cerrar sesión:', response.status);
        }
      } catch (error) {
        console.error('Error en la solicitud de logout:', error);
      }
    });
  } else {
    console.error('btnLogout no encontrado en el DOM');
  }

});
