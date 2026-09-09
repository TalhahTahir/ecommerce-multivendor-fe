import React from 'react'
import { useState } from "react";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllProducts from "../../components/Shop/AllProducts";
import CreateProduct from "../../components/Shop/CreateProduct";
import { AiFillAccountBook } from 'react-icons/ai';

const ShopAllProducts = () => {

  const [showCreateProduct, setShowCreateProduct] = useState(false);
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />

          <button
            onClick={() => setShowCreateProduct(true)}
            className="fixed top-25 right-5 bg-white shadow-md border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2"
          >
            Create Product
            <AiFillAccountBook size={30} className="mt-3" color="#555" />
          </button>

          <CreateProduct
            active={showCreateProduct}
            onClose={() => setShowCreateProduct(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts