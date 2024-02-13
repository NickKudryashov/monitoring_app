
import { DetailView } from "widgets/DetailView";
import cls from "./MapPage.module.scss";
import {Map,Placemark} from "react-yandex-maps";
const MapPage = () => {

    return (
        <div className={cls.MapPage}>
            <DetailView
                className={cls.detail}
            >
                <Map className={cls.map} defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                    modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                >
                    <Placemark  geometry={[55.684758, 37.738521]} />
                    <Placemark
                        properties={{
                            balloonContentBody: "Детальное описание офиса",
                            hintContent: "Тут офис"
                        }}
                        geometry={[56.361384, 37.528576]}
                    />
                </Map>
            </DetailView>
            {/* <DetailView/> */}
        </div>
    );
};

export default MapPage;
