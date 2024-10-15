import { atom, useAtom } from "jotai"
import { PredictionData } from "./data"


type Config = {
  selected: PredictionData["_id"] | null
}

const configAtom = atom<Config>({
  selected: null,
})

export function useMail() {
  return useAtom(configAtom)
}