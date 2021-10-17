var kennelForms = document.querySelector('#kennelForm')
var kennelCards = document.querySelector('.kennelCards')


async function createKennel() {

    const formData = kennelForms.name.value

    if (!formData) {
        return console.error('Field name was not passed');
    }

    try {
        await axios.post('/kennel', {
            name: formData
        })
    } catch (error) {
        console.log('Error while creatting a new kennel ' + err);
    }
}

async function listAllKennels() {
    const res = await axios.get('/kennel')

    const kennels = res.data
    kennels.reverse()

    kennelCards.innerHTML = ''

    for (kennel of kennels) {

        const dogCount = await getCount(kennel.id)

        if (window.location.pathname == '/choose') {
            kennelCards.innerHTML += `
            <div class="card text-center text-white bg-dark " style="max-width: 18rem; margin: 10px; min-width: 18rem;">
                <div id="cardHeader" class="card-header " ondblclick="updateName(${kennel.id})" style="font-size: 25px;">${kennel.name}</div>
                <div class="card-body">
                    <a href ='#' onclick='deleteKennel(${kennel.id})' class = 'trash-icon'>
                         <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h 2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </a>
                    <h5 class="card-title"><b>${dogCount}</b> Cachorros</h5>
                    <a href="#" id="btnChoose" class="btn btn-primary" onclick="updteDogKennel(${kennel.id})">Adicionar ao canil</a>
                </div>
            </div>`
        } else {
            kennelCards.innerHTML += `
            <div class="card text-center text-white bg-dark " style="max-width: 18rem; margin: 10px; min-width: 18rem;">
                <div id="cardHeader" class="card-header " ondblclick="updateName(${kennel.id})" style="font-size: 25px;">${kennel.name}</div>
                <div class="card-body">
                    <a href ='#' onclick='deleteKennel(${kennel.id})' class = 'trash-icon'>
                         <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h 2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </a>
                    <h5 class="card-title"><b>${dogCount}</b> Cachorros</h5>
                    <a id="btnSeeDogs" href="#" class="btn btn-primary" onclick="listKennelDogs(${kennel.id})">Ver canil</a>
                    <button id="btnUpdate" data-toggle="modal" data-target="#kennelModalEdit" type="button" class="btn btn-warning" style="margin-rigth: 0" onclick="updateName(${kennel.id})"><img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/></button>
                </div>
            </div>`
        }

    }


    return
}

function updateName(id) {
    var kennelFormsEdit = document.querySelector('#kennelFormEdit')



    kennelFormsEdit.addEventListener('submit', event => {
        event.preventDefault()

        const formData = kennelFormsEdit.name.value

        if (!formData) {
            return console.error('Field name was not passed');
        }

        axios.put('/kennel/name/' + id, {
            name: formData
        }).then(() => {
            //todo redirect to all kennels page
            location.reload()
        }).catch(err => {
            console.log('Error while creatting a new kennel ' + err);
        })

    })



}

async function getCount(id) {
    const dogCount = await axios.get('/kennel/' + id)

    return dogCount.data
}

async function listKennelDogs(id) {

    try {
        const res = await axios.get('/kennel/listDogs/' + id)
        const kennelDogs = res.data
        kennelDogs.reverse()
        kennelCards.innerHTML = ' '

        for (dog of kennelDogs) {
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

            kennelCards.innerHTML += `<div id="${dog.id}" class="card text-center text-white bg-dark " style="max-width: 14rem; margin: 10px; min-width: 14rem;">
            <img src="/images/${dog.image}" class="card-img-top" alt="...">
              <div class="card-header" style="font-size: 25px">${dog.name}</div>
              <div class="card-body bg-dark ">
              <p class="card-title">${behaviorsHTML}</p>
              <p class="card-text"><b>${dog.entryDate}</b></p>
              <a href ='#' onclick='deleteDog(${dog.id})' class = 'trash-icon'> <svg width="1em" height="1em" viewBox="0 0 16 16" 
                                class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 
                                .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h
                                2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                              </svg></a>
                </div>
                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#dogDetail" onclick="dogDetailsKennel(${dog.id})">Ver detalhes</a>`
        }
    } catch (err) {
        console.log('Error while listing a Kennel dog ' + err);
    }

    return
}

function deleteKennel(id) {

    if (!confirm('Tem certeza que deseja fazer isso?')) return

    axios.delete('/kennel/' + id).then(() => {
        listAllKennels(id)
    }).catch(err => {
        console.log('Error while deleting a kennel ' + err);
    })
}

function deleteDog(id) {

    if (!confirm('Tem certeza que deseja fazer isso?')) return

    axios.delete('/dog/' + id).then((res) => {
        kennelId = res.data.kennelId
        listKennelDogs(kennelId)
    }).catch(err => {
        console.log('Error while deleting a dog ' + err);
    })
}

async function removeFromKennel(dogId, kennelId) {
    if (!confirm('Tem certeza que deseja fazer isso?')) return

    try {
        await axios.put(`/kennel/removeDog/${dogId}/${kennelId}`)

    } catch (err) {
        console.log('Error while removing dog from kennel ' + err);
    }

    listKennelDogs(kennelId)
}

async function dogDetailsKennel(id) {
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
            <a href="/choose" class="btn btn-primary" style="margin-bottom: 5px;" id="addBtn" onclick="setLocalId(${dog.id})">Alterar canil</a>
            <a data-toggle="modal" data-target="#behaviorModal" class="btn btn-info ml-6" style="color: white; margin-bottom: 5px;" >Escolher comportamentos</a>
            <button type="button" class="btn btn-danger" style="color: white; margin-bottom: 5px;" data-dismiss="modal" id="removeBtn" onclick="removeFromKennel(${dog.id}, ${dog.kennelId})">Remover do canil</button>
            <a href="/adoptedDogs" class="btn btn-warning" style="color: white; margin-bottom: 5px;"" id="adoptedBtn" onclick="adoptedStatus(${dog.id})">Adotar</a>
            <a href="/outerDogs" class="btn btn-secondary" style="color: white; margin-bottom: 5px;" id="outerBtn" onclick="outerStatus(${dog.id})">Marcar como ausente</a>
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
        console.log('Error while showing details' + err);
    }


}

async function updteDogKennel(kennelId) {
    const dogId = localStorage.getItem('dogId')

    try {
        await axios.put(`/dog/${dogId}/${kennelId}`)
    } catch (err) {
        console.log('Error while updating dog kennel ' + err);
    }

    listKennelDogs(kennelId)

}

function setLocalId(id) {
    localStorage.setItem('dogId', id)
}

listAllKennels()