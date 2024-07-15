import { LoadMoreBtnProps } from "../App/App.type";

const LoadMoreBtn = ({ onHandleClick }: LoadMoreBtnProps) => {
  return <button onClick={onHandleClick}>Load more...</button>;
};

export default LoadMoreBtn;
