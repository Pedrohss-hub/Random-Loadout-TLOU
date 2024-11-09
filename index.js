import { generateBuild } from "./algoritmo.js"

document.addEventListener('click', async () => {
    let objectBuild = await generateBuild()

    objectBuild.result.forEach((e, i)=>{
        switch (i) {
            case 0:
                console.log('Arma Curta')
                console.log(e)
                console.log('--------------------')
            break;

            case 1:
                console.log('Arma Longa')
                console.log(e)
                console.log('--------------------')
            break;

            case 2:
                console.log('Habilidades')
                console.log(e)
            break;

            case 3:
                console.log(e)
            break;

            case 4:
                console.log(e)
            break;

            case 5:
                console.log(e)
                console.log('--------------------')
            break;

            case 6:
                console.log('Arma Especial')
                console.log(e)
            break;

            default:
                console.log()
        }
    })

    console.log(objectBuild.points)
})