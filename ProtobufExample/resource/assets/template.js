/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.user_login = (function() {

    /**
     * Properties of a user_login.
     * @exports Iuser_login
     * @interface Iuser_login
     * @property {number} userId user_login userId
     * @property {string} userName user_login userName
     */

    /**
     * Constructs a new user_login.
     * @exports user_login
     * @classdesc Represents a user_login.
     * @implements Iuser_login
     * @constructor
     * @param {Iuser_login=} [properties] Properties to set
     */
    function user_login(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login userId.
     * @member {number} userId
     * @memberof user_login
     * @instance
     */
    user_login.prototype.userId = 0;

    /**
     * user_login userName.
     * @member {string} userName
     * @memberof user_login
     * @instance
     */
    user_login.prototype.userName = "";

    /**
     * Creates a new user_login instance using the specified properties.
     * @function create
     * @memberof user_login
     * @static
     * @param {Iuser_login=} [properties] Properties to set
     * @returns {user_login} user_login instance
     */
    user_login.create = function create(properties) {
        return new user_login(properties);
    };

    /**
     * Encodes the specified user_login message. Does not implicitly {@link user_login.verify|verify} messages.
     * @function encode
     * @memberof user_login
     * @static
     * @param {Iuser_login} message user_login message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login message, length delimited. Does not implicitly {@link user_login.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login
     * @static
     * @param {Iuser_login} message user_login message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login message from the specified reader or buffer.
     * @function decode
     * @memberof user_login
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login} user_login
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login} user_login
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login message.
     * @function verify
     * @memberof user_login
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login} user_login
     */
    user_login.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login)
            return object;
        var message = new $root.user_login();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login
     * @static
     * @param {user_login} message user_login
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login to JSON.
     * @function toJSON
     * @memberof user_login
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login;
})();

$root.user_login2 = (function() {

    /**
     * Properties of a user_login2.
     * @exports Iuser_login2
     * @interface Iuser_login2
     * @property {number} userId user_login2 userId
     * @property {string} userName user_login2 userName
     */

    /**
     * Constructs a new user_login2.
     * @exports user_login2
     * @classdesc Represents a user_login2.
     * @implements Iuser_login2
     * @constructor
     * @param {Iuser_login2=} [properties] Properties to set
     */
    function user_login2(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login2 userId.
     * @member {number} userId
     * @memberof user_login2
     * @instance
     */
    user_login2.prototype.userId = 0;

    /**
     * user_login2 userName.
     * @member {string} userName
     * @memberof user_login2
     * @instance
     */
    user_login2.prototype.userName = "";

    /**
     * Creates a new user_login2 instance using the specified properties.
     * @function create
     * @memberof user_login2
     * @static
     * @param {Iuser_login2=} [properties] Properties to set
     * @returns {user_login2} user_login2 instance
     */
    user_login2.create = function create(properties) {
        return new user_login2(properties);
    };

    /**
     * Encodes the specified user_login2 message. Does not implicitly {@link user_login2.verify|verify} messages.
     * @function encode
     * @memberof user_login2
     * @static
     * @param {Iuser_login2} message user_login2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login2.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login2 message, length delimited. Does not implicitly {@link user_login2.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login2
     * @static
     * @param {Iuser_login2} message user_login2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login2.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login2 message from the specified reader or buffer.
     * @function decode
     * @memberof user_login2
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login2} user_login2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login2.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login2();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login2 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login2
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login2} user_login2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login2.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login2 message.
     * @function verify
     * @memberof user_login2
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login2.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login2 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login2
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login2} user_login2
     */
    user_login2.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login2)
            return object;
        var message = new $root.user_login2();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login2 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login2
     * @static
     * @param {user_login2} message user_login2
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login2.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login2 to JSON.
     * @function toJSON
     * @memberof user_login2
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login2;
})();

