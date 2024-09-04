import { Button } from '@fluentui/react-components';
import { useRouter } from 'next/router';
 const NotFound = () => {
    const router = useRouter();
  return <div className='flex justify-center items-center gap-5 mt-7 flex-col'>
      <h1>Not found – 404!</h1>
      <div>
        <Button className='text-xl text-sky-400' onClick={()=> router.push('/login')} >Go back to Home</Button>
      </div>
  </div>
}

export default NotFound;