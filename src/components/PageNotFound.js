
import empty from "./../imgs/empty-bg.svg";
import {Link} from 'react-router-dom';
function Error(){
    return(
        <>
            <div id="loginPage" className="bg-yellow">
                <div className="conatiner notfoundPage vhContainer ">
                    <div className="empty formControls">
                        <h3>404 您的頁面不存在喔!</h3>
                        <img src={empty} alt="empty"/>
                        <Link className="formControls_btnLink" to="/">回首頁</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;