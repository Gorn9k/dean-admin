import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {CustomSelect} from "../CustomSelect/CustomSelect";
import {setSelectedSemester} from "../../../redux/selectorsSlice";

export const SemesterSelectContainer: FC = () => {

    const semesters = useSelector((state: RootState) => state.selectors.semesterSelector.options)
    const selectedSemester = useSelector((state: RootState) => state.selectors.semesterSelector.selectedOption)

    const dispatch = useDispatch<AppDispatch>()

    return <CustomSelect<false> placeholder={'Выберите семестр'}
                                value={selectedSemester ?? undefined}
                                options={semesters}
                                isLoading={false}
                                onChange={e => dispatch(setSelectedSemester(e))}/>
}