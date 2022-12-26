package com.external.utils;

import com.appsmith.external.plugins.AppsmithPluginErrorUtils;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MySqlErrorUtils extends AppsmithPluginErrorUtils {

    private static MySqlErrorUtils mySqlErrorUtils;

    public static MySqlErrorUtils getInstance() {
        if (mySqlErrorUtils == null) {
            mySqlErrorUtils = new MySqlErrorUtils();
        }

        return mySqlErrorUtils;
    }

    /**
     * Extract small readable portion of error message from a larger less comprehensible error message.
     * @param error - any error object
     * @return readable error message
     */
    @Override
    public String getReadableError(Throwable error) {

        return error.getMessage();
    }

    // Get last element from array.
    private String getLast(String[] messageArray) {
        if (messageArray.length == 0) {
            return "";
        }

        return messageArray[messageArray.length - 1];
    }
}
