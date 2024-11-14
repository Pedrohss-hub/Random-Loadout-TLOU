let jsonItens, tinyWeapons, longWeapons, skils, specialWeapons

export async function getItensJson() {
    const response = await fetch('./itens.json')
    jsonItens = await response.json()

    return jsonItens
}
getItensJson()

export async function generateBuild () {
    tinyWeapons = jsonItens.tinyWeapons
    longWeapons = jsonItens.longWeapons
    skils = jsonItens.skils
    specialWeapons = jsonItens.specialWeapons

    function randomTinyWeapon () {
        let tinyWeaponPoints = 0
        const sizeTinyWeapons = tinyWeapons.length - 1
        let randomNumber = parseInt(Math.random() * (sizeTinyWeapons - 0) + 0)
        let tinyWeapon = tinyWeapons[randomNumber]

        while (tinyWeapon.disabled == true) {
            randomNumber = parseInt(Math.random() * (sizeTinyWeapons - 0) + 0)
            tinyWeapon = tinyWeapons[randomNumber]
        }

        if (tinyWeapon.silencer !== undefined){
            const silencer = Math.random() < 0.5;

            if (silencer) {
                tinyWeaponPoints += tinyWeapon.silencer
                tinyWeapon = `${tinyWeapon.name} + Silenciador`
            } else {
                tinyWeaponPoints += tinyWeapon.value
                tinyWeapon = `${tinyWeapon.name}`
            }

        } else {
            tinyWeapon = `${tinyWeapon.name}`
        }

        return {
            points: tinyWeaponPoints,
            result: tinyWeapon
        }
    }

    function randomLongWeapon () {
        let longWeaponPoints = 0
        const sizeLongWeapons = longWeapons.length - 1
        let randomLongWeapon = parseInt(Math.random() * (sizeLongWeapons - 0) + 0)
        let longWeapon = longWeapons[randomLongWeapon]

        while (longWeapon.disabled == true) {
            randomLongWeapon = parseInt(Math.random() * (sizeLongWeapons - 0) + 0)
            longWeapon = longWeapons[randomLongWeapon]
        }

        if (longWeapon.silencer !== undefined){
            const silencer = Math.random() < 0.5;

            if (silencer) {
                longWeaponPoints += longWeapon.silencer
                longWeapon = `${longWeapon.name} + Silenciador`
            } else {
                longWeaponPoints += longWeapon.value
                longWeapon = `${longWeapon.name}`
            }

        } else {
            longWeaponPoints += longWeapon.value
            longWeapon = `${longWeapon.name}`
        }

        return {
            points: longWeaponPoints,
            result: longWeapon
        }
    }

    function randomSkils () {
        let skilsPoints = 0
        let i = 0
        let arraySkils = []
        let sizeSkils = skils.length - 1
        let randomSkils = parseInt(Math.random() * (sizeSkils - 0) + 0)
        let ownSkil = skils[randomSkils]
        let nvl = parseInt(Math.random() * (3 - 1 + 1)) + 1
        let c = 0

        while (i < 4) {
            while (ownSkil.disabled == true) {
                randomSkils = parseInt(Math.random() * (sizeSkils - 0) + 0)
                console.log(randomSkils)
                ownSkil = skils[randomSkils]
                console.log(`${c} Tentativa`)
                while (ownSkil.disabled == true) {
                randomSkils = parseInt(Math.random() * (sizeSkils - 0) + 0)
                ownSkil = skils[randomSkils]
                console.log(`${c} Tentativa`)
            }
            }

            if (ownSkil[`nv${nvl}`] == undefined) {
                nvl -= 1
                skilsPoints += ownSkil[`nv${nvl}`]
        
            } else {
                skilsPoints += ownSkil[`nv${nvl}`]
            }
            
            ownSkil.actualNvl = nvl

            if (randomSkils !== 0) {
                ownSkil.name = `${ownSkil.name} ${nvl}`
                let c = 1
                while (c <= 3) {
                    if (c != nvl) {
                        delete ownSkil[`nv${c}`]
                    }

                    c++
                }
            
                skils.splice(randomSkils, 1)        
                sizeSkils = skils.length - 1
            }

            arraySkils.push({ ...ownSkil })
            randomSkils = parseInt(Math.random() * (sizeSkils - 0) + 0)
            ownSkil = skils[randomSkils]
            nvl = parseInt(Math.random() * (3 - 1 + 1)) + 1;
            i++
        }

        return {
            points: skilsPoints,
            result: arraySkils
        }
    }

    function randomSpecialWeapons () {
        let specialWeaponPoints = 0
        let sizeSpecialWeapons = specialWeapons.length - 1
        let randomSpecialWeapon = Math.floor(Math.random() * (sizeSpecialWeapons + 1));
        let specialWeapon = specialWeapons[randomSpecialWeapon]

        while (specialWeapon.disabled == true) {
            randomSpecialWeapon = parseInt(Math.random() * (sizeSkils - 0) + 0)
            specialWeapon = specialWeapons[randomSpecialWeapon]
        }

        specialWeaponPoints += specialWeapon.value

        return {
            points: specialWeaponPoints,
            result: specialWeapon.name
        }
    }

    let arrayFunctionsGame = [randomTinyWeapon, randomLongWeapon, randomSkils, randomSpecialWeapons]
    let points = 0
    let finalResultBuild = []

    for (let c = 0 ; c < arrayFunctionsGame.length; c++) {
        let objectFunction = arrayFunctionsGame[c]()
        points += objectFunction.points
        let itsLower = true

        while (itsLower) {
            if(points > 13){
                points -= objectFunction.points

                objectFunction = arrayFunctionsGame[c]()
                points += objectFunction.points
            } else {
                itsLower = false
            }
        }

        if (Array.isArray(objectFunction.result)) {
            objectFunction.result.forEach((element, index) => {
                finalResultBuild.push(`${element.name} ${element[`nv${element.actualNvl}`]}`)
            })

        } else {
            finalResultBuild.push(`${objectFunction.result} ${objectFunction.points}`)
        }
    }

    return {
        result: finalResultBuild,
        points: points,
        jsonItens: jsonItens,
    }
} 