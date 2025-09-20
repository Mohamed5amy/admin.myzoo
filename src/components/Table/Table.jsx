import { CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Person4Icon from "@mui/icons-material/Person4";
import { Link } from "react-router-dom";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { useState } from "react";
import Popup from "../Popup/Popup";

const Table = ({ headers, data, body, edit, profile, loading, deleteFn }) => {

    const [activeDelete, setActiveDelete] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    
    if (loading) {
        return (
            <Typography textAlign={"center"} pt={40}>
                <CircularProgress />
            </Typography>
        );
    } else {
        return data?.length > 0 ? (
            <>
                <Stack width={"100%"} borderRadius={"16px"} pb={8} pr={2} className="Table" sx={{ overflow: "scroll" }} maxHeight={"400px"}>
                    <Stack minWidth={{xs : "900px" , md : "400px"}} position={"relative"} maxWidth={"100%"}>
                        {/* Head */}
                        <TableHeader headers={headers} edit={edit} profile={profile} isDelete={deleteFn ? true : false} />
                        {/* Body */}
                        <Stack spacing={4}>
                            {data?.length > 0 &&
                                data?.map((item, i) => {
                                    return (
                                        <TableItem key={item.id} item={item} i={i} body={body} edit={edit} profile={profile} setActiveDelete={setActiveDelete} isDelete={deleteFn ? true : false} setDeleteId={setDeleteId} />
                                    );
                                })}
                        </Stack>
                    </Stack>
                </Stack>
                {/* Delete Popup */}
                <Popup open={activeDelete} setOpen={setActiveDelete} message={"Are You Sure you want to delete this?"} type="delete" fn={() => deleteFn(deleteId)} />
            </>
        ) : (
            <Typography textAlign={"center"} pt={40} fontWeight={500}>
                No Data Yet
            </Typography>
        );
    }
};

const TableHeader = ({ headers, edit, profile , isDelete }) => {
    return (
        <Stack direction={"row"} py={8} px={8} spacing={4} position={"sticky"} top={0} bgcolor={"primary.white"} zIndex={3} borderRadius={"12px"} mb={4}>
            <Typography variant="subtitle" flex={0.5}>
                NO
            </Typography>
            {headers?.length > 0 &&
                headers.map((header, i) => {
                    return (
                        <Typography variant="subtitle" flex={2} key={i}>
                            {header}
                        </Typography>
                    );
                })}
            {(edit || profile || isDelete) && (
                <Typography variant="subtitle" flex={1.5}>
                    Actions
                </Typography>
            )}
        </Stack>
    );
};

const TableItem = ({ item, i, body, edit, profile , setActiveDelete , isDelete , setDeleteId }) => {
    return (
        <Stack py={4} direction={"row"} px={8} spacing={4} whiteSpace={"nowrap"} bgcolor={"primary.white"} alignItems={"center"} maxWidth={"100%"} minHeight={"56px"} borderRadius={"12px"} position={"relative"} overflow={"hidden"} className="tableItem">

            {/* Hover Effect */}
            <div className="tableHover"></div>

            <Typography variant="body" zIndex={2} color={"text.secondary"} flex={0.5}>
                {i + 1}
            </Typography>

            {body?.map((item2, i) => {
                return (
                    <Typography zIndex={2} key={i} variant="body" fontWeight={"500"} color={"text.secondary"} flex={2} pr={4} noWrap>
                        <Tooltip title={item[item2] && item[item2]}>
                            {item[item2] &&
                                item[item2]?.toString().slice(0, 20)}{" "}
                        </Tooltip>
                    </Typography>
                );
            })}

            {(edit || profile || isDelete) && (
                <Typography zIndex={2} variant="body" color={"text.secondary"} flex={1.5}>
                    <Stack direction={"row"} spacing={1}>
                        {edit && (
                            <Link to={"edit/" + item?.id}>
                                <Tooltip title="Edit">
                                    <IconButton sx={{ color: "#32C652" }}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )}
                        {profile && (
                            <Link to={item?.id?.toString()}>
                                <Tooltip title="Profile">
                                    <IconButton>
                                        <Person4Icon color="primary" />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )}
                        {isDelete && (
                            <div onClick={() => {setActiveDelete(true); setDeleteId(item.id)}}>
                                <Tooltip title="Delete">
                                    <IconButton>
                                        <DeleteOutline color="error" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                    </Stack>
                </Typography>
            )}

        </Stack>
    );
};

export default Table;
