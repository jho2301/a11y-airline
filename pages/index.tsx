import { NextPage } from 'next';
import { useState } from 'react';

import PassengerCounterInput from '../components/PassengerCounterInput';

const Home: NextPage = () => {
  const [adultCount, setAdultCount] = useState(0);

  return (
    <div>
      <h1>승객 선택</h1>
      <PassengerCounterInput
        label="성인"
        value={adultCount}
        setValue={setAdultCount}
        initialValue={0}
        min={0}
        max={3}
      />
    </div>
  );
};

export default Home;
