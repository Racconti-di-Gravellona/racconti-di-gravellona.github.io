// Ricerca locale per nome: nessun server, nessun cookie, nessun tracking.
// Usata da biografie/ e luoghi/: filtra i <li> di #elenco.
(() => {
  const input = document.querySelector("#cerca");
  const list = document.querySelector("#elenco");
  if (!input || !list) return;

  const items = [...list.querySelectorAll("li")];
  const empty = document.querySelector("#nessun-risultato");

  const norm = (s = "") =>
    s.toLowerCase().normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "");

  input.addEventListener("input", () => {
    const q = norm(input.value.trim());
    let visibili = 0;

    for (const li of items) {
      const ok = !q || norm(li.textContent).includes(q);
      li.hidden = !ok;
      if (ok) visibili += 1;
    }

    if (empty) {
      empty.hidden = visibili !== 0;
      if (visibili === 0) empty.textContent = `Nessun risultato per "${input.value.trim()}".`;
    }
  });
})();
