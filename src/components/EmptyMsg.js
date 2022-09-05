
import empty from "./../imgs/empty-bg.svg";
function EmptyMsg(){
    return(
        <>
            <div className="empty">
                <p>目前尚無待辦事項</p>
                <img src={empty} alt="empty"/>
            </div>
        </>
    )
}

export default EmptyMsg;