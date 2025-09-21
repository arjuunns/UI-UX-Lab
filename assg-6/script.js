// --- Packages Data & Table Rendering ---
const packages = [
  { id: 1, destination: 'Goa', durationDays: 5, basePrice: 12000, season: 'Winter' },
  { id: 2, destination: 'Manali', durationDays: 7, basePrice: 15000, season: 'Summer' },
  { id: 3, destination: 'Jaipur', durationDays: 4, basePrice: 9000, season: 'Monsoon' },
  { id: 4, destination: 'Kerala', durationDays: 6, basePrice: 14000, season: 'Winter' },
  { id: 5, destination: 'Mumbai', durationDays: 3, basePrice: 8000, season: 'Summer' }
];

function getFinalPrice(pkg) {
  let multiplier = 1;
  switch (pkg.season) {
    case 'Winter': multiplier = 1.2; break;
    case 'Summer': multiplier = 1.1; break;
    case 'Monsoon': multiplier = 0.95; break;
    default: multiplier = 1;
  }
  // Weekend surcharge if duration includes a Saturday or Sunday (simulate)
  let surcharge = pkg.durationDays >= 6 ? 0.15 : 0;
  return Math.round(pkg.basePrice * multiplier * (1 + surcharge));
}

function renderPackagesTable() {
  const tbody = document.querySelector('#packages-table tbody');
  tbody.innerHTML = '';
  packages.forEach(pkg => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${pkg.id}</td>
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays}</td>
      <td>₹${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>₹${getFinalPrice(pkg)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Booking Price Estimator ---
function populatePackageSelect() {
  const select = document.getElementById('package-select');
  select.innerHTML = '';
  packages.forEach(pkg => {
    const opt = document.createElement('option');
    opt.value = pkg.id;
    opt.textContent = `${pkg.destination} (${pkg.durationDays} days)`;
    select.appendChild(opt);
  });
}

function validateBookingForm() {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = parseInt(document.getElementById('guests').value);
  const pkgId = parseInt(document.getElementById('package-select').value);
  let valid = true;
  if (!checkin || !checkout || isNaN(guests) || guests < 1 || isNaN(pkgId)) valid = false;
  if (new Date(checkout) <= new Date(checkin)) valid = false;
  document.getElementById('submit-btn').disabled = !valid;
  return valid;
}

function calculateTotalPrice() {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = parseInt(document.getElementById('guests').value);
  const pkgId = parseInt(document.getElementById('package-select').value);
  const promo = document.getElementById('promo').value.trim().toUpperCase();
  if (!checkin || !checkout || isNaN(guests) || guests < 1 || isNaN(pkgId)) {
    document.getElementById('total-price').textContent = 'Total: ₹0';
    return;
  }
  const nights = (new Date(checkout) - new Date(checkin)) / (1000*60*60*24);
  if (nights < 1) {
    document.getElementById('total-price').textContent = 'Total: ₹0';
    return;
  }
  let pkg = packages.find(p => p.id === pkgId);
  let total = getFinalPrice(pkg) * nights;
  if (guests > 2) total *= 1.2;
  switch (promo) {
    case 'EARLYBIRD': total *= 0.9; break;
    case 'FESTIVE': total *= 0.85; break;
    case 'NONE': break;
    default: break;
  }
  document.getElementById('total-price').textContent = `Total: ₹${Math.round(total)}`;
}

document.getElementById('booking-form').addEventListener('input', function() {
  validateBookingForm();
  calculateTotalPrice();
});
document.getElementById('booking-form').addEventListener('change', function() {
  validateBookingForm();
  calculateTotalPrice();
});
document.getElementById('booking-form').addEventListener('submit', function(e) {
  if (!validateBookingForm()) {
    e.preventDefault();
    alert('Please fill all fields correctly.');
  }
});

// --- Gallery Modal ---
document.querySelectorAll('.gallery-thumbs img').forEach(img => {
  img.addEventListener('click', function() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = img.getAttribute('data-large');
    modalImg.alt = img.alt;
    modalImg.title = img.title;
    modal.style.display = 'flex';
  });
});
document.getElementById('close-modal').onclick = function() {
  document.getElementById('modal').style.display = 'none';
};
window.onclick = function(event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
};

// --- Nav Highlight + Scroll ---
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Initial Render ---
renderPackagesTable();
populatePackageSelect();
validateBookingForm();
calculateTotalPrice();
