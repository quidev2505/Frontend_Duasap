import { FcIphone } from "react-icons/fc";
import zaloIcon from '../../img/zaloIcon.png'
import messIcon from '../../img/messIcon.png'
import locationIcon from '../../img/location.png'

function Headers() {
    return (
        <div className="header_container  header_mobile_home">
            <div className="container d-flex item_home_mobile">
                <div className="left_img">
                    <img src={require(`../../img/dl_1.jpg`)} alt="..." width="320" height="330" className="img_header_mobile"></img>
                </div>
                <div className="right_content d-flex flex-column">
                    <h3>DỪA SÁP CÁCH TÂN</h3>
                    <p style={{ opacity: "0.5" }}>Dừa sáp được biết đến là một trong những đặc sản nổi tiếng tại huyện Cầu Kè, tỉnh Trà Vinh.
                    <br/>
                        Giờ đây được khoát lên mình diện mạo mới.
                        <br/>
                        Nắp Bật Tiện Dụng – Logo sang trọng
                        <br/>
                        Độc quyền và duy nhất
</p>

                    <div className="icon_contact" style={{ marginBottom: "30px" }}>
                        <div className="first_icon" style={{ marginBottom: "30px" }}>
                            <FcIphone style={{
                                width: "27px",
                                height: "28px",
                                marginRight: "10px"
                            }}></FcIphone>
                            <span style={{ marginRight: "10px", lineHeight: "28px" }}>Hỗ trợ: 0965.754.382</span>
                            <img src={zaloIcon} alt="..." style={{ marginRight: "30px" }} />
                            <a href="http://www.google.com/url?q=http%3A%2F%2Fm.me%2FDuasapcachtan&sa=D&sntz=1&usg=AOvVaw1MGc1QmkdjP4bFZZkY6blS" target="blank" style={{ textDecoration: "none" }}>
                                <img src={messIcon} alt="..." />
                            </a>

                        </div>
                        <div className="second_icon">
                            <img src={locationIcon} alt="..." style={{
                                marginRight: "10px"
                            }}></img>
                            Địa chỉ: Hẻm liên tổ 3-4, Nguyễn Văn Cừ, An Khánh, Ninh Kiều, Tp. Cần Thơ.
                        </div>
                    </div>

                    {/* <div className="notice notice_mobile">
                        <p style={{ backgroundColor: "#fff7e7", padding: "10px", fontStyle: "italic", fontSize: "13px", width: "100%", height: "fit-content", borderRadius: "10px" }}>
                            <span className="fw-bold">Lưu ý: </span> <span style={{ fontWeight: "370" }}>
                                <br/>
                                - Cửa hàng sẽ tiếp nhận đơn và xử lý trong vòng 24 giờ đối với các đơn hàng có địa chỉ ở Cần Thơ. Với các đơn tỉnh dự kiến giao hàng từ 3 - 5 ngày.
                                <br/>
                                - Phí ship toàn quốc 25k/trái, mỗi trái tiếp theo cộng thêm 5k.
                            </span>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Headers;