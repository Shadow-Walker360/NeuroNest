/**
 * useToast — convenience re-export of ToastContext
 * Usage: const { toast } = useToast();
 *   toast.success('Title', 'Message')
 *   toast.error('Title', 'Message')
 *   toast.info('Title', 'Message')
 *   toast.warning('Title', 'Message')
 */
export { useToast as default } from '../context/ToastContext.jsx';