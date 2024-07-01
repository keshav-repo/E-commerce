export const ResponseTypes = {
    // Error Types
    INTERNAL_ERROR: { code: "ERR01", message: "Some internal error" },
    BAD_REQUEST: { code: "ERR02", message: "Bad request" },
    NOT_FOUND: { code: "ERR03", message: "Resource not found" },
    PRODUCT_ID_REQUIRED_FOUND: { code: "ERR04", message: "Product Id required" },
    PRODUCT_NOT_FOUND: { code: "ERR05", message: "Product not found" },


    // Success Types
    PRODUCT_CREATED: { code: "SUC01", message: "Product created" },
    PRODUCT_FETCHED: { code: "SUC02", message: "Product fetched successfully" },

} as const;

export type ResponseType = typeof ResponseTypes[keyof typeof ResponseTypes];
