/**
 * Notifications Manager
 * Handles notification panel toggling and display
 */

class NotificationsManager {
  constructor(maxLimits = { energia: 200, potencia: 25 }) {
    this.panel = document.getElementById('notificationsPanel');
    this.notifBtn = document.getElementById('btnNotifications');
    this.notifDot = document.querySelector('.notif-dot');
    this.notifList = document.getElementById('notificationsList');
    this.markAllReadBtn = document.getElementById('btnMarkAllRead');
    this.notifications = [];
    this.isOpen = false;

    // Configurable limits
    this.maxLimits = maxLimits;

    this.init();
  }

  init() {
    this.renderNotifications();
    this.updateNotificationDot();

    this.notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePanel();
    });

    this.markAllReadBtn.addEventListener('click', () => {
      this.markAllAsRead();
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.panel.contains(e.target) && !this.notifBtn.contains(e.target)) {
        this.closePanel();
      }
    });

    this.panel.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.closePanel();
    });
  }

  renderNotifications() {
    if (this.notifications.length === 0) {
      this.notifList.innerHTML = `
        <div class="notification-empty">
          <i class="fa-solid fa-bell-slash"></i>
          <p>No tienes notificaciones</p>
        </div>
      `;
      return;
    }

    this.notifList.innerHTML = this.notifications.map(notif => this.createNotificationHTML(notif)).join('');

    this.notifList.querySelectorAll('.notification-item').forEach((item, index) => {
      item.addEventListener('click', () => this.markAsRead(index));
    });
  }

  createNotificationHTML(notif) {
    return `
      <div class="notification-item ${notif.unread ? 'unread' : ''}" data-id="${notif.id}">
        <div class="notification-header">
          <div class="notification-icon ${notif.type}">
            <i class="fa-solid ${notif.icon}"></i>
          </div>
          <div class="notification-content">
            <div class="notification-title">${notif.title}</div>
            <div class="notification-message">${notif.message}</div>
            <div class="notification-time">
              <i class="fa-solid fa-clock"></i> ${notif.time}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  togglePanel() {
    if (this.isOpen) this.closePanel();
    else this.openPanel();
  }

  openPanel() {
    this.panel.style.display = 'block';
    this.isOpen = true;
    this.notifBtn.classList.add('active');
    setTimeout(() => this.panel.style.opacity = '1', 10);
  }

  closePanel() {
    this.panel.style.opacity = '0';
    this.isOpen = false;
    this.notifBtn.classList.remove('active');
    setTimeout(() => this.panel.style.display = 'none', 300);
  }

  markAsRead(index) {
    if (this.notifications[index].unread) {
      this.notifications[index].unread = false;
      this.renderNotifications();
      this.updateNotificationDot();
    }
  }

  markAllAsRead() {
    let hasUnread = false;
    this.notifications.forEach(n => { if (n.unread) { n.unread = false; hasUnread = true; }});
    if (hasUnread) {
      this.renderNotifications();
      this.updateNotificationDot();
      this.showToast('Todas las notificaciones marcadas como leídas', 'success');
    }
  }

  updateNotificationDot() {
    const unreadCount = this.notifications.filter(n => n.unread).length;
    this.notifDot.style.display = unreadCount > 0 ? 'block' : 'none';
    this.notifBtn.setAttribute('aria-label', unreadCount > 0 ? `Notificaciones (${unreadCount} sin leer)` : 'Notificaciones');
  }

  addNotification(notification) {
    this.notifications.unshift(notification);
    this.renderNotifications();
    this.updateNotificationDot();
    if (notification.unread) this.showToast(notification.title, notification.type);
  }

  /**
   * Add alerts triggered by graficos.js
   * @param {string} grafico - 'energia' | 'potencia'
   * @param {number} valor - valor registrado
   * @param {string} fecha - fecha del dato
   */
  addAlertFromChart(grafico, valor, fecha) {
    const limite = this.maxLimits[grafico];
    if (valor > limite) {
      const title = `Límite superado: ${grafico.toUpperCase()}`;
      const message = `El valor ${valor} kW ha superado el límite (${limite} kW) el día ${fecha}`;
      this.addNotification({
        id: Date.now(),
        type: 'error',
        icon: grafico === 'energia' ? 'fa-bolt' : 'fa-gauge-high',
        title,
        message,
        time: fecha,
        unread: true
      });
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--card-bg);
      color: var(--text);
      padding: 1rem 1.5rem;
      border-radius: var(--radius);
      border: 1px solid var(--border-light);
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      animation: slideInUp 0.3s ease-out;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      max-width: 350px;
    `;
    const iconMap = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const colorMap = { success: 'var(--success)', error: 'var(--error)', warning: 'var(--warning)', info: 'var(--info)' };
    toast.innerHTML = `<i class="fa-solid ${iconMap[type]}" style="color: ${colorMap[type]}; font-size: 1.2rem;"></i><span style="flex:1">${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'slideOutDown 0.3s ease-out'; setTimeout(() => { toast.remove(); }, 300); }, 3000);
  }
}

// Animaciones de toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp { from {opacity:0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
  @keyframes slideOutDown { from {opacity:1; transform: translateY(0);} to {opacity:0; transform: translateY(20px);} }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  window.notificationsManager = new NotificationsManager();
});
