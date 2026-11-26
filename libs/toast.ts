import { toast } from '@/components/ui/toast';

export const appToast = {
  success(message: string) {
    toast.add({
      type: 'success',
      description: message,
    });
  },

  error(message: string) {
    toast.add({
      type: 'error',
      description: message,
    });
  },

  info(message: string) {
    toast.add({
      type: 'info',
      description: message,
    });
  },
};
