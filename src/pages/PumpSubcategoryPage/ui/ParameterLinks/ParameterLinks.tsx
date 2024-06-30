import { PumpDetailInfo, PumpPreview } from "entities/PumpDevice";
import { getPumpPageParameterGroup } from "pages/PumpSubcategoryPage/model/selectors";
import { pumpPageSliceActions } from "pages/PumpSubcategoryPage/model/slice";
import { ReactElement, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/hooks/hooks";
import { VFlexBox } from "shared/ui/FlexBox/VFlexBox/VFlexBox";
import cls from "./ParameterLinks.module.scss";
import classNames from "shared/lib/classNames/classNames";
import { getSubTab, getTab } from "widgets/SubcategoryTabs";
interface ParameterLinksProps {
    deviceDataDetail: PumpDetailInfo;
}

export const ParameterLinks = (props: ParameterLinksProps): ReactElement[] => {
    const { deviceDataDetail } = props;
    const selectedParamGroup = useSelector(getPumpPageParameterGroup);
    const selectedSubtab = useSelector(getSubTab);
    const dispatch = useAppDispatch();

    const onParamGroupReselect = useCallback(() => {
        dispatch(pumpPageSliceActions.clearParameterSubgroup());
    }, []);

    const onGeneralClick = useCallback(
        () => dispatch(pumpPageSliceActions.setParameterSubgroup("general")),
        []
    );
    const onErrorClick = useCallback(
        () => dispatch(pumpPageSliceActions.setParameterSubgroup("errors")),
        []
    );

    const tabContent = deviceDataDetail
        ? Object.keys(deviceDataDetail?.parametersByGroup).map((grName, i) => (
              <VFlexBox
                  gap="15px"
                  height={
                      grName ===
                      deviceDataDetail?.systemIndexByName[selectedSubtab]
                          ? "70%"
                          : "5%"
                  }
                  alignItems="center"
                  key={i}
              >
                  <p
                      key={i}
                      onClick={onParamGroupReselect}
                      className={classNames(
                          cls.paramTitle,
                          {
                              [cls.paramTitleSelected]:
                                  selectedParamGroup === grName,
                          },
                          []
                      )}
                  >
                      {grName}
                  </p>
                  {grName ===
                      deviceDataDetail?.systemIndexByName[selectedSubtab] && (
                      <VFlexBox className={cls.paramSelectors}>
                          <p
                              key={i}
                              onClick={onGeneralClick}
                              className={classNames(
                                  cls.paramTitle,
                                  {
                                      [cls.paramTitleSelected]:
                                          selectedParamGroup === grName,
                                  },
                                  []
                              )}
                          >{`ОБЩИЕ ПАРАМЕТРЫ ${grName}`}</p>
                          <p
                              key={i}
                              onClick={onErrorClick}
                              className={classNames(
                                  cls.paramTitle,
                                  {
                                      [cls.paramTitleSelected]:
                                          selectedParamGroup === grName,
                                  },
                                  []
                              )}
                          >{`НЕИСПРАВНОСТИ ${grName}`}</p>
                          <PumpPreview
                              parameters={
                                  deviceDataDetail.parametersByGroup[grName]
                                      .preview
                              }
                          />
                      </VFlexBox>
                  )}
              </VFlexBox>
          ))
        : [];
    return tabContent;
};
