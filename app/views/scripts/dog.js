var dogForm = document.querySelector('.dogForm')
var dogsGroup = document.querySelector('#dogsGroup')
var dogEditForm = document.querySelector('#dogEditForm')

function createDog() {
    const formData = new FormData(dogForm)

    try {
        axios.post('/dog', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        })

    } catch (error) {
        console.log('Error while creating a new dog ' + err);
    }

}


function listDogs() {
    axios.get('/dog').then(res => {
        data = res.data
        dogsGroup.innerHTML = ''

        for (dog of data) {
            dogsGroup.innerHTML += `
            <div id="${dog.id}" class="card text-center text-white bg-dark " style="max-width: 14rem; margin: 10px; min-width: 14rem;">
                <img src="/images/${dog.image}" class="card-img-top" alt="...">
                <div class="card-header" style="font-size: 25px">${dog.name}</div>
                <div class="card-body bg-dark ">
                    <h5 class="card-title">${dog.behavior}</h5>
                    <p class="card-text">${dog.entryDate}</p>
                    <a href ='#' onclick='deleteDog(${dog.id})' class = 'trash-icon'> 
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h 2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </a>
                </div>
                <div class="card-footer" style="display: flex; flex-direction: row; justify-content: space-around">
                    <a href="#" class="btn btn-primary">Ver detalhes</a>
                    <button data-toggle="modal" data-target="#dogEditModal" type="button" class="btn btn-warning" style="margin-rigth: 0" onclick="fillModal(${dog.id})"><img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/></button>
                </div>
            </div>`
        }
    }).catch(err => {
        console.log('Error while listing a dog ' + err);
    })
}


function deleteDog(id) {

    if (!confirm('Tem certeza que deseja fazer isso?')) return

    axios.delete('/dog/' + id).then(() => {
        listDogs()
    }).catch(err => {
        console.log('Error while deleting a dog ' + err);
    })
}

function fillModal(id) {
    const name = document.querySelector('#editName')
    const weight = document.querySelector('#editWeight')
    const age = document.querySelector('#editAge')
    const behavior = document.querySelector('#editBehavior')
    const date = document.querySelector('#editDate')

    axios.get('/dog/find/' + id).then(res => {
        const data = res.data
        name.value = data.name
        weight.value = data.weight
        age.value = data.age
        behavior.value = data.behavior
        date.value = data.entryDate

        localStorage.setItem('dogId', id);

    }).catch(err => {
        console.log('Error while filling dog modal ' + err);
    })


}

function updateDog() {
    const formData = new FormData(dogEditForm)

    const dogId = localStorage.getItem('dogId')

    try {
        axios.post('/dog/edit/' + dogId, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        })
    } catch (error) {
        console.log('Error while updating the dog ' + err);
    }

}

listDogs()

