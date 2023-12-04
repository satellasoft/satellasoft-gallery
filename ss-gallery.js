'use strict'

//Start config
const delayTime = 3000
const usingLazy = true
const showDesc = false
var currentIndex = 0
//End config

var elements = []
var container = null
var imageContainer = null
var descriptionContainer = null
var counter = null

document.addEventListener('DOMContentLoaded', () => {
    imageContainer = document.querySelector('.ss-gallery-image')
    descriptionContainer = document.querySelector('.ss-gallery-desc')
    counter = document.querySelector('.ss-gallery-counter')
    container = document.querySelector('.ss-gallery-container')

    document.querySelectorAll('.ss-gallery-image img').forEach(item => {
        elements.push({
            url: item.getAttribute('src'),
            alt: item.getAttribute('alt'),
            title: item.getAttribute('data-title')
        })
    })

    if (!showDesc)
        descriptionContainer.style.display = 'none'

    createImage(elements[currentIndex])
})

const toggleModal = (show) => {
    if (show) {
        container.classList.add('modal')
        document.body.style.overflow = 'hidden'
    }
    else if (!show) {
        container.classList.remove('modal')
        document.body.style.overflow = 'auto'
    }

}

const createImage = (item) => {
    clearImage()
    changeCounter()

    const img = document.createElement('img')
    img.src = item.url
    img.alt = item.alt
    img.className = 'fade-in-image'
    img.loading = usingLazy ? 'lazy' : ''
    img.onclick = () => {
        toggleModal(true)
    }

    imageContainer.appendChild(img)

    const p = document.createElement('p')
    p.innerHTML = item.title

    descriptionContainer.appendChild(p)
}

const clearImage = () => {
    imageContainer.innerHTML = ''
    descriptionContainer.innerHTML = ''
}

const navigate = (next) => {

    if (next) {
        if ((currentIndex + 1) < elements.length)
            currentIndex++
        else
            currentIndex = 0
    } else if (!next) {
        if ((currentIndex - 1) < 0)
            currentIndex = elements.length - 1
        else
            currentIndex--
    }

    createImage(elements[currentIndex])
}

const changeCounter = () => {
    counter.innerHTML = `<span>${currentIndex + 1}/${elements.length}</span>`
}

const toggleExpand = () => {
    imageContainer.classList.toggle('ss-gallery-expand')
}

setInterval(() => {
    if ((currentIndex + 1) < elements.length)
        currentIndex++
    else
        currentIndex = 0

    createImage(elements[currentIndex])

}, delayTime)