import {
  TypedUseSelectorHook,
  useDispatch as originDispatch,
  useSelector as originSelector,
} from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import themeReducer from './modules/themeSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})

export default store

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useSelector: TypedUseSelectorHook<RootState> = originSelector
export const useDispatch = () => originDispatch<AppDispatch>()
