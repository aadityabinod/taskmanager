import IconCheck from "../../icons/IconCheck";
import IconDeleteAll from "../../icons/IconDeleteAll";
import IconFileCheck from "../../icons/IconFIleCheck";
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
        <div className="w-20 h-full flex flex-col bg-white shadow-md">
          <br /> <br />
            <div className="flex-1 flex flex-col items-center justify-between">
                <ul className="flex flex-col gap-6">
                    {navItems.map((item, index) => (
                        <li key={index} className="relative group">
                            <Link to={item.link} className="flex justify-center">
                                {item.icon}
                            </Link>

                            {/* Hover Tooltip */}
                            <span className="absolute top-[50%] translate-y-[-50%] left-12 text-xs pointer-events-none text-white bg-[#FF5A5F] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100">
                                {item.title}
                            </span>

                            <br /> <br />
                        </li>
                    ))}
                </ul>
                <br /> <br />  <br /> <br /> <br /> <br /> <br />
                <div className="mb-6">
                    <button className="w-12 h-12 flex justify-center items-center border-2 border-[#FF5A5F] p-2 rounded-full">
                        <IconDeleteAll strokeColor="#FF5A5F" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MiniSidebar;
