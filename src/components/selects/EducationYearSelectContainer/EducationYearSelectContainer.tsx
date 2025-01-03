import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {CustomSelect} from "../CustomSelect/CustomSelect";
import {setSelectedLearnYear} from "../../../redux/selectorsSlice";

export const EducationYearSelectContainer: FC = () => {

    const learnYears = useSelector((state: RootState) => state.selectors.learnYearSelector.options)
    const selectedLearnYear = useSelector((state: RootState) => state.selectors.learnYearSelector.selectedOption)

    const dispatch = useDispatch<AppDispatch>()

    return <CustomSelect<false> placeholder={'Выберите год обучения'}
                         value={selectedLearnYear ?? undefined}
                         options={learnYears}
                         isLoading={false}
                         onChange={e => dispatch(setSelectedLearnYear(e))}/>
}