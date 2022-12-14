import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { notifyError, notifySuccess } from "../lib/notify";
import "react-toastify/dist/ReactToastify.css";
import OutLineBg from "../OutLineBg";
import Row from "./Row";

const Buyed = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const handleGetAllCart = async () => {
    const items = JSON.parse(localStorage.getItem("items"));
    const res = await axios.post(`/order/order-ispay`, {
      id: items._id,
    });
    setOrders(res.data.orders);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/order/${id}`);
      notifySuccess("Xoá sản phẩm ra khỏi giỏ hàng thành công");
      handleGetAllCart();
    } catch (error) {
      notifyError("Xóa sản phẩm ra khỏi giỏ hàng thất bại");
    }
  };

  useEffect(() => {
    handleGetAllCart();
  }, []);

  return (
    <>
      <OutLineBg>
        <main className="ps-main">
          <div className="ps-content pt-80 pb-80">
            <div className="ps-container">
              <div className="ps-cart-listing">
                <table className="table ps-cart__table">
                  <thead>
                    <tr>
                      <th>sản phẩm</th>
                      <th>Giá</th>
                      <th>Số Lượng</th>
                      <th>Tổng</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr>
                        <td>
                          <a className="ps-product__preview" href="/">
                            <img className="mr-15" src={order.imgProduct} alt />{" "}
                            {order.name}
                          </a>
                        </td>
                        <td>$150</td>
                        <td>
                          <div className="form-group--number">
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={2}
                            />
                          </div>
                        </td>
                        <td>$300</td>
                        <td>
                          <div className="ps-remove" onClick={()=>handleDelete(order._id)}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="ps-cart__actions"></div>
              </div>
            </div>
          </div>
        </main>
      </OutLineBg>
    </>
  );
};
export default Buyed;
