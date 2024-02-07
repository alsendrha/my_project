import NavBar from '../../components/NavBar'
import MainScreen from '../../components/MainScreen'
import Row from '../../components/Row'

const MainContainer = () => {
  const city = ['서울', '경기', '인천', '강원'];
  return (
    <div>
      <MainScreen />
      <Row city={city[0]} />
      <Row city={city[1]} />
      <Row city={city[2]} />
      <Row city={city[3]} />
    </div>
  )
}

export default MainContainer