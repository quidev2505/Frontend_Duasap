import { useLayoutEffect, useState } from 'react';
import { URL_PATH } from '../../ultils/url_path_api';
import axios from 'axios';
import { IoExit } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { FaCircleXmark } from "react-icons/fa6";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import * as XLSX from "xlsx";

//Loading Overlay
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";


function Adminpage() {
    const [isActive, setIsActive] = useState(true); //Overlay Spinner
    const [dataOrder, setDataOrder] = useState();
    const [search, setSearch] = useState("")

    const [filter, setFilter] = useState('Chưa xử lý');

    const nav = useNavigate()
    const Logout = () => {
        localStorage.setItem('already_login', false);
        nav('/admin-duasap')
    }

    const loadData = () => {
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
            setIsActive(false)
        }).catch((err) => console.log(err))
    }

    useLayoutEffect(() => {
        loadData()
        // eslint-disable-next-line
    }, [])


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
                    Swal.fire(
                        'Xóa thành công !',
                        'Đơn hàng đã được xóa !',
                        'success'
                    )
                    setIsActive(true)
                    loadData()
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

    const deleteAllOrder = () => {
        Swal.fire({
            title: 'Bạn chắc chắn xóa tất cả các đơn hàng ?',
            text: "Lưu ý: Vì xóa tất cả đơn hàng nên cần Refresh lại trang web (Ctrl + F5) !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp nhận xóa',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${URL_PATH}order/deleteAllOrder`).then(() => {
                    Swal.fire(
                        'Xóa thành công !',
                        'Đơn hàng đã được xóa !',
                        'success'
                    )
                    setIsActive(true)
                    loadData()
                }).catch((e) => {
                    Swal.fire(
                        'Xóa thất bại !',
                        'Vui lòng thực hiện lại thao tác !',
                        'warning'
                    )
                    console.log(e)
                })

            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const searchOrder = () => {
        let dataSearch = search;
        if (dataSearch) {
            axios.get(`${URL_PATH}order/findOrder/${dataSearch}`).then((data) => {
                let data_receive = data.data
                //Hàm xử lý ngày
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
            loadData()
        }

    }

    const updateStatus = (idInput) => {
        Swal.fire({
            title: 'Đã hoàn thành xác nhận đơn ?',
            text: "Hãy nhấn vào xác nhận để cập nhật!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let dataInput = {
                    already_check: 'Đã xử lý'
                }
                axios.put(`${URL_PATH}order/update/${idInput}`, dataInput).then((data) => {
                    Swal.fire({
                        title: 'Cập nhật trạng thái đơn hàng thành công !',
                        text: 'Hoàn thành !',
                        icon: 'success',
                        confirmButtonText: 'Xác nhận'
                    }
                    )
                    setIsActive(true)
                    loadData()
                }).catch((e) => {
                    Swal.fire({
                        title: 'Không thể cập nhật!',
                        text: 'Trạng thái đơn hàng chưa được cập nhật !',
                        icon: 'fail',
                        confirmButtonText: 'Xác nhận'
                    })
                    console.log(e)
                })
            }
        })
    }


    //Download Excel
    const handleDownload = () => {
        Swal.fire({
            title: 'Bạn muốn tải xuống hóa đơn dạng file xlsx ?',
            text: "Hãy nhấn vào xác nhận để tải xuống !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Create file xsls Excel
                // flatten object like this {id: 1, title:'', category: ''};F
                const rows = dataOrder && dataOrder.map((item, index) => (
                    {
                        stt: index + 1,
                        hovaten: item.hovaten,
                        sdt: item.sdt,
                        address: item.address,
                        methodReceive: item.methodReceive,
                        methodPayment: item.methodPayment,
                        note: item.note,
                        cart1: `Tên SP 1: ${item.cart[0].name} - Số lượng: ${item.cart[0].quantity} - Thành tiền: ${item.cart[0].total}`,
                        cart2: `Tên SP 2: ${item.cart[1] ? item.cart[1].name : 'Không có sản phẩm'} - Số lượng: ${item.cart[1] ? item.cart[1].quantity : 'Không có sản phẩm'} - Thành tiền: ${item.cart[1] ? item.cart[1].total : 'Không có sản phẩm'}`,
                        cart3: `Tên SP 3: ${item.cart[2] ? item.cart[2].name : 'Không có sản phẩm'} - Số lượng: ${item.cart[2] ? item.cart[2].quantity : 'Không có sản phẩm'} - Thành tiền: ${item.cart[2] ? item.cart[2].total : 'Không có sản phẩm'}`,
                        total_cart: item.total_cart,
                        already_check: item.already_check,
                        timeCreate: item.createdAt
                    }
                ));

                // create workbook and worksheet
                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.json_to_sheet(rows);

                XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

                // customize header names
                XLSX.utils.sheet_add_aoa(worksheet, [
                    ["Số thứ tự", "Họ và tên", "Số điện thoại", "Địa chỉ", "Phương thức nhận hàng", "Phương thức thanh toán", "Ghi chú", "Giỏ hàng (SP1)", "Giỏ hàng (SP2)", "Giỏ hàng (SP3)", "Tổng đơn hàng", "Trạng thái xử lí", "Thời gian tạo đơn"]
                ]);

                XLSX.writeFile(workbook, "BaoCaoDuaSap.xlsx", { compression: true });
                Swal.fire({
                    title: 'Tải xuống thành công !',
                    text: 'Hoàn thành !',
                    icon: 'success',
                    confirmButtonText: 'Xác nhận'
                }
                )
            }
        }).catch((e) => {
            Swal.fire({
                title: 'Không thể cập nhật!',
                text: 'Trạng thái đơn hàng chưa được cập nhật !',
                icon: 'fail',
                confirmButtonText: 'Xác nhận'
            })
            console.log(e)
        })
    };

    return (
        <div className='container p-3 admin_mobile'>
            <div className='d-flex' style={{ justifyContent: "center", alignItems: "center" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>ADMIN DỪA SÁP CÁCH TÂN</h2>
                <button type="button" class="btn btn-primary btn_mobile_admin" style={{ marginTop: "-15px", marginLeft: "80px" }} onClick={() => Logout()}>Đăng xuất &nbsp;<IoExit></IoExit></button>
                <button type="button" class="btn btn-warning btn_mobile_admin" style={{ marginTop: "-15px", marginLeft: "80px" }} onClick={() => nav('/report')}>Báo Cáo&nbsp;&#x1F4CA;</button>
            </div>

            <div style={{ width: "500px", margin: "0 auto", marginBottom: "20px" }} className="mobile_search">
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


            <div className='d-flex mb-5 mt-5 mobile_button_admin' style={{ marginLeft: "200px", flexDirection: "row" }}>
                <div className='d-flex'>
                    <h3 style={{ marginRight: "100px" }}>Lọc đơn:</h3>
                    <select id="filter_order" style={{ marginLeft: "-85px", width: "fit-content", borderRadius: "10px", padding: "10px", color: filter === 'Chưa xử lý' ? 'red' : 'green' }} value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value='Chưa xử lý' selected style={{ color: "red" }}>Chưa xử lý</option>
                        <option value='Đã xử lý' style={{ color: "green" }}>Đã xử lý</option>
                    </select>
                </div>
                <div style={{ marginLeft: "90px" }} className='btn_delete_mobile'>
                    <button type="button" class="btn btn-dark" onClick={() => { deleteAllOrder() }}>Xóa tất cả đơn &#x1F5D1;</button>
                </div>
                <div style={{ marginLeft: "90px" }} className='btn_export_mobile'>
                    <div className="wrapper">
                        <button onClick={handleDownload} class="btn btn-success">Xuất file Excel 	&#x1F4DD;</button>
                    </div>
                </div>
            </div>


            <LoadingOverlay active={isActive} spinner={<FadeLoader
                color="red"
                loading
            />} >
                {

                    dataOrder && dataOrder.length === 0 ? (<button type="button" class="btn btn-danger" style={{ display: "flex", margin: "0 auto", marginBottom: "300px" }}>Không có sản phẩm cần tìm</button>) :
                        dataOrder && dataOrder.map((item, index) => (
                            item.already_check === filter ? (
                                <div><div class="card mb-3 mobile_item_card" key={index} style={{ width: "900px", margin: "0 auto" }}>
                                    <div class="card-header fw-bold d-flex justify-content-between" style={{ paddingBottom: "0px", border: "3px solid #1e90ff" }}>
                                        <p>
                                            Đơn hàng {index + 1}: {item._id}
                                        </p>

                                        <p>Trạng thái:
                                            [
                                            {item.already_check === 'Chưa xử lý' ? (
                                                <>
                                                    <span style={{ color: "red" }}>{item.already_check}</span> &nbsp;
                                                    <button type="button" class="btn btn-success" onClick={() => updateStatus(item._id)}>Cập nhật&nbsp;</button>
                                                </>
                                            ) : (
                                                <span style={{ color: "green" }}>{item.already_check}</span>
                                            )}
                                            ]
                                        </p>


                                        <FaCircleXmark style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => {
                                            deleteOrder(item._id);
                                        }}></FaCircleXmark>
                                    </div>
                                    <div class="card-body admin_card row card_body_mobile">
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
                                                <span className='col'>Địa chỉ: </span>
                                                <input className='col' type="text" value={item.address} disabled />
                                            </li>
                                            <li className='row'>
                                                <span className='col'>Ghi chú đơn hàng:</span>
                                                <input className='col' type="text" value={item.note} disabled />
                                            </li>
                                            <li className='row'>
                                                <span className='col'>Phương thức nhận hàng:</span>
                                                <input className='col' type="text" value={item.methodReceive} disabled />
                                            </li>
                                            <li className='row'>
                                                <span className='col'>Phương thức thanh toán: </span>
                                                <input className='col' type="text" value={item.methodPayment} disabled />
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
                                                    {item.cart && item.cart.map((item, index) => (
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
                                                    ))}

                                                </div>
                                                <li className='row' style={{ padding: "15px", border: "1.3px solid #fff" }}>
                                                    <span className='col'>Tổng đơn hàng:</span>
                                                    <input className='col' type="text" style={{ color: "green", fontWeight: "bold" }} value={item.total_cart + ' VNĐ'} disabled />
                                                </li>

                                            </div>
                                        </div>
                                    </div>
                                </div></div>
                            ) : ''

                        )
                        )
                }
            </LoadingOverlay>
        </div >
    )
}

export default Adminpage