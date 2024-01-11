import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FlexContainer } from "./StyledComponents";

interface TodoListActionsProps {
	checkAll: () => void;
	uncheckAll: () => void;
	createTodo: () => void;
	deleteTodoList: () => void;
	copyList: () => void;
}
export const TodoListActions = (ps: TodoListActionsProps) => (
	<FlexContainer>
		<Tooltip title="Check All">
			<IconButton
				aria-label="check-all-todo"
				sx={{ mr: 1 }}
				onClick={() => ps.checkAll()}
			>
				<DoneAllIcon></DoneAllIcon>
			</IconButton>
		</Tooltip>
		<Tooltip title="Uncheck All">
			<IconButton
				aria-label="uncheck-all-todo"
				sx={{ mr: 1 }}
				onClick={() => ps.uncheckAll()}
			>
				<UnpublishedIcon></UnpublishedIcon>
			</IconButton>
		</Tooltip>
		<Tooltip title="Copy List">
			<IconButton
				aria-label="copy-list"
				sx={{ mr: 1 }}
				onClick={() => ps.copyList()}
			>
				<ContentCopyIcon></ContentCopyIcon>
			</IconButton>
		</Tooltip>

		<Tooltip title="Add One">
			<IconButton
				aria-label="add-todo"
				sx={{ mr: 1 }}
				onClick={() => ps.createTodo()}
			>
				<AddIcon></AddIcon>
			</IconButton>
		</Tooltip>
		<Tooltip title="Delete All">
			<IconButton
				aria-label="delete-todo-list"
				onClick={() => ps.deleteTodoList()}
			>
				<ClearIcon></ClearIcon>
			</IconButton>
		</Tooltip>
	</FlexContainer>
);
