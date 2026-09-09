import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/60 backdrop-blur-sm h-screen z-50 transition-opacity duration-300">
      <div className="fixed top-0 right-0 h-full w-[85%] overflow-y-scroll 800px:w-[30%] bg-white flex flex-col justify-between shadow-2xl transition-transform duration-300">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-slate-500 hover:text-slate-800 transition-colors"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <AiOutlineHeart size={80} className="text-slate-200 mb-4" />
            <h5 className="text-xl font-medium text-slate-500">Your wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer text-slate-500 hover:text-slate-800 transition-colors"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-6 border-b border-slate-100`}>
                <AiOutlineHeart size={28} className="text-rose-500" />
                <h5 className="pl-3 text-2xl font-bold text-slate-800">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <div className="w-full">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b border-slate-100 p-6 hover:bg-slate-50 transition-colors duration-200">
      <div className="w-full flex items-center justify-between">
        <div 
          className="p-2 hover:bg-rose-50 rounded-full cursor-pointer transition-colors group mr-2"
          onClick={() => removeFromWishlistHandler(data)}
        >
          <RxCross1 className="text-slate-400 group-hover:text-rose-500 transition-colors" size={20} />
        </div>
        <img
          src={`${data?.images[0]?.url}`}
          alt=""
          className="w-[90px] h-[90px] object-cover mr-4 rounded-xl shadow-sm border border-slate-100"
        />

        <div className="flex-1">
          <h1 className="text-base font-medium text-slate-800 leading-tight mb-1">{data.name}</h1>
          <h4 className="font-bold text-lg pt-1 text-rose-600">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <div 
            className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-full cursor-pointer transition-colors group ml-2 border border-emerald-200"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          >
            <BsCartPlus size={22} className="text-emerald-600 group-hover:text-emerald-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
