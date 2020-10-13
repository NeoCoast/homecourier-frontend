import { toast } from 'react-toastify';
export const notifyError = (errorMsg) => toast.error(errorMsg);

export const notifySuccess = (successMsg) => toast.success(successMsg);
