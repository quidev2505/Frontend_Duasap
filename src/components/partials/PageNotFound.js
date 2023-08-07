import {useNavigate} from 'react-router-dom';
function PageNotFound(){
    const nav = useNavigate()
    return (
        <>
            <div class="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404"  alt="not-found"/>
            <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor" alt="not-found"/>
            <div style={{color:"black"}}>
                <p class="title" style={{color:"black"}}>Ôi không!!</p>
                <p class="subtitle" style={{color:"black"}}>
                    Có vẻ như bạn đã nhập sai địa chỉ<span className='fw-bold'> Dừa Sáp Cách Tân</span> rồi !
                </p>
                <div align="center" style={{color:"black"}}>
                    <button type="button" class="btn btn-warning mb-5" onClick={()=>nav('/')}>Nhấn để về trang chủ</button>
                </div>
                <img src="https://assets.codepen.io/1538474/astronaut.svg" class="astronaut" alt="not-found" />
                <img src="https://assets.codepen.io/1538474/spaceship.svg" class="spaceship" alt="not-found" />
            </div>
           
        </>
    )
}

export default PageNotFound;