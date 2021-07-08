let dogsCache = []

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRender()
})

function fetchAndRender(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => {
        cacheDogs(json)
        renderDogs(json)
    })
}

function cacheDogs(dogs){
    dogsCache = dogs
}

function renderDogs(dogs){
    console.log(dogs)
    document.querySelector('#dog-bar').innerHTML = ''
    dogs.forEach( (dog) => {
        renderDog(dog)
    })
}

function renderDog(dog){
    dogSpan = document.createElement('span')
    dogSpan.textContent = dog.name
    document.querySelector('#dog-bar').append(dogSpan)
    dogSpan.addEventListener('click', (e) =>{
        renderDogByName(e.target.textContent)
    })

}

function goodDogLabler(isGoodDog){
    if(isGoodDog){
        return 'Good Dog!'
    }else{
        return 'Bad Dog!'
    }
}

function renderDoggo(dog){
    console.log(dog)
    const sumContainer = document.querySelector("#dog-summary-container")
    sumContainer.innerHTML = ''
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')

    img.src = dog.image
    h2.textContent = dog.name
    button.textContent = goodDogLabler(dog.isGoodDog)
    button.addEventListener('click', (e) =>{
        dog.isGoodDog = !dog.isGoodDog
        button.textContent = goodDogLabler(dog.isGoodDog)
    })
    sumContainer.append(img, h2, button)

}

function renderDogByName(name){
    let dog = dogsCache.find((dog) => dog.name === name)
    renderDoggo(dog)
}

document.querySelector('#good-dog-filter').addEventListener('click',
(e) => {
    console.log(e.target.textContent)
    if(e.target.textContent === 'Filter good dogs: OFF')
    {
        e.target.textContent = 'Filter good dogs: ON'
        renderDogs(dogsCache.filter(dog => dog.isGoodDog))
    }else{
        e.target.textContent = 'Filter good dogs: OFF'
        renderDogs(dogsCache)
    }
})