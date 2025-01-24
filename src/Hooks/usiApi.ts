import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchData, resetCallState, postData } from '../features/ApiSlice';
import { useMemo } from 'react';

interface PostParams {
  url: string;
  payload: any;
  method: 'post' | 'put' | 'patch';
}

const useApi = (key: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const defaultCallState = useMemo(
    () => ({
      isLoading: false,
      error: null,
      response: null,
    }),
    []
  );

  const { response, isLoading, error } = useSelector((state: RootState) => 
    state.api.calls[key] || defaultCallState
  );

  // const { response, isLoading, error } = useSelector(
  //   (state: RootState) => state.api.calls[key] || {
  //     isLoading: false,
  //     error: null,
  //     response: null,
  //   }
  // );

  const fetch = (url: string) => {
    dispatch(fetchData({ url, key }));
  };

  const post = ({ url, payload, method }: PostParams) => {
    dispatch(postData({ url, payload, method, key }));
  };

  const reset = () => {
    dispatch(resetCallState(key)); // Reset only the state for the specified key
  };

  return { isLoading, error, response, post, fetch, reset };
};

export default useApi;





