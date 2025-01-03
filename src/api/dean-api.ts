import axios from "axios";

const serverUrl = 'https://internal.vstu.by/dean'

const authorizationInstance = axios.create({
    baseURL: `https://auth.vstu.by`
})

const publicInstance = axios.create({
    baseURL: `${serverUrl}/api/v1/public`
});

const privateInstance = axios.create({
    baseURL: `${serverUrl}/api/v1`
})

const privateInstanceV2 = axios.create({
    baseURL: `${serverUrl}/api/v1_1`
})

authorizationInstance.interceptors.request.use(function (config) {
    config.withCredentials = true
    config.data = ['ROLE_METHODIST', 'ROLE_DEAN']
    return config
})

// privateInstance.interceptors.request.use(function (config) {
//     config.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YW1heGlsYSIsImF1ZCI6ImRlYW4iLCJzZXJ2aWNlIjp0cnVlLCJzY29wZSI6WyJkZWFuX3JlYWQiLCJkZWFuX3JzcWwiXSwicm9sZXMiOlsiU0VSVklDRSJdLCJleHAiOjE4MDQzNTg1OTIsImlhdCI6MTczMjM1ODU5MiwianRpIjoiMmYwMjcwZDItODdiMi00MjQwLTk3M2MtMDgxYmZhYjkxNmRkIiwicmVxdWVzdF9qdGkiOiI5MjljNjI2ZC01NDBlLTQ0MGYtYTM2YS0wMTc5ZjllZmNkNWIiLCJhdXRob3JpdGllcyI6W3sicm9sZSI6IlJPTEVfU0VSVklDRSJ9XX0.RSfedTxFJDobprpYpvyZskc7_-JqWOZpHQESEeXIoao')
//     return config
// })
//
// privateInstanceV2.interceptors.request.use(function (config) {
//     config.headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YW1heGlsYSIsImF1ZCI6ImRlYW4iLCJzZXJ2aWNlIjp0cnVlLCJzY29wZSI6WyJkZWFuX3JlYWQiLCJkZWFuX3JzcWwiXSwicm9sZXMiOlsiU0VSVklDRSJdLCJleHAiOjE4MDQzNTg1OTIsImlhdCI6MTczMjM1ODU5MiwianRpIjoiMmYwMjcwZDItODdiMi00MjQwLTk3M2MtMDgxYmZhYjkxNmRkIiwicmVxdWVzdF9qdGkiOiI5MjljNjI2ZC01NDBlLTQ0MGYtYTM2YS0wMTc5ZjllZmNkNWIiLCJhdXRob3JpdGllcyI6W3sicm9sZSI6IlJPTEVfU0VSVklDRSJ9XX0.RSfedTxFJDobprpYpvyZskc7_-JqWOZpHQESEeXIoao')
//     return config
// })

export type FacultyType = {
    id?: number | null
    shortName?: string | null
}

export type GroupType = {
    id?: number | null
    name?: string | null
    spec?: {
        name?: string | null
    } | null
    yearStart?: number  | null
    yearEnd?: number | null
    currentCourse?: number | null
}

export type StudentType = {
    id?: number | null
    surname?: string | null
    name?: string | null
    patronymic?: string | null
    caseNo?: number | null
    phone?: string | null
    group?: {
        id?: number | null
        name?: string | null
    } | null
    specialization?: {
        id?: number | null
        name?: string | null
    } | null
    birthDate?: string | null
    birthPlace?: string | null
    sex?: string | null
    citizenship?: {
        id?: number | null
        name?: string | null
    } | null
    language?: {
        id?: number | null
        name?: string | null
    } | null
    institution?: {
        id?: number | null
        fullName?: string | null
    } | null
    educationYearEnd?: number | null
    addressIndex?: string | null
    addressCountry?: string | null
    addressState?: string | null
    addressRegion?: string | null
    addressCity?: string | null
    addressStreet?: string | null
    addressHouse?: string | null
    addressHousePart?: string | null
    addressFlat?: string | null
    job?: string | null
    jobExperience?: string | null
    photoUrl?: string | null
    email?: string | null
    paymentType?: string | null
    educations?: EducationType[] | null
    parents?: ParentType[] | null
    status?: string | null
}

export type ParentType = {
    id?: number | null
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    job?: string | null
    phone?: string | null
}

export type EducationType = {
    id?: number | null
    education?: string | null
    educationDocumentType?: string | null
    educationDocumentSerial?: string | null
    educationDocumentNumber?: string | null
}

export type StudentStatementType = {
    id?: number | null
    examType?: string | null
    disciplineName?: string | null
    student?: string | null
    grade?: string | null
    hours?: number | null
    testPoints?: number | null
    teachers?: string[] | null
    dateOfExam?: string | null
    isRetake?: boolean | null
}

