type Props = {
    message: string;
  };
  
  export default function ErrorMessage({ message }: Props) {
    return (
      <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-2 text-sm">
        {message}
      </div>
    );
  }