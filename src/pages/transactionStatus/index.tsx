import Navigation from '@/component/navigation';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useRouter } from 'next/router';

const TranactionStatus = () => {
  const router = useRouter();
  let query = router.query;
  let status = query.status;

  return (
    <div>
      <Navigation />
      <div className="bg-[#F2F2F2] pt-[130px] h-[100vh] flex items-center justify-center">
        <div className="bg-white rounded-md shadow-md  w-[370px] flex flex-col items-center justify-center h-[300px]">
          {status === 'succes' && (
            <>
              <PaymentsRoundedIcon
                className="text-green-500"
                style={{ fontSize: '80px' }}
              />
              <div className="font-bold text-[40px]">Payment Succesful</div>
              <div className="text-[20px]">Thank you fir your payment!</div>
              <div className="bg-green-500 text-[17px] mt-3 p-2 px-5 text-white cursor-pointer rounded-full">
                Continue Shopping
              </div>
            </>
          )}

          {status === 'failed' && (
            <>
              <CancelRoundedIcon
                className="text-red-500"
                style={{ fontSize: '80px' }}
              />
              <div className="font-bold text-[40px]">Payment Canceled</div>
              <div className="text-[20px]">Your Payment was Canceled.</div>
              <div
                className="bg-red-500 text-[17px] mt-3 p-2 px-5 text-white cursor-pointer rounded-full"
                onClick={() => router.push('/')}
              >
                Return to Home
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranactionStatus;
