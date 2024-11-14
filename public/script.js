import { generateBuild } from "./algoritmo.js"
import { getItensJson } from "./algoritmo.js"

const columnTinyWeapons = document.querySelector('.column-tinyWeapons')
const columnLongWeapons = document.querySelector('.column-longWeapons')
const columnSkilsWeapons = document.querySelector('.column-skils')
const columnSpecialWeapons = document.querySelector('.column-specialWeapons')
let itensJson

(async () => {
    itensJson = await getItensJson()
    console.log(itensJson)

    let c

    //Display das Armas Curtas
    for (c = 0; itensJson.tinyWeapons.length - 1 > c; c++) {
        displayItensPainel(itensJson.tinyWeapons[c].name, columnTinyWeapons)
    }
    //Display das Armas Longas
    for (c = 0; itensJson.longWeapons.length - 1 > c; c++) {
        displayItensPainel(itensJson.longWeapons[c].name, columnLongWeapons)
    }
    //Display das Habilidades
    for (c = 0; itensJson.skils.length - 1 > c; c++) {
        displayItensPainel(itensJson.skils[c].name, columnSkilsWeapons)
    }
    //Display das Armas Especiais
    for (c = 0; itensJson.specialWeapons.length - 1 > c; c++) {
        displayItensPainel(itensJson.specialWeapons[c].name, columnSpecialWeapons)
    }

    appendListener()

})()

function displayItensPainel(nameItenJson, column) {
    let divBoxIten = document.createElement('div')
    divBoxIten.classList.add('box-itens')

    let nameIten = document.createElement('p')
    nameIten.textContent = nameItenJson

    let inputCheckBox = document.createElement('input')
    inputCheckBox.type = 'checkbox'
    inputCheckBox.checked = true

    divBoxIten.appendChild(nameIten)
    divBoxIten.appendChild(inputCheckBox)
    column.appendChild(divBoxIten)
}

const buttonGenerate = document.querySelector('.control-generate')
const tinyWeapon = document.querySelector('.tinyWeapon')
const longWeapon = document.querySelector('.longWeapon')
const skils = document.querySelectorAll('.skil')
const specialWeapon = document.querySelector('.specialWeapon')
const resultPoints = document.querySelector('.result-points')

let historicBuild = []
let numberBuild
let objectBuild

buttonGenerate.addEventListener('click', async () => {
    objectBuild = await generateBuild()
    historicBuild.push(objectBuild)
    if (historicBuild.length > 8) {
        historicBuild.shift()
    }

    displayBuild(objectBuild)
    
    numberBuild = historicBuild.length -1

    //Condição botão de voltar
    if (numberBuild == 0 ) {
        back.disabled = true
    } else {
        back.disabled = false
    }
    // Se não entender, use isso nos três botões (inclusive nesse): console.log(numberBuild, historicBuild.length-1)
})

const back = document.querySelector('.back')
const next = document.querySelector('.next')

back.addEventListener('click', () => {
    numberBuild -= 1
    displayBuild(historicBuild[numberBuild])

    //Condição botão de voltar
    if (numberBuild == 0 ) {
        back.disabled = true
    } else {
        back.disabled = false
    }
    //Condição botão de avançar
    if (numberBuild == historicBuild.length-1) {
        next.disabled = true
    } else {
        next.disabled = false
    }
})

next.addEventListener('click', () => {
    numberBuild += 1
    displayBuild(historicBuild[numberBuild])

    //Condição botão de voltar
    if (numberBuild == 0 ) {
        back.disabled = true
    } else {
        back.disabled = false
    }
    //Condição botão de avançar
    if (numberBuild == historicBuild.length-1) {
        next.disabled = true
    } else {
        next.disabled = false
    }
})

function displayBuild (build) {
    build.result.forEach((e, i)=>{
        switch (i) {
            case 0:
                tinyWeapon.textContent = e
            break;

            case 1:
                longWeapon.textContent = e
            break;

            case 2:
                skils[0].textContent = e
            break;

            case 3:
                skils[1].textContent = e
            break;

            case 4:
                skils[2].textContent = e
            break;

            case 5:
                skils[3].textContent = e
            break;

            case 6:
                specialWeapon.textContent = e
            break;

            default:
                console.log()
        }
    })
    resultPoints.textContent = objectBuild.points
}

function appendListener (){
    let listItens
    let boxItens = document.querySelectorAll('.box-itens')
    boxItens.forEach(e => {
        e.children[1].addEventListener('click', () => {
            if (e.children[1].checked) {
                listItens = itensJson[e.parentElement.classList[1]]
                for (let i = 0; listItens.length -1 > i; i++){
                    if (listItens[i].name == e.children[0].textContent) {
                        listItens[i].disabled = false
                        console.log(listItens[i])

                
                        i = listItens.length
                    }
                }


            } else {
                console.log('Desligou')
                listItens = itensJson[e.parentElement.classList[1]]
                for (let i = 0; listItens.length -1 > i; i++){
                    console.log(i)
                    if (listItens[i].name == e.children[0].textContent) {
                        listItens[i].disabled = true
                        console.log(listItens[i])
                        console.log('Achou')

                        i = listItens.length
                    }
                }
            }
        })
    })
}
