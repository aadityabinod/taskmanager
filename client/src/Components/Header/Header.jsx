import {useTasks} from '../../context/TaskContext';
import { useUserContext } from '../../context/UserContext';
import { github, instagram, facebook } from '../../utils/Icons';
import { Link, useNavigate } from "react-router-dom";

function Header(){
  const {user} = useUserContext();
  const {openModalForAdd, activeTasks} = useTasks();

  const navigate = useNavigate();

  const {name} = user;
  const userId = user._id;

  return(
    <header className='px-6 py-4 w-full flex items-center justify-between bg-white shadow-md'>
      <div className="flex items-center justify-center h-20">
                <span className="text-2xl font-bold text-[#FF5A5F]">Taskco</span>
            </div> <br />
      <div>
        <h1 className='text-xl font-semibold'>
          {userId ? `Welcome, ${name}!`:'Welcome to Task Manager' }
        </h1>
        <p className='text-sm text-gray-600'>
          {
            userId ? (
              <>
              You have {""}
              <span className = "font-bold text-[#FF385C]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
              </>
            ): (
              "Login to view or update the Tasks!"
              )}
            </p>
      </div>
      <div className="flex items-center gap-8">
        <button
          className="px-6 py-2 bg-[#FF385C] text-white rounded-full
          hover:bg-[#D70466] transition-all duration-200 ease-in-out"
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
            to="https://github.com/aadityabinod/taskmanager"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-[#FF385C] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>
          <Link
            to="https://www.instagram.com/aadityarayyadav/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-[#FF385C] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {instagram}
          </Link>
          <Link
            to="https://www.facebook.com/aadityabinodyadav108/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-[#FF385C] rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {facebook}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
