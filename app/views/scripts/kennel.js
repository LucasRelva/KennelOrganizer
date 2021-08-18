const kennelform = document.querySelector('#kennelForm')

kennelform.addEventListener('submit', event => {
    event.preventDefault()

    const formData = kennelform.name.value

    if (!formData) {
        return console.error('Field name was not passed');
    }

    axios.post('/kennel', {
        name: formData
    }).then(() => {
        //todo redirect to all dogs page
        location.reload()
    }).catch(err => {
        console.log('Error while creatting a new dog ' + err);
    })

})