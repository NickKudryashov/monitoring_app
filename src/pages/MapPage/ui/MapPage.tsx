import { DetailView } from "widgets/DetailView";
import cls from "./MapPage.module.scss";
import { Map, Placemark } from "react-yandex-maps";
import { getMapMarkers } from "entities/MapMarker";
import { ReactElement, useEffect, useState } from "react";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { createPortal } from "react-dom";
import "./MapPage.module.scss";
import { BaloonPortal } from "./BaloonPortal/BaloonPortal";
import { ObjectMarker } from "./ObjectMarker/ObjectMarker";
const MapPage = () => {
    const { data: markers, refetch } = getMapMarkers();
    const [activePortal, setActivePortal] = useState(0);
    console.log(markers);
    useEffect(() => {
        refetch();
    }, []);
    return (
        <div className={cls.MapPage}>
            <DetailView className={cls.detail}>
                <Map
                    className={cls.map}
                    defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                    modules={[
                        "geoObject.addon.balloon",
                        "geoObject.addon.hint",
                    ]}
                >
                    {/* <Placemark  geometry={[55.684758, 37.738521]} /> */}
                    {markers?.map((el) => (
                        <Placemark
                            key={el.id}
                            geometry={[el.latitude, el.longitude]}
                            options={
                                {
                                    // iconColor: "red",
                                }
                            }
                            properties={{
                                balloonContent: `<div id="driver-${el.user_object_id}" class="${cls.driverCard}"></div>`,
                            }}
                            onClick={() => {
                                // ставим в очередь промисов, чтобы сработало после отрисовки балуна
                                setTimeout(() => {
                                    setActivePortal(el.user_object_id);
                                }, 0);
                            }}
                        />
                    ))}
                </Map>
                {activePortal && (
                    <BaloonPortal getHTMLElementId={`driver-${activePortal}`}>
                        {/* ставим свой компонент */}
                        <ObjectMarker id={activePortal} />
                    </BaloonPortal>
                )}
            </DetailView>
            {/* <DetailView/> */}
        </div>
    );
};

export default MapPage;
