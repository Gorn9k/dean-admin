import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {CustomSelect} from "../CustomSelect/CustomSelect";
import {fetchFaculties, setSelectedFaculty} from "../../../redux/selectorsSlice";

export const FacultySelectContainer: FC = () => {

    const faculties = useSelector((state: RootState) => state.selectors.facultySelector.options)
    const selectedFaculty = useSelector((state: RootState) => state.selectors.facultySelector.selectedOption)
    const isLoadingFaculties = useSelector((state: RootState) => state.selectors.facultySelector.optionsIsLoading)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchFaculties())
    }, [dispatch]);

    return <CustomSelect<false> placeholder={'Выберите факультет'}
                                value={selectedFaculty ?? undefined}
                                options={faculties}
                                isLoading={isLoadingFaculties}
                                onChange={e => dispatch(setSelectedFaculty(e))}/>
}