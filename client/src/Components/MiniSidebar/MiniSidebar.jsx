import IconCheck from "../../icons/IconCheck";
import IconDeleteAll from "../../icons/IconDeleteAll";
import IconFileCheck from "../../icons/IconFileCheck";
import IconGrid from "../../icons/IconGrid";
import IconStopwatch from "../../icons/IconStopwatch";
import { Link, useLocation } from "react-router-dom";

function MiniSidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    const getStrokeColor = (link) => {
        return pathname === link ? "#FF5A5F" : "#71717a";
    };

    const navItems = [
        {
            icon: <IconGrid strokeColor={getStrokeColor("/")} />,
            title: "All",
            link: "/",
        },
        {
            icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
            title: "Completed",
            link: "/completed",
        },
        {
            icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
            title: "Pending",
            link: "/pending",
        },
        {
            icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
            title: "Overdue",
            link: "/overdue",
        },
    ];

    return (
        <div className="w-full h-20 flex bg-white shadow-md">
            <div className="flex-1 flex ml-5 items-center justify-between">
                <ul className="flex gap-6">
                    {navItems.map((item, index) => (
                        <li key={index} className="relative group">
                            <Link to={item.link} className="flex justify-center">
                                {item.icon}
                            </Link>

                            {/* Hover Tooltip */}
                            <span className="absolute bottom-12 left-[50%] translate-x-[-50%] text-xs pointer-events-none text-white bg-[#FF5A5F] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100">
                                {item.title}
                            </span>
                            
                        </li>
                    ))}

                    <br /> 
                </ul>
                <div className="mr-6">
                    <button className="w-12 h-12 flex justify-center items-center border-2 border-[#FF5A5F] p-2 rounded-full">
                        <IconDeleteAll strokeColor="#FF5A5F" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MiniSidebar;
