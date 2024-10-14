import { atom } from "recoil";

const allClientsAtom = atom({
    key: "allClientsAtom",
    default: JSON.parse(localStorage.getItem("clients-payGifty"))
})

export default allClientsAtom; 