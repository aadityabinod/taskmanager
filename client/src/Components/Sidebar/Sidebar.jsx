import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialCharts";
import { useUserContext } from "../../context/UserContext";

function Sidebar() {
    const { logoutUser } = useUserContext();
    return (
        <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-white shadow-lg flex flex-col border-l border-gray-200">
            <Profile />
            <div className="mt-4 mx-6">
                <RadialChart />
            </div>

            <button
                className="mt-auto mb-6 mx-6 py-3 px-6 bg-[#FF5A5F] text-white rounded-full hover:bg-[#FF7E82] transition duration-200 ease-in-out"
                onClick={logoutUser}
            >
                Sign Out
            </button>
        </div>
    );
}

export default Sidebar;