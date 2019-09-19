window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //timer
    function countTimer(deadline){
        let timerDays = document.querySelector('#timer-days'),
            timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000, 
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60) % 24,
                days = Math.floor(timeRemaining / 60 / 60 / 24);
                return {timeRemaining, days, hours, minutes, seconds};
        }
        
        function updateCLock(){
           let timer = getTimeRemaining();
           timerDays.textContent = timer.days;
           timerHours.textContent = timer.hours;
           timerMinutes.textContent = timer.minutes;
           timerSeconds.textContent = timer.seconds;
           
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
    }

    countTimer('01 october 2019');
    
});