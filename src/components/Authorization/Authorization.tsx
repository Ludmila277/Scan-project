/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Authorization.css";
import authorization_icon_facebook from "../../assets/authorization_icon_facebook.svg";
import authorization_icon_google from "../../assets/authorization_icon_google.svg";
import authorization_icon_lock from "../../assets/authorization_icon_lock.svg";
import authorization_icon_yandex from "../../assets/authorization_icon_yandex.svg";
import authorization_large_picture from "../../assets/authorization_large_picture.svg";

interface AuthorizationProps {
    redirectBack?: string;
}

interface AuthResponse {
    message: string;
    accessToken: string;
    expire: string;
}

const Authorization: React.FC<AuthorizationProps> = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPasswordHint, setShowPasswordHint] = useState<boolean>(false);
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    
    const validateUsername = (input: string): boolean => {
        if (!input) {
            setUsernameError("Логин обязателен");
            return false;
        }
        if (input.length < 3) {
            setUsernameError("Минимум 3 символа");
            return false;
        }
        if (!/^[a-zA-Z0-9]+$/.test(input)) {
            setUsernameError("Только буквы и цифры");
            return false;
        }
        setUsernameError(null);
        return true;
    };

 
    const validatePassword = (input: string): boolean => {
        if (!input) {
            setPasswordError("Пароль обязателен");
            return false;
        }
        const hasLetter = /[a-zA-Z]/.test(input);
        const hasDigit = /\d/.test(input);
        if (input.length < 6) {
            setPasswordError("Минимум 6 символов");
            return false;
        }
        if (!hasLetter) {
            setPasswordError("Нужна хотя бы одна буква");
            return false;
        }
        if (!hasDigit) {
            setPasswordError("Нужна хотя бы одна цифра");
            return false;
        }
        setPasswordError(null);
        return true;
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);

        if (!isUsernameValid || !isPasswordValid) return;

        try {
            const response = await fetch(
                "https://gateway.scan-interfax.ru/api/v1/account/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        login: username,
                        password: password,
                    }),
                }
            );

            const data: AuthResponse = await response.json();
            if (response.ok) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("tokenExpire", data.expire);
                setIsLoggedIn(true);
                navigate("/");
            } else {
                throw new Error(data.message || "Ошибка при входе");
            }
        } catch (error) {
            console.error("Ошибка аутентификации:", error);
            setUsernameError("Неверный логин или пароль");
            setPasswordError("Неверный логин или пароль");
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setUsername(input);
        validateUsername(input);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setPassword(input);
        validatePassword(input);
     
        setShowPasswordHint(!!input && !validatePassword(input));
    };

    return (
        <div className="auth-content">
            <div className="text-and-picture">
                <h1 className="h1-auth-page">
                    Для оформления подписки <br />
                    на тариф, необходимо <br />
                    авторизоваться.
                </h1>
                <img
                    className="auth-large-image-desktop"
                    src={authorization_large_picture}
                    alt="People with key image"
                />
            </div>

            <div className="auth-block">
                <img
                    className="auth-icon-lock"
                    src={authorization_icon_lock}
                    alt="Key image"
                />
                <div className="auth-form">
                    <div className="tabs">
                        <div className="tab active">Войти</div>
                        <div className="tab">
                            <a className="inactive" href="#">
                                Зарегистрироваться
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="input">
                            <label htmlFor="username">Логин или номер телефона:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                aria-invalid={usernameError ? "true" : "false"}
                                aria-describedby={usernameError ? "username-error" : undefined}
                                style={{ borderColor: usernameError ? "red" : "" }}
                            />
                            {usernameError && (
                                <div
                                    id="username-error"
                                    className="auth-form-error"
                                    role="alert"
                                >
                                    {usernameError}
                                </div>
                            )}
                        </div>

                        <div className="input">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                                required
                                aria-invalid={passwordError ? "true" : "false"}
                                aria-describedby={
                                    passwordError || showPasswordHint ? "password-error" : undefined
                                }
                                style={{ borderColor: passwordError ? "red" : "" }}
                            />
                            {(passwordError || showPasswordHint) && (
                                <div
                                    id="password-error"
                                    className="auth-form-error"
                                    role="alert"
                                >
                                    {passwordError || (
                                        <small>
                                            Пароль: 6+ символов, буква и цифра
                                        </small>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="auth-button-div">
                            <button
                                className="button auth-button"
                                type="submit"
                                disabled={!!usernameError || !!passwordError}
                            >
                                Войти
                            </button>
                        </div>

                        <a href="#" className="reset-password">
                            Восстановить пароль
                        </a>
                    </form>

                    <div className="auth-social-media">
                        <p className="enter-with">Войти через:</p>
                        <div className="social-buttons">
                            <button
                                type="button"
                                aria-label="Войти через Google"
                                onClick={() => alert('Вход через Google (реализуется позже)')}
                            >
                                <img src={authorization_icon_google} alt="" />
                            </button>
                            <button
                                type="button"
                                aria-label="Войти через Facebook"
                                onClick={() => alert('Вход через Facebook (реализуется позже)')}
                            >
                                <img src={authorization_icon_facebook} alt="" />
                            </button>
                            <button
                                type="button"
                                aria-label="Войти через Яндекс"
                                onClick={() => alert('Вход через Яндекс (реализуется позже)')}
                            >
                                <img src={authorization_icon_yandex} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <img
                className="auth-large-image-mobile"
                src={authorization_large_picture}
                alt="People with key image"
            />
        </div>
    );
};

export default Authorization;

