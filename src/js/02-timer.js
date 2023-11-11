import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const dDays = document.querySelector('[data-days]');
const dHours = document.querySelector('[data-hours]');
const dMinutes = document.querySelector('[data-minutes]');
const dSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.warning({
        title: 'Caution',
        message: 'Please choose a date in the future',
        balloon: true,
        position: 'topCenter',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', function () {
  const selectedDate = datePicker.selectedDates[0];
  const currentDate = new Date();

  let timeDifference = selectedDate.getTime() - currentDate.getTime();

  function updateTimer() {
    const time = convertMs(timeDifference);

    dDays.textContent = addLeadingZero(time.days);
    dHours.textContent = addLeadingZero(time.hours);
    dMinutes.textContent = addLeadingZero(time.minutes);
    dSeconds.textContent = addLeadingZero(time.seconds);

    if (timeDifference <= 0) {
      iziToast.success({
        title: 'Happy New Year',
        message: '',
        balloon: true,
        position: 'topCenter',
      });
      clearInterval(timerInterval);
      document.querySelector('[data-start]').disabled = true;
      dDays.textContent = '*';
      dHours.textContent = '*';
      dMinutes.textContent = '*';
      dSeconds.textContent = '*';
    } else {
      timeDifference -= 1000;
    }
  }

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
