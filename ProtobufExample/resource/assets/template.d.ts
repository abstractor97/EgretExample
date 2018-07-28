import * as $protobuf from "protobufjs";

/** Properties of a user_login. */
export interface Iuser_login {

    /** user_login userId */
    userId: number;

    /** user_login userName */
    userName: string;
}

/** Represents a user_login. */
export class user_login implements Iuser_login {

    /**
     * Constructs a new user_login.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login);

    /** user_login userId. */
    public userId: number;

    /** user_login userName. */
    public userName: string;

    /**
     * Creates a new user_login instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login instance
     */
    public static create(properties?: Iuser_login): user_login;

    /**
     * Encodes the specified user_login message. Does not implicitly {@link user_login.verify|verify} messages.
     * @param message user_login message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login message, length delimited. Does not implicitly {@link user_login.verify|verify} messages.
     * @param message user_login message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login;

    /**
     * Decodes a user_login message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login;

    /**
     * Verifies a user_login message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login
     */
    public static fromObject(object: { [k: string]: any }): user_login;

    /**
     * Creates a plain object from a user_login message. Also converts values to other types if specified.
     * @param message user_login
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a user_login2. */
export interface Iuser_login2 {

    /** user_login2 userId */
    userId: number;

    /** user_login2 userName */
    userName: string;
}

/** Represents a user_login2. */
export class user_login2 implements Iuser_login2 {

    /**
     * Constructs a new user_login2.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login2);

    /** user_login2 userId. */
    public userId: number;

    /** user_login2 userName. */
    public userName: string;

    /**
     * Creates a new user_login2 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login2 instance
     */
    public static create(properties?: Iuser_login2): user_login2;

    /**
     * Encodes the specified user_login2 message. Does not implicitly {@link user_login2.verify|verify} messages.
     * @param message user_login2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login2 message, length delimited. Does not implicitly {@link user_login2.verify|verify} messages.
     * @param message user_login2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login2 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login2;

    /**
     * Decodes a user_login2 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login2;

    /**
     * Verifies a user_login2 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login2 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login2
     */
    public static fromObject(object: { [k: string]: any }): user_login2;

    /**
     * Creates a plain object from a user_login2 message. Also converts values to other types if specified.
     * @param message user_login2
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login2, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login2 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a user_login3. */
export interface Iuser_login3 {

    /** user_login3 userId */
    userId: number;

    /** user_login3 userName */
    userName: string;
}

/** Represents a user_login3. */
export class user_login3 implements Iuser_login3 {

    /**
     * Constructs a new user_login3.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login3);

    /** user_login3 userId. */
    public userId: number;

    /** user_login3 userName. */
    public userName: string;

    /**
     * Creates a new user_login3 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login3 instance
     */
    public static create(properties?: Iuser_login3): user_login3;

    /**
     * Encodes the specified user_login3 message. Does not implicitly {@link user_login3.verify|verify} messages.
     * @param message user_login3 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login3, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login3 message, length delimited. Does not implicitly {@link user_login3.verify|verify} messages.
     * @param message user_login3 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login3, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login3 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login3;

    /**
     * Decodes a user_login3 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login3
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login3;

    /**
     * Verifies a user_login3 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login3 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login3
     */
    public static fromObject(object: { [k: string]: any }): user_login3;

    /**
     * Creates a plain object from a user_login3 message. Also converts values to other types if specified.
     * @param message user_login3
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login3, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login3 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a user_login4. */
export interface Iuser_login4 {

    /** user_login4 userId */
    userId: number;

    /** user_login4 userName */
    userName: string;
}

/** Represents a user_login4. */
export class user_login4 implements Iuser_login4 {

    /**
     * Constructs a new user_login4.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login4);

    /** user_login4 userId. */
    public userId: number;

    /** user_login4 userName. */
    public userName: string;

    /**
     * Creates a new user_login4 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login4 instance
     */
    public static create(properties?: Iuser_login4): user_login4;

    /**
     * Encodes the specified user_login4 message. Does not implicitly {@link user_login4.verify|verify} messages.
     * @param message user_login4 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login4, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login4 message, length delimited. Does not implicitly {@link user_login4.verify|verify} messages.
     * @param message user_login4 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login4, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login4 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login4
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login4;

    /**
     * Decodes a user_login4 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login4
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login4;

    /**
     * Verifies a user_login4 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login4 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login4
     */
    public static fromObject(object: { [k: string]: any }): user_login4;

    /**
     * Creates a plain object from a user_login4 message. Also converts values to other types if specified.
     * @param message user_login4
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login4, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login4 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a user_login5. */
export interface Iuser_login5 {

