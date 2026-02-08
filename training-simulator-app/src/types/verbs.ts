export interface Verb {
  russian: string
  baseV1: string
  pastV2: string
  ppV3: string
  transcriptionV1: string
  transcriptionV2: string
  transcriptionV3: string
}

export interface VerbGroup {
  id: string
  titleEn: string
  titleRu: string
  verbs: Verb[]
}

export interface IrregularVerbsData {
  groups: VerbGroup[]
}
