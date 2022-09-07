const form = document.getElementById('form')
form.addEventListener("submit", submit)

async function submit( e ) {
    e.preventDefault()

    const formElement = e.currentTarget;
        url = e.action;

    try {
        const formData = new FormData(formElement)

        const responseData = await postFormDataAsJSON({url, formData})

        console.log({responseData})
    } catch(error) {
        console.error(error)
    }

}

async function postFormDataAsJSON({url, formData}) {
    const plainFormData = Object.fromEntries(formData.entries())
        body = JSON.stringify(plainFormData)

    const response = await fetch( url, {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: body
      })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    console.log(response)
    
    return response
}