import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchData, resetState, postData } from '../features/ApiSlice';

interface PostParams {
  url: string;
  payload: any;
  method: "post" | "put" | "patch"
}

const useApi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { response, isLoading, error } = useSelector((state: RootState) => state.api);

  const fetch = (url: string) => {
    dispatch(fetchData(url));
  };

  const post = ({ url, payload, method }: PostParams) => {
    dispatch(postData({ url, payload, method }));
  };

  const reset = () => {
    dispatch(resetState());
  };

  return { isLoading, error, response,post, fetch, reset };
};

export default useApi;
