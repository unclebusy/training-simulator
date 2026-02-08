import type { IrregularVerbsData } from '../types/verbs'
import meaningData from '../data/irregular-verbs/irregular-verbs-sort-by-meaning.json'
import groupsData from '../data/irregular-verbs/irregular-verbs-sort-by-groups.json'

export const loadVerbsData = (fileType: 'meaning' | 'groups'): IrregularVerbsData => {
  switch (fileType) {
    case 'meaning':
      return meaningData as IrregularVerbsData
    case 'groups':
      return groupsData as IrregularVerbsData
    default:
      return meaningData as IrregularVerbsData
  }
}
