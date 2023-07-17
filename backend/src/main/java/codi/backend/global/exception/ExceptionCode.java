package codi.backend.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // Member, Account
    MEMBER_NOT_FOUND(404, "Member not found"),
    INVALID_INPUT(400, "Invalid input provided"),
    SERVER_ERROR(500, "An error occurred on the server"),
    SAME_PASSWORD_ERROR(409, "Same password error, please enter a different password"),
    INVALID_OLD_PASSWORD(401, "Invalid current password error, please enter the correct password"),
    NOT_MENTOR_ERROR(403, "Forbidden. The requested member is not a mentor."),
    NOT_PROFILE_ERROR(400, "This member has no profile"),
    PROFILE_NOT_FOUND(400, "This request does not have profile obj"),
    PROFILE_UPDATE_FAILED(500, "Profile update failed"),

    // File
    INVALID_DIRECTORY_NAME(400, "This directory name is invalid"),
    NOT_FILE_ERROR(400, "This is not a file"),
    INVALID_FILE_TYPE(400, "Invalid or unsupported file type"),
    FILE_WRITE_ERROR(400, "Failed to write resized image"),
    INVALID_FILE(400, "File cannot be null or empty."),
    FILE_UPDATE_FAILED(500, "File update failed"),
    FILE_UPLOAD_ERROR(500, "File upload failed");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
