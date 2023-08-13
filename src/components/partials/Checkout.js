import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Headers from './Header';
import axios from 'axios';
import { URL_PATH } from '../../ultils/url_path_api';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'



//Loading Overlay
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

function Checkout() {
    const [isActive, setIsActive] = useState(false); //Overlay Spinner
    const [listCard, setListCard] = useState([])
    const [totalCart, setTotalCart] = useState(0);
    const [methodget, setMethodget] = useState()

    const [sumorder, setSumOrder] = useState(0)

    const nav = useNavigate();


    //Validation form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    useEffect(() => {
        let value_result = JSON.parse(localStorage.getItem('cart'))
        let array_cart_icon = []


        let cart_old = JSON.parse(localStorage.getItem('cart'))
        let total_all_cart = 0;

        cart_old && cart_old.forEach((item, index) => {
            array_cart_icon.push(item.id_product)
            if (item.id_product !== 3) {
                total_all_cart += Number(item.quantity * item.price[0]) * 1000
            } else {
                total_all_cart += Number(item.quantity * item.price) * 1000
            }
        })
        

        let ship = document.querySelector('.shipping_price').innerText;
        let ship_value = ship.split(' ')[0];

        console.log(ship_value)

        setSumOrder(total_all_cart + Number(ship_value*1000))


        setTotalCart(total_all_cart.toLocaleString());

        setListCard(value_result)

    }, [methodget])


    const removeItemCart = (id_input) => {
        let total_all_cart = 0;

        let data_from_cart = JSON.parse(localStorage.getItem('cart'))
        data_from_cart.forEach((item, index) => {
            if (item.id_product === id_input) {
                data_from_cart.splice(index, 1);
            }
        })

        if (data_from_cart.length === 0) {
            setListCard([])
        }

        data_from_cart.forEach((item, index) => {
            if (item.id_product !== 3) {
                total_all_cart += Number(item.quantity * item.price[0]) * 1000
            } else {
                total_all_cart += Number(item.quantity * item.price) * 1000
            }
        })

        localStorage.setItem('cart', JSON.stringify(data_from_cart));


        let ship = document.querySelector('.shipping_price').innerText;
        let ship_value = ship.split(' ')[0];

        console.log(ship_value)

        setSumOrder(total_all_cart + Number(ship_value * 1000))


        setTotalCart(total_all_cart.toLocaleString());
        setListCard(data_from_cart)
    }



    //Form submit
    const onSubmit = (data) => {
        setIsActive(true)
        if (data) {
            if (methodget === 'Tự lấy hàng') {
                data.address = 'Số nhà 367, Hẻm liên tổ 3-4, Đ. Nguyễn Văn Cừ, Phường An Khánh, Ninh Kiều, Cần Thơ, Việt Nam'
            }

            if (data.note === '') {
                data.note = "Không có ghi chú thêm !"
            }

            let objectSendtoServer = {
                hovaten: data.fullName,
                sdt: data.phonenumber,
                address: data.address,
                note: data.note,
                methodReceive: document.querySelector("#method_get_order").value,
                methodPayment: document.querySelector("#method_ship").value,
                total_cart: sumorder.toLocaleString(),
                cart: JSON.parse(localStorage.getItem('cart')),
                already_check: 'Chưa xử lý'
            }

            axios.post(`${URL_PATH}order/create`, objectSendtoServer).then((data) => {
                setIsActive(false)
                Swal.fire({
                    title: 'Tạo đơn hàng thành công !',
                    text: 'Cảm ơn bạn đã mua hàng !',
                    icon: 'success',
                    confirmButtonText: 'Xác nhận'
                }
                )
                localStorage.clear()
                nav('/')
            }).catch((e) => {
                Swal.fire({
                    title: 'Lỗi đơn hàng!',
                    text: 'Đặt hàng không thành công !',
                    icon: 'fail',
                    confirmButtonText: 'Xác nhận'
                })
                console.log(e)
            })

        }

    };

    return (
        <>
            <Headers />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container row d-flex flex-row checkout_container" style={{
                    margin: "20px 130px",
                    flexWrap: "nowrap", borderRadius: "10px", padding: "20px"
                }}>
                    <div className="col-lg-8 column_checkout" style={{ backgroundColor: "white", marginRight: "10px" }}>
                        <div className="btn_back_home fw-bold" style={{ borderBottom: "1px solid #ccc", color: "#1e95ff ", marginBottom: "5px", paddingBottom: "5px", cursor: "pointer" }} onClick={() => nav("/")}>
                            <FaArrowLeft style={{ border: "1px solid #1e95ff ", borderRadius: "50%", fontSize: "15px" }}></FaArrowLeft> &nbsp;
                            Quay lại trang chủ</div>
                        <div className="content_info_user" style={{ padding: "10px 0px" }}>


                            <h6>Thông tin người nhận</h6>
                            <div className='row'>
                                <div class="mb-3 col">
                                    <label htmlFor="fullname" class="form-label">Họ và tên <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" class="form-control" id="fullname" aria-describedby="emailHelp"  {...register("fullName", {
                                        required: true,
                                        maxLength: 20,
                                    })} />
                                    {errors?.fullName?.type === "required" && <p>Họ và tên không được để trống !</p>}
                                </div>
                                <div class="mb-3 col">
                                    <label htmlFor="phonenumber" class="form-label">Số điện thoại <span style={{ color: "red" }}>*</span></label>
                                    <input type="text" class="form-control" id="phonenumber"  {...register("phonenumber", {
                                        required: true,
                                        minLength: 10,
                                        maxLength: 11,
                                        pattern: /[0-9]/
                                    })} />
                                    {errors?.phonenumber?.type === "required" && <p>Số điện thoại không được để trống !</p>}
                                    {errors?.phonenumber?.type === "maxLength" && <p>Số điện thoại không vượt quá 11 số !</p>}
                                    {errors?.phonenumber?.type === "minLength" && <p>Số điện thoại chính xác phải là 10 số!</p>}
                                    {errors?.phonenumber?.type === "pattern" && <p>Vui lòng nhập số điện thoại đúng định dạng !</p>}
                                </div>
                            </div>


                            <h6>Hình thức nhận đơn</h6>
                            <select id="method_get_order" value={methodget} onChange={(e) => setMethodget(e.target.value)}>
                                <option value='Giao hàng tận nơi' selected>Giao hàng tận nơi</option>
                                <option value='Tự lấy hàng'>Tự lấy hàng</option>
                            </select>

                            {methodget === 'Tự lấy hàng' ? (<p style={{ marginTop: "-10px", color: "green", fontStyle: "italic", fontWeight: "bold" }}>Địa chỉ: Số nhà 367, Hẻm liên tổ 3-4, Đ. Nguyễn Văn Cừ, Phường An Khánh, Ninh Kiều, Cần Thơ, Việt Nam</p>) :
                                (
                                    <div style={{ display: methodget === 'Tự lấy hàng' ? 'none' : 'block' }}>
                                        <h6>Địa chỉ nhận hàng <span style={{ color: "red" }}>*</span></h6>
                                        <div class="mb-3 col">
                                            <input type="text" class="form-control" id="address" aria-describedby="emailHelp"
                                                placeholder='Nhập vào địa chỉ giao hàng của bạn'  {...register("address", {
                                                    required: true,
                                                    maxLength: 100,
                                                })} />
                                            {errors?.address?.type === "required" && <p>Địa chỉ nhận hàng không được để trống !</p>}
                                        </div>
                                    </div>
                                )
                            }





                            <h6>Ghi chú cho đơn hàng <span style={{ color: "red" }}>(không bắt buộc điền)</span></h6>
                            <div class="mb-3 col">
                                <input type="text" class="form-control" id="note" aria-describedby="emailHelp" placeholder='Nhập vào ghi chú...'  {...register("note", {
                                    maxLength: 100,
                                })} />
                                {errors?.note?.type === "maxLength" && <p>Chiều dài ghi chú không quá 100 kí tự</p>}
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-4 column_checkout" style={{ backgroundColor: "white", height: "fit-content" }}>
                        <div className="content_cart d-flex justify-content-center flex-wrap">
                            <div className="title_product fw-bold" style={{ backgroundColor: "white" }}>Sản phẩm đã chọn ({listCard.length})</div>
                            {listCard && listCard.length > 0 ? listCard && listCard.map((item, index) => {
                                return (
                                    <div key={index} style={{ width: "94%", borderTop: "1px solid #ccc" }}>
                                        <div className="row" style={{ borderBottom: "1px solid #ccc", marginTop: "15px", padding: "10px" }}>
                                            <div className="col">
                                                <h6>{item.name}</h6>
                                            </div>
                                            <div className="col">
                                                <div className="btn_change_quantity d-flex justify-content-between align-item-center" style={{ width: "fit-content" }}>
                                                    <p>{item.quantity}</p>
                                                </div>

                                            </div>
                                            <div className="price_product col" style={{ textAlign: "right", margin: "10px", fontSize: "14px", position: "relative" }}>
                                                {item.total !== 0 ? item.total : item.price} vnđ
                                                <FaWindowClose style={{
                                                    position: "absolute",
                                                    opacity: "0.6",
                                                    cursor: "pointer",
                                                    right: "0px",
                                                    top: "-24px"
                                                }} onClick={() => removeItemCart(item.id_product)}></FaWindowClose>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <img style={{ height: "150px" }} src="https://highlight-clothes-69.sapopage.com/static/imgs/cart-no-item.svg" class="img-fluid" alt="..."></img>}

                        </div>
                        <div className="sum_cart" style={{ borderTop: "0.5px solid #ccc", padding: "15px" }}>
                            <p className="d-flex justify-content-between">
                                <h6>Tổng cộng</h6>
                                <span className="sum_total fw-bold text-success">{totalCart} vnđ</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <h6>Phí ship: </h6>
                                <span className="sum_total fw-bold text-success shipping_price">{methodget === 'Tự lấy hàng' ? '0' : '20.000'} vnđ</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <h6>Thành tiền: </h6>
                                <span className="sum_total fw-bold text-danger">{sumorder.toLocaleString()} vnđ</span>
                            </p>

                            <div className='d-flex row' style={{ flexDirection: "row", flexWrap: "nowrap", width: "fit-content" }}>
                                <h6>Phương thức</h6>
                                <select id="method_ship" style={{ marginLeft: "-85px", width: "fit-content" }}>
                                    <option value='Thanh toán khi nhận hàng' selected>Thanh toán khi nhận hàng</option>
                                    <option value='Chuyển khoản'>Chuyển khoản</option>
                                </select>
                            </div>

                            <p style={{ fontStyle: "italic", fontWeight: "300" }}>
                                Cửa hàng có thể thu thêm phí vận chuyển sau khi xác nhận đơn hàng, tùy theo khu vực giao hàng
                            </p>
                            <LoadingOverlay active={isActive} spinner={<FadeLoader
                                color="red"
                                loading
                            />}>
                                <button type="submit" class="btn btn-danger" style={{ width: "100%" }}
                                    disabled={listCard && listCard.length !== 0 ? false : true}
                                ><FaCircleCheck style={{ fontSize: "20px" }}></FaCircleCheck>&nbsp; &nbsp; Đặt đơn</button>

                            </LoadingOverlay>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Checkout;