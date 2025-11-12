// Configuración principal
const AMOUNTS = [100, 310, 520, 1060, 2180, 5600]; // Requerimiento
const STORAGE_KEY = 'tmff_last_amount';

const grid = document.getElementById('amountGrid');
const btnGenerate = document.getElementById('btnGenerate');
const idForm = document.getElementById('idForm');
const playerIdInput = document.getElementById('playerId');
const btnSend = document.getElementById('btnSend');
const btnCancelId = document.getElementById('btnCancelId');
const summaryModal = document.getElementById('summaryModal');
const sumAmount = document.getElementById('sumAmount');
const sumPlayer = document.getElementById('sumPlayer');
const confirmSummary = document.getElementById('confirmSummary');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const shareBanner = document.getElementById('shareBanner');
const btnShareNative = document.getElementById('btnShareNative');
const btnShareFB = document.getElementById('btnShareFB');
const btnShareWA = document.getElementById('btnShareWA');
const btnCopyLink = document.getElementById('btnCopyLink');
const btnCloseShare = document.getElementById('btnCloseShare');

let selectedAmount = null;

// Render de tarjetas
function renderCards() {
  grid.innerHTML = '';
  AMOUNTS.forEach(amount => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'amount-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-pressed', 'false');
    card.dataset.amount = amount;

    card.innerHTML = `
      <div class="bg" aria-hidden="true"></div>
      <div class="amount-info">
        <span class="badge">${amount}</span>
        <span class="gem">Diamantes</span>
      </div>
    `;
    card.addEventListener('click', () => onSelectAmount(card, amount));
    grid.appendChild(card);
  });

  // Restaurar selección
  const last = localStorage.getItem(STORAGE_KEY);
  if (last) {
    const btn = [...grid.children].find(b => +b.dataset.amount === +last);
    if (btn) {
      btn.click();
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function onSelectAmount(card, amount) {
  [...grid.children].forEach(btn => {
    btn.classList.toggle('selected', btn === card);
    btn.setAttribute('aria-pressed', btn === card ? 'true' : 'false');
  });
  selectedAmount = amount;
  localStorage.setItem(STORAGE_KEY, String(amount));
  btnGenerate.disabled = false;
}

btnGenerate.addEventListener('click', () => {
  idForm.hidden = false;
  playerIdInput.focus();
  window.scrollTo({ top: idForm.offsetTop - 80, behavior: 'smooth' });
});

playerIdInput.addEventListener('input', () => {
  btnSend.disabled = playerIdInput.value.trim().length === 0;
});

btnCancelId.addEventListener('click', () => {
  idForm.hidden = true;
  btnSend.disabled = true;
  playerIdInput.value = '';
});

btnSend.addEventListener('click', () => {
  // Resumen en modal
  sumAmount.textContent = selectedAmount ?? '—';
  sumPlayer.textContent = playerIdInput.value.trim() || '—';
  if (typeof summaryModal.showModal === 'function') {
    summaryModal.showModal();
  } else {
    // Fallback mínimo
    alert(`Cantidad: ${sumAmount.textContent}\nID: ${sumPlayer.textContent}`);
    startLoadingSequence();
  }
});

confirmSummary.addEventListener('click', (e) => {
  e.preventDefault();
  summaryModal.close('confirm');
  startLoadingSequence();
});

// Secuencia de carga y mensajes
function startLoadingSequence() {
  idForm.hidden = true;
  loadingOverlay.hidden = false;
  loadingText.textContent = 'Cargando…';

  setTimeout(() => loadingText.textContent = 'Procesando solicitud', 1000);
  setTimeout(() => loadingText.textContent = 'Generando diamantes', 2000);
  setTimeout(() => {
    loadingOverlay.hidden = true;
    showShareBanner();
  }, 3000);
}

// Compartir
function showShareBanner() {
  const pageUrl = window.location.href.split('#')[0];

  // Enlaces sociales
  btnShareFB.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  btnShareWA.href = `https://wa.me/?text=${encodeURIComponent('Mira este sitio: ' + pageUrl)}`;

  // Web Share API
  btnShareNative.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Mira este sitio',
          url: pageUrl
        });
      } catch (_) {}
    } else {
      // Fallback a copiar
      await copyToClipboard(pageUrl);
      btnCopyLink.textContent = '¡Enlace copiado!';
      setTimeout(() => btnCopyLink.textContent = 'Copiar enlace', 1500);
    }
  });

  btnCopyLink.addEventListener('click', async () => {
    await copyToClipboard(pageUrl);
    btnCopyLink.textContent = '¡Enlace copiado!';
    setTimeout(() => btnCopyLink.textContent = 'Copiar enlace', 1500);
  });

  shareBanner.classList.add('show');
  shareBanner.hidden = false;
}

btnCloseShare.addEventListener('click', () => {
  shareBanner.classList.remove('show');
  shareBanner.hidden = true;
});

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

// Utilidad footer
document.getElementById('year').textContent = new Date().getFullYear();

// Init
renderCards();