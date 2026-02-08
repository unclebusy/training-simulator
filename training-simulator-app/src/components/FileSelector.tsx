import { FormControl, Select, MenuItem, Typography } from '@mui/material'

interface FileSelectorProps {
  selectedFile: string
  onFileChange: (file: string) => void
}

const FileSelector = ({ selectedFile, onFileChange }: FileSelectorProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Typography variant="body1">Группирвоать:</Typography>
      <FormControl variant="outlined" size="small">
        <Select
          value={selectedFile}
          onChange={(e) => onFileChange(e.target.value)}
          style={{ minWidth: 150 }}
        >
          <MenuItem value="meaning">По смыслу</MenuItem>
          <MenuItem value="groups">По группам</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default FileSelector
