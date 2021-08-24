var dogForm = document.querySelector('.dogForm')
var imageFile = document.querySelector('#upload-photo')
var dogsGroup = document.querySelector('#dogsGroup')

function createDog() {
    const formData = new FormData(dogForm)

    try {
        axios.post('/dog', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        })
    } catch (error) {
        console.log('Error while creatting a new dog ' + err);
    }

}


function listDogs() {
    axios.get('/dog').then(res => {
        data = res.data
        dogsGroup.innerHTML = ''

        for (dog of data) {
            dogsGroup.innerHTML += `<div id="${dog.id}" class="card text-center text-white bg-dark " style="max-width: 14rem; margin: 10px; min-width: 14rem;">
            <img src="/images/${dog.image}" class="card-img-top" alt="...">
              <div class="card-header" style="font-size: 25px">${dog.name}</div>
              <div class="card-body bg-dark ">
              <h5 class="card-title">${dog.behavior}</h5>
              <p class="card-text">${dog.entryDate}</p>
              <a href="#" class="btn btn-primary">Ver detalhes</a>`
        }
    }).catch(err => {
        console.log('Error while listing a dog ' + err);
    })
}
listDogs()