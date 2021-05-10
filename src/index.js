import './main.scss';

// const dateNow = Date.now();
// console.log(dateNow);

const timer = {
  start() {
    const targetDate = Date.now('May 13, 2021');
    console.log(targetDate);

    setInterval(() => {
      const currentTime = Date.now();
      // console.log(currentTime);
      console.log(targetDate - currentTime);
    }, 1000)
  }
}

// timer.start();

function getTimeComponents(time) {
  /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
  const secs = Math.floor((time % (1000 * 60)) / 1000);
  
  return { days, hours, mins, secs };
}

// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('May 13, 2021'),
// });