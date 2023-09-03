import { fetchTimezones } from './api/timezoneApi';
import Autocomplete from './components/Autocomplete';
import { useState, useEffect } from 'react';
import { useStore } from './store';
import TimeZoneCard from './components/TimeZoneCard';

function App() {
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const { selectedOptions } = useStore();

  useEffect(() => {
    fetchTimezones().then((data) => {
      setTimeZones(data);
    });
  }, []);

  return (
    <div className="bg-white h-screen w-full">
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col gap-4">
        <Autocomplete options={timeZones} />
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedOptions.map((selectedOption: string) => (
            <TimeZoneCard selectedOption={selectedOption} key={selectedOption} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
