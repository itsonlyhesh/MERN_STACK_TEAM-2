// ─────────────────────────────────────────────────────────────────────────────
// DOM References
// ─────────────────────────────────────────────────────────────────────────────
const bkStatus          = document.getElementById('bkStatus');
const venueGrid         = document.getElementById('venueGrid');
const slotPanelBackdrop = document.getElementById('slotPanelBackdrop');
const slotPanel         = document.getElementById('slotPanel');
const spClose           = document.getElementById('spClose');
const spName            = document.getElementById('spName');
const spType            = document.getElementById('spType');
const spAmenities       = document.getElementById('spAmenities');
const spSlotGrid        = document.getElementById('spSlotGrid');
const stepSlots         = document.getElementById('stepSlots');
const bookingForm       = document.getElementById('bookingForm');
const spSelectedSlot    = document.getElementById('spSelectedSlot');
const bkDate            = document.getElementById('bkDate');
const bkPeople          = document.getElementById('bkPeople');
const bkName            = document.getElementById('bkName');
const bkEmail           = document.getElementById('bkEmail');
const bkPhone           = document.getElementById('bkPhone');
const spTotalPrice      = document.getElementById('spTotalPrice');
const spPricePreview    = document.getElementById('spPricePreview');
const bkBackBtn         = document.getElementById('bkBackBtn');
const bkSubmitBtn       = document.getElementById('bkSubmitBtn');
const bookingConfirm    = document.getElementById('bookingConfirmation');
const spConfirmDetails  = document.getElementById('spConfirmDetails');
const bkNewBooking      = document.getElementById('bkNewBooking');
const bkToast           = document.getElementById('bkToast');
const myBookingsList    = document.getElementById('myBookingsList');
const bkClearBookings   = document.getElementById('bkClearBookings');

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────
let allVenues      = [];
let activeVenue    = null;
let activeSlot     = null;
let toastTimer     = null;

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const readSavedBookings = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('sportsBookings') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.warn('Could not read saved bookings', error);
    return [];
  }
};

