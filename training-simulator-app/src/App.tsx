import { useState } from 'react'
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography
} from '@mui/material'
import FileSelector from './components/FileSelector'
import { loadVerbsData } from './utils/loadData'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const [selectedFile, setSelectedFile] = useState<'meaning' | 'groups'>('meaning')
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const verbsData = loadVerbsData(selectedFile)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          textAlign: 'center',
          p: 2
        }}
      >
          <Typography 
            component="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem', lg: '2rem' },
              fontWeight: 'bold'
            }}
          >
            Irregular Verbs Simulator
          </Typography>

          <FileSelector 
            selectedFile={selectedFile} 
            onFileChange={(file) => {
              setSelectedFile(file as 'meaning' | 'groups')
              setSelectedGroupIndex(0)
            }} 
          />

          {selectedFile === 'groups' && verbsData.groups.length > 0 && (
            <Typography variant="h6">
              {verbsData.groups[selectedGroupIndex]?.titleEn} - {verbsData.groups[selectedGroupIndex]?.titleRu}
            </Typography>
          )}

        </Box>
    </ThemeProvider>
  )
}

export default App
