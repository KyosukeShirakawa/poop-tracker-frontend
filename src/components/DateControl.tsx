import { useNavigate } from "react-router-dom";
import { getPrevDate, getNextDate } from "../utils/date";

interface DateControlProps {
  date: string;
}

const DateControl = ({ date }: DateControlProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => navigate(`/logs/${getPrevDate(date)}`)}
      >
        <p>＜</p>
      </button>
      <input
        type="date"
        value={date}
        onChange={(e) => navigate(`/logs/${e.target.value}`)}
      />
      <button
        type="button"
        onClick={() => navigate(`/logs/${getNextDate(date)}`)}
      >
        <p>＞</p>
      </button>
    </div>
  );
};

export default DateControl;
