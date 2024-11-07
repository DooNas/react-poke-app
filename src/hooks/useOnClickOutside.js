import { useEffect } from 'react';

export default function useOnclickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log('모달창 이벤트', event.target)
      //모달창 안을 클릭할 경우
      if(!ref.current || ref.current.contains(event.target)) {
        return; 
      }

      //모달창 밖을 클릭할 경우
      
      handler();
    }

    document.addEventListener('mousedown', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
    }
    
  }, [ref, handler])  //ref, handler가 계속 바뀔때마다 재호출.
  
}