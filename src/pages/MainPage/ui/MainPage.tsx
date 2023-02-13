
import { HeatDeviceDetailView } from "entities/Heatcounters";
import { HeatNodeDetailView } from "entities/HeatNodes";
import { ObjectDetail } from "entities/Objects";
import { ObjectCategoryView } from "features/ObjectCategoryCardView";
import { useAppSelector } from "shared/hooks/hooks";
import { DetailView } from "widgets/DetailView";
import { DeviceList } from "widgets/DeviceList";
import { Navbar } from "widgets/Navbar";
import cls from "./MainPage.module.scss";
const MainPage = () => {
    const {currentObject,currentDevice,currentNode} = useAppSelector(state=>state.deviceListReducer);
    console.log("выбран объект",currentObject?.name);
    console.log("выбран узел",currentNode?.name);
    return (
        <div className={cls.MainPage}>
            <Navbar/>
            <div className={cls.content}>
                <DeviceList/>
                <DetailView>
                    {currentObject===undefined && currentDevice===undefined && currentNode===undefined && <ObjectCategoryView/> }
                    {currentObject!==undefined && currentDevice===undefined && currentNode===undefined && <ObjectDetail obj={currentObject}/> }
                    {currentObject===undefined && currentDevice!==undefined && currentNode===undefined && <HeatDeviceDetailView device={currentDevice}/> }
                    {currentObject===undefined && currentDevice===undefined && currentNode!==undefined && <HeatNodeDetailView heatNode={currentNode}/> }
                </DetailView>
                {/* <DetailView/> */}
            </div>
        </div>
    );
};

export default MainPage;
