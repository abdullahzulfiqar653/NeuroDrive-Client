import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchData, resetState, postData } from '../features/ApiSlice';

interface PostParams {
  url: string;
  payload: any;
}

const useApi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { response, isLoading, error } = useSelector((state: RootState) => state.api);

  const fetch = (url: string) => {
    dispatch(fetchData(url));
  };

  const post = ({ url, payload }: PostParams) => {
    dispatch(postData({ url, payload }));
  };

  const reset = () => {
    dispatch(resetState());
  };

  return { isLoading, error, response, fetch, reset };
};

export default useApi;
