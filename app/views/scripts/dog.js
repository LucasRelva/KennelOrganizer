var dogForm = document.querySelector('.dogForm')
var imageFile = document.querySelector('#upload-photo')
var dogsGroup = document.querySelector('#dogsGroup')

dogForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(dogForm)

    axios.post('/dog', formData, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        }
    }).then(() => {
        //todo redirect to all dogs page
        location.reload()
    }).catch(err => {
        console.log('Error while creatting a new dog ' + err);
    })

})