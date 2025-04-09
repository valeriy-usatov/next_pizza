import React from 'react';
import format from 'date-fns/format';

function App1() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  
  // `time` is a state variable that changes once per second,
  // so that it's always in sync with the current time.
  const time = useTime();
  
  // Calculate all of the prime numbers.
  // (Unchanged from the earlier example.)
  const allPrimes = [];
  for (let counter = 2; counter < selectedNum; counter++) {
    if (isPrime(counter)) {
      allPrimes.push(counter);
    }
  }
  
  return (
    <>
      <p className="clock">
        {format(time, 'hh:mm:ss a')}
      </p>
      <form>
        <label htmlFor="num">Your number:</label>
        <input
          type="number"
          value={selectedNum}
          onChange={(event) => {
            // To prevent computers from exploding,
            // we'll max out at 100k
            let num = Math.min(100_000, Number(event.target.value));
            
            setSelectedNum(num);
          }}
        />
      </form>
      <p>
        There are {allPrimes.length} prime(s) between 1 and {selectedNum}:
        {' '}
        <span className="prime-list">
          {allPrimes.join(', ')}
        </span>
      </p>
    </>
  );
}

function useTime() {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
  
    return () => {
      window.clearInterval(intervalId);
    }
  }, []);
  
  return time;
}

function isPrime(n){
  const max = Math.ceil(Math.sqrt(n));
  
  if (n === 2) {
    return true;
  }
  
  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default App1;
// Рефакторинг кода
// import React from 'react';
// import format from 'date-fns/format';

// function App1() {
//   const [selectedNum, setSelectedNum] = React.useState(100);
//   const time = useTime();

//   const allPrimes = React.useMemo(() => {
//     const result = [];
//     for (let counter = 2; counter < selectedNum; counter++) {
//       if (isPrime(counter)) {
//         result.push(counter);
//       }
//     }
//     return result;
//   }, [selectedNum]);

//   const formattedTime = React.useMemo(() => format(time, 'hh:mm:ss a'), [time]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const num = Math.min(100_000, Number(event.target.value));
//     setSelectedNum(num);
//   };

//   return (
//     <>
//       <p className="clock">{formattedTime}</p>

//       <form>
//         <label htmlFor="num">Your number:</label>
//         <input
//           id="num"
//           type="number"
//           min="2"
//           value={selectedNum}
//           onChange={handleInputChange}
//         />
//       </form>

//       <p>
//         There are {allPrimes.length.toLocaleString()} prime(s) between 1 and{' '}
//         {selectedNum.toLocaleString()}:
//       </p>
//       <pre className="prime-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//         {allPrimes.join(', ')}
//       </pre>
//     </>
//   );
// }

// function useTime() {
//   const [time, setTime] = React.useState(new Date());

//   React.useEffect(() => {
//     const intervalId = window.setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => window.clearInterval(intervalId);
//   }, []);

//   return time;
// }

// function isPrime(n: number): boolean {
//   if (n < 2) return false;
//   if (n === 2) return true;

//   const max = Math.ceil(Math.sqrt(n));
//   for (let counter = 2; counter <= max; counter++) {
//     if (n % counter === 0) return false;
//   }

//   return true;
// }

// export default App1;

