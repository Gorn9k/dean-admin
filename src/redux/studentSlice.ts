import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type StudentState = {
    imageUrl: string
    isLoadingImage: boolean
    isOnEditMode: boolean
    isEditingStudentInProcess: boolean
}

const initialState: StudentState = {
    imageUrl: `${process.env.PUBLIC_URL}/none.jpg`,
    isLoadingImage: false,
    isOnEditMode: false,
    isEditingStudentInProcess: false
}

const studentSlice = createSlice({
    name: "studentSlice",
    initialState,
    reducers: {
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload
        },
        setIsLoadingImage: (state, action: PayloadAction<boolean>) => {
            state.isLoadingImage = action.payload
        },
        setIsOnEditMode: (state, action: PayloadAction<boolean>) => {
            state.isOnEditMode = action.payload
        },
        setIsEditingStudentInProcess: (state, action: PayloadAction<boolean>) => {
            state.isEditingStudentInProcess = action.payload
        },
        fetchImageByUrl: (state, action: PayloadAction<string>) => {

        }
    }
})

export const {
    setIsEditingStudentInProcess,
    setIsOnEditMode,
    setIsLoadingImage,
    fetchImageByUrl,
    setImageUrl
} = studentSlice.actions

export default studentSlice.reducer