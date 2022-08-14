$(document).ready(function () {
    $('.context.example .ui.sidebar')
        .sidebar({
            context: $('.context.example .bottom.segment')
        })
        .sidebar('attach events', '.context.example .menu .item');

    $('.ui.rating')
        .rating();

    $('#pp').click(function () {
        $('html, body').animate({
            scrollTop: $("#pp-stats").offset().top
        }, 200);
    })
    $('#prod').click(function () {
        $('html, body').animate({
            scrollTop: $("#prod-stats").offset().top
        }, 300);
    })
    $('.ui.accordion')
        .accordion({
            selector: {
                trigger: '.title'
            }
    });
    // check error
    let testFlag = $(`.content .accordion .title`);
    let summuryMsg = 'All test are OK !'
    let failNb = 0;
    let successNb = 0;
    for (t of testFlag) {
        if (t.getAttribute('class').includes('error')) {
            t.parentElement.parentElement.parentElement.querySelector('.title').setAttribute('class', 'ui error message title')
            failNb++;
        } else if (t.getAttribute('class').includes('success')) {
            successNb++;
        }
    }
    document.querySelector('#testOk span').innerText = `${successNb} tests OK`;
    let summuryMsgElement = document.querySelector('#summuryMsg');
    let testKoElement = document.querySelector('#testKo');
    if (failNb > 0) {
        summuryMsgElement.innerText = 'There are some error !'
        testKoElement.insertAdjacentHTML('beforeend', `<i class="circle red large icon"></i> <span class="ui large text">${failNb} test(s) KO</b>`);
    } else {
        summuryMsgElement.innerText = 'All test are OK !'
    }

    // update last execution date
    let tm = $(`div#lastExecution i`);
    for (t of tm) {
        let isOld = false;
        let lastSec = Math.floor(((Date.now() - parseInt(t.getAttribute('id'))) / 1000));
        let lastMin = Math.floor(lastSec / 60);
        let lastHours = Math.floor(lastSec / 3600);
        let lastDay = Math.floor(lastSec / 86400);
        let last = `Last execution ${lastSec} sec ago`
        if (lastDay >= 1) {
            isOld = true;
            last = `Last execution ${lastDay} days ago`
        } else if (lastHours >= 1) {
            last = `Last execution ${lastHours} hours ago`
            if (lastHours > 6) {
                isOld = true;
            }
        } else if (lastMin >= 1) {
            last = `Last execution ${lastMin} min ago`
        }
        t.innerText = last;
        if (isOld) {
            // check old
            let scCountryParent = t.parentElement;
            let scGeneralParent = scCountryParent.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('#info i');
            if (scCountryParent) {
                scCountryParent.setAttribute('class', 'grey column');
            }
            if (scGeneralParent) {
                // add text to target old test
                scGeneralParent.innerText = '';
            }
            // let infoMsg = 'Certains tests ont été exécutés il y a plus de 6 heures, il sont affichés comme obselètes, il est conseillé de les réexécuter.';
            // let info = document.querySelector('#infoMsg');
            // info.setAttribute('class', 'ui info message');
            // info.innerText = infoMsg;
        }
    }
    let meteoD = document.querySelector('#todayDate')
    let weatherStatus = document.querySelector('#weatherStatus')
    let goodWeather = 'sun yellow huge icon'
    let mediumWeather = 'cloud sun yellow huge icon'
    let badWeather = 'cloud showers heavy black huge icon'
    let currentWeather = goodWeather;
    let currentDate = new Date();
    var options = {weekday: "long", month: "long", day: "2-digit"};
    meteoD.innerText = currentDate.toLocaleDateString("en-Uk", options)
    if (failNb > 0) {
        if (failNb > 4) {
            currentWeather = badWeather;
        } else {
            currentWeather = mediumWeather;
        }
    } else {
        currentWeather = goodWeather;
    }
    weatherStatus.setAttribute('class', currentWeather)
})