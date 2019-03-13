// Hooks
import useI18n from './useI18n';


export const useTranslation = () => {
  const context = useI18n();
  return context.trls;
};

export default useTranslation;
