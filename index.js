import { generateBuild } from "./algoritmo.js"

const buttonGenerate = document.querySelector('.control-generate')
const tinyWeapon = document.querySelector('.tinyWeapon')
const longWeapon = document.querySelector('.longWeapon')
const skils = document.querySelectorAll('.skil')
const specialWeapon = document.querySelector('.specialWeapon')
const resultPoints = document.querySelector('.result-points')

console.log(skils)


buttonGenerate.addEventListener('click', async () => {
    let objectBuild = await generateBuild()

    objectBuild.result.forEach((e, i)=>{
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
})