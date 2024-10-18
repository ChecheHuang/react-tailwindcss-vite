import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<ChainedBackendOptions>({
    lng: 'zh-CN',
    fallbackLng: 'en',
    ns: 'translation',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`@/views/tools/i18n/locales/${language}/${namespace}.json`),
        ),
      ],
      backendOptions: [
        {
          loadPath: async ([lang]) => {
            try {
              return ''

              const url = await fakePromise(lang)
              return url
            } catch (err) {
              console.log(err)
            }
          },
        },
      ] as [HttpBackendOptions],
    },
  })

const fakePromise = (lan: string) =>
  new Promise((resolve) => {
    const obj = {
      'en-AU':
        '/api/manage/system/area/language/resource/language/en_20240503174145.json',
      'en-GB':
        '/api/manage/system/area/language/resource/language/en_20240503174145.json',
      'en-IE':
        '/api/manage/system/area/language/resource/language/en_20240503174145.json',
      'en-US':
        '/api/manage/system/area/language/resource/language/en_20240503174145.json',
      'en-ZA':
        '/api/manage/system/area/language/resource/language/en_20240503174145.json',
      ms: '/api/manage/system/area/language/resource/language/en_20240503174145.json',
      'zh-CN':
        '/api/manage/system/area/language/resource/language/zhCn_20240503174145.json',
      'pt-BR':
        '/api/manage/system/area/language/resource/language/portuguese_20240503174145.json',
      'pt-PT':
        '/api/manage/system/area/language/resource/language/portuguese_20240503174145.json',
      'zh-Hans':
        '/api/manage/system/area/language/resource/language/zhCn_20240503174145.json',
    }
    const url = obj[lan as keyof typeof obj]
    resolve(url)
  })

export default i18n
