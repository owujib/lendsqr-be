"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpStatusCode {
}
/** 200  */
HttpStatusCode.HTTP_OK = 200;
/** 100 */
HttpStatusCode.HTTP_CONTINUE = 100;
/** 101 */
HttpStatusCode.HTTP_SWITCHING_PROTOCOLS = 101;
/** 102 */
HttpStatusCode.HTTP_PROCESSING = 102; // RFC2518
/** 201 */
HttpStatusCode.HTTP_CREATED = 201;
/** 202 */
HttpStatusCode.HTTP_ACCEPTED = 202;
/** 203 */
HttpStatusCode.HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
/** 204 */
HttpStatusCode.HTTP_NO_CONTENT = 204;
/** 205 */
HttpStatusCode.HTTP_RESET_CONTENT = 205;
/** 205 */
HttpStatusCode.HTTP_PARTIAL_CONTENT = 206;
/** 207 */
HttpStatusCode.HTTP_MULTI_STATUS = 207; // RFC4918
/** 208 */
HttpStatusCode.HTTP_ALREADY_REPORTED = 208; // RFC5842
/** 226 */
HttpStatusCode.HTTP_IM_USED = 226; // RFC3229
/** 300 */
HttpStatusCode.HTTP_MULTIPLE_CHOICES = 300;
/** 301 */
HttpStatusCode.HTTP_MOVED_PERMANENTLY = 301;
/** 302 */
HttpStatusCode.HTTP_FOUND = 302;
/** 303 */
HttpStatusCode.HTTP_SEE_OTHER = 303;
/** 304 */
HttpStatusCode.HTTP_NOT_MODIFIED = 304;
/** 305 */
HttpStatusCode.HTTP_USE_PROXY = 305;
/** 306 */
HttpStatusCode.HTTP_RESERVED = 306;
/** 307 */
HttpStatusCode.HTTP_TEMPORARY_REDIRECT = 307;
/** 308 */
HttpStatusCode.HTTP_PERMANENTLY_REDIRECT = 308; // RFC7238
/** 400 */
HttpStatusCode.HTTP_BAD_REQUEST = 400;
/** 401 */
HttpStatusCode.HTTP_UNAUTHORIZED = 401;
/** 402 */
HttpStatusCode.HTTP_PAYMENT_REQUIRED = 402;
/** 403 */
HttpStatusCode.HTTP_FORBIDDEN = 403;
/** 404 */
HttpStatusCode.HTTP_NOT_FOUND = 404;
/** 405 */
HttpStatusCode.HTTP_METHOD_NOT_ALLOWED = 405;
/** 406 */
HttpStatusCode.HTTP_NOT_ACCEPTABLE = 406;
/** 407 */
HttpStatusCode.HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
/** 408 */
HttpStatusCode.HTTP_REQUEST_TIMEOUT = 408;
/** 409 */
HttpStatusCode.HTTP_CONFLICT = 409;
/** 410 */
HttpStatusCode.HTTP_GONE = 410;
/** 411 */
HttpStatusCode.HTTP_LENGTH_REQUIRED = 411;
/** 412 */
HttpStatusCode.HTTP_PRECONDITION_FAILED = 412;
/** 413 */
HttpStatusCode.HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
/** 414 */
HttpStatusCode.HTTP_REQUEST_URI_TOO_LONG = 414;
/** 415 */
HttpStatusCode.HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
/** 416 */
HttpStatusCode.HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
/** 417 */
HttpStatusCode.HTTP_EXPECTATION_FAILED = 417;
/** 418 */
HttpStatusCode.HTTP_I_AM_A_TEAPOT = 418; // RFC2324
/** 421 */
HttpStatusCode.HTTP_MISDIRECTED_REQUEST = 421; // RFC7540
/** 422 */
HttpStatusCode.HTTP_UNPROCESSABLE_ENTITY = 422; // RFC4918
/** 423 */
HttpStatusCode.HTTP_LOCKED = 423; // RFC4918
/** 424 */
HttpStatusCode.HTTP_FAILED_DEPENDENCY = 424; // RFC4918
/** 425 */
HttpStatusCode.HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL = 425; // RFC2817
/** 426 */
HttpStatusCode.HTTP_UPGRADE_REQUIRED = 426; // RFC2817
/** 428 */
HttpStatusCode.HTTP_PRECONDITION_REQUIRED = 428; // RFC6585
/** 429 */
HttpStatusCode.HTTP_TOO_MANY_REQUESTS = 429; // RFC6585
/** 431 */
HttpStatusCode.HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431; // RFC6585
/** 451 */
HttpStatusCode.HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
/** 500 */
HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR = 500;
/** 501 */
HttpStatusCode.HTTP_NOT_IMPLEMENTED = 501;
/** 502 */
HttpStatusCode.HTTP_BAD_GATEWAY = 502;
/** 503 */
HttpStatusCode.HTTP_SERVICE_UNAVAILABLE = 503;
/** 504 */
HttpStatusCode.HTTP_GATEWAY_TIMEOUT = 504;
/** 505 */
HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED = 505;
/** 506 */
HttpStatusCode.HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506; // RFC2295
/** 507 */
HttpStatusCode.HTTP_INSUFFICIENT_STORAGE = 507; // RFC4918
/** 508 */
HttpStatusCode.HTTP_LOOP_DETECTED = 508; // RFC5842
/** 510 */
HttpStatusCode.HTTP_NOT_EXTENDED = 510; // RFC2774
/** 511 */
HttpStatusCode.HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;
exports.default = HttpStatusCode;
