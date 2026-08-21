import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./PurchaseOrderDetail.css";

const STATUS_CONFIG = {
    draft: {
        label: "Bản nháp",
        className: "status-draft",
    },

    confirmed: {
        label: "Đã xác nhận",
        className: "status-confirmed",
    },

    stocked: {
        label: "Đã nhập kho",
        className: "status-stocked",
    },
};


const PRODUCT_LIST = [
    {
        id: 1,
        code: "SP001",
        name: "Laptop Dell Inspiron 15",
    },
    {
        id: 2,
        code: "SP002",
        name: "Chuột Logitech M331",
    },
    {
        id: 3,
        code: "SP003",
        name: "Bàn phím cơ Keychron K2",
    },
    {
        id: 4,
        code: "SP004",
        name: "Màn hình Dell 24 inch",
    },
];

function PurchaseOrderDetail() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("draft");
    const [supplier, setSupplier] = useState("");
    const [employee, setEmployee] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [note, setNote] = useState("");


    const [items, setItems] = useState([
        {
            id: Date.now(),
            productId: "",
            quantity: 1,
            unitPrice: 0,
        },
    ]);


    const [error, setError] = useState("");

    const isReadOnly = status === "confirmed" || status === "stocked";


    const handleProductChange = (itemId, productId) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        productId,
                    }
                    : item
            )
        );
    };



    const handleQuantityChange = (itemId, value) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        quantity: Number(value),
                    }
                    : item
            )
        );
    };



    const handlePriceChange = (itemId, value) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        unitPrice: Number(value),
                    }
                    : item
            )
        );
    };



    const handleAddItem = () => {
        setItems((currentItems) => [
            ...currentItems,
            {
                id: Date.now(),
                productId: "",
                quantity: 1,
                unitPrice: 0,
            },
        ]);
    };



    const handleDeleteItem = (itemId) => {
        if (items.length === 1) {
            return;
        }

        setItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== itemId
            )
        );
    };


    const getProduct = (productId) => {
        return PRODUCT_LIST.find(
            (product) => product.id === Number(productId)
        );
    };

    const calculateItemTotal = (item) => {
        return (
            Number(item.quantity || 0) *
            Number(item.unitPrice || 0)
        );
    };


    const totalAmount = items.reduce(
        (total, item) =>
            total + calculateItemTotal(item),
        0
    );




    const formatCurrency = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };



    const handleSave = () => {


        console.log("SAVE DRAFT", {
            supplier,
            employee,
            orderDate,
            note,
            items,
            totalAmount,
        });

        alert("Đã lưu đơn hàng ở trạng thái bản nháp.");
    };


    const handleConfirm = () => {

        console.log("CONFIRM ORDER");

        setStatus("confirmed");

        alert("Đơn hàng đã được xác nhận.");
    };


    const handleStock = () => {
        console.log("STOCK ORDER");

        setStatus("stocked");

        alert(
            "Đơn hàng đã được nhập kho."
        );
    };


    const handleBack = () => {
        navigate("/purchase-orders");
    };

    const currentStatus =
        STATUS_CONFIG[status];


    return (
        <div className="purchase-order-detail-page">


            <div className="purchase-order-detail-header">

                <div>

                    <div className="page-title-row">

                        <h1>
                            {status === "draft"
                                ? "Tạo Đơn mua hàng"
                                : "Chi tiết Đơn mua hàng"}
                        </h1>

                        <span
                            className={`status-badge ${currentStatus.className}`}
                        >
                            {currentStatus.label}
                        </span>

                    </div>

                    <p>
                        {status === "draft"
                            ? "Tạo và quản lý thông tin đơn mua hàng"
                            : "Xem thông tin chi tiết đơn mua hàng"}
                    </p>

                </div>

            </div>



            {error && (
                <div className="purchase-order-error">
                    {error}
                </div>
            )}


            <section className="purchase-order-section">
                <div className="section-header">
                    <div>
                        <h2>
                            Thông tin chung
                        </h2>
                        <p>
                            Thông tin cơ bản của đơn mua hàng
                        </p>
                    </div>
                </div>


                <div className="general-information-grid">
                    <div className="form-group">
                        <label>
                            Nhà cung cấp
                            <span className="required">
                                *
                            </span>
                        </label>

                        <select
                            value={supplier}
                            disabled={isReadOnly}
                            onChange={(event) =>
                                setSupplier(event.target.value)
                            }
                        >
                            <option value="">
                                Chọn nhà cung cấp
                            </option>

                            <option value="supplier-1">
                                Công ty TNHH ABC
                            </option>

                            <option value="supplier-2">
                                Công ty XYZ
                            </option>

                            <option value="supplier-3">
                                Công ty TNHH Minh Phát
                            </option>
                        </select>
                    </div>



                    <div className="form-group">

                        <label>
                            Nhân viên phụ trách
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            type="text"
                            value={employee}
                            disabled={isReadOnly}
                            placeholder="Nhập tên nhân viên phụ trách"
                            onChange={(event) =>
                                setEmployee(event.target.value)
                            }
                        />
                    </div>


                    <div className="form-group">
                        <label>
                            Ngày mua hàng
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            type="date"
                            value={orderDate}
                            disabled={isReadOnly}
                            onChange={(event) =>
                                setOrderDate(event.target.value)
                            }
                        />
                    </div>


                    <div className="form-group form-group-full">
                        <label>
                            Ghi chú
                        </label>

                        <textarea
                            value={note}
                            disabled={isReadOnly}
                            placeholder="Nhập ghi chú cho đơn hàng..."
                            rows="4"
                            onChange={(event) =>
                                setNote(event.target.value)
                            }
                        />
                    </div>
                </div>
            </section>


            <section className="purchase-order-section">
                <div className="section-header">
                    <div>
                        <h2>
                            Chi tiết sản phẩm
                        </h2>

                        <p>
                            Danh sách sản phẩm trong đơn hàng
                        </p>
                    </div>

                    {!isReadOnly && (
                        <button
                            type="button"
                            className="add-item-button"
                            onClick={handleAddItem}
                        >
                            <span>+</span>
                            Thêm sản phẩm
                        </button>
                    )}

                </div>


                <div className="order-items-table-wrapper">
                    <table className="order-items-table">
                        <thead>

                            <tr>

                                <th>
                                    Mã sản phẩm
                                </th>

                                <th>
                                    Tên sản phẩm
                                </th>

                                <th>
                                    Số lượng
                                </th>

                                <th>
                                    Đơn giá
                                </th>

                                <th>
                                    Thành tiền
                                </th>

                                {!isReadOnly && (
                                    <th>
                                        Thao tác
                                    </th>
                                )}
                            </tr>
                        </thead>


                        <tbody>
                            {items.map((item) => {
                                const product =
                                    getProduct(item.productId);
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <select
                                                value={item.productId}
                                                disabled={isReadOnly}
                                                onChange={(event) =>
                                                    handleProductChange(
                                                        item.id,
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Chọn sản phẩm
                                                </option>

                                                {PRODUCT_LIST.map(
                                                    (product) => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.code}
                                                        </option>
                                                    )
                                                )}

                                            </select>

                                        </td>

                                        <td>
                                            <input
                                                type="text"
                                                value={
                                                    product?.name || ""
                                                }
                                                placeholder="Tự động điền"
                                                readOnly
                                            />

                                        </td>


                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                disabled={isReadOnly}
                                                onChange={(event) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                value={item.unitPrice}
                                                disabled={isReadOnly}
                                                onChange={(event) =>
                                                    handlePriceChange(
                                                        item.id,
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </td>


                                        <td className="item-total">

                                            {formatCurrency(
                                                calculateItemTotal(item)
                                            )}
                                        </td>

                                        {!isReadOnly && (

                                            <td>

                                                <button
                                                    type="button"
                                                    className="delete-item-button"
                                                    onClick={() =>
                                                        handleDeleteItem(
                                                            item.id
                                                        )
                                                    }
                                                    disabled={
                                                        items.length === 1
                                                    }
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="purchase-order-summary">
                <div className="summary-label">
                    Tổng tiền đơn hàng
                </div>
                <div className="summary-total">
                    {formatCurrency(totalAmount)}
                </div>
            </section>


            <div className="purchase-order-actions">

                <button  type="button"  className="back-button"  onClick={handleBack}>                   
                    Quay về danh sách
                </button>
                <div className="action-right">
                    {status === "draft" && (

                        <>
                            <button
                                type="button"
                                className="save-button"
                                onClick={handleSave}
                            >
                                Lưu lại
                            </button>

                            <button
                                type="button"
                                className="confirm-button"
                                onClick={handleConfirm}
                            >
                                Xác nhận đơn hàng
                            </button>
                        </>

                    )}


                    {/* CONFIRMED */}

                    {status === "confirmed" && (

                        <button
                            type="button"
                            className="stock-button"
                            onClick={handleStock}
                        >
                            Xác nhận nhập kho
                        </button>

                    )}

                </div>

            </div>

        </div>
    );
}

export default PurchaseOrderDetail;