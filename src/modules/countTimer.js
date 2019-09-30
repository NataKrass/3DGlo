const countTimer = (deadline) =>{
    let timerDays = document.querySelector('#timer-days'),
        timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    function checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
           }
    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000, 
            seconds = Math.floor(timeRemaining % 60),
            secondsZero = checkTime(seconds),
            minutes = Math.floor((timeRemaining / 60) % 60),
            minutesZero = checkTime(minutes),
            hours = Math.floor(timeRemaining / 60 / 60),
            hoursZero = checkTime(hours);
           //days = Math.floor(timeRemaining / 60 / 60 / 24);
            return {timeRemaining, hoursZero, minutesZero, secondsZero};
    }
    
    const updateCLock = () => {
       let timer = getTimeRemaining();
       
       timerHours.textContent = timer.hoursZero;
      
       timerMinutes.textContent = timer.minutesZero;
       timerSeconds.textContent = timer.secondsZero;
       
       if(timer.timeRemaining > 0){
        setInterval(updateCLock, 1000)
       } else {
        timerDays.textContent = '0';
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
       }   
    }
    updateCLock();
};

export default countTimer;