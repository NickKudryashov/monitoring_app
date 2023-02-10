
import { DetailView } from 'widgets/DetailView'
import { DeviceList } from 'widgets/DeviceList'
import { Navbar } from 'widgets/Navbar'
import cls from './MainPage.module.scss'
const MainPage = () => {
  
  return (
    <div className={cls.MainPage}>
      <Navbar/>
      <div className={cls.content}>
      <DeviceList/>
      <DetailView/>
      </div>
    </div>
  )
}

export default MainPage
