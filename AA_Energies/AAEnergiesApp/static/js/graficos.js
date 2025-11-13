document.addEventListener('DOMContentLoaded', () => {
  console.log('📊 Iniciando graficos.js...');

  // ======================
  // DATOS DE EJEMPLO
  // ======================
  const datos = [
    { fecha: '2025-01-03', corriente: 45, potencia: 12, energia: 120 },
    { fecha: '2025-02-15', corriente: 50, potencia: 15, energia: 140 },
    { fecha: '2025-06-05', corriente: 55, potencia: 20, energia: 160 },
    { fecha: '2025-06-10', corriente: 60, potencia: 18, energia: 150 },
    { fecha: '2025-07-01', corriente: 65, potencia: 22, energia: 180 },
    { fecha: '2025-07-15', corriente: 70, potencia: 25, energia: 200 },
  ];

  // ======================
  // HISTORIAL DE NOTIFICACIONES
  // ======================
  const sentNotifications = new Set();

  // ======================
  // FUNCIONES DE FILTRADO
  // ======================
  function filtrarDatos() {
    const period = document.getElementById('period-select').value;
    const date = document.getElementById('date-picker').value;
    const start = document.getElementById('date-picker-start').value;
    const end = document.getElementById('date-picker-end').value;
    const month = document.getElementById('month-picker').value;
    const year = document.getElementById('year-picker').value;
    const season = document.getElementById('season-select').value;

    let filtered = [...datos];

    if (period === 'dia' && date) filtered = filtered.filter(d => d.fecha === date);
    else if (period === 'semana' && start && end) filtered = filtered.filter(d => d.fecha >= start && d.fecha <= end);
    else if (period === 'mes' && month && year) {
      filtered = filtered.filter(d => {
        const dObj = new Date(d.fecha);
        return dObj.getMonth() + 1 === parseInt(month) && dObj.getFullYear() === parseInt(year);
      });
    } else if (period === 'año' && year) filtered = filtered.filter(d => new Date(d.fecha).getFullYear() === parseInt(year));
    else if (period === 'otro') {
      if (season === 'verano') filtered = filtered.filter(d => {
        const m = new Date(d.fecha).getMonth() + 1;
        return m >= 6 && m <= 8;
      });
      else if (season === 'invierno') filtered = filtered.filter(d => {
        const m = new Date(d.fecha).getMonth() + 1;
        return m === 12 || m <= 2;
      });
    }

    return filtered;
  }

  // ======================
  // CONFIGURAR CHARTS
  // ======================
  const energiaCtx = document.getElementById('energiaChartContainer').getContext('2d');
  const potenciaCtx = document.getElementById('potenciaChartContainer').getContext('2d');

  let energiaChart = new Chart(energiaCtx, {
    type: 'bar',
    data: {
      labels: datos.map(d => d.fecha),
      datasets: [{
        label: 'Energía / kW',
        data: datos.map(d => d.energia),
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: {
        x: { title: { display: true, text: 'Fecha' } },
        y: { title: { display: true, text: 'kW' } }
      }
    }
  });

  let potenciaChart = new Chart(potenciaCtx, {
    type: 'line',
    data: {
      labels: datos.map(d => d.fecha),
      datasets: [{
        label: 'Potencia / kW',
        data: datos.map(d => d.potencia),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: true,
          callbacks: {
            label: function(context) {
              const index = context.dataIndex;
              const d = datos[index];
              return [
                `Fecha: ${d.fecha}`,
                `Potencia: ${d.potencia} kW`,
                `Energía: ${d.energia} kW`
              ];
            }
          }
        }
      },
      scales: {
        x: { title: { display: true, text: 'Fecha' } },
        y: { title: { display: true, text: 'kW' } }
      },
      hover: {
        mode: 'nearest',
        intersect: true
      }
    }
  });

  // ======================
  // ACTUALIZAR CHARTS Y NOTIFICACIONES
  // ======================
  function actualizarCharts() {
    const filtered = filtrarDatos();
    const fechas = filtered.map(d => d.fecha);
    const energia = filtered.map(d => d.energia);
    const potencia = filtered.map(d => d.potencia);

    energiaChart.data.labels = fechas;
    energiaChart.data.datasets[0].data = energia;
    energiaChart.update();

    potenciaChart.data.labels = fechas;
    potenciaChart.data.datasets[0].data = potencia;
    potenciaChart.update();

    // ======================
    // CHEQUEO DE LÍMITES Y NOTIFICACIONES
    // ======================
    filtered.forEach(d => {
      if (!window.notificationsManager) return;

      // Energía > 100 kW
      if (d.energia > 100) {
        const notifId = `energia-${d.fecha}`;
        if (!sentNotifications.has(notifId)) {
          window.notificationsManager.addNotification({
            id: notifId,
            type: 'warning',
            icon: 'fa-bolt',
            title: 'Energía Excedida',
            message: `La energía ha superado 100 kW (${d.energia} kW) el día ${d.fecha}`,
            time: `Fecha: ${d.fecha}`,
            unread: true
          });
          sentNotifications.add(notifId);
        }
      }

      // Potencia > 20 kW
      if (d.potencia > 20) {
        const notifId = `potencia-${d.fecha}`;
        if (!sentNotifications.has(notifId)) {
          window.notificationsManager.addNotification({
            id: notifId,
            type: 'warning',
            icon: 'fa-gauge-high',
            title: 'Potencia Excedida',
            message: `La potencia ha superado 20 kW (${d.potencia} kW) el día ${d.fecha}`,
            time: `Fecha: ${d.fecha}`,
            unread: true
          });
          sentNotifications.add(notifId);
        }
      }
    });
  }

  // ======================
  // EVENTOS DE FILTROS
  // ======================
  const periodSelect = document.getElementById('period-select');
  const datePicker = document.getElementById('date-picker');
  const dateStart = document.getElementById('date-picker-start');
  const dateEnd = document.getElementById('date-picker-end');
  const monthPicker = document.getElementById('month-picker');
  const yearPicker = document.getElementById('year-picker');
  const seasonSelect = document.getElementById('season-select');

  function ocultarTodosInputs() {
    datePicker.style.display = 'none';
    dateStart.style.display = 'none';
    dateEnd.style.display = 'none';
    monthPicker.style.display = 'none';
    yearPicker.style.display = 'none';
    seasonSelect.style.display = 'none';
  }

  periodSelect.addEventListener('change', () => {
    ocultarTodosInputs();
    const value = periodSelect.value;
    if (value === 'dia') datePicker.style.display = 'inline-block';
    else if (value === 'semana') { dateStart.style.display = 'inline-block'; dateEnd.style.display = 'inline-block'; }
    else if (value === 'mes') { monthPicker.style.display = 'inline-block'; yearPicker.style.display = 'inline-block'; }
    else if (value === 'año') yearPicker.style.display = 'inline-block';
    else if (value === 'otro') seasonSelect.style.display = 'inline-block';
    actualizarCharts();
  });

  [datePicker, dateStart, dateEnd, monthPicker, yearPicker, seasonSelect].forEach(input => input.addEventListener('input', actualizarCharts));

  // ======================
  // PRIMERA ACTUALIZACIÓN
  // ======================
  actualizarCharts();
});
