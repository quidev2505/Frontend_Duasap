import image from '../../img/footer_icon.jpg'
function Footer() {
    return (
        <>
            <div className='footer_container mobile_footer'>
                <div className='container d-flex mobile_footer_item'>
                    <div className='img_left_footer'>
                        <img src={image} alt="..." width="268" height="185" className='img_left_logo' />
                    </div>
                    <div className='right_content_footer'>
                        <ul>
                            <li className='fw-bold text-success'>Dừa Sáp Cách Tân</li>
                            <li>Dừa Sáp Cách Tân - đặc sản Cầu Kè Trà Vinh</li>
                            <li> Cơ sở: Ấp 1, Thạnh Phú, Cầu Kè, Trà Vinh</li>
                            <li>Đặt hàng các bạn nhấn vào nút &nbsp;<span className='text-warning mobile_link'>MUA NGAY</span>  hoặc inbox qua:
                                <ol>
                                    <li>
                                        Fanpage: Dừa Sáp - Cầu Kè (bấm vào link &nbsp;
                                        <a href="https://www.facebook.com/Duasapcachtan/?ref=pages_you_manage" target="blank">
                                            https://www.facebook.com/Duasapcachtan/?ref=pages_you_manage)
                                        </a>
                                    </li>
                                    <li>
                                        Facebook: Phạm Như ̣̣(bấm vào link   &nbsp;
                                        <a href=' https://www.facebook.com/profile.php?id=100064562295203' target="blank">
                                            https://www.facebook.com/profile.php?id=100064562295203
                                        </a>
                                        )
                                    </li>
                                    <li>
                                        Chat zalo: 0965 75 4382 - 0945 16 8016
                                    </li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;