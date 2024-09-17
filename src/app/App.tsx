import classNames from "@/shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/RouteProvider";
import { YMaps } from "@pbe/react-yandex-maps";
const App = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={classNames("app", {}, [theme])}>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta>
            <link
                href="https://fonts.googleapis.com/css?family=Lato:400,700"
                rel="stylesheet"
                type="text/css"
            ></link>
            {/* <button onClick={toggleTheme}>Сменить тему</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О странице</Link> */}
            <div className="content-page">
                <YMaps>
                    <AppRouter />
                </YMaps>
            </div>
        </div>
    );
};

export default App;
