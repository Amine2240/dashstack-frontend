"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { API_URL } from "@/lib/api";
import { Checkbox, Chip  } from "@mui/material";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
const Page = () => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Fetch tasks from the API on load
  React.useEffect(() => {
    const fetchTasks = async () => {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      const token = JSON.parse(localStorage.getItem("user")).token;
      try {
        const response = await axios.get(
          `${API_URL}/tasks/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRows(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Function to handle marking task as completed using PUT request
  const handleTaskCompletion = async (taskId: string) => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const token = JSON.parse(localStorage.getItem("user")).token;
    const updatedTask = { isDone: true, userId }; // Including userId in request body

    try {
      await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the task status in the UI immediately after successful API call
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === taskId ? { ...row, isDone: true } : row
        )
      );
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  return (
    <div className="bg-[#F5F6FA] p-5">
      <p className="text-3xl font-bold capitalize mb-10">Assigned Tasks</p>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="task table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Task Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Description
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Priority
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Deadline
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Task Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Mark as Completed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.taskTitle}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.priority === "high" ? "High" : "Normal"}
                      color={row.priority === "high" ? "error" : "primary"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.scheduledDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{row.taskType}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.isDone ? "Completed" : "Not Completed"}
                      color={row.isDone ? "success" : "warning"}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={row.isDone}
                      disabled={row.isDone}
                      icon={<CheckCircleOutline />}
                      onChange={() => handleTaskCompletion(row._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Page;

