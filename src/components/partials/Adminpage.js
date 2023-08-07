import { useLayoutEffect, useState } from 'react';
import { URL_PATH } from '../../ultils/url_path_api';
import axios from 'axios';
import { IoExit } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { FaCircleXmark } from "react-icons/fa6";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'


function Adminpage() {
    const [dataOrder, setDataOrder] = useState();
    const [UI, setUI] = useState(false);
    const [search, setSearch] = useState("")


    const nav = useNavigate()
    const Logout = () => {
        localStorage.setItem('already_login', false);
        nav('/admin-duasap')
    }

    useLayoutEffect(() => {
        axios.get(`${URL_PATH}order/get`).then((data) => {
            let data_receive = data.data
            data_receive.forEach((item, index) => {
                let time = item.createdAt || ''
                let time_change = time.substring(0, 10)

                let solve_time = time_change.split('-')
                let result_time = `${solve_time[2]}-${solve_time[1]}-${solve_time[0]}`
                item.createdAt = result_time
            })

            // const count = {};
            // timeArr.forEach(element => {
            //     count[element] = (count[element] || 0) + 1;
            // });


            // const arr_result = []
            // for (let key in count) {
            //     let count_index = 1;
            //     let obj_result = {
            //         id: count_index,
            //         year: key,
            //         userGain: count[key]
            //     }
            //     arr_result.push(obj_result)
            // }



            setDataOrder(data_receive)
        }).catch((err) => console.log(err))
    }, [UI])


    const deleteOrder = (idInput) => {
        Swal.fire({
            title: 'Bạn chắc chắn xóa đơn hàng này ?',
            text: "Sẽ không thể khôi phục lại đơn hàng !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp nhận xóa',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${URL_PATH}order/delete/${idInput}`).then(() => {
                    setUI(true)
                    Swal.fire(
                        'Xóa thành công !',
                        'Đơn hàng đã được xóa !',
                        'success'
                    )
                }).catch((e) => {
                    Swal.fire(
                        'Xóa thất bại !',
                        'Vui lòng thực hiện lại thao tác !',
                        'warning'
                    )
                    console.log(e)
                })

            }
        })
    }

    const searchOrder = () => {
        let dataSearch = search;
        if (dataSearch) {
            axios.get(`${URL_PATH}order/findOrder/${dataSearch}`).then((data) => {
                let data_receive = data.data
                data_receive.forEach((item, index) => {
                    let time = item.createdAt || ''
                    let time_change = time.substring(0, 10)

                    let solve_time = time_change.split('-')
                    let result_time = `${solve_time[2]}-${solve_time[1]}-${solve_time[0]}`
                    item.createdAt = result_time
                })
                setDataOrder(data_receive)
            }).catch((err) => console.log(err))
        } else {
            axios.get(`${URL_PATH}order/get`).then((data) => {
                let data_receive = data.data
                data_receive.forEach((item, index) => {
                    let time = item.createdAt || ''
                    let time_change = time.substring(0, 10)

                    let solve_time = time_change.split('-')
                    let result_time = `${solve_time[2]}-${solve_time[1]}-${solve_time[0]}`
                    item.createdAt = result_time
                })
                setDataOrder(data_receive)
            }).catch((err) => console.log(err))
        }

    }

    return (
        <div className='container p-3'>
            <div className='d-flex' style={{ justifyContent: "center", alignItems: "center" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>ADMIN DỪA SÁP CÁCH TÂN</h2>
                <button type="button" class="btn btn-primary" style={{ marginTop: "-15px", marginLeft: "80px" }} onClick={() => Logout()}>Đăng xuất &nbsp;<IoExit></IoExit></button>
                <button type="button" class="btn btn-warning" style={{ marginTop: "-15px", marginLeft: "80px" }} onClick={() => nav('/report')}>Báo Cáo&nbsp;<IoExit></IoExit></button>
            </div>

            <div style={{ width: "500px", margin: "0 auto", marginBottom: "20px" }}>
                <div class="input-group flex-nowrap d-flex" style={{ justifyContent: "space-between" }}>
                    <h2 style={{
                        marginLeft: "-100px",
                        marginRight: "20px",
                        border: "1px solid blue",
                        color: "blue",
                        padding: "10px",
                        borderRadius: "10px"
                    }}>{dataOrder && dataOrder.length} đơn</h2>
                    <input type="text" class="form-control" placeholder="Nhập vào tên khách hàng hoặc số điện thoại..." aria-label="Username" aria-describedby="addon-wrapping" onChange={(e) => setSearch(e.target.value)} value={search} />
                    <span class="input-group-text fw-bold" id="addon-wrapping" style={{ cursor: "pointer", color: "red" }} onClick={() => searchOrder()}>Tìm kiếm</span>
                </div>
            </div>

            {
                dataOrder && dataOrder.length === 0 ? (<button type="button" class="btn btn-danger" style={{ display: "flex", margin: "0 auto", marginBottom: "300px" }}>Không có sản phẩm cần tìm</button>) :
                    dataOrder && dataOrder.map((item, index) => (
                        <div class="card mb-3" key={index} style={{ width: "900px", margin: "0 auto" }}>
                            <div class="card-header fw-bold d-flex justify-content-between" style={{ paddingBottom: "0px" }}>
                                <p>
                                    Đơn hàng {index + 1}: {item._id}
                                </p>
                                <FaCircleXmark style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => {
                                    deleteOrder(item._id)
                                }}></FaCircleXmark>
                            </div>
                            <div class="card-body admin_card row">
                                <ul className='col'>
                                    <li className='row'>
                                        <span className='col'>Tên khách hàng:</span>
                                        <input className="col" type="text" value={item.hovaten} disabled />
                                    </li>
                                    <li className='row'>
                                        <span className='col'>Số điện thoại: </span>
                                        <input className='col' type="text" value={item.sdt} disabled />
                                    </li>
                                    <li className='row'>
                                        <span className='col'>Ghi chú đơn hàng:</span>
                                        <input className='col' type="text" value={item.note} disabled />
                                    </li>
                                    <li className='row'>
                                        <span className='col'>Phương thức thanh toán: </span>
                                        <input className='col' type="text" value={item.methodPayment} disabled />
                                    </li>
                                    <li className='row'>
                                        <span className='col'>Phương thức nhận hàng:</span>
                                        <input className='col' type="text" value={item.methodReceive} disabled />
                                    </li>
                                    <li className='row'>
                                        <span className='col'>Ngày đặt hàng:</span>
                                        <input className='col' type="text" value={item.createdAt} disabled />
                                    </li>

                                </ul>

                                <div className='col'>
                                    <div class="card text-white bg-secondary mb-3" style={{ maxWidth: "100%" }}>
                                        <div class="card-header">Danh sách sản phẩm ({item.cart && item.cart.length} sản phẩm)</div>
                                        <div class="card-body" style={{ overflowY: "scroll", maxHeight: "150px" }}>
                                            {
                                                item.cart && item.cart.map((item, index) => (
                                                    <div key={index}>
                                                        <h6>SP {index + 1}</h6>
                                                        <div style={{ border: "1px solid white", padding: "10px", borderRadius: "10px", marginBottom: "10px" }}>
                                                            <span>- Tên SP: {item.name}</span>
                                                            <br />
                                                            <span>- Giá: {item.price.length > 0 ? item.price[0] : item.price}</span>
                                                            <br />
                                                            <span>- Số lượng: {item.quantity} </span>
                                                            <br />
                                                            <span>- Tổng cộng: <span style={{ color: "#99d2e9", fontWeight: "bold" }}>{item.total}</span></span>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        <li className='row' style={{ padding: "15px", border: "1.3px solid #fff" }}>
                                            <span className='col'>Tổng đơn hàng:</span>
                                            <input className='col' type="text" style={{ color: "green", fontWeight: "bold" }} value={item.total_cart + ' VNĐ'} disabled />
                                        </li>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )
            }
        </div>
    )
}

export default Adminpage