const noKennelDogsGroup = document.querySelector('#noKennelDogsGroup')
var filterBtn = document.querySelector('.filterBtn')

async function listNoKennelDogs() {
    filterBtn.innerHTML = `<button class="btn btn-success ml-6" onclick="filterDogs(4)">Filtrar</button>`

    try {

        const res = await axios.get('/dog/noKennel')
        data = res.data
        noKennelDogsGroup.innerHTML = ''

        data.reverse()

        for (dog of data) {
            behaviorsHTML = ''
            const behaviorRes = await axios.get('/behavior/' + dog.id)
            const behaviors = behaviorRes.data

            if (behaviors.length > 0) {
                for (behavior in behaviors) {
                    if (behavior == 2) break

                    behaviorsHTML += `<p>${behaviors[behavior].name} <br></p>`
                }
            } else {
                behaviorsHTML = '<p><i> Sem comportamentos cadastrados </i></p>'
            }

            noKennelDogsGroup.innerHTML += `
            <div id="${dog.id}" class="card text-center text-white bg-dark " style="max-width: 14rem; margin: 10px; min-width: 14rem;">
                <img src="/images/${dog.image}" class="card-img-top" alt="...">
                <div class="card-header" style="font-size: 25px">${dog.name}</div>
                <div class="card-body bg-dark ">
                    <p class="card-title">${behaviorsHTML}</p>
                    <p class="card-text">${dog.entryDate}</p>
                    <a href ='#' onclick='deleteNoKennelDog(${dog.id})' class = 'trash-icon'> 
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h 2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </a>
                </div>
                <div class="card-footer" style="display: flex; flex-direction: row; justify-content: space-around">
                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#dogDetail" onclick="dogDetailsNoKennel(${dog.id})">Ver detalhes</a>
                    <button data-toggle="modal" data-target="#dogEditModal" type="button" class="btn btn-warning" style="margin-rigth: 0" onclick="fillModal(${dog.id})"><img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/></button>
                </div>
            </div>`
        }

    } catch (err) {
        console.log('Error while listing a dog ' + err);
    }
}

function deleteNoKennelDog(id) {
    if (!confirm('Tem certeza que deseja fazer isso?')) return

    axios.delete('/dog/' + id).then(() => {
        listNoKennelDogs()
    }).catch(err => {
        console.log('Error while deleting a dog ' + err);
    })
}

async function dogDetailsNoKennel(id) {
    const modalHeader = document.querySelector('#header')
    const name = document.querySelector('#dogName')
    const weight = document.querySelector('#dogWeight')
    const age = document.querySelector('#dogAge')
    const size = document.querySelector('#dogSize')
    const sex = document.querySelector('#dogSex')
    const behaviorElement = document.querySelector('#dogBehavior')
    const date = document.querySelector('#dogDate')
    const btns = document.querySelector('#btns')

    modalHeader.innerHTML = ''
    name.innerHTML = ''
    weight.innerHTML = ''
    age.innerHTML = ''
    size.innerHTML = ''
    sex.innerHTML = ''
    behaviorElement.innerHTML = ''
    date.innerHTML = ''
    btns.innerHTML = ''
    behaviorsHTML = ''

    setLocalId(id)

    try {
        const behaviorRes = await axios.get('/behavior/' + id)
        const res = await axios.get(`/dog/find/` + id)

        const behaviors = behaviorRes.data
        dog = res.data

        if (behaviors.length > 0) {
            for (behavior in behaviors) {
                behaviorsHTML += `<li class="list-group-item list-group-item-dark">${behaviors[behavior].name}</li> `
            }
        } else {
            behaviorsHTML = '<p><i> Sem comportamentos cadastrados </i></p>'
        }

        btns.innerHTML = `
            <a data-toggle="modal" data-target="#behaviorModal" class="btn btn-info ml-6" style="color: white; margin-bottom: 5px;" >Escolher comportamentos</a>
            <a href="/choose" class="btn btn-success" style="color: white; margin-bottom: 5px" id="addBtn" onclick="setLocalId(${dog.id})">Escolher canil</a>
            <a href="/outerDogs" class="btn btn-secondary" style="color: white; margin-bottom: 5px;" id="outerBtn" onclick="outerStatus(${dog.id})">Marcar como ausente</a>
            <a href="/adoptedDogs" class="btn btn-warning" style="color: white;" id="adoptedBtn" onclick="adoptedStatus(${dog.id})">Adotar</a>
        `

        modalHeader.innerHTML = `<img src="/images/${dog.image}" class="card-img-top" alt="...">`
        name.innerHTML = `${dog.name}`
        weight.innerHTML = `${dog.weight}`
        age.innerHTML = `${dog.age}`
        size.innerHTML = `${dog.size}`
        sex.innerHTML = `${dog.sex}`
        behaviorElement.innerHTML = `${behaviorsHTML}`
        date.innerHTML = `${dog.entryDate}`

    } catch (err) {
        console.log('Error while showing noKennel details' + err);
    }

}

async function filterDogs(type) {
    const checkboxes = $('.filterCheckbox')
    let behaviors = []

    for (check of checkboxes) {
        if (check.checked) {
            behaviors.push({ 'name': check.value })
        }
    }

    console.log(behaviors)

    try {
        const res = await axios.put('/behavior/dogs/' + type, behaviors)
        dogs = res.data
    } catch (err) {
        console.log('Error getting dogs behaviors ' + err)
    }

    listFilteredDogs(dogs)
}

async function listFilteredDogs(dogs) {

    try {
        noKennelDogsGroup.innerHTML = ''
        dogs.reverse()

        for (dog of dogs) {
            behaviorsHTML = ''
            const behaviorRes = await axios.get('/behavior/' + dog.id)
            const behaviors = behaviorRes.data

            if (behaviors.length > 0) {
                for (behavior in behaviors) {
                    if (behavior == 2) break

                    behaviorsHTML += `<p>${behaviors[behavior].name} <br></p>`
                }
            } else {
                behaviorsHTML = '<p><i> Sem comportamentos cadastrados </i></p>'
            }

            noKennelDogsGroup.innerHTML += `
                <div id="${dog.id}" class="card text-center text-white bg-dark " style="max-width: 14rem; margin: 10px; min-width: 14rem;">
                    <img src="/images/${dog.image}" class="card-img-top" alt="...">
                    <div class="card-header" style="font-size: 25px">${dog.name}</div>
                    <div class="card-body bg-dark ">
                        <p class="card-title">${behaviorsHTML}</p>
                        <p class="card-text"><b>${dog.entryDate}</b></p>
                        <p class="card-text" style="color: red"><b>${dog.exitDate}</b></p>

                        <a href ='#' onclick='deleteDog(${dog.id})' class = 'trash-icon'> 
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h 2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="card-footer" style="display: flex; flex-direction: row; justify-content: space-around">
                        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#dogDetail" onclick="dogDetails(${dog.id})">Ver detalhes</a>
                        <button data-toggle="modal" data-target="#dogEditModal" type="button" class="btn btn-warning" style="margin-rigth: 0" onclick="fillModal(${dog.id})"><img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/></button>
                    </div>
                </div>`
        }

    } catch (err) {
        console.log('Error while listing filtered dogs ' + err);
    }

}

function setLocalId(id) {
    localStorage.setItem('dogId', id)
}

listNoKennelDogs()