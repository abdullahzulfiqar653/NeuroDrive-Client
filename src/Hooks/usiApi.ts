import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchData, resetCallState, postData } from '../features/ApiSlice';

interface PostParams {
  url: string;
  payload: any;
  method: 'post' | 'put' | 'patch' | 'delete';
}

const useApi = (key: string) => {
  const dispatch = useDispatch<AppDispatch>();


  const fetch = (url: string) => {
    dispatch(fetchData({ url, key }));
  };

  const post = ({ url, payload, method }: PostParams) => {
    dispatch(postData({ url, payload, method, key }));
  };

  const reset = () => {
    console.log("Resetting state for key:", key);
    dispatch(resetCallState(key)); // Reset only the state for the specified key
  };

  return { post, fetch, reset };
};

export default useApi;



