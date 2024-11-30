import { useSetRecoilState } from "recoil";
import { filterAtom } from "../store/atoms/Todo";
import profileImage from "../assets/profile.jpg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SideBar({ name }) {
  const setFilter = useSetRecoilState(filterAtom);
  const location = useLocation(); // Get current route
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div className="bg-gray-100 w-96 h-screen">
      <div className="inline-flex items-center">
        <img
          className="w-10 h-10 rounded-full m-3"
          src={profileImage}
          alt="Rounded avatar"
        />
        <h4 className="font-bold">{name}</h4>
      </div>

      {/* search bar */}

      <div className="flex px-4 py-3 rounded-md border-2 border-gray-400 overflow-hidden max-w-md mx-3 font-[sans-serif] ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-600 mr-3 rotate-90"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
        <input
          onChange={handleChange}
          type="text"
          placeholder="filter via title..."
          className="w-full outline-none bg-transparent text-gray-600 text-sm"
        />
      </div>

      {/* menu */}
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              className={`flex items-center p-2 text-gray-800 rounded-lg ${
                location.pathname === "/dashboard"
                  ? "bg-gray-950 text-neutral-300"
                  : "hover:bg-gray-950 hover:text-neutral-300"
              } group`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500 group-hover:text-neutral-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                />
              </svg>

              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li onClick={() => navigate("/completed")}>
            <a
              className={`flex items-center p-2 text-gray-800 rounded-lg ${
                location.pathname === "/completed"
                  ? "bg-gray-950 text-neutral-300"
                  : "hover:bg-gray-950 hover:text-neutral-300"
              } group`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500 group-hover:text-neutral-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>{" "}
              <span className="flex-1 ms-3 whitespace-nowrap">completed</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