const renderMyBookings = () => {
  if (!myBookingsList) return;
  const bookings = readSavedBookings();
  myBookingsList.replaceChildren();

  if (!bookings.length) {
    myBookingsList.className = 'bk-bookings-empty';
    myBookingsList.textContent = 'No bookings saved on this device yet.';
    return;
  }

  myBookingsList.className = 'bk-bookings-grid';
  bookings.forEach((booking) => {
    const item = document.createElement('article');
    item.className = 'bk-booking-card';

    item.innerHTML = `
      <div class="bk-booking-card__top">
        <strong>${booking.venueName}</strong>
        <span>${booking.slotDate}</span>
      </div>
      <div class="bk-booking-card__meta">
        <span>${booking.slotLabel}</span>
        <span>${booking.slotStartTime} - ${booking.slotEndTime}</span>
      </div>
      <div class="bk-booking-card__footer">
        <span>${booking.numberOfPeople} guest${booking.numberOfPeople === 1 ? '' : 's'}</span>
        <strong>${INR.format(booking.totalPrice || 0)}</strong>
      </div>
    `;

    myBookingsList.appendChild(item);
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────
const showToast = (msg, isError = false) => {
  bkToast.textContent = msg;
  bkToast.style.background = isError
    ? 'rgba(220,38,38,0.95)'
    : 'rgba(17,24,39,0.95)';
  bkToast.style.color = '#fff';
  bkToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => bkToast.classList.remove('show'), 2200);
};

const setMinDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm   = String(today.getMonth() + 1).padStart(2, '0');
  const dd   = String(today.getDate()).padStart(2, '0');
  bkDate.min = `${yyyy}-${mm}-${dd}`;
  bkDate.value = `${yyyy}-${mm}-${dd}`;
};

const typeClass = (type) => {
  if (type === 'VR')    return 'badge-vr';
  if (type === 'AR')    return 'badge-ar';
  return 'badge-vrar';
};

const stars = (rating) => {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

// ─────────────────────────────────────────────────────────────────────────────
// Render Venues
// ─────────────────────────────────────────────────────────────────────────────
const renderVenues = (venues) => {
  venueGrid.innerHTML = '';

  if (venues.length === 0) {
    venueGrid.innerHTML = '<p class="bk-empty-state">No venues are available yet. Run the database seed, then refresh this page.</p>';
    return;
  }

  venues.forEach((venue) => {
    const card = document.createElement('article');
    card.className = 'bk-venue-card';
    card.setAttribute('data-id', venue._id);

    const amenityChips = venue.amenities
      .slice(0, 4)
      .map((a) => `<span class="bk-chip">${a}</span>`)
      .join('');

    const slotCount = venue.timeSlots.length;
    const minPrice  = Math.min(...venue.timeSlots.map((s) => s.pricePerHead));

    card.innerHTML = `
      <div class="bk-card-top">
        <span class="bk-type-badge ${typeClass(venue.type)}">${venue.type}</span>
        <div class="bk-card-rating">
          <span class="bk-stars">${stars(venue.rating)}</span>
          <span class="bk-rating-num">${venue.rating.toFixed(1)}</span>
        </div>
      </div>
      <div class="bk-card-glow ${typeClass(venue.type)}-glow"></div>
      <h2 class="bk-card-name">${venue.name}</h2>
      <p class="bk-card-desc">${venue.description}</p>
      <div class="bk-chips">${amenityChips}</div>
      <div class="bk-card-footer">
        <div class="bk-card-meta">
          <span class="bk-slot-count">${slotCount} slots available</span>
          <span class="bk-price-from">From ${INR.format(minPrice)}/head</span>
        </div>
        <button class="bk-book-btn" type="button" data-id="${venue._id}">
          View Slots →
        </button>
      </div>
    `;

    card.querySelector('.bk-book-btn').addEventListener('click', () => {
      openPanel(venue);
    });

    venueGrid.appendChild(card);
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Slot Panel
// ─────────────────────────────────────────────────────────────────────────────
const openPanel = (venue) => {
  activeVenue = venue;
  activeSlot  = null;

  // Populate panel header
  spName.textContent     = venue.name;
  spType.textContent     = venue.type;
  spType.className       = `sp-kicker ${typeClass(venue.type)}-text`;

  // Amenities
  spAmenities.innerHTML = venue.amenities
    .map((a) => `<span class="bk-chip">${a}</span>`)
    .join('');

  // Render time slots
  setMinDate();
  refreshSlotAvailability();

  // Reset form state
  showStep('slots');

  slotPanel.classList.add('open');
  slotPanelBackdrop.classList.remove('hidden');
  slotPanel.setAttribute('aria-hidden', 'false');
  slotPanelBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closePanel = () => {
  slotPanel.classList.remove('open');
  slotPanelBackdrop.classList.add('hidden');
  slotPanel.setAttribute('aria-hidden', 'true');
  slotPanelBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  activeVenue = null;
  activeSlot  = null;
};

const showStep = (step) => {
  stepSlots.classList.toggle('hidden', step !== 'slots');
  bookingForm.classList.toggle('hidden', step !== 'form');
  bookingConfirm.classList.toggle('hidden', step !== 'confirm');
};

const renderSlots = (slots) => {
  spSlotGrid.innerHTML = '';
  slots.forEach((slot) => {
    const availableCapacity = Number.isInteger(slot.availableCapacity)
      ? slot.availableCapacity
      : slot.maxCapacity;
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'sp-slot-tile';
    tile.disabled = availableCapacity < 1;
    tile.innerHTML = `
      <span class="sp-slot-label">${slot.label}</span>
      <span class="sp-slot-time">${slot.startTime} – ${slot.endTime}</span>
      <span class="sp-slot-duration">${slot.duration} min</span>
      <span class="sp-slot-price">${INR.format(slot.pricePerHead)}<em>/head</em></span>
      <span class="sp-slot-cap">${availableCapacity > 0 ? `${availableCapacity} of ${slot.maxCapacity} places left` : 'Sold out'}</span>
    `;
    if (availableCapacity > 0) {
      tile.addEventListener('click', () => selectSlot(slot, tile));
    }
    spSlotGrid.appendChild(tile);
  });
};

const selectSlot = (slot, tileEl) => {
  activeSlot = slot;

  // Highlight selected tile
  spSlotGrid.querySelectorAll('.sp-slot-tile').forEach((t) => t.classList.remove('selected'));
  tileEl.classList.add('selected');

  // Build selected slot summary
  spSelectedSlot.innerHTML = `
    <div class="sp-slot-summary">
      <div>
        <strong>${slot.label}</strong>
        <span>${slot.startTime} – ${slot.endTime} · ${slot.duration} min</span>
      </div>
      <div class="sp-slot-price-tag">${INR.format(slot.pricePerHead)}<em>/head</em></div>
    </div>
  `;

  // Update capacity max
  bkPeople.max = slot.availableCapacity ?? slot.maxCapacity;
  if (parseInt(bkPeople.value, 10) > Number(bkPeople.max)) {
    bkPeople.value = bkPeople.max;
  }

  updatePricePreview();
  setMinDate();
  showStep('form');
};

const refreshSlotAvailability = async () => {
  if (!activeVenue || !bkDate.value) return;

  spSlotGrid.innerHTML = '<p class="bk-slot-loading">Checking availability…</p>';
  try {
    const response = await fetch(`/venues/${activeVenue._id}/availability?date=${encodeURIComponent(bkDate.value)}`);
    if (!response.ok) throw new Error('Could not load slot availability');
    const availability = await response.json();
    activeVenue.timeSlots = availability.slots;
    renderSlots(activeVenue.timeSlots);
  } catch (error) {
    spSlotGrid.innerHTML = '<p class="bk-empty-state">Could not load availability. Please try another date or refresh the page.</p>';
    showToast(error.message, true);
  }
};

const updatePricePreview = () => {
  if (!activeSlot) return;
  const people = Math.max(1, parseInt(bkPeople.value, 10) || 1);
  const total  = activeSlot.pricePerHead * people;
  spTotalPrice.textContent = INR.format(total);
};

// ─────────────────────────────────────────────────────────────────────────────
// Booking Submission
// ─────────────────────────────────────────────────────────────────────────────
const submitBooking = async (e) => {
  e.preventDefault();

  if (!activeVenue || !activeSlot) {
    showToast('Please select a time slot first', true);
    return;
  }

  const numberOfPeople = parseInt(bkPeople.value, 10);
  const availableCapacity = activeSlot.availableCapacity ?? activeSlot.maxCapacity;
  if (!bkDate.value || numberOfPeople < 1 || numberOfPeople > availableCapacity) {
    showToast(`Only ${availableCapacity} place${availableCapacity === 1 ? '' : 's'} remain for this slot`, true);
    return;
  }

  const payload = {
    venueId:       activeVenue._id,
    slotId:        activeSlot._id,
    slotDate:      bkDate.value,
    customerName:  bkName.value.trim(),
    customerEmail: bkEmail.value.trim(),
    customerPhone: bkPhone.value.trim(),
    numberOfPeople
  };

  bkSubmitBtn.disabled    = true;
  bkSubmitBtn.textContent = 'Confirming…';

  try {
    const res = await fetch('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Booking failed');
    }

    const booking = await res.json();
    showConfirmation(booking);
  } catch (err) {
    showToast(err.message || 'Booking failed. Try again.', true);
  } finally {
    bkSubmitBtn.disabled    = false;
    bkSubmitBtn.textContent = 'Confirm Booking';
  }
};

const showConfirmation = (booking) => {
  const total = INR.format(booking.totalPrice);
  const savedBookings = readSavedBookings();
  const nextBooking = {
    ...booking,
    bookingId: booking._id || `${booking.venueName}-${booking.slotDate}-${booking.slotStartTime}`,
    bookedAt: booking.createdAt || new Date().toISOString()
  };
  localStorage.setItem('sportsBookings', JSON.stringify([nextBooking, ...savedBookings].slice(0, 20)));
  renderMyBookings();

  spConfirmDetails.innerHTML = `
    <div class="sp-confirm-row"><span>Venue</span><strong>${booking.venueName}</strong></div>
    <div class="sp-confirm-row"><span>Slot</span><strong>${booking.slotLabel}</strong></div>
    <div class="sp-confirm-row"><span>Time</span><strong>${booking.slotStartTime} – ${booking.slotEndTime}</strong></div>
    <div class="sp-confirm-row"><span>Date</span><strong>${booking.slotDate}</strong></div>
    <div class="sp-confirm-row"><span>People</span><strong>${booking.numberOfPeople}</strong></div>
    <div class="sp-confirm-row sp-confirm-total"><span>Total Paid</span><strong>${total}</strong></div>
    <div class="sp-confirm-row"><span>Name</span><strong>${booking.customerName}</strong></div>
    <div class="sp-confirm-row"><span>Email</span><strong>${booking.customerEmail}</strong></div>
  `;

  if (typeof window.showCompletionModal !== 'function') {
    showStep('confirm');
    return;
  }

  closePanel();
  bookingForm.reset();
  window.showCompletionModal({
    eyebrow: 'Slot booked',
    title: 'Your game is confirmed',
    message: 'Your venue has reserved this time for you.',
    details: [
      { label: 'Venue', value: booking.venueName },
      { label: 'Date', value: booking.slotDate },
      { label: 'Time', value: `${booking.slotStartTime} – ${booking.slotEndTime}` },
      { label: 'Guests', value: String(booking.numberOfPeople) },
      { label: 'Total', value: total }
    ],
    actionLabel: 'Done'
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Load Venues
// ─────────────────────────────────────────────────────────────────────────────
const loadVenues = async () => {
  bkStatus.classList.remove('hidden');
  venueGrid.classList.add('hidden');

  try {
    const res = await fetch('/venues');
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    allVenues = await res.json();

    bkStatus.classList.add('hidden');
    venueGrid.classList.remove('hidden');
    renderVenues(allVenues);
  } catch (err) {
    bkStatus.innerHTML = `
      <p style="color:#fca5a5;font-weight:600;">Failed to load venues. Is the backend running?</p>
      <button id="bkRetry" class="sp-btn-confirm" style="margin-top:12px;">Retry</button>
    `;
    document.getElementById('bkRetry')?.addEventListener('click', loadVenues);
    console.error(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Event Listeners
// ─────────────────────────────────────────────────────────────────────────────
spClose.addEventListener('click', closePanel);
slotPanelBackdrop.addEventListener('click', closePanel);
bkBackBtn.addEventListener('click', () => showStep('slots'));
bkPeople.addEventListener('input', updatePricePreview);
bkDate.addEventListener('change', () => {
  activeSlot = null;
  showStep('slots');
  refreshSlotAvailability();
});
bkClearBookings?.addEventListener('click', () => {
  localStorage.removeItem('sportsBookings');
  renderMyBookings();
  showToast('Saved bookings cleared');
});
bookingForm.addEventListener('submit', submitBooking);
bkNewBooking.addEventListener('click', () => {
  bookingForm.reset();
  showStep('slots');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && slotPanel.classList.contains('open')) closePanel();
});

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────
loadVenues();
renderMyBookings();
