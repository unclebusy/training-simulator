import { useState } from 'react'
import {
  Box,
  ThemeProvider,
  CssBaseline,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Paper,
  TextField,
  Button,
  Alert,
  Switch,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import FileSelector from './components/FileSelector'
import { loadVerbsData } from './utils/loadData'

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
// })

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  
  const [selectedFile, setSelectedFile] = useState<'meaning' | 'groups' | 'pages'>('pages')
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0)
  const [v1Input, setV1Input] = useState('')
  const [v2Input, setV2Input] = useState('')
  const [v3Input, setV3Input] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showTranscription, setShowTranscription] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showHintButton, setShowHintButton] = useState(false)
  const [showClearButton, setShowClearButton] = useState(false)
  const [isRandomOrder, setIsRandomOrder] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [usedHint, setUsedHint] = useState(false)
  const verbsData = loadVerbsData(selectedFile)

  const isCheckButtonDisabled = !v1Input.trim() || !v2Input.trim() || !v3Input.trim()

  const getRandomVerbIndex = () => {
    if (verbsData.groups.length > 0 && selectedGroupIndex >= 0) {
      const groupLength = verbsData.groups[selectedGroupIndex].verbs.length
      return Math.floor(Math.random() * groupLength)
    }
    return 0
  }

  const handleClear = () => {
    setV1Input('')
    setV2Input('')
    setV3Input('')
    setShowResult(false)
    setIsCorrect(false)
    setShowTranscription(false)
    setShowHintButton(false)
    setShowClearButton(false)
    setUsedHint(false)
    if (isRandomOrder) {
      setCurrentVerbIndex(getRandomVerbIndex())
    }
  }

  const handleShowHintEarly = () => {
    if (verbsData.groups.length > 0 && selectedGroupIndex >= 0) {
      const currentVerb = verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]
      if (currentVerb) {
        setV1Input(currentVerb['base V1'])
        setV2Input(currentVerb['past V2'])
        setV3Input(currentVerb['pp V3'])
        setShowTranscription(true)
        setShowNextButton(true)
        setShowHintButton(false)
        setShowClearButton(false)
        setUsedHint(true)
      }
    }
  }

  const handleCheck = () => {
    if (verbsData.groups.length > 0 && selectedGroupIndex >= 0) {
      const currentVerb = verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]
      if (currentVerb) {
        const correct =
          v1Input.toLowerCase().trim() === currentVerb['base V1'].toLowerCase().trim() &&
          v2Input.toLowerCase().trim() === currentVerb['past V2'].toLowerCase().trim() &&
          v3Input.toLowerCase().trim() === currentVerb['pp V3'].toLowerCase().trim()

        setIsCorrect(correct)
        setShowResult(true)
        if (correct && !usedHint) {
          setCorrectAnswersCount(prev => prev + 1)
          setShowNextButton(true)
          setShowHintButton(false)
          setShowClearButton(false)
        } else {
          setShowHintButton(true)
          setShowNextButton(false)
          setShowClearButton(true)
        }
      }
    }
  }

  const handleShowHint = () => {
    if (verbsData.groups.length > 0 && selectedGroupIndex >= 0) {
      const currentVerb = verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]
      if (currentVerb) {
        setV1Input(currentVerb['base V1'])
        setV2Input(currentVerb['past V2'])
        setV3Input(currentVerb['pp V3'])
        setShowResult(false)
        setShowTranscription(true)
        setShowNextButton(true)
        setShowHintButton(false)
        setShowClearButton(false)
        setUsedHint(true)
      }
    }
  }

  const handleNext = () => {
    if (verbsData.groups.length > 0 && selectedGroupIndex >= 0) {
      let nextIndex: number
      
      if (isRandomOrder) {
        nextIndex = getRandomVerbIndex()
      } else {
        nextIndex = currentVerbIndex + 1
        if (nextIndex >= verbsData.groups[selectedGroupIndex].verbs.length) {
          nextIndex = 0 // Начать с начала если достигли конца
        }
      }
      
      setCurrentVerbIndex(nextIndex)
      setV1Input('')
      setV2Input('')
      setV3Input('')
      setShowResult(false)
      setIsCorrect(false)
      setShowTranscription(false)
      setShowNextButton(false)
      setShowHintButton(false)
      setShowClearButton(false)
      setUsedHint(false)
    }
  }

  const SettingsContent = () => (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FileSelector
        selectedFile={selectedFile}
        onFileChange={(file) => {
          setSelectedFile(file as 'meaning' | 'groups' | 'pages'  )
          setSelectedGroupIndex(0)
          setCurrentVerbIndex(isRandomOrder ? getRandomVerbIndex() : 0)
        }}
      />

      {verbsData.groups.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography variant="body1">Категория:</Typography>
            <FormControl variant="outlined" size="small" sx={{ width: 350 }}>
              <Select
                value={selectedGroupIndex}
                onChange={(e) => {
                  setSelectedGroupIndex(Number(e.target.value))
                  setCurrentVerbIndex(isRandomOrder ? getRandomVerbIndex() : 0)
                }}
                fullWidth
              >
                {verbsData.groups.map((group, index) => (
                  <MenuItem key={group.id} value={index}>
                    {group.titleRu}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Случайный порядок
            </Typography>
            <Switch
              checked={isRandomOrder}
              onChange={(e) => {
                setIsRandomOrder(e.target.checked)
                setCurrentVerbIndex(e.target.checked ? getRandomVerbIndex() : 0)
              }}
              color="primary"
            />
          </div>
        </>
      )}
    </Box>
  )

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
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          p: 2,
          overflowY: 'auto'
        }}
      >
        {/* Настройки для десктопа */}
        {!isMobile && (
          <Paper sx={{ p: 2, minWidth: 250, maxWidth: 300 }}>
            <SettingsContent />
          </Paper>
        )}

        {/* Кнопка меню для мобильных */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Irregular Verbs
            </Typography>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* Основной контент */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {!isMobile && (
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Irregular Verbs
            </Typography>
          )}

        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            Правильных ответов: <span style={{ fontWeight: 'bold', color: '#4caf50' }}>{correctAnswersCount}</span>
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, minWidth: 150 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.3rem'
            }}
          >
            <Box component="span" sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              fontWeight: 'normal'
            }}>
              {`Cлово: `}
            </Box>
            {verbsData.groups.length > 0 && selectedGroupIndex >= 0
              ? verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]?.russian?.charAt(0)?.toUpperCase() + verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]?.russian?.slice(1) || 'No verb found'
              : 'No data'
            }
          </Typography>

          <Typography variant="body2" sx={{ mt: 3, mb:2, color: 'text.secondary' }}>
            Введите слово в 3 временах на английском
          </Typography>

          <TextField
            fullWidth
            label="V1 (Base Form)"
            variant="outlined"
            value={v1Input}
            onChange={(e) => setV1Input(e.target.value)}
          />

          <TextField
            fullWidth
            label="V2 (Past Simple)"
            variant="outlined"
            value={v2Input}
            onChange={(e) => setV2Input(e.target.value)}
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="V3 (Past Participle)"
            variant="outlined"
            value={v3Input}
            onChange={(e) => setV3Input(e.target.value)}
            sx={{ mt: 2 }}
          />

          {showTranscription && verbsData.groups.length > 0 && selectedGroupIndex >= 0 && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Транскрипция:</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                V1: [{verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]?.['transcription V1']}]
              </Typography>
              <Typography variant="body2">
                V2: [{verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]?.['transcription V2']}]
              </Typography>
              <Typography variant="body2">
                V3: [{verbsData.groups[selectedGroupIndex]?.verbs[currentVerbIndex]?.['transcription V3']}]
              </Typography>
            </Box>
          )}

          {showNextButton ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 4 }}
              fullWidth
            >
              Далее
            </Button>
          ) : showHintButton ? (
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              {showClearButton && (
                <Button
                  variant="outlined"
                  onClick={handleClear}
                  sx={{ flex: 1 }}
                  color="error"
                >
                  Очистить
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={handleShowHint}
                sx={{ flex: showClearButton ? 1 : 'auto' }}
              >
                Подсказка
              </Button>
            </Box>
          ) : isCheckButtonDisabled ? (
            <Button
              variant="outlined"
              onClick={handleShowHintEarly}
              sx={{ mt: 4 }}
              fullWidth
            >
              Не знаю
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleCheck}
              sx={{ mt: 4 }}
              fullWidth
            >
              Проверить
            </Button>
          )}

          {showResult && (
            <Box sx={{ mt: 2 }}>
              {isCorrect ? (
                <Alert
                  severity="success"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiAlert-message': {
                      flex: 1
                    }
                  }}
                >
                  Верно!
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiAlert-message': {
                      flex: 1
                    }
                  }}
                >
                  Неверно!
                </Alert>
              )}
            </Box>
          )}
        </Paper>



        </Box>

        {/* Drawer для мобильных */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 280 }}>
            <SettingsContent />
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  )
}

export default App
