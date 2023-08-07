import { useForm } from "react-hook-form";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
import {useNavigate} from 'react-router-dom'

function CheckAdmin() {
    //Validation form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const nav = useNavigate()

    //Form submit
    const onSubmit = (data) => {
        if (data.password !== process.env.REACT_APP_SECRET_PASSWORD){
            Swal.fire({
                title: 'Error!',
                text: 'Bạn đã nhập sai mật khẩu !',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }else{
            localStorage.setItem('already_login', true)
            nav("/admin-page")
        }
    };


    return (
        <div className="container content_info_user" style={{ height: "500px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label fw-bold">Nhập vào mật khẩu</label>
                    <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  {...register("password", {
                        required: true,
                        minLength: 4,
                        maxLength: 6,
                    })} />
                    {errors?.password?.type === "minLength" && <p>Chưa chính xác</p>}
                    {errors?.password?.type === "maxLength" && <p>Chưa chính xác</p>}
                    {errors?.password?.type === "required" && <p>Bạn chưa nhập mật khẩu !</p>}
                    <div id="emailHelp" className="form-text" style={{ fontStyle: "italic" }}>Hãy nhập chính xác mã số được cấp sẵn.</div>
                </div>
                <button type="submit" class="btn btn-primary" style={{ width: "100%" }}>Xác nhận</button>
            </form>
        </div>
    )
}

export default CheckAdmin;