import { FormControlLabel, Switch, Typography } from '@mui/material'

interface FileSelectorProps {
  selectedFile: string
  onFileChange: (file: string) => void
}

const FileSelector = ({ selectedFile, onFileChange }: FileSelectorProps) => {
  const isGroupsMode = selectedFile === 'groups'
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Typography variant="body1">Sorted:</Typography>
      <FormControlLabel
        control={
          <Switch
            checked={isGroupsMode}
            onChange={(e) => onFileChange(e.target.checked ? 'groups' : 'meaning')}
          />
        }
        label={isGroupsMode ? 'by Groups' : 'by Meaning'}
      />
    </div>
  )
}

export default FileSelector
