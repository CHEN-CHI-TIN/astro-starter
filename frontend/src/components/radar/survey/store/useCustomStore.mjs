import { create } from "zustand";

const useCustomStore = create((set) => {
  return {
    category: [],
    categorySelect: "",
    sqlHypecycle: {},
    setCategorySelect: (value) => set((state) => ({ categorySelect: value })),
    fetchCategory: async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      set({ category: data });
      return data;
    },
    fetchHypeCycle: async (REACT_APP_API_URL, categoryindex) => {
      const response = await fetch(
        `${REACT_APP_API_URL}/api/radar/hypecycledata_search?categoryindex=${categoryindex}`,
      );
      const data = await response.json();
      set({ sqlHypecycle: data });
      return data;
    },
    fetchHypeCycleAll: async (REACT_APP_API_URL) => {
      const response = await fetch(
        `${REACT_APP_API_URL}/api/radar/hypecycledata`,
      );
      const data = await response.json();
      set({ sqlHypecycle: data });
      return data;
    },
  };
});

window.store = useCustomStore;
export default useCustomStore;
