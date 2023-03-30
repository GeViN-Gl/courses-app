import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Type definition for the return value of the toast function as string | number, which is the type of the unique ID that toast returns for each toast message.
// ToastReturnType = string | number;

export const toastNotify = (message: string): string | number => toast(message);
