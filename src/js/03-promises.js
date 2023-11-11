import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const promisPicker = document.querySelector('.form');

promisPicker.addEventListener('submit', createPromises);

function createPromises(event) {
  event.preventDefault();

  const firstDelay = parseInt(promisPicker.elements['delay'].value);
  const step = parseInt(promisPicker.elements['step'].value);
  const amount = parseInt(promisPicker.elements['amount'].value);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * step;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          color: '#32a852',
          title: `✅ Fulfilled promise ${position} in ${delay}ms`,
          message: '',
          balloon: true,
          position: 'topRight',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          color: '#C41720',
          title: `❌ Rejected promise ${position} in ${delay}ms`,
          message: '',
          balloon: true,
          position: 'topRight',
        });
      });
  }
  promisPicker.reset();
}
