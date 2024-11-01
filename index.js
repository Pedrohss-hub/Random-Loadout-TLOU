const tinyWeapons = [{name: "Revólver", value: 0}, {name: "Pistola 9mm", value: 0, silencer: 1}, {name: "Escopeta Curta", value: 1, silencer: 3}, {name: "Enforcer", value: 1, silencer: 3}, {name: "Pistola de Sequência", value: 1, silencer: 3}];

const longWeapons = [{name: "Livre", value: 0}, {name: "Escopeta Tática", value:3, silencer: 5}, {name: "Rifle do Velho Oeste", value: 2, silencer: 4}, {name: "Semiautomática", value: 2, silencer: 4}, {name: "Rifle Automático", value: 2, silencer: 4}, {name: "Rifle de Sequência", value: 2, silencer: 4}, {name: "Espingarda", value: 2, silencer: 4}, {name: "Arco", value: 3}, {name: "Semiautomático Com Mira", value: 2, silencer: 4}, {name: "Automático com Mira", value: 2, silencer: 4}, {name: "Sequência Com Mira", value: 2, silencer:4}, {name: "Rifle Variável", value: 2, silencer: 4}];

const superWeapons = [{name: "Livre", value: 0}, {name: "Cano Duplo", value: 1}, {name: "El Diablo", value: 3}, {name: "Rifle de Assalto", value: 3}, {name: "Escopeta", value: 4}, {name: "Rifle de Franco-Atirador", value: 3}, {name: "Lança-Chamas", value: 2}, {name: "Facão", value: 2}, {name: "Specter", value: 3}, {name: "Lançador", value: 3}, {name: "Besta", value: 3},];

const classes = [{name: "Livre", nv1:0, nv2:0, nv3:0},{name: "Zoom Automático da Pistola", nv1: 1, nv2: 2}, {name: "Especialista em Explosões", nv1: 1, nv2: 3}, {name: "Reanimador", nv1: 1, nv2: 3, nv3:4}, {name: "Lutador", nv1: 2, nv2: 3}, {name: "Furtividade", nv1: 2, nv2:4, nv3: 5}, {name: "Ouvidos Afiados", nv1: 1, nv2: 2, nv3: 3}, {name:"Estrategista", nv1: 1, nv2: 4, nv3: 5}, {name:"Olhos de Águia" , nv1: 2, nv2: 3, nv3: 4}, {name:"Criador" , nv1: 2, nv2: 4, nv3: 6}, {name:"Primeiros Socorros" , nv1: 2, nv2: 4, nv3: 6}, {name:"Atirador Afiado" , nv1: 2, nv2: 4, nv3: 5}, {name:"Maratonista" , nv1: 1, nv2: 3}, {name:"Coletor" , nv1: 3, nv2: 5}, {name:"Carrasco" , nv1: 1, nv2: 3, nv3: 4}, {name:"Explorador" , nv1: 2, nv2: 4, nv3: 5}, {name:"Marcador de Dano" , nv1: 2, nv2: 4}, {name:"Cosciência" , nv1: 1, nv2: 3}, {name:"Coragem" , nv1: 1, nv2: 3}, {name:"Pistoleiro" , nv1: 2, nv2: 4}, {name:"Especialista em Bombas" , nv1: 2, nv2: 3, nv3: 5}, {name:"Agilidade" , nv1: 2, nv2: 4}, {name:"Lobo Solitário" , nv1: 2, nv2: 3}, {name:"Segunda Chance" , nv1: 1, nv2: 2}, {name:"Polivalente" , nv1: 5, nv2: 10}, {name:"Sortudo" , nv1: 2, nv2: 3, nv3: 4}, {name:"Eficiência Letal" , nv1: 2, nv2: 3}];


let points = 0;

function randomClasses () {
    let classesPoints = 0
    let i = 0
    let arrayClass = []
    let sizeClasses = classes.length - 1
    let randomClasses = parseInt(Math.random() * (sizeClasses - 0) + 0)
    let ownClass = classes[randomClasses]
    let nvl = parseInt(Math.random() * (3 - 1 + 1)) + 1;

    while (i < 4) {
        if (ownClass[`nv${nvl}`] == undefined) {
            nvl -= 1
            classesPoints += ownClass[`nv${nvl}`]
    
        } else {
            classesPoints += ownClass[`nv${nvl}`]
        }
        
        ownClass.actualNvl = nvl

        if (randomClasses !== 0) {
            ownClass.name = `${ownClass.name} ${nvl}`
            let c = 1
            while (c <= 3) {
                if (c != nvl) {
                    delete ownClass[`nv${c}`]
                }

                c++
            }
        
            classes.splice(randomClasses, 1)        
            sizeClasses = classes.length - 1
        }

        arrayClass.push({ ...ownClass })
        randomClasses = parseInt(Math.random() * (sizeClasses - 0) + 0)
        ownClass = classes[randomClasses]
        nvl = parseInt(Math.random() * (3 - 1 + 1)) + 1;
        i++
    }
    console.log()
    console.log("Classes")
    arrayClass.forEach( (item) => {
        console.log(item.name)
    })
    console.log('------------------')

    return classesPoints
}

function randomSuperWeapons () {
    let superWeaponPoints = 0
    const sizeSuperWeapons = superWeapons.length - 1
    let randomSuperWeapon = Math.floor(Math.random() * (sizeSuperWeapons + 1));
    let superWeapon = superWeapons[randomSuperWeapon]

    superWeaponPoints += superWeapon.value
    console.log()
    console.log("Armas Especiais")
    console.log(superWeapon.name)
    console.log('------------------')

    return superWeaponPoints
}

function randomLongWeapon () {
    let longWeaponPoints = 0
    const sizeLongWeapons = longWeapons.length - 1
    let randomLongWeapon = parseInt(Math.random() * (sizeLongWeapons - 0) + 0)
    let longWeapon = longWeapons[randomLongWeapon]

    console.log()
    console.log("Arma Longa")

    if (longWeapon.silencer !== undefined){
        const silencer = Math.random() < 0.5;

        if (silencer) {
            longWeaponPoints += longWeapon.silencer
            console.log(`${longWeapon.name} + Silenciador`)
        } else {
            longWeaponPoints += longWeapon.value
            console.log(`${longWeapon.name}`)
        }

    } else {
        longWeaponPoints += longWeapon.value
        console.log(longWeapon.name)
    }
    console.log('------------------')

    return longWeaponPoints
}

function randomTinyWeapon () {
    let tinyWeaponPoints = 0
    const sizeTinyWeapons = tinyWeapons.length - 1
    let randomNumber = parseInt(Math.random() * (sizeTinyWeapons - 0) + 0)
    let tinyWeapon = tinyWeapons[randomNumber]

    console.log()
    console.log("Arma Curta")

    if (tinyWeapon.silencer !== undefined){
        const silencer = Math.random() < 0.5;

        if (silencer) {
            tinyWeaponPoints += tinyWeapon.silencer
            console.log(`${tinyWeapon.name} + Silenciador`)
        } else {
            tinyWeaponPoints += tinyWeapon.value
            console.log(`${tinyWeapon.name}`)   
        }

    } else {
        console.log(tinyWeapon.name)
    }
    console.log('------------------')

    return tinyWeaponPoints
}
let arrayFunctionsGame = [randomTinyWeapon, randomLongWeapon, randomClasses, randomSuperWeapons]

for (c = 0 ; c < arrayFunctionsGame.length; c++) {
    points += arrayFunctionsGame[c]()

}
console.log(points)
