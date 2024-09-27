import { useTranslation, I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import setting from './index'

function I18nPage() {
  const { t } = useTranslation()
  const changeLanguage = () => {
    // Code to change the language
    i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN')
  }

  return (
    <I18nextProvider i18n={setting}>
      <div>
        <button onClick={changeLanguage}>
          {t('Switch Language', { language: i18n.language })}
        </button>
        <div>{t('chaKanGengDuo')}</div>
        <div>{t('qingShuRuShuZi')}</div>
      </div>
    </I18nextProvider>
  )
}

export default I18nPage