$root.user_login3 = (function() {

    /**
     * Properties of a user_login3.
     * @exports Iuser_login3
     * @interface Iuser_login3
     * @property {number} userId user_login3 userId
     * @property {string} userName user_login3 userName
     */

    /**
     * Constructs a new user_login3.
     * @exports user_login3
     * @classdesc Represents a user_login3.
     * @implements Iuser_login3
     * @constructor
     * @param {Iuser_login3=} [properties] Properties to set
     */
    function user_login3(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login3 userId.
     * @member {number} userId
     * @memberof user_login3
     * @instance
     */
    user_login3.prototype.userId = 0;

    /**
     * user_login3 userName.
     * @member {string} userName
     * @memberof user_login3
     * @instance
     */
    user_login3.prototype.userName = "";

    /**
     * Creates a new user_login3 instance using the specified properties.
     * @function create
     * @memberof user_login3
     * @static
     * @param {Iuser_login3=} [properties] Properties to set
     * @returns {user_login3} user_login3 instance
     */
    user_login3.create = function create(properties) {
        return new user_login3(properties);
    };

    /**
     * Encodes the specified user_login3 message. Does not implicitly {@link user_login3.verify|verify} messages.
     * @function encode
     * @memberof user_login3
     * @static
     * @param {Iuser_login3} message user_login3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login3.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login3 message, length delimited. Does not implicitly {@link user_login3.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login3
     * @static
     * @param {Iuser_login3} message user_login3 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login3.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login3 message from the specified reader or buffer.
     * @function decode
     * @memberof user_login3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login3} user_login3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login3.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login3();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login3 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login3
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login3} user_login3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login3.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login3 message.
     * @function verify
     * @memberof user_login3
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login3.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login3 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login3
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login3} user_login3
     */
    user_login3.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login3)
            return object;
        var message = new $root.user_login3();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login3 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login3
     * @static
     * @param {user_login3} message user_login3
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login3.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login3 to JSON.
     * @function toJSON
     * @memberof user_login3
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login3.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login3;
})();

$root.user_login4 = (function() {

    /**
     * Properties of a user_login4.
     * @exports Iuser_login4
     * @interface Iuser_login4
     * @property {number} userId user_login4 userId
     * @property {string} userName user_login4 userName
     */

    /**
     * Constructs a new user_login4.
     * @exports user_login4
     * @classdesc Represents a user_login4.
     * @implements Iuser_login4
     * @constructor
     * @param {Iuser_login4=} [properties] Properties to set
     */
    function user_login4(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login4 userId.
     * @member {number} userId
     * @memberof user_login4
     * @instance
     */
    user_login4.prototype.userId = 0;

    /**
     * user_login4 userName.
     * @member {string} userName
     * @memberof user_login4
     * @instance
     */
    user_login4.prototype.userName = "";

    /**
     * Creates a new user_login4 instance using the specified properties.
     * @function create
     * @memberof user_login4
     * @static
     * @param {Iuser_login4=} [properties] Properties to set
     * @returns {user_login4} user_login4 instance
     */
    user_login4.create = function create(properties) {
        return new user_login4(properties);
    };

    /**
     * Encodes the specified user_login4 message. Does not implicitly {@link user_login4.verify|verify} messages.
     * @function encode
     * @memberof user_login4
     * @static
     * @param {Iuser_login4} message user_login4 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login4.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login4 message, length delimited. Does not implicitly {@link user_login4.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login4
     * @static
     * @param {Iuser_login4} message user_login4 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login4.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login4 message from the specified reader or buffer.
     * @function decode
     * @memberof user_login4
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login4} user_login4
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login4.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login4();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login4 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login4
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login4} user_login4
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login4.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login4 message.
     * @function verify
     * @memberof user_login4
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login4.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login4 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login4
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login4} user_login4
     */
    user_login4.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login4)
            return object;
        var message = new $root.user_login4();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login4 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login4
     * @static
     * @param {user_login4} message user_login4
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login4.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login4 to JSON.
     * @function toJSON
     * @memberof user_login4
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login4.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login4;
})();

