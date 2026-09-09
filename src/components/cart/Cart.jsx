import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/60 backdrop-blur-sm h-screen z-50 transition-opacity duration-300">
      <div className="fixed top-0 right-0 h-full w-[85%] 800px:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-2xl transition-transform duration-300">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-slate-500 hover:text-slate-800 transition-colors"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <IoBagHandleOutline size={80} className="text-slate-200 mb-4" />
            <h5 className="text-xl font-medium text-slate-500">Your cart is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer text-slate-500 hover:text-slate-800 transition-colors"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-6 border-b border-slate-100`}>
                <IoBagHandleOutline size={28} className="text-slate-800" />
                <h5 className="pl-3 text-2xl font-bold text-slate-800">
                  {cart && cart.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <div className="w-full">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[55px] flex items-center justify-center w-[100%] bg-rose-600 hover:bg-rose-700 transition-colors duration-300 rounded-xl shadow-lg hover:shadow-xl`}
                >
                  <h1 className="text-white text-lg font-bold tracking-wide">
                    Checkout Now (USD${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b border-slate-100 p-6 hover:bg-slate-50 transition-colors duration-200">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-2">
          <div
            className={`bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors`}
            onClick={() => increment(data)}
          >
            <HiPlus size={16} className="text-rose-600" />
          </div>
          <span className="font-semibold text-slate-800">{data.qty}</span>
          <div
            className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} className="text-slate-600" />
          </div>
        </div>
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[100px] h-[100px] object-cover mx-4 rounded-xl shadow-sm border border-slate-100"
        />
        <div className="flex-1">
          <h1 className="text-base font-medium text-slate-800 leading-tight mb-1">{data.name}</h1>
          <h4 className="font-normal text-sm text-slate-500">
            ${data.discountPrice} × {value}
          </h4>
          <h4 className="font-bold text-lg pt-1 text-rose-600">
            US${totalPrice}
          </h4>
        </div>
        <div 
          className="p-2 hover:bg-rose-50 rounded-full cursor-pointer transition-colors group"
          onClick={() => removeFromCartHandler(data)}
        >
          <RxCross1
            className="text-slate-400 group-hover:text-rose-500 transition-colors"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
