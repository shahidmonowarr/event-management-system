// Copied and adapted from shadcn/ui (https://ui.shadcn.com/docs/components/date-picker)

import React from "react";
import DatePickerLib from "react-datepicker";


export function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  return (
    <div className="relative w-full">
      <DatePickerLib
        selected={date}
        onChange={(date) => setDate(date ?? undefined)}
        showTimeSelect
        dateFormat="Pp"
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-200 hover:border-gray-300 focus:bg-white pl-12"
        calendarClassName="!rounded-xl !border !border-gray-200 !shadow-lg !p-2 !bg-white"
        dayClassName={(d) =>
          "!rounded-lg hover:!bg-blue-100 focus:!bg-blue-200"
        }
        timeClassName={() =>
          "!rounded-lg hover:!bg-blue-100 focus:!bg-blue-200"
        }
        placeholderText="Pick a date and time"
        isClearable
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        popperPlacement="bottom-start"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
}
