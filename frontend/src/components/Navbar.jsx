import { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaCar,
} from "react-icons/fa";

import { searchVehicle } from "../services/api";

function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) {
      alert("Enter Vehicle Number");
      return;
    }

    try {
      const data = await searchVehicle(search.trim());

      if (!data.found) {
        alert("Vehicle Not Found");
        return;
      }

      alert(
        `Vehicle Found

Number Plate : ${search.toUpperCase()}

Owner : ${data.owner_name}

Vehicle : ${data.vehicle_name}

Company : ${data.company}

Model : ${data.model}

Color : ${data.color}

Fuel Type : ${data.fuel_type}

Registration : ${data.registration_year}

Insurance : ${data.insurance_status}

Mobile : ${data.owner_mobile}

Address : ${data.address}`
      );
    } catch (err) {
      console.error(err);
      alert("Search Failed");
    }
  };

  return (
    <header
      className="
      h-20
      bg-slate-900
      border-b
      border-cyan-500/20
      flex
      items-center
      justify-between
      px-8
      shadow-lg
      "
    >
      {/* Left */}

      <div className="flex items-center gap-4">
        <div
          className="
          h-14
          w-14
          rounded-xl
          bg-cyan-500/10
          border
          border-cyan-500/40
          flex
          items-center
          justify-center
          "
        >
          <FaCar className="text-cyan-400 text-2xl" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-cyan-400">
            ANPR Dashboard
          </h1>

          <p className="text-gray-400 text-sm">
            {today}
          </p>
        </div>
      </div>

      {/* Search */}

      <div
        className="
        hidden
        lg:flex
        items-center
        w-[360px]
        bg-slate-800
        rounded-xl
        px-4
        py-3
        border
        border-slate-700
        "
      >
        <FaSearch
          className="text-cyan-400 mr-3 cursor-pointer"
          onClick={handleSearch}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search Vehicle Number..."
          className="
          w-full
          bg-transparent
          outline-none
          text-white
          placeholder:text-gray-500
          "
        />
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        <div
          className="
          relative
          bg-slate-800
          rounded-xl
          p-3
          cursor-pointer
          transition
          hover:bg-slate-700
          "
        >
          <FaBell className="text-cyan-400 text-lg" />

          <span
            className="
            absolute
            -top-1
            -right-1
            bg-red-500
            text-white
            text-[10px]
            w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
            "
          >
            3
          </span>
        </div>

        <div
          className="
          flex
          items-center
          gap-3
          bg-slate-800
          px-4
          py-2
          rounded-xl
          "
        >
          <FaUserCircle className="text-4xl text-cyan-400" />

          <div>
            <p className="text-white font-semibold">
              Aditya
            </p>

            <p className="text-gray-400 text-sm">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;