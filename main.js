//utilities
const calendario = document.querySelector('.calendar')
const modalShow = document.querySelector('.modal-overlay')
const modalButton = document.querySelector('.modal-button')
const modalTxt = document.querySelector('.modal-txt')
let openedCells = []
const controlOpened = localStorage.getItem('opened')

//controllo giorni clickati
if(controlOpened){
    openedCells = JSON.parse(controlOpened)
}

// funzione crea singolo giorno
function creaCella(i){
    return `<div class="col-2 col-md-1 calendar-cell text-center d-flex" data-giorno='${i+1}'>
                <div class="my-auto mx-auto">${i+1}</div>
            </div>`
}

// stampo giorni
for(let i = 0; i < 25; i++){
    const box =creaCella(i)
    calendario.innerHTML+=box
}

// aggiungo eventi e classi ai giorni
const celle = document.querySelectorAll('.calendar-cell')
for(let i = 0; i < celle.length; i++){
    const cella = celle[i]
    if(openedCells.includes(cella.dataset.giorno)){
        cella.classList.add('opened')
    }

    //evento click giorno
    cella.addEventListener('click', function(){
        cella.classList.add('opened')
        modalShow.classList.remove('d-none')
        if(25-(i+1)===1){
            modalTxt.innerHTML = `manca ${25-(i+1)} giorni a natale`
        } else if(25-(i+1)>0){
            modalTxt.innerHTML = `mancano ${25-(i+1)} giorni a natale`
        } else {
            modalTxt.innerHTML = 'BUON NATALE!'
        }
        addOpenedCells(cella.dataset.giorno)
        console.log(openedCells)
    })
}

// evento chiusura modale
modalButton.addEventListener('click', function(){
    modalShow.classList.add('d-none')
})

//aggiungo cella a lista celle aperte
function addOpenedCells(num){
    if(!openedCells.includes(num)){
        openedCells.push(num)
        localStorage.setItem('opened', JSON.stringify(openedCells))
    }
}
