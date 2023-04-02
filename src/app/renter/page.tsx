import styles from './RenterPage.module.css';

const DAYS_REMAINING = '20 days';
const AMOUNT_COLLECTED = '67% collected';
const AMOUNT_GOAL = '8 040$ / 12 000$ collected';
const MAXIMUM_RENT = '1 000$';
const MAXIMUM_DURATION = '1 year';
const INFORMATION_STATUS = 'verified';
const PREMIUM = '5%';

export default function RenterPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl text-orange-400 mb-5">Current campaign</h1>
      <div className="flex flex-col justify-between items-center bg-zinc-100 rounded-3xl border border-black border-opacity-25 p-10 mb-10">
        <h2 className="text-4xl font-medium text-black mb-auto">
        Remaining collection time : <span className="text-orange-400">{DAYS_REMAINING}</span>
        </h2>
        <div className="mt-5 mb-2">{AMOUNT_COLLECTED}</div>
        <div className='w-3/4 h-8 bg-dark'>
          <div className='w-3/4 h-8 bg-orange-400'></div>
        </div>
        <div className="mt-2">{AMOUNT_GOAL}</div>
        <div className="justify-center my-5">
          <div className="font-bold md-auto my-2 text-center w-full">Details</div>
          <div className="justify-center">Maximum rent : <span className="text-orange-400">{MAXIMUM_RENT}</span></div>
          <div>Maximum duration : <span className="text-orange-400">{MAXIMUM_DURATION}</span></div>
          <div>Information status : <span className="text-orange-400">{INFORMATION_STATUS}</span></div>
          <div>Premium : <span className="text-orange-400">{PREMIUM}</span></div>
        </div>
      </div>
    </div>
  );
}