export type StudentStatementsContentType = {
    average?: number | null
    statements?: StudentStatementType[] | null
}

export type StudentAbsencesContentType = {
    hoursAll?: number | null
    hoursNotPaid?: number | null
    hoursPaid?: number | null
    absences?: StudentAbsenceType[] | null
}

export type StudentAbsenceType = {
    discipline?: string | null
    date?: string | null
    lessonType?: string | null
    teacher?: string | null
    absenceTime?: number | null
    reasonMsg?: string | null
    price?: number | null
    payed?: boolean | null
    free?: boolean | null
    sum?: number | null
    payedSum?: number | null
}

export type GroupStatementType = {
    id?: number | null
    studyPlanTeacher?: string | null
    discipline?: string | null
    examType?: string | null
    groupStatementNumber?: number | null
    statementDate?: string | null
    semesterType?: string | null
    course?: number | null
}

export const getFaculties = async () => {
    return (await publicInstance.get<FacultyType[]>('/faculties/active', {params: {is: true}})).data
}

export const getGroupsByFacultyIdAndYearAndSemester = async (facultyId?: number, year?: number, semester?: string) => {
    return (await privateInstance.get<GroupType[]>(`/groups/by`, {params: {facultyId, year, semester}})).data
}

export const getStudentsByGroupId = async (groupId: number) => {
    return (await privateInstance.get<StudentType[]>(`/students/byGroup/${groupId}`)).data
}

export const getImageByUrl = async (url: string) => {
    return (await privateInstance.get<Blob>(`${serverUrl}${url}`, {responseType: 'blob'})).data
}

export const getStudentsByCaseNo = async (caseNo: string) => {
    return (await privateInstance.get<StudentType[]>(`/students/byCaseNo`, {params: {caseNo}})).data
}

export const getStudentSemesters = async (caseNo: number) => {
    return (await privateInstance.get<number[]>(`/students/${caseNo}/semesters`)).data
}

export const getGroupSemesters = async (groupId: number) => {
    return (await privateInstance.get<number[]>(`/groups/semesters`, {params: {groupId}})).data
}

export const getGradesByCaseNoAndSemesterAndSelectPractices = async (caseNo: number, semester: number, selectPractices: boolean) => {
    return (await privateInstanceV2.get<StudentStatementsContentType>(`/statements/by`, {params: {caseNo, semester, selectPractices}})).data
}

export const getAbsencesByCaseNoAndSemesterAndSemesterMonthAndOnlyPaidAbsences = async (caseNo: number, semester: number, semesterMonth: number | null, onlyPaidAbsences: boolean) => {
    return (await privateInstanceV2.get<StudentAbsencesContentType>(`/absences/by`, {params: {caseNo, semester, semesterMonth, onlyPaidAbsences}})).data
}

export const getStatementsByGroupIdAndSemesterNumber = async (groupId: number, semester: number) => {
    return (await privateInstance.get<GroupStatementType[]>(`/statements/by`, {params: {groupId, semester}})).data
}

export const getGradesByStatementId = async (statementId: number) => {
    return (await privateInstanceV2.get<StudentStatementsContentType>(`/statements/byStatement`, {params: {statementId}})).data
}

export const createStudentPhoto = async (body: any) => {
    return (await privateInstance.put<string>(`/files/students/upload`, body)).data
}

export const updateStudent = async (body: StudentType) => {
    return(await privateInstance.put<StudentType>('/students/dto', body)).data
}

export const getSpecializationsByGroupId = async (groupId: number) => {
    return (await privateInstance.get<{id?: number | null, name?: string | null}[]>(`/groups/${groupId}/spez`)).data
}

export const getPaymentTypes = async () => {
    return (await privateInstance.get<{id?: number | null, name?: string | null}[]>(`/enums/payments`)).data
}

export const getCitizenship = async () => {
    return (await privateInstance.get<{id?: number | null, name?: string | null}[]>(`/students/citizenship/active?is=true`)).data
}

export const getInstitutions = async () => {
    return (await privateInstance.get<{id?: number | null, fullName?: string | null}[]>(`/institutions/active?is=true`)).data
}

export const getLanguages = async () => {
    return (await privateInstance.get<{id?: number | null, name?: string | null}[]>(`/students/langs/active?is=true`)).data
}

export const getAuthority = async () => {
    return await authorizationInstance.post<void>('/api/v2/users/hasAuthority')
}

export const getStudentById = async (studentId: number) => {
    return (await privateInstance.get<StudentType>(`/students/${studentId}`)).data
}

function createQueryParams(params: Record<string, string | number | boolean | null | undefined>) {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
        if (params[key]) {
            searchParams.append(key, `${params[key]}`);
        }
    });

    return `${searchParams.size > 0 ? `?` : ''}${searchParams.toString()}`;
}