$root.user_login5 = (function() {

    /**
     * Properties of a user_login5.
     * @exports Iuser_login5
     * @interface Iuser_login5
     * @property {number} userId user_login5 userId
     * @property {string} userName user_login5 userName
     */

    /**
     * Constructs a new user_login5.
     * @exports user_login5
     * @classdesc Represents a user_login5.
     * @implements Iuser_login5
     * @constructor
     * @param {Iuser_login5=} [properties] Properties to set
     */
    function user_login5(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login5 userId.
     * @member {number} userId
     * @memberof user_login5
     * @instance
     */
    user_login5.prototype.userId = 0;

    /**
     * user_login5 userName.
     * @member {string} userName
     * @memberof user_login5
     * @instance
     */
    user_login5.prototype.userName = "";

    /**
     * Creates a new user_login5 instance using the specified properties.
     * @function create
     * @memberof user_login5
     * @static
     * @param {Iuser_login5=} [properties] Properties to set
     * @returns {user_login5} user_login5 instance
     */
    user_login5.create = function create(properties) {
        return new user_login5(properties);
    };

    /**
     * Encodes the specified user_login5 message. Does not implicitly {@link user_login5.verify|verify} messages.
     * @function encode
     * @memberof user_login5
     * @static
     * @param {Iuser_login5} message user_login5 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login5.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login5 message, length delimited. Does not implicitly {@link user_login5.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login5
     * @static
     * @param {Iuser_login5} message user_login5 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login5.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login5 message from the specified reader or buffer.
     * @function decode
     * @memberof user_login5
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login5} user_login5
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login5.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login5();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login5 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login5
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login5} user_login5
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login5.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login5 message.
     * @function verify
     * @memberof user_login5
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login5.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login5 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login5
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login5} user_login5
     */
    user_login5.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login5)
            return object;
        var message = new $root.user_login5();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login5 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login5
     * @static
     * @param {user_login5} message user_login5
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login5.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login5 to JSON.
     * @function toJSON
     * @memberof user_login5
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login5.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login5;
})();

$root.user_login6 = (function() {

    /**
     * Properties of a user_login6.
     * @exports Iuser_login6
     * @interface Iuser_login6
     * @property {number} userId user_login6 userId
     * @property {string} userName user_login6 userName
     */

    /**
     * Constructs a new user_login6.
     * @exports user_login6
     * @classdesc Represents a user_login6.
     * @implements Iuser_login6
     * @constructor
     * @param {Iuser_login6=} [properties] Properties to set
     */
    function user_login6(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login6 userId.
     * @member {number} userId
     * @memberof user_login6
     * @instance
     */
    user_login6.prototype.userId = 0;

    /**
     * user_login6 userName.
     * @member {string} userName
     * @memberof user_login6
     * @instance
     */
    user_login6.prototype.userName = "";

    /**
     * Creates a new user_login6 instance using the specified properties.
     * @function create
     * @memberof user_login6
     * @static
     * @param {Iuser_login6=} [properties] Properties to set
     * @returns {user_login6} user_login6 instance
     */
    user_login6.create = function create(properties) {
        return new user_login6(properties);
    };

    /**
     * Encodes the specified user_login6 message. Does not implicitly {@link user_login6.verify|verify} messages.
     * @function encode
     * @memberof user_login6
     * @static
     * @param {Iuser_login6} message user_login6 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login6.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login6 message, length delimited. Does not implicitly {@link user_login6.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login6
     * @static
     * @param {Iuser_login6} message user_login6 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login6.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login6 message from the specified reader or buffer.
     * @function decode
     * @memberof user_login6
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login6} user_login6
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login6.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login6();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login6 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login6
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login6} user_login6
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login6.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login6 message.
     * @function verify
     * @memberof user_login6
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login6.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login6 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login6
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login6} user_login6
     */
    user_login6.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login6)
            return object;
        var message = new $root.user_login6();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login6 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login6
     * @static
     * @param {user_login6} message user_login6
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login6.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login6 to JSON.
     * @function toJSON
     * @memberof user_login6
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login6.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login6;
})();

