import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { AnyType } from '@/common/types';
import { UrlLogin } from '@/constant/redirect-url';
import { clientInit } from './clientInit';

const baseURL = '';

export const Init = () => {
	const errorWrapper = (stack: { code: number; message?: string; error?: string }) => {
		const error = new Error(stack.message || stack.error);
		Object.defineProperty(error, 'meta', { value: stack });
		return error;
	};

	const reqInterceptor = (config: InternalAxiosRequestConfig<AnyType>) => {
		return config;
	};

	const respInterceptor = (response: AxiosResponse<AnyType, AnyType>) => {
		const data = response.data as { code: number; error: string; data?: { login_method: 'scan' | 'token' } };
		switch (data.code) {
			case 200:
				return response;
			case 401:
				// 未登录/过期 → 跳转登录页（已在登录页则不跳）
				if (window.location.pathname !== UrlLogin && window.location.pathname !== UrlLogin + '/') {
					window.location.href = `${UrlLogin}?login_method=${data.data?.login_method ?? 'scan'}&redirect=${encodeURIComponent(window.location.href)}`;
				}
				// 关键修复：必须 reject 而非 return undefined，否则调用方读 resp.data 会崩溃
				return Promise.reject(errorWrapper(data));
			default:
				return Promise.reject(errorWrapper(data));
		}
	};

	clientInit({
		baseURL,
		reqInterceptors: [{ onFulfilled: reqInterceptor }],
		respInterceptors: [{ onFulfilled: respInterceptor }],
	});
};
