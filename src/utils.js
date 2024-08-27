export const setNewOffSet=(card,mouseMoveDir={x:0,y:0})=>{
const offSetLeft=card.offsetLeft-mouseMoveDir.x;
const offSetTop=card.offsetTop-mouseMoveDir.y;
return {
    x:offSetLeft<0 ?0:offSetLeft,
    y:offSetTop<0 ?0:offSetTop,


}
}
export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;
 
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export const bodyParser=(value)=>{
    try {
       return  JSON.parse(value)
        
    } catch (error) {
        return value
    }
}