import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllEvents from "../../components/Shop/AllEvents";
import CreateEvent from "../../components/Shop/CreateEvent";
import { AiFillAccountBook } from 'react-icons/ai';

const ShopAllEvents = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <AllEvents />

                <button
                  onClick={() => setShowCreateEvent(true)}
                  className="fixed top-25 right-5 bg-white shadow-md border border-slate-300 rounded-md px-4 py-2 flex items-center gap-2"
                >
                  Create Event
                  <AiFillAccountBook size={30} className="mt-3" color="#555" />
                </button>

                <CreateEvent
                  active={showCreateEvent}
                  onClose={() => setShowCreateEvent(false)}
                />
            </div>
          </div>
    </div>
  )
}

export default ShopAllEvents