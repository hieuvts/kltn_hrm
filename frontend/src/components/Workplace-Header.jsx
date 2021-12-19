import React from "react";
import { DndProvider } from "react-dnd";
const Header = () => {
    return (
        <div className={"row"}>
            <p className={"page-header"}> WorkPlace Dashboard</p>
        </div>
    )
}
export default function WorkPlace() {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>

                {pathnames.map((path, idx) => (
                    <Link
                        underline="hover"
                        color="text.primary"
                        href={path}
                        aria-current="page"
                        key={idx}
                    >
                        {CapitalizeFirstLetter(path)}
                    </Link>
                ))}
            </Breadcrumbs>

            <DndProvider backend={Backend}>
                <Header></Header>
            </DndProvider>
        </>
    )
}