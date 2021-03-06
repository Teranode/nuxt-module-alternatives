import jwtDecode from "jwt-decode";
import type { JwtPayload } from "jwt-decode";
import type { TokenableScheme } from "../../types";
import type { Storage } from "../core";
import { addTokenPrefix } from "../../utils";
import { TokenStatus } from "./token-status";

export class Token {
    scheme: TokenableScheme;
    $storage: Storage;

    constructor(scheme: TokenableScheme, storage: Storage) {
        this.scheme = scheme;
        this.$storage = storage;
    }

    get(): string | boolean {
        const _key = this.scheme.options.token.prefix + this.scheme.name;

        return this.$storage.getUniversal(_key) as string | boolean;
    }

    set(tokenValue: string | boolean, expiresIn: number | boolean = false): string | boolean {
        const token = addTokenPrefix(
            tokenValue,
            this.scheme.options.token.type
        );

        this.#setToken(token);
        this.#updateExpiration(token, expiresIn);

        if (typeof token === "string") {
            this.scheme.requestHandler.setHeader(token);
        }

        return token;
    }

    sync(): string | boolean {
        const token = this.#syncToken();
        this.#syncExpiration();

        if (typeof token === "string") {
            this.scheme.requestHandler.setHeader(token);
        }

        return token;
    }

    reset(): void {
        this.scheme.requestHandler.clearHeader();
        this.#setToken(false);
        this.#setExpiration(false);
    }

    status(): TokenStatus {
        return new TokenStatus(this.get(), this.#getExpiration());
    }

    #getExpiration(): number | false {
        const _key =
            this.scheme.options.token.expirationPrefix + this.scheme.name;

        return this.$storage.getUniversal(_key) as number | false;
    }

    #setExpiration(expiration: number | false): number | false {
        const _key =
            this.scheme.options.token.expirationPrefix + this.scheme.name;

        return this.$storage.setUniversal(_key, expiration) as number | false;
    }

    #syncExpiration(): number | false {
        const _key =
            this.scheme.options.token.expirationPrefix + this.scheme.name;

        return this.$storage.syncUniversal(_key) as number | false;
    }

    #updateExpiration(token: string | boolean, expiresIn: number | boolean): number | false | void {
        let tokenExpiration;
        const _tokenIssuedAtMillis = Date.now();
        const _maxAge = expiresIn ? expiresIn : this.scheme.options.token.maxAge
        const _tokenTTLMillis = Number(_maxAge) * 1000
        const _tokenExpiresAtMillis = _tokenTTLMillis
            ? _tokenIssuedAtMillis + _tokenTTLMillis
            : 0;

        try {
            tokenExpiration =
                jwtDecode<JwtPayload>(token + "").exp * 1000 ||
                _tokenExpiresAtMillis;
        } catch (error) {
            // If the token is not jwt, we can't decode and refresh it, use _tokenExpiresAt value
            tokenExpiration = _tokenExpiresAtMillis;

            if (!(error && error.name === "InvalidTokenError")) {
                throw error;
            }
        }

        // Set token expiration
        return this.#setExpiration(tokenExpiration || false);
    }

    #setToken(token: string | boolean): string | boolean {
        const _key = this.scheme.options.token.prefix + this.scheme.name;

        return this.$storage.setUniversal(_key, token) as string | boolean;
    }

    #syncToken(): string | boolean {
        const _key = this.scheme.options.token.prefix + this.scheme.name;

        return this.$storage.syncUniversal(_key) as string | boolean;
    }
}
