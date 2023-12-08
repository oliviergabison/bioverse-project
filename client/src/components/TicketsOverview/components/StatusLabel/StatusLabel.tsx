import InProgressLabel from "./components/InProgressLabel";
import NewLabel from "./components/NewLabel";
import ResolvedLabel from "./components/ResolvedLabel";
import { TicketStatus } from "../../../../types";

const NEW_STATUS: TicketStatus = "new";
const IN_PROGRESS_STATUS: TicketStatus = "in_progress";
const RESOLVED_STATUS: TicketStatus = "resolved";

interface StatusLabelProps {
  status: TicketStatus;
}

function StatusLabel({ status }: StatusLabelProps) {
  switch (status) {
    case NEW_STATUS:
      return <NewLabel />;
    case IN_PROGRESS_STATUS:
      return <InProgressLabel />;
    case RESOLVED_STATUS:
      return <ResolvedLabel />;
    default:
      break;
  }
}

export default StatusLabel;