$root.user_login7 = (function() {

    /**
     * Properties of a user_login7.
     * @exports Iuser_login7
     * @interface Iuser_login7
     * @property {number} userId user_login7 userId
     * @property {string} userName user_login7 userName
     */

    /**
     * Constructs a new user_login7.
     * @exports user_login7
     * @classdesc Represents a user_login7.
     * @implements Iuser_login7
     * @constructor
     * @param {Iuser_login7=} [properties] Properties to set
     */
    function user_login7(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login7 userId.
     * @member {number} userId
     * @memberof user_login7
     * @instance
     */
    user_login7.prototype.userId = 0;

    /**
     * user_login7 userName.
     * @member {string} userName
     * @memberof user_login7
     * @instance
     */
    user_login7.prototype.userName = "";

    /**
     * Creates a new user_login7 instance using the specified properties.
     * @function create
     * @memberof user_login7
     * @static
     * @param {Iuser_login7=} [properties] Properties to set
     * @returns {user_login7} user_login7 instance
     */
    user_login7.create = function create(properties) {
        return new user_login7(properties);
    };

    /**
     * Encodes the specified user_login7 message. Does not implicitly {@link user_login7.verify|verify} messages.
     * @function encode
     * @memberof user_login7
     * @static
     * @param {Iuser_login7} message user_login7 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login7.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login7 message, length delimited. Does not implicitly {@link user_login7.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login7
     * @static
     * @param {Iuser_login7} message user_login7 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login7.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login7 message from the specified reader or buffer.
     * @function decode
     * @memberof user_login7
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login7} user_login7
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login7.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login7();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login7 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login7
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login7} user_login7
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login7.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login7 message.
     * @function verify
     * @memberof user_login7
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login7.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login7 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login7
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login7} user_login7
     */
    user_login7.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login7)
            return object;
        var message = new $root.user_login7();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login7 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login7
     * @static
     * @param {user_login7} message user_login7
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login7.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login7 to JSON.
     * @function toJSON
     * @memberof user_login7
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login7.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login7;
})();

$root.user_login8 = (function() {

    /**
     * Properties of a user_login8.
     * @exports Iuser_login8
     * @interface Iuser_login8
     * @property {number} userId user_login8 userId
     * @property {string} userName user_login8 userName
     */

    /**
     * Constructs a new user_login8.
     * @exports user_login8
     * @classdesc Represents a user_login8.
     * @implements Iuser_login8
     * @constructor
     * @param {Iuser_login8=} [properties] Properties to set
     */
    function user_login8(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * user_login8 userId.
     * @member {number} userId
     * @memberof user_login8
     * @instance
     */
    user_login8.prototype.userId = 0;

    /**
     * user_login8 userName.
     * @member {string} userName
     * @memberof user_login8
     * @instance
     */
    user_login8.prototype.userName = "";

    /**
     * Creates a new user_login8 instance using the specified properties.
     * @function create
     * @memberof user_login8
     * @static
     * @param {Iuser_login8=} [properties] Properties to set
     * @returns {user_login8} user_login8 instance
     */
    user_login8.create = function create(properties) {
        return new user_login8(properties);
    };

    /**
     * Encodes the specified user_login8 message. Does not implicitly {@link user_login8.verify|verify} messages.
     * @function encode
     * @memberof user_login8
     * @static
     * @param {Iuser_login8} message user_login8 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login8.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.userName);
        return writer;
    };

    /**
     * Encodes the specified user_login8 message, length delimited. Does not implicitly {@link user_login8.verify|verify} messages.
     * @function encodeDelimited
     * @memberof user_login8
     * @static
     * @param {Iuser_login8} message user_login8 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    user_login8.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a user_login8 message from the specified reader or buffer.
     * @function decode
     * @memberof user_login8
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {user_login8} user_login8
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login8.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.user_login8();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.userId = reader.int32();
                break;
            case 2:
                message.userName = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("userId"))
            throw $util.ProtocolError("missing required 'userId'", { instance: message });
        if (!message.hasOwnProperty("userName"))
            throw $util.ProtocolError("missing required 'userName'", { instance: message });
        return message;
    };

    /**
     * Decodes a user_login8 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof user_login8
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {user_login8} user_login8
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    user_login8.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a user_login8 message.
     * @function verify
     * @memberof user_login8
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    user_login8.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.userId))
            return "userId: integer expected";
        if (!$util.isString(message.userName))
            return "userName: string expected";
        return null;
    };

    /**
     * Creates a user_login8 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof user_login8
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {user_login8} user_login8
     */
    user_login8.fromObject = function fromObject(object) {
        if (object instanceof $root.user_login8)
            return object;
        var message = new $root.user_login8();
        if (object.userId != null)
            message.userId = object.userId | 0;
        if (object.userName != null)
            message.userName = String(object.userName);
        return message;
    };

    /**
     * Creates a plain object from a user_login8 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof user_login8
     * @static
     * @param {user_login8} message user_login8
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    user_login8.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.userId = 0;
            object.userName = "";
        }
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.userName != null && message.hasOwnProperty("userName"))
            object.userName = message.userName;
        return object;
    };

    /**
     * Converts this user_login8 to JSON.
     * @function toJSON
     * @memberof user_login8
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    user_login8.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return user_login8;
})();

module.exports = $root;
