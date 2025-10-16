import { userService } from "./userService";
import { commentService } from "./commentService";
import { IssueService } from "./issueService";
import { StatusService } from "./statusService";
export const services = {
    issues: new IssueService(),
    user: new userService(),
    comment: new commentService(),
    status: new StatusService()
}