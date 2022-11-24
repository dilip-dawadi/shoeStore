import { toast } from "react-toastify";

export const NotifySuccess = message => {
  toast.success(message, {
    hideProgressBar: true,
    closeOnClick: true,
  })
}

export const NotifyError = message => {
  toast.error(`${message}`);
};

export const NotifyWarning = message => {
  toast.warning(`${message}`);
};

export const NotifyInfo = message => {
  toast.info(`${message}`);
};

export const LoadingCircle = () => {
  return (
    <svg className="h-5 m-auto text-rose-600 animate-spin" style={{
      position: 'absolute',
      top: "5%",
      right: "10%",
    }} xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg >
  )
}

export const LoadingBtn = ({ color, width }) => {
  return (
    <svg className={`w-${width} h-[1.5rem] m-auto text-${color} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
  )
}

export const LoadingCard = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
      {[1, 2, 3, 4].map((index) => (
        <div className="relative shadow-xl px-3 pt-3 overflow-hidden rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer transition bg-[#fff] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-black/20 before:animate-[shimmer_1.3s_infinite] animate-pulse" key={index}>
          <div className="mb-3 rounded-lg rounded-br-[90px] rounded-tl-[90px] mx-auto
      min-w-[240px] max-w-[240px] min-h-[240px] max-h-[240px] object-cover bg-gray-50"></div>
          <div className='mb-2 flex text-sm justify-around px-0 align-center'>
            {["", ""].map((shoeF, index) => {
              const IndexStyle = index === 0 ? 'bg-yellow-100' : 'bg-rose-100';
              return (
                <span className={`capitalize ${IndexStyle} rounded-lg text-white px-0 py-[0.7rem] tracking-[.04em] w-[95px] h-[20px]`} key={index}>{shoeF}</span>
              );
            }
            ).splice(0, 2)}
          </div>
          <div className='flex justify-between mb-2 bg-gray-50 animate-pulse px-6 py-[1.2rem] rounded-lg'></div>
        </div>
      ))}
    </div>
  )
}

export const LoadingSinglePage = () => {
  return (
    <div className='flex flex-col gap-10 items-center justify-center text-center md:min-h-[640px] md:flex-row mx-4'>
      <div className='basis-1/3 flex-1 relative shadow-xl mt-3 overflow-hidden rounded-lg  w-full mx-auto cursor-pointer transition bg-[#fff] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-black/20 before:animate-[shimmer_2s_infinite]'>
        <div className="m-auto rounded-lg w-full min-h-[90vh] object-cover bg-white"></div>
      </div>
    </div>
  )
}