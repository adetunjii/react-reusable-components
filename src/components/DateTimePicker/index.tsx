import { useState } from "react";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, getDate } from "date-fns";
import enGB from "date-fns/locale/en-GB";

type Props = {};

const locales = { "en-us": undefined, "en-gb": enGB };
type LocaleKey = keyof typeof locales;

const DateTimePicker = (props: Props) => {
  const newDate = format(new Date(), "dd-MM-yyyy");
  const [startDate, setStartDate] = useState(newDate);
  const [locale, setLocale] = useState<LocaleKey>("en-gb");

  const handleStartDate = (value: any): void => {
    console.log(format(new Date(value), "dd-MM-yyyy"));
  };

  return (
    <div className="bg-white w-1/3 mx-auto shadow-md p-10 min-h-[200px]">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales[locale]}>
        <DatePicker value={new Date(newDate)} onChange={(value) => handleStartDate(value)} />
        <div className="my-4">
          <TimePicker />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DateTimePicker;
