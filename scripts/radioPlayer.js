export const radioPlayerInit = () => {
    const radio              = document.querySelector('.radio');
    const radioCoverImg      = document.querySelector('.radio-cover__img');
    const radioHeaderBig     = document.querySelector('.radio-header__big');
    const radioNavigation    = document.querySelector('.radio-navigation');
    const radioItem          = document.querySelectorAll('.radio-item');
    const radioStop          = document.querySelector('.radio-stop');

    // регулировка звука
    const radioPlayerVolume     = document.querySelectorAll('.radio-player-volume')
    const radioVolume           = document.querySelector('.radio-volume');
    const volumeRadioDown       = document.querySelector('.volume-radio-down');
    const volumeRadioUp         = document.querySelector('.volume-radio-up');

    const audio = new Audio();
    audio.type  = 'audio/acc';

    // Отключение кнопки
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', event => {
        const target        = event.target;
        const parrent       = target.closest('.radio-item');
        selectItem(parrent);

        const title         = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg           = parrent.querySelector('.radio-img').src;
        radioCoverImg.src   = urlImg;

        radioStop.disabled  = false;
        audio.src           = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        }else {
            audio.pause();
        }
        changeIconPlay();
    });




    radioPlayerInit.stop = () => {
            audio.pause();
            changeIconPlay();
    };


    // уровень громкости и управление звуком
    radioVolume.addEventListener('input', () => {
        audio.volume  = radioVolume.value / 100;
    });

    volumeRadioDown.addEventListener('click', () => {
        audio.volume        = 0;
        radioVolume.value   = 0;
    });

    volumeRadioUp.addEventListener('click', () => {
        audio.volume        = 1;
        radioVolume.value   = audio.volume *100;
    });

    audio.volume        = 0.5;
    radioVolume.value   = audio.volume *100;

};