function notify(message) {
  const notificationEl = document.querySelector('#notification');

  notificationEl.textContent = message;
  notificationEl.style.display = 'block';

  setTimeout(() => {
    notificationEl.style.display = 'none';
  }, 3000);
  //adition (not for judge)

  notificationEl.addEventListener('click', (e) => {
      e.target.style.display = 'none';
  });
}