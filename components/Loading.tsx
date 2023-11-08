type LoadingProps = {
  loadText?: string;
};

const Loading = ({ loadText }: LoadingProps) => {
  return (
    <div className="mx-auto min-h-[50vh] flex items-center">
      <h1 className="text-xl font-bold">
        {loadText ? loadText : <span>Loading, please wait...</span>}
      </h1>
    </div>
  );
};

export default Loading;
