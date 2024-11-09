import { generateBuild } from "./algoritmo.js"

let historicBuild = []

const buttonGenerate = document.querySelector('.control-generate')
const tinyWeapon = document.querySelector('.tinyWeapon')
const longWeapon = document.querySelector('.longWeapon')
const skils = document.querySelectorAll('.skil')
const specialWeapon = document.querySelector('.specialWeapon')
const resultPoints = document.querySelector('.result-points')

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

    console.log(numberBuild)

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