    /** user_login5 userId */
    userId: number;

    /** user_login5 userName */
    userName: string;
}

/** Represents a user_login5. */
export class user_login5 implements Iuser_login5 {

    /**
     * Constructs a new user_login5.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login5);

    /** user_login5 userId. */
    public userId: number;

    /** user_login5 userName. */
    public userName: string;

    /**
     * Creates a new user_login5 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login5 instance
     */
    public static create(properties?: Iuser_login5): user_login5;

    /**
     * Encodes the specified user_login5 message. Does not implicitly {@link user_login5.verify|verify} messages.
     * @param message user_login5 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login5, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login5 message, length delimited. Does not implicitly {@link user_login5.verify|verify} messages.
     * @param message user_login5 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login5, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login5 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login5
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login5;

    /**
     * Decodes a user_login5 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login5
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login5;

    /**
     * Verifies a user_login5 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login5 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login5
     */
    public static fromObject(object: { [k: string]: any }): user_login5;

    /**
     * Creates a plain object from a user_login5 message. Also converts values to other types if specified.
     * @param message user_login5
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login5, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login5 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a user_login6. */
export interface Iuser_login6 {

    /** user_login6 userId */
    userId: number;

    /** user_login6 userName */
    userName: string;
}

/** Represents a user_login6. */
export class user_login6 implements Iuser_login6 {

    /**
     * Constructs a new user_login6.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login6);

    /** user_login6 userId. */
    public userId: number;

    /** user_login6 userName. */
    public userName: string;

    /**
     * Creates a new user_login6 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login6 instance
     */
    public static create(properties?: Iuser_login6): user_login6;

    /**
     * Encodes the specified user_login6 message. Does not implicitly {@link user_login6.verify|verify} messages.
     * @param message user_login6 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login6, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login6 message, length delimited. Does not implicitly {@link user_login6.verify|verify} messages.
     * @param message user_login6 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login6, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login6 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login6
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login6;

    /**
     * Decodes a user_login6 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login6
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login6;

    /**
     * Verifies a user_login6 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login6 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login6
     */
    public static fromObject(object: { [k: string]: any }): user_login6;

    /**
     * Creates a plain object from a user_login6 message. Also converts values to other types if specified.
     * @param message user_login6
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login6, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login6 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a user_login7. */
export interface Iuser_login7 {

    /** user_login7 userId */
    userId: number;

    /** user_login7 userName */
    userName: string;
}

/** Represents a user_login7. */
export class user_login7 implements Iuser_login7 {

    /**
     * Constructs a new user_login7.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login7);

    /** user_login7 userId. */
    public userId: number;

    /** user_login7 userName. */
    public userName: string;

    /**
     * Creates a new user_login7 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login7 instance
     */
    public static create(properties?: Iuser_login7): user_login7;

    /**
     * Encodes the specified user_login7 message. Does not implicitly {@link user_login7.verify|verify} messages.
     * @param message user_login7 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login7, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login7 message, length delimited. Does not implicitly {@link user_login7.verify|verify} messages.
     * @param message user_login7 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login7, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login7 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login7
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login7;

    /**
     * Decodes a user_login7 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login7
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login7;

    /**
     * Verifies a user_login7 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login7 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login7
     */
    public static fromObject(object: { [k: string]: any }): user_login7;

    /**
     * Creates a plain object from a user_login7 message. Also converts values to other types if specified.
     * @param message user_login7
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login7, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login7 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a user_login8. */
export interface Iuser_login8 {

    /** user_login8 userId */
    userId: number;

    /** user_login8 userName */
    userName: string;
}

/** Represents a user_login8. */
export class user_login8 implements Iuser_login8 {

    /**
     * Constructs a new user_login8.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_login8);

    /** user_login8 userId. */
    public userId: number;

    /** user_login8 userName. */
    public userName: string;

    /**
     * Creates a new user_login8 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_login8 instance
     */
    public static create(properties?: Iuser_login8): user_login8;

    /**
     * Encodes the specified user_login8 message. Does not implicitly {@link user_login8.verify|verify} messages.
     * @param message user_login8 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_login8, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_login8 message, length delimited. Does not implicitly {@link user_login8.verify|verify} messages.
     * @param message user_login8 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_login8, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_login8 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_login8
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_login8;

    /**
     * Decodes a user_login8 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_login8
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_login8;

    /**
     * Verifies a user_login8 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_login8 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_login8
     */
    public static fromObject(object: { [k: string]: any }): user_login8;

    /**
     * Creates a plain object from a user_login8 message. Also converts values to other types if specified.
     * @param message user_login8
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_login8, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_login8 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
