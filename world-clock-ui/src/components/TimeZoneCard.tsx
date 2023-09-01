import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { fetchTimezoneDetails } from '../api/timezoneApi';
import { TimeZone } from '../models/TimeZone';

interface TimeZoneCardProps {
  selectedOption: string;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ selectedOption }) => {
  const { selectedOptions, setSelectedOptions } = useStore();
  const [timezoneDetails, setTimezoneDetails] = useState<TimeZone>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTimezoneDetails(selectedOption);
        setTimezoneDetails(data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedOption]);

  return (
    <div key={selectedOption} className="p-4 bg-blue-200 rounded-xl flex flex-col items-center gap-2 h-36">
      <span
        className="cursor-pointer font-bold self-end"
        onClick={() => setSelectedOptions(selectedOptions.filter((item) => item !== selectedOption))}
      >
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      </span>
      <h1 className="text-md sm:text-lg md:text-xl font-bold">{selectedOption}</h1>
      {timezoneDetails ? (
        <div className="flex flex-col items-center">
          <p>{timezoneDetails?.date}</p>
          <p>{timezoneDetails?.time}</p>
        </div>
      ) : (
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 m-2 text-gray-200 animate-spin dark:text-gray-600 fill-black"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default TimeZoneCard;
