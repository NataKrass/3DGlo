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
    }
    countTimer('01 october 2019');
    
    //menu
    const toggleMenu = () =>{
        const btnMenu = document.querySelector('.menu'),
              closeBtn = document.querySelector('.close-btn'),
              menu = document.querySelector('menu'),
              body = document.querySelector('body');
             
        const handlerMenu = () => {
            menu.classList.add('active-menu');
        };
        const closeMenu = () => {
            menu.classList.remove('active-menu');
        };
        body.addEventListener('click', (e)=> {
            let target = e.target;
            target = target.closest('.menu');
            if(target == btnMenu){
                handlerMenu();
            } else {
                closeMenu();
            } 
         })
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

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
                popupContent.style.left = '-100%';
            } else {
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                    popupContent.style.left = '-100%';
                 }
            }
           
        })
    }
    togglePopup();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab');
                    if(target){
                        tab.forEach((item, i) => {
                            if(item === target){
                               toggleTabContent(i); 
                            }
                        });
                    }
            });
    }
    tabs();

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
           
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');
        
        let currentSlide = 0,
            dotNew,
            interval;

        for(let i = 0; i < slide.length; i++){
            dotNew = document.createElement('li');
        dotNew.classList.add('dot');
        dots.appendChild(dotNew);
        }
        
    
        let  dot = document.querySelectorAll('.dot');
        dot[0].classList.add('dot-active');
        const prevSlide = (elem, index, strClass) => {
               elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;
            
             if(!target.matches('.portfolio-btn, .dot')){
                 return;
             }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if( target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        })

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                startSlide();
            }
        });
        startSlide(5000); 
     
    }
    slider();

    //team
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach((elem) => {
        let src = elem.src;

        elem.addEventListener('mouseenter', (event) => {
           let srcNew = event.target.dataset.img;
           event.target.src = srcNew;
        })
        
        elem.addEventListener('mouseleave', (event) => {
            event.target.src = src;
        })
    });

    //calculator
    let inputsNumber = document.querySelectorAll(".calc-item");
    inputsNumber.forEach((e) => {
        e.addEventListener('input', () => {
        e.value = e.value.replace(/[^\d.]/g, '');
        })
    })

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                  squareValue = +calcSquare.value;
           
            if(calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5){
                dayValue *= 2;
            } else if(calcDay.value && calcDay.value < 10){
                dayValue *= 1.5;
            }
  
            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            } 
            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if(target.matches('select') || target.matches('.calc-square') ||
            target.matches('.calc-day') || target.matches('.calc-count')) {
               countSum();
            }


        })
    }

    calc(100);
        
    //send ajax-form
    let formHeader = document.getElementById('form1'),
        formFooter = document.getElementById('form2'),
        formModal = document.getElementById('form3');
 
    const sendForm = (form) => {
        const errorMessage = "Ошибка",
         loadMessage = "Загрузка...",
         successMessage = "Данные успешно отправлены!",
        
         statusMessage = document.createElement('div');
         statusMessage.style.cssText = 'font-size: 2rem;';
         statusMessage.classList.add('form-text');
        
         form.addEventListener('submit', (event) => {
             event.preventDefault();
             form.appendChild(statusMessage);
             
             return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();

                request.addEventListener('readystatechange', () => {
                   statusMessage.textContent = loadMessage;
                   if(request.readyState !== 4) {
                       return;
                   }
                   if (request.status === 200){
                       statusMessage.textContent = successMessage;
                   } else {
                       statusMessage.textContent = errorMessage;
                   }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Conent-Type', 'application/json');
                const formData = new FormData(form);
                let body = {};
                
                for(let val of formData.entries()){
                    body[val[0]] = val[1];
                }
                console.log(body)
                request.send(JSON.stringify(body));
             });
            
             const inputs = document.querySelectorAll('input');
             inputs.forEach((elem) => elem.value = '');
           
        });
    };
    sendForm(formHeader);
    sendForm(formFooter);
    sendForm(formModal);

    //validation
    let formPhone = document.querySelectorAll('.form-phone');
    formPhone.forEach((e) => {
        e.addEventListener('input', () => {
        e.value = e.value.replace(/[^0-9+]/, '');
        })
    })

    let formName = document.querySelectorAll('.form-name'),
        formMessage = document.querySelector('#form2-message');
    formName.forEach((e) => {
        e.addEventListener('input', () => {
        e.value = e.value.replace(/[^А-Яа-яЁё ]/, '');
        })
    });
    formMessage.addEventListener('input', () => {
        formMessage.value = formMessage.value.replace(/[^А-Яа-яЁё ]/, '');
     })
    
    
});

//05006352577