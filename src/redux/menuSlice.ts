import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StudentType} from "../api/dean-api";

type MenuState = {
    menuVisible: boolean
    menuPosition: { x: number, y: number }
    selectedStudent: StudentType | null
}

const initialState: MenuState = {
    menuVisible: false,
    menuPosition: {x: 0, y: 0},
    selectedStudent: null
}

const menuSlice = createSlice({
    name: "menuSlice",
    initialState,
    reducers: {
        setMenuVisible: (state, action: PayloadAction<boolean>) => {
            state.menuVisible = action.payload
        },
        setMenuPosition: (state, action: PayloadAction<{ x: number, y: number }>) => {
            state.menuPosition = action.payload
        },
        setSelectedRowId: (state, action: PayloadAction<StudentType | null>) => {
            state.selectedStudent = action.payload
        },
        fetchStudentById: (state, action: PayloadAction<number>) => {

        }
    }
})

export const {
    setMenuVisible,
    setMenuPosition,
    setSelectedRowId,
    fetchStudentById
} = menuSlice.actions

export default menuSlice.reducer