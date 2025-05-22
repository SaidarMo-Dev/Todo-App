import { Alert, Snackbar, Stack } from "@mui/material";

export default function CustomSnackbar({ open, message }) {
  return (
    <>
      <Stack spacing={2}>
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
