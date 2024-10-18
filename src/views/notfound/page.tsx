import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';



import notfound from '@/assets/lottie/notfound.json';


const NotFoundPage = () => {

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-500">
      <Lottie animationData={notfound} />
      <Link
        to="/"
        className="rounded bg-purple-900 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80"
      >
        Go Back
      </Link>
    </div>
  )
}

export default NotFoundPage