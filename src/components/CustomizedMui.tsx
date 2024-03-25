import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface MUISnackbarProps {
	open: boolean;
	type?: AlertColor;
	message: string;
	setOpen: (open: boolean) => void;
}
export function MUISnackbar(ps: MUISnackbarProps) {
	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		ps.setOpen(false);
	};

	return (
		<Snackbar
			open={ps.open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
		>
			<Alert
				onClose={handleClose}
				severity={ps.type ?? "info"}
				sx={{ width: "100%", mb: 2 }}
			>
				{ps.message}
			</Alert>
		</Snackbar>
	);
}
