import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useDiaryStore = create(
  persist(
    (set, get) => ({
      diaries: [],
      selectedDate: new Date(),

      setSelectedDate: (date) => set({ selectedDate: date }),

      addDiary: ({ title, mood, content }) => {
        const id = Date.now().toString(36);
        const createdAt = new Date().toISOString();
        const entry = {
          id,
          title,
          mood,
          content,
          createdAt,
          analysis: null,
          analysisCount: 0,
        };
        set((state) => ({ diaries: [entry, ...state.diaries] }));
        return id;
      },

      updateDiary: (id, payload) =>
        set((state) => ({
          diaries: state.diaries.map((d) =>
            d.id === id
              ? {
                  ...d,
                  ...payload,
                  // analysisCount가 payload에 없으면 기존 값 유지
                  analysisCount:
                    payload.analysisCount !== undefined
                      ? payload.analysisCount
                      : d.analysisCount || 0,
                }
              : d
          ),
        })),

      getDiary: (id) => get().diaries.find((d) => d.id === id) || null,

      listDiaries: () =>
        [...get().diaries].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
    }),
    {
      name: "diary-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        diaries: state.diaries,
        selectedDate: state.selectedDate,
      }),
    }
  )
);

export default useDiaryStore;
