import { create } from "zustand";

interface ProfileState {
  profileImage: string;
  name: string;
  introduction: string;
  setProfileImage: (image: string) => void;
  setName: (name: string) => void;
  setIntroduction: (introduction: string) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  profileImage: "/images/test01.jpg",
  name: "Daye Choi",
  introduction: "",
  setProfileImage: (image) => set({ profileImage: image }),
  setName: (name) => set({ name }),
  setIntroduction: (introduction) => set({ introduction }),
}));

export default useProfileStore;
