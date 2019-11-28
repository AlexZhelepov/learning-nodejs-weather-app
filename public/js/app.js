const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const forecastPar_1 = document.querySelector('#par-1')
const forecastPar_2 = document.querySelector('#par-2')
const forecastPar_3 = document.querySelector('#par-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    const url = '/weather?address=' + location

    forecastPar_2.textContent = ''
    forecastPar_3.textContent = ''    
    forecastPar_1.textContent = 'Загрузка...'
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecastPar_1.textContent = data.error
                return
            }

            forecastPar_1.textContent = data.location
            forecastPar_2.textContent = data.address
            forecastPar_3.textContent = data.forecast
        })
    })
})