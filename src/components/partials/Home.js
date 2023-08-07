import { FaCartPlus, FaCartShopping } from "react-icons/fa6";
import { Product } from '../../database_product';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Headers from './Header';

function Home() {

    //Navigation
    const nav = useNavigate()

    const [itemproduct, setItemProduct] = useState(Product[0])
    const [cardId, setCardId] = useState();
    const [listCard, setListCard] = useState([])

    //Check Card Icon
    const [cardIdIcon, setCardIdIcon] = useState([])

    //ChangeUI
    const [updateUI, setUpdateUI] = useState(false);


    //Cart Info
    const [totalCart, setTotalCart] = useState(0);


    useEffect(() => {
        if (cardId) {
            const data_result = Product[cardId - 1];
            var product_result = {};

            if (cardId === 3) {
                let value_price_md = document.querySelector('#cars').value;

                let name = data_result.product_name;

                let index_type = 0;
                data_result.price.forEach((item, index) => {
                    if (item === value_price_md) {
                        index_type = index;
                    }
                })

                let name_product = `${name} (${data_result.type[index_type]})`

                product_result = {
                    'id_product': data_result.id,
                    'name': name_product,
                    'price': value_price_md,
                    'quantity': 1,
                    'total': (Number(value_price_md) * 1000).toLocaleString()

                }
            } else {
                product_result = {
                    'id_product': data_result.id,
                    'name': data_result.product_name,
                    'price': data_result.price,
                    'quantity': 1,
                    'total': (Number(data_result.price) * 1000).toLocaleString()
                }
            }



            setCardIdIcon((prev) => {
                return [...prev, cardId]
            })


            //JSON to Web LocalStorage
            if (localStorage.getItem('cart') === null) {
                let array_cart = []
                array_cart.push(product_result)
                localStorage.setItem('cart', JSON.stringify(array_cart))
            } else {
                let value_result = JSON.parse(localStorage.getItem('cart'))
                value_result.push(product_result);
                localStorage.setItem('cart', JSON.stringify(value_result))
            }


            //Total Cart
            let cart_old = JSON.parse(localStorage.getItem('cart'))
            let total_all_cart = 0;

            cart_old.forEach((item, index) => {
                if (item.id_product !== 3) {
                    total_all_cart += Number(item.quantity * item.price[0]) * 1000
                } else {
                    total_all_cart += Number(item.quantity * item.price) * 1000
                }
            })

            setTotalCart(total_all_cart.toLocaleString());


            setListCard((prev) => {
                return prev ? [...prev, product_result] : [product_result]
            })

        }

    }, [cardId])



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

        setTotalCart(total_all_cart.toLocaleString());

        setCardIdIcon(array_cart_icon);

        setListCard(value_result)

    }, [updateUI])


    const deleteCart = () => {
        setListCard([]);
        localStorage.clear()
        setUpdateUI(true)
        setCardIdIcon([])
        setTotalCart(0)
    }


    const btnChangequantity = (action_input, id_input) => {
        let value_cart_old = JSON.parse(localStorage.getItem('cart'))

        //Loop product in cart
        value_cart_old.forEach((item, index) => {
            if (item.id_product === id_input) {
                if (action_input === 'decrease') {
                    item.quantity = item.quantity - 1;
                    var total_product_minus = 0;
                    //Change total product
                    if (id_input !== 3) {
                        total_product_minus = Number(item.quantity * item.price[0]) * 1000
                    } else {
                        total_product_minus = Number(item.quantity * item.price) * 1000
                    }

                    item.total = total_product_minus.toLocaleString();
                    if (item.quantity < 1) {
                        value_cart_old.splice(index, 1);

                        //Delete
                        let array_cart_icon = []
                        value_cart_old && value_cart_old.forEach((item, index) => {
                            array_cart_icon.push(item.id_product);
                        })
                        setCardIdIcon(array_cart_icon);
                    }
                }
                else if (action_input === 'increase') {
                    item.quantity = item.quantity + 1;
                    var total_product = 0;
                    //Change total product
                    if (id_input !== 3) {
                        total_product = Number(item.quantity * item.price[0]) * 1000
                    } else {
                        total_product = Number(item.quantity * item.price) * 1000
                    }

                    item.total = total_product.toLocaleString();
                }
            }
        })


        localStorage.setItem('cart', JSON.stringify(value_cart_old))

        setListCard(value_cart_old)


        let cart_old = JSON.parse(localStorage.getItem('cart'))
        let total_all_cart = 0;

        cart_old.forEach((item, index) => {
            if (item.id_product !== 3) {
                total_all_cart += Number(item.quantity * item.price[0]) * 1000
            } else {
                total_all_cart += Number(item.quantity * item.price) * 1000
            }
        })

        setTotalCart(total_all_cart.toLocaleString());
    }



    return (
        <>
            <div>
                <Headers />
            </div>
            <div className='container d-flex justify-content-between home home_mobile'>
                <div className='left_column col-8' style={{ marginRight: "20px" }}>
                    <div className="title_product fw-bold">Tất cả sản phẩm (3)</div>

                    {Product.map((item, index) => {
                        return (
                            <div className="product_item d-flex justify-content-between" key={index}>
                                <div className="left_img_product_content d-flex">
                                    <img style={{ marginRight: "20px", width: "100px", height: "100px" }} src={require(`../../img/${item.img[0]}`)} class="img-thumbnail" alt="..."></img>
                                    <div>
                                        <h5>{item.product_name}</h5>
                                        {item.id !== 3 ? (<span>{item.price} vnđ</span>) : (
                                            <div className="mutdua_option">
                                                <select id="cars">
                                                    <option value={item.price[0]}>250 gram - 188,000 vnđ</option>
                                                    <option value={item.price[1]}>500 gram - 228,000 vnđ</option>
                                                    <option value={item.price[2]}>1 KG - 448,000 vnđ</option>
                                                </select>
                                            </div>
                                        )}
                                        <div>
                                            {/* <!-- Button trigger modal --> */}
                                            <p data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: "blue", cursor: "pointer", marginTop: "5px", fontStyle: "italic" }} onClick={() => setItemProduct(Product[item.id - 1])}>
                                                Xem chi tiết
                                            </p>


                                            {/* <!-- Modal --> */}
                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">{itemproduct.product_name}</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body" style={{ width: "100%" }}>
                                                            <div className="img_top col">
                                                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                                                    <div class="carousel-inner">
                                                                        {itemproduct.img.length === 2 ? (
                                                                            <>
                                                                                <div class="carousel-item active">
                                                                                    <img style={{ height: "300px", objectFit: "cover", objectPosition: "center" }} src={require(`../../img/${itemproduct.img[0]}`)} class="d-block w-100" alt="..." />
                                                                                </div>
                                                                                <div class="carousel-item">
                                                                                    <img style={{ height: "300px", objectFit: "cover", objectPosition: "center" }} src={require(`../../img/${itemproduct.img[1]}`)} class="d-block w-100" alt="..." />
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div class="carousel-item active">
                                                                                    <img style={{ height: "300px", objectFit: "cover", objectPosition: "center" }} src={require(`../../img/${itemproduct.img[0]}`)} class="d-block w-100" alt="..." />
                                                                                </div>
                                                                                <div class="carousel-item">
                                                                                    <img style={{ height: "300px", objectFit: "cover", objectPosition: "center" }} src={require(`../../img/${itemproduct.img[1]}`)} class="d-block w-100" alt="..." />
                                                                                </div>
                                                                                <div class="carousel-item">
                                                                                    <img style={{ height: "300px", objectFit: "cover", objectPosition: "center" }} src={require(`../../img/${itemproduct.img[2]}`)} class="d-block w-100" alt="..." />
                                                                                </div>
                                                                            </>
                                                                        )}

                                                                    </div>
                                                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                        <span class="visually-hidden">Previous</span>
                                                                    </button>
                                                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                                        <span class="visually-hidden">Next</span>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="description col" style={{ maxWidth: "100%", marginTop: "50px" }}>
                                                                <div class="card text-white bg-success mb-3" style={{ maxWidth: "100%" }}>
                                                                    <div class="card-header">Mô tả</div>
                                                                    <div class="card-body">
                                                                        <ul>
                                                                            <li>
                                                                                Phân loại: {itemproduct.typeProduct}
                                                                            </li>
                                                                            <li>
                                                                                Đặc tính: {itemproduct.characteristic}
                                                                            </li>
                                                                            <li>
                                                                                Thiết kế: {itemproduct.design}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="right_button_add d-flex align-item-center">
                                    <button type="button" className="btn id_cart" data-index={item.id} onClick={() => { setCardId(item.id); }} style={{ width: "fit-content", height: "fit-content" }}
                                        disabled={cardIdIcon.includes(item.id) ? true : false}>
                                        <FaCartPlus style={{ fontSize: "30px" }}></FaCartPlus>
                                    </button>
                                </div>
                            </div>
                        );
                    })}



                </div>
                <div className='right_column_product col rounded' style={{ height: "fit-content" }}>
                    <div className="title_product d-flex justify-content-between" style={{ marginBottom: "15px", padding: "12px" }}>
                        <h5>Giỏ hàng</h5>
                        <span style={{ fontSize: "13px", color: "red", cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#removeCart">Xóa giỏ hàng</span>
                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="removeCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Xóa sản phẩm khỏi giỏ hàng</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Thao tác nãy sẽ xóa các sản phẩm bạn đã chọn ra khỏi giỏ hàng. Bạn có muốn tiếp tục không ?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={deleteCart}>Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content_cart d-flex justify-content-center flex-wrap">
                        {listCard && listCard.length > 0 ? listCard && listCard.map((item, index) => {
                            return (
                                <div key={index} style={{ width: "94%" }}>
                                    <div className="row" style={{ borderBottom: "1px solid #ccc", marginTop: "15px" }}>
                                        <div className="col">
                                            <h6>{item.name}</h6>
                                        </div>
                                        <div className="col">
                                            <div className="btn_change_quantity d-flex justify-content-between align-item-center" style={{ width: "157px" }}>
                                                <button style={{ color: "white" }} onClick={() => { btnChangequantity('decrease', item.id_product); }}>-</button>
                                                <p>{item.quantity}</p>
                                                <button onClick={() => { btnChangequantity('increase', item.id_product); }}>+</button>
                                            </div>
                                            <div className="price_product fw-bold" style={{ textAlign: "right", margin: "10px", fontSize: "13px" }}>
                                                {item.total !== 0 ? item.total : item.price} vnđ
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : <img style={{ height: "150px" }} src="https://highlight-clothes-69.sapopage.com/static/imgs/cart-no-item.svg" class="img-fluid" alt="..."></img>}

                    </div>
                    <div className="sum_cart" style={{ borderTop: "0.5px solid #ccc", padding: "15px" }}>
                        <p className="d-flex justify-content-between">
                            <h6>Tổng cộng</h6>
                            <span className="sum_total fw-bold text-success">{totalCart} vnđ</span>
                        </p>

                        <button type="button" class="btn btn-secondary" style={{ width: "100%" }}
                            disabled={listCard && listCard.length !== 0 ? false : true} onClick={() => nav('/checkout')}
                        ><FaCartShopping></FaCartShopping>&nbsp; &nbsp; Đặt đơn</button>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Home;