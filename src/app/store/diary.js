import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useDiaryStore = create(
  persist(
    (set, get) => ({
      diaries: [],

      addDiary: ({ title, mood, content }) => {
        const id = Date.now().toString(36)
        const createdAt = new Date().toISOString()
        const entry = { id, title, mood, content, createdAt }
        set((state) => ({ diaries: [entry, ...state.diaries] }))
        return id
      },

      getDiary: (id) => get().diaries.find((d) => d.id === id) || null,

      listDiaries: () =>
        [...get().diaries].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
    }),
    {
      name: 'diary-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ diaries: state.diaries }),
    }
  )
)

export default useDiaryStore

