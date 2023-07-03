
import './App.css'
import AppBanner from './components/appBanner/AppBanner'
import AppHeader from './components/appHeader/AppHeader'
import ComicsItem from './components/comicsItem/ComicsItem'
// import CharItem from './components/charItem/CharItem'

function App() {

  return (
    <>
      <AppHeader/>
      <AppBanner/>
      {/* <CharItem/> */}
      <ComicsItem/>
    </>
  )
}

export default App
