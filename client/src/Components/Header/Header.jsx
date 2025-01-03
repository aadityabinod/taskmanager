import {useTasks} from '../../context/TaskContext';
import { useUserContext } from '../../context/UserContext';
import { github, moon, profile } from '../../utils/Icons';
import { Link, useNavigate } from "react-router-dom";

function Header(){
    const {user} = useUserContext();
    const {openModalForAdd, activeTasks} = useTasks();

    const navigate = useNavigate();

    const {name} = user;
    const userId = user._id;


    return(
        <header className='px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]'>
            <div>
                <h1 className='text-lg font-medium'>
                    {userId ? `Welcome, ${name}!`:'Welcome to Task Manager' }
                </h1>
                <p className='text-sm'>
                    {
                        userId ? (
                            <>
                            You have {""}
                            <span className = "font-bold text-[#3aafae]">
                                {activeTasks.length}
                                Context     </span>
                            &nbsp;active tasks
                            </>
                        ): (
                            "Login to view or update the Tasks!"
                          )}
                        </p>
            </div>
            <div className="h-[50px] flex items-center gap-[10.4rem]">
            <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              navigate("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>
        <div className="flex gap-4 items-center">
          <Link
            to="https://github.com/Maclinz/taskfyer"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>
          <Link
            to="https://github.com/Maclinz/taskfyer"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {moon}
          </Link>
          <Link
            to="https://github.com/Maclinz/taskfyer"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {profile}
          </Link>
        </div>
      </div>
        </header>
    )
}

export default Header