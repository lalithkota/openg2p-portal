import React from 'react';
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  const notify = (message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | ((props: ToastContentProps<unknown>) => React.ReactNode) | null | undefined, type: string) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <button onClick={() => notify('This is a toast message.', 'success')}>
        Show Success Toast
      </button>
      <button onClick={() => notify('Something went wrong!', 'error')}>
        Show Error Toast
      </button>
    </div>
  );
}
