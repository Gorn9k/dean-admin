import {FC} from "react";
import {NavLink, useLocation} from "react-router-dom";

export const Header: FC = () => {

    const path = useLocation().pathname

    return <header>
        <h1>Деканат админ</h1>
        <div>
            <NavLink style={path === '/groups' ? {borderBottom: '5px solid darkturquoise', borderRadius: 0} : undefined}
                     to={'/groups'}>Поиск групп</NavLink>
            <NavLink style={path === '/students' ? {borderBottom: '5px solid darkturquoise', borderRadius: 0} : undefined}
                     to={'/students'}>Поиск студента по зачётной книжке</NavLink>
        </div>
    </header>
}