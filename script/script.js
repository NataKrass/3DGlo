window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //timer
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
                minutes = Math.floor((timeRemaining / 60) % 60),
                minutesZero = checkTime(minutes),
                hours = Math.floor(timeRemaining / 60 / 60) % 24,
                hoursZero = checkTime(hours),
                days = Math.floor(timeRemaining / 60 / 60 / 24);
                return {timeRemaining, days, hoursZero, minutesZero, seconds};
        }
        
        const updateCLock = () => {
           let timer = getTimeRemaining();
           timerDays.textContent = timer.days;
           timerHours.textContent = timer.hoursZero;
          
           timerMinutes.textContent = timer.minutesZero;
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
    
    //menu
    const toggleMenu = () =>{
        const btnMenu = document.querySelector('.menu'),
              closeBtn = document.querySelector('.close-btn'),
              menu = document.querySelector('menu'),
              menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        for (let i = 0; i < menuItems.length; i++){
            menuItems[i].addEventListener('click', handlerMenu);
        };

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            popupClose = document.querySelector('.popup-close');
        
        popupContent.style.transition = '1s';
        popupContent.style.left = '-100%';

        function animation(){
            popupContent.style.left = '38%';
        };
     
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if(document.documentElement.clientWidth > 576) {
                    setInterval(animation, 100);
                } else {
                    popupContent.style.left = '14%';
                }
             
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popupContent.style.left = '-100%';
        });
        console.log(document.documentElement.clientWidth)
    }
    togglePopup();
});