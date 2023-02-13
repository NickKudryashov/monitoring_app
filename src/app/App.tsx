import { Suspense} from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./styles/index.scss";
import classNames from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { AppRouter } from "./providers/RouteProvider"; 


const App = () => {
    const {theme,toggleTheme} = useTheme();
    return (
        <div className={classNames("app",{},[theme,])}>
            {/* <button onClick={toggleTheme}>Сменить тему</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О странице</Link> */}
            <div className='content-page'>
                <AppRouter/>
            </div>
        </div>
    );
};

export default App;
