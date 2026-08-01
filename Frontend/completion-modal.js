(() => {
  let lastTrigger = null;
  const root = document.createElement('div');
  root.className = 'completion-modal hidden';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-labelledby', 'completionModalTitle');
  root.innerHTML = '<div class="completion-modal__backdrop"></div><section class="completion-modal__card"><button class="completion-modal__close" type="button" aria-label="Close confirmation">×</button><span class="completion-modal__mark" aria-hidden="true">✓</span><p class="completion-modal__eyebrow"></p><h2 id="completionModalTitle"></h2><p class="completion-modal__message"></p><dl class="completion-modal__details"></dl><button class="completion-modal__action" type="button">Done</button></section>';
  document.body.appendChild(root);

  const actionButton = root.querySelector('.completion-modal__action');
  const close = () => {
    root.classList.add('hidden');
    root._onClose?.();
    root._onClose = null;
    lastTrigger?.focus();
  };
  root.querySelector('.completion-modal__close').addEventListener('click', close);
  actionButton.addEventListener('click', close);
  root.querySelector('.completion-modal__backdrop').addEventListener('click', close);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !root.classList.contains('hidden')) close();
  });

  window.showCompletionModal = ({ eyebrow = 'Completed', title, message, details = [], actionLabel = 'Done', onClose }) => {
    lastTrigger = document.activeElement;
    root.querySelector('.completion-modal__eyebrow').textContent = eyebrow;
    root.querySelector('h2').textContent = title;
    root.querySelector('.completion-modal__message').textContent = message;
    actionButton.textContent = actionLabel;
    root._onClose = onClose;
    const detailList = root.querySelector('.completion-modal__details');
    detailList.replaceChildren();
    details.forEach(({ label, value }) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      row.append(term, description);
      detailList.appendChild(row);
    });
    root.classList.remove('hidden');
    actionButton.focus();
  };
})();
