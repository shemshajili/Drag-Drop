const drop =document.querySelectorAll('.drop')
const draggable=document.querySelectorAll('.draggable')



draggable.forEach(draggable =>{
    draggable.addEventListener("dragstart", ()=>{
        draggable.classList.add("dragging");
    })

    draggable.addEventListener("dragend",()=>{
        draggable.classList.remove("dragging");
    })
})

drop.forEach(drop =>{
    drop.addEventListener("dragover", (e)=>{
        e.preventDefault();
        const afterElememt = dropAfterDraggable(drop,e.clientY)
        const draggable = document.querySelector(".dragging")
        if (afterElememt == null) {
            drop.appendChild(draggable);
        }else{
            drop.insertBefore(draggable,afterElememt)
        }
    })
})

function dropAfterDraggable(drop, y){
    const elements = [...drop.querySelectorAll(".draggable:not(.dragging)")]

    return elements.reduce((nearest,child)=>{
        const box = child.getBoundingClientRect(); 
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > nearest.offset) {
            return {offset: offset, element: child}
        }
        else{
            return nearest;
        }

    }, {offset: Number.NEGATIVE_INFINITY } ).element
}