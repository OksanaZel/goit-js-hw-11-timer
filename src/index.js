import './main.scss';

const refs = {
  dateValue: document.querySelector('[data-value="days"]'),
  hoursValue: document.querySelector('[data-value="hours"]'),
  minsValue: document.querySelector('[data-value="mins"]'),
  secsValue: document.querySelector('[data-value="secs"]'),
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]')
}

class Timer {
  constructor({ targetDate, onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.targetDate = targetDate;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    const startTime = this.targetDate;
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
      clearInterval(this.intervalId);
      this.isActive = false;
      const time = this.getTimeComponents(0);
      this.onTick(time);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  targetDate: new Date('May 12, 2021 01:10:00'),
  onTick: updateClockface,
});

// timer.start();

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateClockface({ days, hours, mins, secs }) {
  refs.dateValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minsValue.textContent = mins;
  refs.secsValue.textContent = secs;
}

// class CountdownTimer {
//   constuctor({ selector, targetDate, onTick }) {
//     this.intervalId = null;
//     this.selector = selector;
//     this.targetDate = targetDate;
//     this.onTick = onTick;
    
//   }

//   start() {
    
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = this.targetDate - currentTime;

//       const time = this.getTimeComponents(deltaTime);

//       this.onTick(time);

//     }, 1000)
//   }

//   // stop() {
//   //   if (Date.now() > this.targetDate) {
//   //     clearInterval(this.intervalId);
//   //   }
//   // }

//     pad(value) {
//       return String(value).padStart(2, '0');
//     }
    
//     getTimeComponents(time) {
//     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
//     const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

//     return { days, hours, mins, secs };
// }
// }

// const countdownTimer = new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('May 16, 2021'),
//   onTick: updateSaleTimer,
// });


// function updateSaleTimer({ days, hours, mins, secs }) {
//   refs.dateValue.textContent = days;
//   refs.hoursValue.textContent = hours;
//   refs.minsValue.textContent = mins;
//   refs.secsValue.textContent = secs;
// }

// countdownTimer.start()
