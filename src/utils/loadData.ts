import type { IrregularVerbsData } from '../types/verbs'
import meaningData from '../data/irregular-verbs/irregular-verbs-sort-by-meaning.json'
import groupsData from '../data/irregular-verbs/irregular-verbs-sort-by-groups.json'
import pagesData from '../data/irregular-verbs/irregular-verbs-sort-by-pages.json'

export const loadVerbsData = (fileType: 'meaning' | 'groups' | 'pages'): IrregularVerbsData => {
  switch (fileType) {
    case 'meaning':
      return meaningData as IrregularVerbsData
    case 'groups':
      return groupsData as IrregularVerbsData
    case 'pages':
      return pagesData as IrregularVerbsData
    default:
      return meaningData as IrregularVerbsData
  }
}
