export function openModal(content) {
  closeModal();

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.id = "modal-root";
  backdrop.innerHTML = `<div class="modal">${content}</div>`;

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeModal();
  });

  document.body.appendChild(backdrop);
}

export function closeModal() {
  document.querySelector("#modal-root")?.remove();
}
