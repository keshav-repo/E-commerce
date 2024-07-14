export const ResponseTypes = {
    // Error Types
    INTERNAL_ERROR: { code: "ERR01", message: "Some internal error" },
    BAD_REQUEST: { code: "ERR02", message: "Bad request" },
    NOT_FOUND: { code: "ERR03", message: "Resource not found" },
    PRODUCT_ID_REQUIRED_FOUND: { code: "ERR04", message: "Product Id required" },
    PRODUCT_NOT_FOUND: { code: "ERR05", message: "Product not found" },
    EMPTY_PRODUCT_QUERY: { code: "ERR06", message: "query, page, size can't be empty" },
    USER_NOT_FOUND: { code: "ERR07", message: "user not found" },
    USER_EXIST: { code: "ERR08", message: "user already exist" },
    USER_WRONG_CRED: { code: "ERR09", message: "username or password is not matching" },
    TOKEN_EXPIRED: { code: "ERR10", message: "Access token expired" },
    TOKEN_INVALID: { code: "ERR11", message: "Invalid token" },
    INVALID_CART_REQUEST: { code: "ERR12", message: "Invalid cart request" },
    PRODUCT_ALREADY_IN_WISHLIST: { code: "ERR13", message: "Product already present in wishlist" },

    // Success Types
    PRODUCT_CREATED: { code: "SUC01", message: "Product created" },
    PRODUCT_FETCHED: { code: "SUC02", message: "Product fetched successfully" },
    SEARCH_SUCCESS: { code: "SUC03", message: "Search product successfully" },
    USER_CREATED: { code: "SUC04", message: "user created" },
    TOKEN_CREATED: { code: "SUC05", message: "Token created" },
    LOGOUT_SUCCESS: { code: "SUC06", message: "Logged out successfully" },
    CART_ITEM_FETCHED: { code: "SUC07", message: "Cart item fetched successfully" },
    ADDED_TO_CART: { code: "SUC07", message: "Items added/modified to cart" },
    WISHLIST_CREATED: { code: "SUC08", message: "Wish List created successfully" },

} as const;

export type ResponseType = typeof ResponseTypes[keyof typeof ResponseTypes];
