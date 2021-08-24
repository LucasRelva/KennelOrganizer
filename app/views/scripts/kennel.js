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

    kennelCards.innerHTML = ''

    for (kennel of kennels) {

        const dogCount = await getCount(kennel.id)

        kennelCards.innerHTML += `
        <div id="${kennel.id}" class="card text-center text-white bg-dark " style="max-width: 18rem; margin: 10px; min-width: 18rem;">
            <div id="cardHeader" class="card-header " ondblclick="updateName(${kennel.id})" style="font-size: 25px;">${kennel.name}</div>
            <div class="card-body">
            <h5 class="card-title"><b>${dogCount}</b> Cachorros</h5>
            <a href="#" class="btn btn-primary" onclick="listKennelDogs(${kennel.id})">Ver canil</a>
            <button data-toggle="modal" data-target="#kennelModalEdit" type="button" class="btn btn-warning" style="margin-rigth: 0" onclick="updateName(${kennel.id})"><img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/></button>
        </div>`
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

function listKennelDogs(id) {

    axios.get('/kennel/listDogs/' + id).then(res => {
        const kennelDogs = res.data
        kennelCards.innerHTML = ' '

        for (dog of kennelDogs) {
            kennelCards.innerHTML += `
            <div id="${dog.id}" class="card text-center text-white bg-dark " style="max-width: 14rem; margin: 10px; min-width: 14rem;">
                <img src="/images/${dog.image}" class="card-img-top" alt="...">
                <div class="card-header" style="font-size: 25px">Cachorro</div>
                <div class="card-body bg-dark ">
                <h5 class="card-title">${dog.name}</h5>
                <h5 class="card-title">${dog.behavior}</h5>
                <p class="card-text">${dog.entryDate}</p>
                <a href="#" class="btn btn-primary">Ver detalhes</a>           
          </div>`
        }
    })

    return
}

listAllKennels()