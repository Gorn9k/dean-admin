import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {setMenuVisible, setSelectedRowId} from "../../../redux/menuSlice";
import stylesFromApp from '../../../App.module.css'
import {setStudentModalIsOpen} from "../../../redux/modalsSlice";
import {setSelectedStudent} from "../../../redux/tablesSlice";
import {Image} from "../../Image/Image";

export const StudentInfoMenuContainer: FC = () => {

    const menuVisible = useSelector((state: RootState) => state.menu.menuVisible)
    const menuPosition = useSelector((state: RootState) => state.menu.menuPosition)
    const selectedStudent = useSelector((state: RootState) => state.menu.selectedStudent)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const handleAction = (e: any) => {
            if (!['student', 'preloader', 'image'].some(value => (e.fromElement.id as string).includes(value)) || !e.toElement?.id) {
                dispatch(setMenuVisible(false))
                dispatch(setSelectedRowId(null))
            }
        }
        document.getElementById('studentMenu')?.addEventListener('mouseout', handleAction)
        return () => document.getElementById('studentMenu')?.addEventListener('mouseout', handleAction)
    }, [dispatch, menuVisible]);

    return menuVisible ? <div id={'studentMenu'}
                              style={{
                                  top: menuPosition.y,
                                  left: menuPosition.x,
                                  padding: '10px',
                                  display: 'grid',
                                  gridTemplateColumns: '150px 1fr',
                                  gridTemplateRows: '200px',
                                  border: '1px solid',
                                  gap: '10px'
                              }}
                              className={stylesFromApp.menuListContainer}
    >
        <Image url={selectedStudent?.photoUrl}/>
        <div id={'studentInfoContainer'} style={{
            gridArea: '1/2/2/3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            fontFamily: 'cursive'
        }}>
            <div id={'studentSurname'}>{selectedStudent?.surname}</div>
            <div id={'studentName'}>{selectedStudent?.name}</div>
            <div id={'studentPatronymic'}>{selectedStudent?.patronymic}</div>
            <div id={'studentGroupName'}>{selectedStudent?.group?.name}</div>
            <div id={'studentCaseNo'}>{selectedStudent?.caseNo}</div>
            <button id={'studentModalOpenButton'} type="button"
                    onClick={() => {
                        dispatch(setStudentModalIsOpen(true))
                        dispatch(setSelectedStudent(selectedStudent))
                        dispatch(setMenuVisible(false))
                    }}
                    className={`${stylesFromApp.button} ${stylesFromApp.formButton}`}>
                Подробнее
            </button>
        </div>
    </div> : null
}