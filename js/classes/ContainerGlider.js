export default function glide(selector) {

    const container = document.querySelector(selector)

    if(!container) return Error(`${selector} was not found`)

    container.maxDisplacement = 32

    container.mouseOverHandler = (e) => {   

    const realHorizontal = e.currentTarget.offsetLeft - e.pageX
    const realVertical = e.currentTarget.offsetTop- e.pageY
  
    const displacemenet_x = new Number(
                            (realHorizontal / container.maxDisplacement) * -1)
                            .toPrecision(2)
    const displacemenet_y = new Number(
                            (realVertical / container.maxDisplacement) * -1)
                            .toPrecision(2)
    container.style.transform = `translate(${displacemenet_x}px, ${displacemenet_y}px)`
    }

    container.addEventListener('mouseenter', (e) => {
    const displacemenet_x = new Number(
                            (e.layerX / container.maxDisplacement) * -1)
                            .toPrecision(2)
    const displacemenet_y = new Number(
                            (e.clientY - e.currentTarget.offsetTop) / container.maxDisplacement * -1)
                            .toPrecision(2)
    
    container.style.transitionDuration = '250ms'
    container.style.transitionTimingFunction = 'ease'
    container.style.transform = `translate(${displacemenet_x}px, ${displacemenet_y}px)`
    
    }, {once:true})

    container.addEventListener('mousemove', container.mouseOverHandler)

    container.addEventListener('mouseleave', () => {
    container.style.transitionDuration = '250ms'
    container.style.transitionTimingFunction = 'ease'
    container.style.transform = 'translate(0,0)'
    removeEventListener('mousemove', container.mouseOverHandler);
    })

    container.addEventListener('transitionend', () => {
    container.addEventListener('mousemove', container.mouseOverHandler)
    container.style.transitionDuration = null
    container.style.transitionTimingFunction = null
    })

return container
}