import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
export const BarChart = ({ chartData }) => {
    const nav = useNavigate()
    return (
        <div className="chart-container" style={{ height: "563px", marginBottom:"150px" }}>
            <button type="button" class="btn btn-secondary" onClick={() => nav('/admin-page')}>Trở về</button>
            <h2 style={{ textAlign: "center", color:"#764abc" }}>BIỂU ĐỒ ĐƠN HÀNG NGÀY</h2>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%"
            }}>
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Số liệu năm 2023"
                            },
                            legend: {
                                display: true
                            }
                        }
                    }}
                />

            </div>


        </div>
    );
};