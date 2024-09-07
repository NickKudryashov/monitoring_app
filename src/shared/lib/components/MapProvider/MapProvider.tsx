import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

type MapImport = typeof import("@pbe/react-yandex-maps");

export interface MapContextPayload {
    mapLib?: MapImport;
    loaded?: boolean;
}

const MapContext = createContext<MapContextPayload>({});

const loadLib = async () => {
    return Promise.all([import("@pbe/react-yandex-maps")]);
};

export const useMapLib = () => {
    return useContext(MapContext) as Required<MapContextPayload>;
};

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
    const [loaded, setIsLoaded] = useState(false);
    const mapLibRef = useRef<MapImport>();
    useEffect(() => {
        loadLib().then(([res]) => {
            mapLibRef.current = res;
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(() => {
        return { mapLib: mapLibRef.current, loaded: loaded };
    }, [loaded]);

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
