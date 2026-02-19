export interface Verb {
  russian: string
  'base V1': string
  'past V2': string
  'pp V3': string
  'transcription V1': string
  'transcription V2': string
  'transcription V3': string
  page?: number
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
