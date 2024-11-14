(async() => {
    const response = await fetch('./itens.json')
    const jsonItens = await response.json()
    jsonItens.tinyWeapons[0].name = "Teste"
    console.log(jsonItens)

    fetch('./itens.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonItens)
    })

    teste()
})()

async function teste() {
    const response = await fetch('./itens.json')
    const jsonItens = await response.json()
    console.log(jsonItens)
}