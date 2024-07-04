export const ResponseTypes = {
    // Error Types
    INTERNAL_ERROR: { code: "ERR01", message: "Some internal error" },
    BAD_REQUEST: { code: "ERR02", message: "Bad request" },
    NOT_FOUND: { code: "ERR03", message: "Resource not found" },
    PRODUCT_ID_REQUIRED_FOUND: { code: "ERR04", message: "Product Id required" },
    PRODUCT_NOT_FOUND: { code: "ERR05", message: "Product not found" },
    EMPTY_PRODUCT_QUERY: { code: "ERR06", message: "query, page, size can't be empty" },


    // Success Types
    PRODUCT_CREATED: { code: "SUC01", message: "Product created" },
    PRODUCT_FETCHED: { code: "SUC02", message: "Product fetched successfully" },
    SEARCH_SUCCESS: { code: "SUC03", message: "Search product successfully" },

} as const;

export type ResponseType = typeof ResponseTypes[keyof typeof ResponseTypes];
