import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { fetchTimezoneDetails } from '../api/timezoneApi';
import { TimeZone } from '../models/TimeZone';
import closeSvg from '../assets/close.svg';
import { Loading } from './Loading';

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
    <div key={selectedOption} className="p-4 bg-light-blue rounded-xl flex flex-col items-center gap-2 h-36 text-">
      <button
        className="cursor-pointer font-bold self-end"
        onClick={() => setSelectedOptions(selectedOptions.filter((item) => item !== selectedOption))}
      >
        <img src={closeSvg} alt="Cerrar" className="w-4 h-4" />
      </button>
      <h1 className="text-md sm:text-lg md:text-xl font-bold text-black">{selectedOption}</h1>
      {timezoneDetails ? (
        <div className="flex flex-col items-center">
          <p>{timezoneDetails?.date}</p>
          <p>{timezoneDetails?.time}</p>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TimeZoneCard;
