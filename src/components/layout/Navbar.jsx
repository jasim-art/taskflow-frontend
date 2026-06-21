import { FaBell } from "react-icons/fa";
import {
  useContext,
  useState
} from "react";

import {
  NotificationContext
} from "../../context/NotificationContext";

function Navbar({
  showSearch = true
}) {

  const [open, setOpen] =
    useState(false);

  const {
    notifications
  } = useContext(
    NotificationContext
  );

  return (

    <div
      className="
        bg-white
        border-b
        px-4
        md:px-8
        py-4
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        relative
      "
    >

      <h1
        className="
          text-2xl
          md:text-4xl
          font-bold
          text-slate-900
        "
      >
        TaskFlow
      </h1>

      <div
        className="
          flex
          items-center
          gap-4
          w-full
          md:w-auto
        "
      >

        {showSearch && (

          <input
            type="text"
            placeholder="Search..."
            className="
              border
              rounded-xl
              px-4
              py-3
              w-full
              md:w-72
              outline-none
              focus:ring-2
              focus:ring-slate-900
            "
          />

        )}

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
            relative
            bg-slate-100
            p-3
            rounded-xl
          "
        >

          <FaBell className="text-xl" />

          {notifications.length > 0 && (

            <span
              className="
                absolute
                -top-1
                -right-1
                bg-red-500
                text-white
                text-xs
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
              "
            >
              {notifications.length}
            </span>

          )}

        </button>

      </div>

      {open && (

        <div
          className="
            absolute
            right-4
            top-24
            md:right-8
            w-72
            bg-white
            shadow-xl
            rounded-2xl
            p-4
            z-50
          "
        >

          <h3 className="font-bold mb-4">
            Notifications
          </h3>

          {notifications.length === 0 ? (

            <p>No notifications</p>

          ) : (

            notifications.map(item => (

              <div
                key={item.id}
                className="
                  border-b
                  py-3
                "
              >

                <p>
                  {item.message}
                </p>

                <small>
                  {item.time}
                </small>

              </div>

            ))

          )}

        </div>

      )}

    </div>

  );

}

export default Navbar;