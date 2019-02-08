$('#Date, #Date2, #Dateend, #Dateend2').daterangepicker({
    "singleDatePicker": true,
    "showISOWeekNumbers": true,
    "timePicker": false,
    "showDropdowns": true,
    "autoUpdateInput": true,
    "locale": {
        "cancelLabel": 'Закрыть',
        "format": "DD.MM.YYYY",
        "applyLabel": "Принять",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "",
        "daysOfWeek": [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        "firstDay": 1
    },
    "showCustomRangeLabel": false,
    "startDate": 1,
    "opens": "center",
    "minDate": moment('2012-01-01'),
    "maxDate": moment().endOf('year')
});

