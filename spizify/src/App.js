import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Dashboard from './Dashboard'
import PlaylistPicker from './PlaylistPicker'
import QuizLiked from './QuizLiked'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <QuizLiked code={code}/> : <Login />//code ? <Dashboard code={code}/> : <Login />
}

export default App;
